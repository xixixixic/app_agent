<template>
    <div class="mianPolicy" v-show='fuShow'>
        <div class="policyWarp">
            <div class="mainTitle">
                选择附加险
            </div>
            <div class="mainInfo">
                <div class='mainInfoUl'>
                    <!-- 请选择附加险 -->
                    <div class="detail">
                        <div class="mainInfoLi"><span class="spanLeft" v-show='leftWord'>请选择附加险</span><span class="spanRight" @click="showSelectdrop()">{{text}}<i class="icon-down_arrow ico"></i></span></div>
                        <select-drop :selectArray="fuPolicyListArray" :selectTitle="selectTitle"  v-show="showSelectdropWrap" 
                        @sureSelectDrop="sureSelectDrop" @hideSelectDrop="hideSelectDrop" :default-value="this.selected"></select-drop>
                    </div>
                    <!-- 保险期间 -->
                    <div class="mainInfoLi"><span class="spanLeft">保险期间</span><span class="spanRight">{{ensurePeriod}}</span></div>
                    <!-- 缴费期间 -->
                    <div class="mainInfoLi"><span class="spanLeft">缴费期间</span><span class="spanRight">{{renewPeriod}}</span></div>
                    <!-- 保额 -->
                    <div class="mainInfoLi"><span class="spanLeft">保额</span><span class="spanRight">{{amount}}</span></div>
                    <!-- 保费 -->
                    <div class="mainInfoLi"><span class="spanLeft">保费</span><span class="spanRight">{{premium}}</span></div>
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
import SelectDrop from 'base/select-drop/select-drop'
import {mapGetters, mapMutations} from 'vuex'
import {showFuPolicyDetail} from 'api/long-life/chang-cheng/insurance.js'
import {RET_OK, CODE_OK} from 'service/variable.js'
import ChooseFuPolicy from 'components/insurance/chang-cheng/choose-policy/child/common/choose-fu-policy/choose-fu-policy.vue'
import PolicyTime from 'components/insurance/chang-cheng/choose-policy/child/common/policy-time/policy-time.vue'
import PayTime from 'components/insurance/chang-cheng/choose-policy/child/common/pay-time/pay-time.vue'
import PolicyMoney from 'components/insurance/chang-cheng/choose-policy/child/common/policy-money/policy-money.vue'
import PayMoney from 'components/insurance/chang-cheng/choose-policy/child/common/pay-money/pay-money.vue'
import Confirm from 'base/confirm/confirm'
import {confirm} from 'common/js/mixin.js'
export default {
    props: {
        fuPolicyData: { // 接收附险具体默认数据
            type: Object,
            default: function () {
                return {}
            }
        }
    },
    computed: {
        fuPolicyList () {
            return this.fuPolicyData.policyList
        },
        fuPolicyListArray () {
            return this.fuPolicyList
        },
        text () {
            for (let obj of this.fuPolicyListArray) {
                console.log(this.fuPolicyListArray)
                if (obj.nativeCode.toString() === this.selected) {
                    return obj.name
                }
            }
            return '请选择'
        },
        mainInfo () {
            return this.defaultData
        },
        ensurePeriod () {
            if (this.mainInfo !== {}) {
                return this.defaultData.ensurePeriod
            }
            return '-'
        },
        renewPeriod () {
            if (this.mainInfo !== {}) {
                return this.defaultData.renewPeriod
            }
            return '-'
        },
        premium () {
            if (this.mainInfo !== {}) {
                return this.defaultData.premium
            }
            return '-'
        },
        amount () {
            if (this.mainInfo !== {}) {
                return this.defaultData.amount
            }
            return '-'
        },
        ...mapGetters([
			'changChengPolicyInfo', 'changChengBaseInfo'
		])
    },
    mixins: [confirm],
    data () {
        return {
            fuShow: true,
            selectTitle: '选择附加险',
            showSelectdropWrap: false,
            selected: '0',
            leftWord: true,
            defaultData: {},
            confirmText: '',
            nextStatus: false
        }
    },
    created () {
        this.setDefault()
    },
    methods: {
        sure () {
            this.fuShow = false
            this.$emit('listStatus', true)
            if (this.nextStatus === true) {
                this.addFuPolicyInfo()
                let k = this.changChengPolicyInfo.fuPolicy.length - 1
                let newArr = []
                    newArr.push(this.mainInfo)
                    this.setChangChengPolicyInfo({
                        field1: 'fuPolicy#' + k,
                        field2: 'amount',
                        value: newArr[0].amount
                    })
                    this.setChangChengPolicyInfo({
                        field1: 'fuPolicy#' + k,
                        field2: 'ensurePeriod',
                        value: newArr[0].ensurePeriod
                    })
                    this.setChangChengPolicyInfo({
                        field1: 'fuPolicy#' + k,
                        field2: 'renewPeriod',
                        value: newArr[0].renewPeriod
                    })
                    this.setChangChengPolicyInfo({
                        field1: 'fuPolicy#' + k,
                        field2: 'premium',
                        value: newArr[0].premium
                    })
                    this.setChangChengPolicyInfo({
                        field1: 'fuPolicy#' + k,
                        field2: 'mainRiskFlag',
                        value: '2'
                    })
                    this.setChangChengPolicyInfo({
                        field1: 'fuPolicy#' + k,
                        field2: 'productName',
                        value: newArr[0].productName
                    })
                    this.setChangChengPolicyInfo({
                        field1: 'fuPolicy#' + k,
                        field2: 'fjxId',
                        value: newArr[0].fjxId
                    })
                let fuId = this.fuPolicyData.policyList[0].nativeCode
                let isAddRisk = true
                let risks = this.changChengPolicyInfo.allRisks
                for(let i = 0; i < risks.length; i++){
                    if(risks[i].fjxId === fuId)
                        isAddRisk = false
                }
                if(isAddRisk){
                    let allRisksTemp = this.changChengPolicyInfo.allRisksTemp
                    risks.push(allRisksTemp)
                    this.setChangChengPolicyInfo({
                        field1: 'allRisksTemp',
                        value: {}
                    })

                }                    
                
            }
        },
        cancle () {
            this.fuShow = false
        },
        setDefault () {
            this.nativeCode = this.mainDetaiPayTimeCode
        },
        showSelectdrop () {
            this.showSelectdropWrap = true
		},
		sureSelectDrop (data) {
            this.leftWord = false
            this.selected = data.nativeCode.toString()
            for (let i = 0; i < this.changChengPolicyInfo.fuPolicy.length; i++) {
                if (this.changChengPolicyInfo.fuPolicy[i].productName === data.name) {
                    this.showConfirm('不能重复选择同一附加险')
                    this.nextStatus = false
                    return false
                } else {
                    this.nextStatus = true
                }
            }
            if (this.nextStatus === true) {
                let params = {
                    id: this.fuPolicyData.policyList[0].nativeCode,
                    productInfo: {
                        productId: this.changChengBaseInfo.productId.toString()
                    },
                    insuredBaseInfo: this.changChengBaseInfo.insured,
                    appntBaseInfo: this.changChengBaseInfo.applicant,
                    policyInfo: {
                        ensurePeriod: this.changChengPolicyInfo.mainPolicy.ensurePeriodCode.toString(),
                        renewPeriod: this.changChengPolicyInfo.mainPolicy.renewPeriodCode.toString(),
                        amount: this.changChengPolicyInfo.mainPolicy.amount,
                        getMoneyYear: this.changChengPolicyInfo.mainPolicy.getMoneyYearCode.toString(),
                        premium: this.changChengPolicyInfo.mainPolicy.premium
                    },
                    riskInfo: this.changChengPolicyInfo.allRisks
                }
                showFuPolicyDetail(params).then(res => {
                    if (res.ret === RET_OK) {
                        if (res.data.code === CODE_OK) {
                                this.defaultData = res.data.data
                                this.nextStatus = true
                                this.showSelectdropWrap = false
                                this.setChangChengPolicyInfo({
                                    field1: 'allRisksTemp',
                                    value: res.data.data
                                })
                            }
                        } else {
                            this.showConfirm(res.data.remarkMsg)
                        }
                    })
            }
		},
		hideSelectDrop () {
			this.showSelectdropWrap = false
        },
        ...mapMutations({
            addFuPolicyInfo: 'SET_ADD_CHANGCHENG_FUPOLICYINFO',
            setChangChengPolicyInfo: 'SET_LONGLIFE_CHANGCHENG_POLICYINFO'
		})
    },
    components: {
        PolicyTime,
        PayTime,
        PolicyMoney,
        PayMoney,
        ChooseFuPolicy,
        SelectDrop,
        Confirm
    }
}
</script>

<style lang='stylus' scoped>
@import '~components/insurance/chang-cheng/choose-policy/child/stylus/common.styl'
@import '~common/stylus/variable.styl'
@import '~common/stylus/mixin.styl'
.mianPolicy
    width: 100%
    height: 100%
    position: fixed
    top: 0
    left: 0
    background: rgba(0,0,0,0.5)
    z-index: 99
    .policyWarp
        width: (710/$scale)
        margin: (100/$scale) auto 0 auto
        background: #fff
        border-radius: (10/$scale)
        .mainTitle
            height: (100/$scale)
            line-height: (100/$scale)
            text-align: center
            color: $color-main
            background: #AAD0ff
            font-size: (34/$scale)
            border-radius: (10/$scale) (10/$scale) 0 0
        .mainInfo
            .mainInfoUl
                .mainInfoLi
                    list-style: none
                    font-size: (30/$scale)
                    height: (100/$scale)
                    line-height: (100/$scale)
                    border-bottom: 1px solid #dcdcdc
                    padding: 0 (40/$scale) 0 (30/$scale)
                    display: flex
                    justify-content: space-between
                    .spanLeft
                        color: $color-a-left
                    .spanRight
                        color: $color-a-right
                        .ico
                            margin-left: (20/$scale)
                            color: $color-theme-placeholder
                        input
                            text-align: right
        .btnGrounp
            display: flex
            justify-content: space-evenly
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
</style>