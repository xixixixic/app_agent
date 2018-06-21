<template>
    <div class="choosePolicy">
        <slider-bar :defaultSelected="defaultSelected"></slider-bar>
        <main-policy></main-policy>
        <fu-policy></fu-policy>
        <div class="footerPrice">
            <div class="price">
                首期保费：¥ {{totalPremium}}
            </div>
            <div class="netBtn" @click='next'>
                下一步
            </div>
        </div>
        <confirm  ref="confirm" :text="confirmText"></confirm>
    </div>
</template>

<script>
import {mapMutations, mapGetters} from 'vuex'
import sliderBar from 'base/sliderBar/sliderBar'
import MainPolicy from 'components/insurance/guang-da/choose-policy/child/main-policy/main-policy.vue'
import FuPolicy from 'components/insurance/guang-da/choose-policy/child/fu-policy/fu-policy.vue'
import {trailPremium} from 'api/long-life/guang-da/insurance.js'
import {RET_OK, CODE_OK} from 'service/variable.js'
import Confirm from 'base/confirm/confirm'
import {confirm} from 'common/js/mixin.js'
    export default {
        mixins: [confirm],
        data () {
            return {
                fuShow: false,
                defaultSelected: 2
            }
        },
        created () {
        },
        computed: {
            ...mapGetters([
            'guangdaPolicy',
            'guangdaMainRisk',
            'guangdaPremiumRisk',
            'guangdaRiskPolicy'
		   ]),
            totalPremium () {
                let price = this.guangdaPolicy.mainPolicy.premium
                if (this.guangdaPolicy.selectFuPolicy.length > 0) {
                this.guangdaPolicy.selectFuPolicy.map((item, index, arr) => {
                    if (item.is_bind === 1) {
                        price+=item.premium
                    } else {
                        price+=item.prem
                    }
                })
             }
             return price.toFixed(2)
            },
            totalAmount () {
                let amount = Number(this.guangdaMainRisk.amount)
                 if (this.guangdaPolicy.selectFuPolicy.length > 0) {
                    this.guangdaPolicy.selectFuPolicy.map((item, index, arr) => {
                        amount+=Number(item.amnt)
                    })
                }
                return amount
            },
            policys() {
                let list = []
                if (this.guangdaPolicy.selectFuPolicy.length > 0) {
                    this.guangdaPolicy.selectFuPolicy.map((item, index, arr) => {
                        if (item.is_bind !== 1) {
                           list.push(item)
                        }
                    })
                }
                return list
            }
        },
        methods: {
            ...mapMutations({
                SET_LONGLIFE_GUANGDA_POLICYINFO: 'SET_LONGLIFE_GUANGDA_POLICYINFO'
		    }),
            next () {
                if (this.guangdaMainRisk.amount < 5000) {
                    this.showConfirm('请检查主险信息是否填写正确')
                    return false
                } else if (this.guangdaMainRisk.getMoneyAge === 0) {
                    this.showConfirm('请检查主险信息是否填写正确')
                    return false
                } else if (this.guangdaMainRisk.premiumPeriod === '') {
                    this.showConfirm('请检查主险信息是否填写正确')
                    return false
                } else if (this.guangdaPremiumRisk.applicant.birthday !== this.guangdaPolicy.apptTempBirth || this.guangdaPremiumRisk.applicant.sex !== this.guangdaPolicy.apptTempSex || this.guangdaPremiumRisk.applicant.occupationCode !== this.guangdaPolicy.apptTempCategories) {
                    this.showConfirm('投保人信息已修改请重新选择主险')
                    return false
                } else if (this.guangdaPremiumRisk.insured.birthday !== this.guangdaPolicy.insuredTempBirth || this.guangdaPremiumRisk.insured.sex !== this.guangdaPolicy.insuredTempSex || this.guangdaPremiumRisk.insured.occupationCode !== this.guangdaPolicy.insuredTempCategories) {
                    this.showConfirm('被保人信息已修改请重新选择主险')
                    return false
                } else {
                    this.SET_LONGLIFE_GUANGDA_POLICYINFO({ // 存储保费试算祝寿金领取
                        type: 3,
                        field1: 'applicant',
                        value:  this.guangdaPremiumRisk.applicant
                    })
                    this.SET_LONGLIFE_GUANGDA_POLICYINFO({ // 存储保费试算祝寿金领取
                        type: 3,
                        field1: 'insured',
                        value:  this.guangdaPremiumRisk.insured
                    })
                    this.SET_LONGLIFE_GUANGDA_POLICYINFO({ // 存储保费试算祝寿金领取
                        type: 3,
                        field1: 'policys',
                        value:  this.policys
                    })
                    this.SET_LONGLIFE_GUANGDA_POLICYINFO({ // 存储保费试算祝寿金领取
                        type: 3,
                        field1: 'totalAmount',
                        value: this.totalAmount
                    })
                    this.SET_LONGLIFE_GUANGDA_POLICYINFO({ // 存储保费试算祝寿金领取
                        type: 3,
                        field1: 'totalPremium',
                        value:  this.totalPremium
                    })
                    // 保费试算
                    trailPremium(this.guangdaRiskPolicy).then(res=>{
                        if (res.ret === RET_OK){
                            if (res.data.code === CODE_OK) {
                                if (res.data.result.resultCode === '1') {
                                    let selectFuPolicy = this.guangdaPolicy.selectFuPolicy
                                    let str = ''
                                    for (let i = 0; i < selectFuPolicy.length; i++) {
                                        let prodCode = selectFuPolicy[i].prodCode
                                        if (prodCode === 'HCT007') {
                                            str += '2014001'
                                        }
                                        if (prodCode === 'HDT042') {
                                            str += '2013101'
                                        }
                                    }
                                    // console.log('获取节点啦啦啦')
                                    // console.log(str)
                                    this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                                        type: 4,
                                        field1: 'docType',
                                        value: str
                                    })
                                    this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                                        type: 4,
                                        field1: 'productInfo',
                                        field2: 'products',
                                        field3: 'product',
                                        value: res.data.result.resultMsg
                                    })
                                    this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                                        type: 4,
                                        field1: 'productInfo',
                                        field2: 'products',
                                        field3: 'prodCount',
                                        value: res.data.result.resultMsg.length
                                    })
                                    this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                                        type: 4,
                                        field1: 'policyInfo',
                                        field2: 'prtNo',
                                        value: res.data.result.insPolicyCode
                                    })
                                    this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                                        type: 4,
                                        field1: 'productInfo',
                                        field2: 'sumPremL',
                                        value: this.totalPremium
                                    })
                                    // 跳转完善信息页面
                                    this.$router.push({
                                        path: '/guangdaApplicant-detail'
                                    })
                                } else {
                                    this.showConfirm(res.data.result.resultMsg)
                                }
                            }
                        }
                    })
                }
            }
        },
        components: {
            sliderBar,
            MainPolicy,
            FuPolicy,
            Confirm
        }
    }
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable.styl'
@import '~common/stylus/mixin.styl'
.choosePolicy
    background: #f6f6f6
    .mainPolicy
        width: (710/$scale)
        background: #fff
        margin: (20/$scale) auto 0 auto
        border-radius: (10/$scale)
        padding-bottom: (30/$scale)
        .mainTitle
            font-size: (30/$scale)
            height: (108/$scale)
            display: flex
            align-items: center
            justify-content: space-between
            .mainTitleP
                font-weight: bold
                color: $color-main
                overflow: hidden
                .ico
                    bg-image('zhu')
                    width: (44/$scale)
                    height: (44/$scale)
                    display: inline-block
                    background-size: contain
                    margin: 0 (10/$scale) 0 (24/$scale)
                    float: left
                .policyName
                    float: left
                    width: (465/$scale)
                    height: (44/$scale)
                    display: inline-block
                    line-height: (44/$scale)
                    overflow: hidden
                    text-overflow:ellipsis
                    white-space: nowrap
                .fuPolicyName
                    float: left
                    width: (340/$scale)
                    height: (44/$scale)
                    display: inline-block
                    line-height: (44/$scale)
                    overflow: hidden
                    text-overflow:ellipsis
                    white-space: nowrap
                .fuIco
                    bg-image('fu')
                    width: (44/$scale)
                    height: (44/$scale)
                    display: inline-block
                    background-size: contain
                    margin: 0 (10/$scale) 0 (24/$scale)
                    float: left
            .mainBtn
                width: (100/$scale)
                height: (50/$scale)
                background: #fff
                border-radius: (10/$scale)
                font-size: (26/$scale)
                margin-right: (30/$scale)
                &.editBtn
                    border: 1px solid $color-theme-border
                    color: $color-theme
                &.deleteBtn
                    border: 1px solid #ff4456
                    color: #ff4456
                &.fuEditBtn
                    margin-right: (20/$scale)
        .list
            font-size: (26/$scale)
            width: (670/$scale)
            height: (90/$scale)
            display: flex
            margin: 0 auto
            border: 1px solid #e6e6e6
            &.lastList
                border-top: none
            .listTitle
                line-height: (90/$scale)
                flex: 1
                text-align: center
                border-right: 1px solid #e6e6e6
                &:last-child
                    border-right: none
    .addFupolicy
        width: (710/$scale)
        margin: 0 auto
        .addFuBtn
            width: 100%
            height: (100/$scale)
            border: none
            background: #fff
            font-size: (34/$scale)
            color: $color-theme
            outline: none
    .footerPrice
        font-size: (34/$scale)
        height: (98/$scale)
        display: flex
        justify-content: space-between
        width: 100%
        position: fixed
        bottom: 0
        left: 0
        line-height: (98/$scale)
        border-top: 1px solid #f0f0f0
        .netBtn
            width: 44%
            background: $color-theme
            color: #fff
            text-align: center
        .price
            color: #ff4456
            text-indent: (20/$scale)
            width: 56%
            background: #fff
</style>