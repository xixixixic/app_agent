<template>
    <div class="mianPolicy" v-show='showMainPolicy'>
        <div class="policyWarp">
            <div class="mainTitle">
                {{mainPolicyName}}
            </div>
            <div class="mainInfo">
                <div class='mainInfoUl'>
                    <!-- 保险期间 -->
                    <policy-time refs='policyTimes':mainDetailPilicyType='mainDetailPilicyType' :mainDetailPolicyTime='mainDetailPolicyTime' :mainDetaiPolicyTimeCode='mainDetaiPolicyTimeCode' @showTip='showTip'></policy-time>
                    <!-- 缴费期间 -->
                    <pay-time :mainDetailPilicyType='mainDetailPilicyType' :mainDetailPayTime='mainDetailPayTime' :mainDetaiPayTimeCode='mainDetaiPayTimeCode' @showTip='showTip'></pay-time>
                    <!-- 祝寿金领取年龄 -->
                    <zhu-shou-money v-if="this.changChengPolicyInfo.externalCode !== '00322'" :mainDetailPilicyType='mainDetailPilicyType' @showTip='showTip'></zhu-shou-money>
                    <!-- 保额 -->
                    <policy-money :mainDetailPilicyType='mainDetailPilicyType' @showTip='showTip' v-show="this.changChengPolicyInfo.flag === 1" ref='baoe'></policy-money>
                    <!-- 保费 -->
                    <bao-fei :mainDetailPilicyType='mainDetailPilicyType' @showTip='showTip' v-if="this.changChengPolicyInfo.flag === 2" ref='baofei'></bao-fei>
                </div>
            </div>
            <div class="btnGrounp">
                <span class='btnGrey' @click='cancle'>取消</span>
                <span class='btn' @click='sure'>确定</span>
            </div>
        </div>
        <confirm  ref="confirm" :text="confirmText"></confirm>
    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import Confirm from 'base/confirm/confirm'
import {confirm} from 'common/js/mixin.js'
import {submitMainPolicy} from 'api/long-life/chang-cheng/insurance.js'
import {RET_OK, CODE_OK} from 'service/variable.js'
import PolicyTime from 'components/insurance/chang-cheng/choose-policy/child/common/policy-time/policy-time.vue'
import PayTime from 'components/insurance/chang-cheng/choose-policy/child/common/pay-time/pay-time.vue'
import ZhuShouMoney from 'components/insurance/chang-cheng/choose-policy/child/common/zhu-shou-money/zhu-shou-money.vue'
import PolicyMoney from 'components/insurance/chang-cheng/choose-policy/child/common/policy-money/policy-money.vue'
import PayMoney from 'components/insurance/chang-cheng/choose-policy/child/common/pay-money/pay-money.vue'
import BaoFei from 'components/insurance/chang-cheng/choose-policy/child/common/bao-fei/bao-fei.vue'
export default {
    mixins: [confirm],
    props: {
        mainDetailData: { // 接收主险具体默认数据
            type: Object,
            default: function () {
                return {}
            }
        }
    },
    computed: {
        mainPolicyName () {
            return this.changChengPolicyInfo.mainPolicyName === '' ? '-' : this.changChengPolicyInfo.mainPolicyName
        },
        mainDetailPolicyTime () { // 保险期间
            return this.mainDetailData.policyTime
        },
        mainDetaiPolicyTimeCode () { // 保险期间
            return this.mainDetailData.policyTimeCodes
        },
        mainDetailPilicyType () {
            return this.mainDetailData.type
        },
        mainDetailPayTime () { // 缴费期间
            return this.mainDetailData.payTime
        },
        mainDetaiPayTimeCode () { // 缴费期间
            return this.mainDetailData.payTimeCodes
        },
        mainPayMoney () {
            return this.defaultMainData.premium
        },
        ...mapGetters([
			'changChengPolicyInfo', 'changChengBaseInfo'
		])
    },
    data () {
        return {
            showMainPolicy: false,
            confirmText: '',
            defaultMainData: {}
        }
    },
    methods: {
        showTip (data) {
            this.showConfirm('请先选择'+ data)
        },
        cancle () {
            this.showMainPolicy = false
        },
        sure () {
            if (this.changChengPolicyInfo.mainPolicy.ensurePeriodCode === '') {
                this.showConfirm('请选择保险期间')
            } else if (this.changChengPolicyInfo.mainPolicy.renewPeriodCode === '') {
                this.showConfirm('请选择缴费期间')
            } else if (this.changChengPolicyInfo.externalCode !== '00322') { // 祝寿金存在时
                if (this.changChengPolicyInfo.mainPolicy.getMoneyYearCode === '') {
                    this.showConfirm('请选择祝寿金领取年龄')
                } else {
                    this.judgeBaoe()
                }
            } else if (this.changChengPolicyInfo.flag === 1) { // 保额存在时
                this.judgeBaoe()
            } else {
                // this.judgeBaoe()
                this.setChangChengPolicyInfo({
                    field1: 'mainPolicy',
                    field2: 'getMoneyYear',
                    value: '0'
                })
                this.setChangChengPolicyInfo({
                    field1: 'mainPolicy',
                    field2: 'getMoneyYearCode',
                    value: '0'
                })
                this.judegeBaofei()
            }
        },
        judgeBaoe () { // 验证保额
            let money = this.changChengPolicyInfo.mainPolicy.amount
            if (money >= this.changChengPolicyInfo.minMoney && (money - this.changChengPolicyInfo.minMoney)%this.changChengPolicyInfo.addRate === 0) {
                this.setChangChengPolicyInfo({
                    field1: this.mainDetailPilicyType,
                    field2: 'amount',
                    value: money
                })
                this.$refs.baoe.wrongTipStatus = false
                this.submitQuest()
            } else {
                this.setChangChengPolicyInfo({
                    field1: this.mainDetailPilicyType,
                    field2: 'amount',
                    value: ''
                })
                this.showConfirm('请填写正确保额')
                this.$refs.baoe.wrongTipStatus = true
            }
        },
        judegeBaofei () { // 验证保费
            let money = this.changChengPolicyInfo.mainPolicy.premium
            if (money >= this.changChengPolicyInfo.minPremium && (money - this.changChengPolicyInfo.minPremium)%this.changChengPolicyInfo.premiumIncreaRatio === 0) {
                this.setChangChengPolicyInfo({
                    field1: this.mainDetailPilicyType,
                    field2: 'premium',
                    value: money
                })
                this.$refs.baofei.wrongTipStatus = false
                this.submitQuest()
            } else {
                this.setChangChengPolicyInfo({
                    field1: this.mainDetailPilicyType,
                    field2: 'premium',
                    value: ''
                })
                this.showConfirm('请填写正确保费')
                this.$refs.baofei.wrongTipStatus = true
            }
        },
        submitQuest () {
            let params = {
                    policyInfo: {
                        ensurePeriod: this.changChengPolicyInfo.mainPolicy.ensurePeriodCode.toString(),
                        renewPeriod: this.changChengPolicyInfo.mainPolicy.renewPeriodCode.toString(),
                        amount: this.changChengPolicyInfo.mainPolicy.amount,
                        getMoneyYear: this.changChengPolicyInfo.mainPolicy.getMoneyYearCode.toString(),
                        premium: this.changChengPolicyInfo.mainPolicy.premium
                    },
                    productInfo: {
                        productId: this.changChengBaseInfo.productId.toString()
                    },
                    insuredBaseInfo: this.changChengBaseInfo.insured
                }
                submitMainPolicy(params).then(res => {
                    if (res.ret === RET_OK) {
                        if (res.data.code === CODE_OK) {
                            this.setChangChengPolicyInfo({  // 判断是否二次编辑主险
                                field1: 'mainPolicyTip',
                                value: true
                            })
                            this.defaultMainData = res.data
                            this.setChangChengPolicyInfo({
                                field1: 'fuPolicy',
                                value: []
                            })
                            if (res.data.risks.length !== 0) {
                                let newArr = []
                                for (let i = 0; i < res.data.risks.length; i++) {
                                    if (res.data.risks[i].mainRiskFlag === '1') {
                                        this.defaultMainData = res.data.risks[i]
                                        this.setChangChengPolicyInfo({
                                            field1: 'mainPolicy',
                                            field2: 'premium',
                                            value: res.data.risks[i].premium
                                        })
                                    }
                                    if (res.data.risks[i].mainRiskFlag === '3') {
                                        this.addFuPolicyInfo()
                                        newArr.push(res.data.risks[i])
                                        for (let k = 0; k < newArr.length; k++) {
                                            this.setChangChengPolicyInfo({
                                                field1: 'fuPolicy#' + k,
                                                field2: 'ensurePeriod',
                                                value: newArr[k].ensurePeriod
                                            })
                                            this.setChangChengPolicyInfo({
                                                field1: 'fuPolicy#' + k,
                                                field2: 'renewPeriod',
                                                value: newArr[k].renewPeriod
                                            })
                                            this.setChangChengPolicyInfo({
                                                field1: 'fuPolicy#' + k,
                                                field2: 'amount',
                                                value: newArr[k].amount
                                            })
                                            this.setChangChengPolicyInfo({
                                                field1: 'fuPolicy#' + k,
                                                field2: 'premium',
                                                value: newArr[k].premium
                                            })
                                            this.setChangChengPolicyInfo({
                                                field1: 'fuPolicy#' + k,
                                                field2: 'mainRiskFlag',
                                                value: '3'
                                            })
                                            this.setChangChengPolicyInfo({
                                                field1: 'fuPolicy#' + k,
                                                field2: 'productName',
                                                value: newArr[k].productName
                                            })
                                            this.setChangChengPolicyInfo({
                                                field1: 'fuPolicy#' + k,
                                                field2: 'fjxId',
                                                value: newArr[k].fjxId
                                            })
                                        }
                                        this.setChangChengPolicyInfo({
                                            field1: 'fuPolicyStatus',
                                            value: true
                                        })
                                    }
                                }
                                this.setChangChengPolicyInfo({
                                    field1: 'mainPolicy',
                                    field2: 'amount',
                                    value: res.data.risks[0].amount.toString()
                                })
                                this.setChangChengPolicyInfo({
                                    field1: 'mainPolicy',
                                    field2: 'renewPeriod',
                                    value: res.data.risks[0].renewPeriod
                                })
                                this.setChangChengPolicyInfo({
                                    field1: 'allRisks',
                                    value: res.data.risks
                                })
                                this.showMainPolicy = false
                            } else {
                                this.showConfirm('数据返回为空，请检查主险选择')
                            }
                        } else {
                            this.showConfirm(res.data.remarkMsg)
                        }
                    } else {
                        this.showConfirm(res.data.remarkMsg)
                    }
                })
        },
        ...mapMutations({
            addFuPolicyInfo: 'SET_ADD_CHANGCHENG_FUPOLICYINFO',
            setChangChengPolicyInfo: 'SET_LONGLIFE_CHANGCHENG_POLICYINFO'
		})
    },
    components: {
        PolicyTime,
        PayTime,
        ZhuShouMoney,
        PolicyMoney,
        PayMoney,
        BaoFei,
        Confirm
    }
}
</script>

<style lang='stylus' scoped>
@import '~components/insurance/chang-cheng/choose-policy/child/stylus/common.styl'
.btnGrounp
    // display: flex
    // justify-content: space-evenly
    .btn
        width: (200/$scale)
        height: (70/$scale)
        line-height: (70/$scale)
        text-align: center
        font-size: (30/$scale)
        color: #fff
        bg-image('blue')
        background-size: cover
        margin: (70/$scale) 0
        display: inline-block
        margin-left: (50/$scale)
    .btnGrey
        width: (200/$scale)
        height: (70/$scale)
        line-height: (70/$scale)
        text-align: center
        font-size: (30/$scale)
        color: #fff
        bg-image('lightBlue')
        background-size: cover
        margin: (70/$scale) 0
        display: inline-block
        margin-left: (110/$scale)
</style>