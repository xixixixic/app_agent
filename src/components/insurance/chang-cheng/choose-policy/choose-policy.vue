<template>
    <div class="choosePolicy">
        <div v-if='!loadingShow'>
            <slider-bar :defaultSelected='defaultSelected'></slider-bar>
            <split></split>
            <main-policy :mainPolicyInfo='mainPolicyInfo'></main-policy>
            <fu-policy></fu-policy>
            <div class="footerPrice">
                <div class="price">
                    首期保费：¥ {{firstPrice}}
                </div>
                <div class="netBtn" @click='next'>
                    下一步
                </div>
            </div>
        </div>
        <loading v-if='loadingShow'></loading>
        <confirm  ref="confirm" :text="confirmText"></confirm>
    </div>
</template>

<script>
import {mapMutations, mapGetters} from 'vuex'
import Split from 'base/split/split'
import sliderBar from 'base/sliderBar/sliderBar'
import MainPolicy from 'components/insurance/chang-cheng/choose-policy/child/main-policy/main-policy.vue'
import FuPolicy from 'components/insurance/chang-cheng/choose-policy/child/fu-policy/fu-policy.vue'
import {initPolicy, initBaseInfoAll, initBankInfo} from 'api/long-life/chang-cheng/insurance.js'
import {RET_OK, CODE_OK} from 'service/variable.js'
import Confirm from 'base/confirm/confirm'
import {confirm} from 'common/js/mixin.js'
import Loading from 'base/loading/loading'
    export default {
        mixins: [confirm],
        data () {
            return {
                fuShow: false,
                confirmText: '',
                defaultMainData: {}, // 设置主险默认数据
                loadingShow: false
            }
        },
        created () {
            this.setDefault()
        },
        computed: {
            mainPolicyInfo () { // 设置主险数据
                return this.defaultMainData
            },
            defaultSelected () {
                return 2
            },
            ...mapGetters([
                'changChengPolicyInfo', 'changChengBaseInfo'
            ]),
            firstPrice () {
                let arr = []
                let first = this.changChengPolicyInfo.mainPolicy.premium
                for (let i in this.changChengPolicyInfo.fuPolicy) {
                    arr.push(this.changChengPolicyInfo.fuPolicy[i].premium)
                    first += Number(arr[i])
                }
                return first
            }
        },
        methods: {
            setDefault () {
                console.log('outer this.changChengPolicyInfo.mainPolicy.premium')
                console.log(this.changChengPolicyInfo.mainPolicy.premium)
                console.log(typeof this.changChengPolicyInfo.mainPolicy.premium)
                if (this.changChengPolicyInfo.mainPolicy.premium === '') {
                    console.log('这里 this.changChengPolicyInfo.mainPolicy.premium')
                    console.log(this.changChengPolicyInfo.minPremium)
                    this.setChangChengPolicyInfo({
							field1: 'mainPolicy',
							field2: 'premium',
							value: this.changChengPolicyInfo.minPremium
						})
                }
                if (this.changChengPolicyInfo.mainPolicy.amount === '') {
                    this.setChangChengPolicyInfo({
							field1: 'mainPolicy',
							field2: 'amount',
							value: this.changChengPolicyInfo.minMoney
						})
                }
                let params = {
                    productInfo: {
                        productId: this.changChengBaseInfo.productId.toString()
                    },
                    insuredBaseInfo: this.changChengBaseInfo.insured
                }
                initPolicy(params).then(res => {
                    if (res.ret === RET_OK) {
                        if (res.data.code === CODE_OK) {
                            this.defaultMainData = res.data
                        } else {
                            this.showConfirm(res.data.remarkMsg)
                        }
                    }
                })
            },
            next () {
                if (this.firstPrice === '0' || this.firstPrice === 0) {
                    this.showConfirm('请选择保险')
                } else {
                    this.loadingShow = true
                    initBaseInfoAll().then(res => {
                        if (res.ret === RET_OK) {
                            if (res.data.code === CODE_OK) {
                                this.baseInfoDefault = res.data
                                this.setChangChengBaseInfo({
                                    field1: 'init',
                                    value: res.data
                                })
                                initBankInfo().then(res => {
                                    if (res.ret === RET_OK) {
                                        if (res.data.code === CODE_OK) {
                                            this.loadingShow = false
                                            this.setChangChengBankDetail({
                                                field1: 'init',
                                                value: res.data
                                            })
                                            console.log(this.changChengBaseInfo)
                                            if (this.changChengBaseInfo.insured.relaToAppntCode === '00') {
                                                this.$router.push({
                                                    name: 'perfect-insured-info'
                                                })
                                            } else {
                                                this.$router.push({
                                                    name: 'perfect-applicant-info'
                                                })
                                            }
                                            // this.$router.push({
                                            //     name: 'perfect-applicant-info'
                                            // })
                                        } else {
                                            this.loadingShow = false
                                            this.showConfirm(res.data.remarkMsg)
                                        }
                                    } else {
                                        this.loadingShow = false
                                        this.showConfirm(res.data.remarkMsg)
                                    }
                                })
                            } else {
                                this.loadingShow = false
                                this.showConfirm(res.data.remarkMsg)
                            }
                        } else {
                            this.loadingShow = false
                            this.showConfirm(res.data.remarkMsg)
                        }
                    })
                }
            },
            ...mapMutations({
                setChangChengBaseInfo: 'SET_LONGLIFE_CHANGCHENG_BASEINFO',
                setChangChengBankDetail: 'SET_LONGLIFE_CHANGCHENG_BANKDETAIL',
                setChangChengPolicyInfo: 'SET_LONGLIFE_CHANGCHENG_POLICYINFO'
            })
        },
        components: {
            MainPolicy,
            FuPolicy,
            Confirm,
            Loading,
            Split,
		    sliderBar
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