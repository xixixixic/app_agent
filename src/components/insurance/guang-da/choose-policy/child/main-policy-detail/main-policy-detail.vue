<template>
    <div class="mianPolicy" v-show='showMainPolicy'>
        <div class="policyWarp">
            <div class="mainTitle">
                {{mainPolicyName}}
            </div>
            <div class="mainInfo">
                <div class='mainInfoUl'>
                    <!-- 保险期间 -->
                    <policy-time ></policy-time>
                    <!-- 缴费期间 -->
                    <pay-time ></pay-time>
                    <!-- 保额 -->
                    <policy-money></policy-money>
                    <!-- 祝寿金领取年龄 -->
                    <zhu-shou-money></zhu-shou-money>
                    <!-- 祝寿金领取方式 -->
                    <zhu-shou-method></zhu-shou-method>
                    <!-- 职业 -->
                    <div class="mainInfoLi"><span class="spanLeft">职业</span><span class="spanRight">{{mainPolicyJod}}</span></div>
                </div>
            </div>
            <div class="btnGrounp">
                <div class='btnGrey' @click='cancle'>取消</div>
                <div class='btn' @click='sure'>确定</div>
            </div>
        </div>
        <confirm  ref="confirm" :text="confirmText"></confirm>
    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import Confirm from 'base/confirm/confirm'
import {confirm} from 'common/js/mixin.js'
import {RET_OK} from 'service/variable.js'
import {culateMainRisk, queryAdditionalRiskParam} from 'api/long-life/guang-da/insurance.js'
import PolicyTime from 'components/insurance/guang-da/choose-policy/child/common/policy-time/policy-time.vue'
import PayTime from 'components/insurance/guang-da/choose-policy/child/common/pay-time/pay-time.vue'
import ZhuShouMoney from 'components/insurance/guang-da/choose-policy/child/common/zhu-shou-money/zhu-shou-money.vue'
import ZhuShouMethod from 'components/insurance/guang-da/choose-policy/child/common/zhu-shou-method/zhu-shou-method.vue'
import PolicyMoney from 'components/insurance/guang-da/choose-policy/child/common/policy-money/policy-money.vue'
export default {
    mixins: [confirm],
    computed: {
        ...mapGetters([
			'guangdaMainRisk',
            'guangdaPolicy',
            'guangdaPremiumRisk'
        ]),
        mainPolicyName () {
            return this.guangdaPolicy.productName === '' ? '-' : this.guangdaPolicy.productName
        },
        mainPolicyJod () {
            return this.guangdaPolicy.insuredJob === '' ? '_' : this.guangdaPolicy.insuredJob
        }
    },
    data () {
        return {
            showMainPolicy: false,
            defaultMainData: {},
            premium:0,
            rateId:0
        }
    },
    methods: {
        cancle () {
            this.showMainPolicy = false
        },
        sure () {
            this.SET_LONGLIFE_GUANGDA_POLICYINFO({ // 存储临时保额
                type: 2,
                field1: 'amount',
                value: this.guangdaPolicy.tempAmount
            })
            this.SET_LONGLIFE_GUANGDA_POLICYINFO({ // 存储生日
                type: 2,
                field1: 'birthday',
                value: this.guangdaPremiumRisk.insured.birthday
            })
            this.SET_LONGLIFE_GUANGDA_POLICYINFO({ // 存储保费试算保额
                type: 3,
                field1: 'mainPolicyInfo',
                field2: 'mainAmount',
                value: this.guangdaPolicy.tempAmount
            })
            this.SET_LONGLIFE_GUANGDA_POLICYINFO({
				field1: 'GetZsType',
				value:  this.guangdaPolicy.tempGetZsType
             })
             this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                type: 2,
				field1: 'premiumPeriod',
				value: Number( this.guangdaPolicy.temPay.toString() === ''? '0' : this.guangdaPolicy.temPay.toString())
             })
             this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                type: 1,
                field1: 'mainPolicyInfo',
                field2:'payIntv',
				value:  this.guangdaPolicy.temPay.toString() === ''? '0' : this.guangdaPolicy.temPay.toString()
             })
             this.SET_LONGLIFE_GUANGDA_POLICYINFO({ // 存储核保缴费区间
                type: 4,
                field1: 'productInfo',
                field2: 'payIntv',
                value: this.guangdaPolicy.temPay.toString() === ''? '0' : this.guangdaPolicy.temPay.toString() === '0' ? '0' : '12'
            })
             this.SET_LONGLIFE_GUANGDA_POLICYINFO({ // 存储保费试算缴费期间
                    type: 3,
                    field1: 'mainPolicyInfo',
                    field2: 'payIntv',
                    value:   this.guangdaPolicy.temPay.toString() === ''? '0' : this.guangdaPolicy.temPay.toString()
              })
              this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                    type: 2,
                    field1: 'getMoneyAge',
                    value: Number(this.guangdaPolicy.tempYear)
              })
                this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                    type: 1,
                    field1: 'mainPolicyInfo',
                    field2:'getYear',
                    value: this.guangdaPolicy.tempYear.toString()
                })
                this.SET_LONGLIFE_GUANGDA_POLICYINFO({ // 存储保费试算祝寿金领取
                    type: 3,
                    field1: 'mainPolicyInfo',
                    field2: 'getYear',
                    value:  this.guangdaPolicy.tempYear.toString()
                })
                this.SET_LONGLIFE_GUANGDA_POLICYINFO({ 
                    type: 4,
                    field1: 'productInfo',
                    field2: 'getYear',
                    value: this.guangdaPolicy.tempYear.toString()
                })
            if (this.guangdaMainRisk.amount < 50000) {
                this.showConfirm('请检查主险信息是否填写正确')
                return false
            } else if (this.guangdaMainRisk.getMoneyAge === 0) {
                this.showConfirm('请检查主险信息是否填写正确')
                return false
            } else if (this.guangdaMainRisk.premiumPeriod === '') {
                this.showConfirm('请检查主险信息是否填写正确')
                return false
            } else if (this.guangdaPolicy.tempGetZsType === ''){
                this.showConfirm('请检查主险信息是否填写正确')
                return false
            } else {
                culateMainRisk(this.guangdaMainRisk).then(res => {
                   if (res.ret === RET_OK) {
                        if (res.data.code === '1') {
                            this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                                field1: 'mainPolicy',
                                value: res.data
                           })
                           this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                                type: 1,
                                field1: 'mainPolicyInfo',
                                field2:'mainPremium',
                                value: res.data.premium
                            })
                            this.SET_LONGLIFE_GUANGDA_POLICYINFO({ // 存储保费试算保费
                                type: 3,
                                field1: 'mainPolicyInfo',
                                field2: 'mainPremium',
                                value:  res.data.premium
                            })
                            this.SET_LONGLIFE_GUANGDA_POLICYINFO({ // 存储保费试算主险税率id
                                type: 3,
                                field1: 'mainPolicyInfo',
                                field2: 'mRateId',
                                value: res.data.rateId.toString()
                            })
                            this.SET_LONGLIFE_GUANGDA_POLICYINFO({ // 存储保费试算必须附加险税率id
                                type: 3,
                                field1: 'mainPolicyInfo',
                                field2: 'iRateId',
                                value: res.data.isBindRisk.isRateId.toString()
                            })
                            this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                                type: 1,
                                field1: 'mainPolicyInfo',
                                field2:'isBindPremium',
                                value: res.data.isBindRisk.premium
                            })
                            this.SET_LONGLIFE_GUANGDA_POLICYINFO({ // 存储保费试算附加险保费
                                type: 3,
                                field1: 'mainPolicyInfo',
                                field2: 'isBindPremium',
                                value:  res.data.isBindRisk.premium
                            })
                           let params = {
                               mRateId: this.guangdaPolicy.mainPolicy.rateId,
                               amount: this.guangdaMainRisk.amount,
                               realtionType: this.guangdaPremiumRisk.insured.relationId,
                               appSex: parseInt(this.guangdaPremiumRisk.applicant.sex),
                               appAge: parseInt(this.guangdaPolicy.apptAge),
                               insCategories: parseInt(this.guangdaMainRisk.categories)
                           }
                           this.getFuPolicy(params)
                           this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                                field1: 'apptTempBirth',
                                value: this.guangdaPremiumRisk.applicant.birthday
                            })
                           this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                                field1: 'apptTempSex',
                                value: this.guangdaPremiumRisk.applicant.sex
                            })
                           this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                                field1: 'apptTempCategories',
                                value: this.guangdaPremiumRisk.applicant.occupationCode
                            })
                            this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                                field1: 'insuredTempBirth',
                                value: this.guangdaPremiumRisk.insured.birthday
                            })
                           this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                                field1: 'insuredTempSex',
                                value: this.guangdaPremiumRisk.insured.sex
                            })
                           this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                                field1: 'insuredTempCategories',
                                value: this.guangdaPremiumRisk.insured.occupationCode
                            })
                           this.showMainPolicy = false
                        } else if (res.data.code === '2') {
                            this.showConfirm(res.data.result)
                            return false
                        }
                    }
                })
            }
        },
        getFuPolicy(data) {
            queryAdditionalRiskParam(data).then(res =>{
                 if (res.ret === RET_OK) {
                        if (res.data.code === '1') {
                            this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                                field1: 'fuPolicy',
                                value: res.data.result
                           })
                        }
                    }
            })
        },
        ...mapMutations({
             SET_LONGLIFE_GUANGDA_POLICYINFO: 'SET_LONGLIFE_GUANGDA_POLICYINFO'
		})
    },
    components: {
        PolicyTime,
        PayTime,
        ZhuShouMoney,
        ZhuShouMethod,
        PolicyMoney,
        Confirm
    }
}
</script>

<style lang='stylus' scoped>
@import '~components/insurance/chang-cheng/choose-policy/child/stylus/common.styl'
.mainInfoLi
    height auto !important
.btnGrounp
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