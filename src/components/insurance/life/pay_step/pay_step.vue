<template>
    <div>
        <div class="container">
            <div class="order-price">
                <div class="item">
                    <div class="left">
                        <span class="text">订单总额</span>
                    </div>
                    <div class="right">
                        <span class="text">¥{{totalPrice}}</span>
                    </div>
                </div>
                <!-- <div class="item">
                    <div class="left">
                        <span class="text">实付款</span>
                    </div>
                    <div class="right">
                        <span class="text actual-price">¥{{realPay}}</span>
                    </div>
                </div> -->
            </div> 
            <split></split>
            <!-- <div class="preferential-choice">
                <div class="title">
                    优惠选择（以下不计算服务费）
                </div>
                <div class="list">
                    <div class="item">
                        <div class="left">
                            <span class="text">活动优惠券</span>
                            <span class="num">（10）</span>
                        </div>
                        <div class="right">
                            <span class="text">未使用</span>
                            <i class="icon-back"></i>
                        </div>
                    </div>
                    <div class="item">
                        <div class="left">
                            <span class="text">积分抵扣</span>
                            <span class="num">（10）</span>
                        </div>
                        <div class="right">
                            <span class="text">未使用</span>
                            <i class="icon-back"></i>
                        </div>
                    </div>
                </div>
            </div>
            <split></split> -->
            <div class="pay-way">
                <div class="title">
                    <div class="text">支付方式</div>
                    <div class="rest">还需支付<span class="money">¥{{realPay}}</span></div>
                </div>
                <div class="list">
                    <div class="item" @click="kuaiqian_pay">
                        <div class="left">
                            <i class="icon icon-kuaiqian"></i><span class="text">快钱支付</span>
                        </div>
                        <div class="right">
                            <i class="icon-back"></i>
                        </div>
                    </div>
                    <div class="item" @click="weixin_pay">
                        <div class="left">
                            <i class="icon icon-weixin"></i><span class="text">微信支付</span>
                        </div>
                        <div class="right">
                            <i class="icon-back"></i>
                        </div>
                    </div>
                    <div class="item" @click="yue_pay" v-show='this.webStatus'>
                        <div class="left">
                            <i class="icon icon-yu-e"></i><span class="text">余额支付</span>
                        </div>
                        <div class="right">
                            <i class="icon-back"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div v-show='this.webStatus'>
                <div class="yuePayBtn" v-if='yuePayStatus' @click='queryYuePay()'>
                    确认支付
                </div>
                <div class="yuePayGreyBtn" @click='queryYuePayGrey()' v-else>
                    余额支付
                </div>
            </div>
        </div>
        <yue ref='yue' :yueValue='yueValue' :realPay='realPay' @newNodeEvent='passParams'></yue>
        <confirm  ref="confirm" :text="confirmText"></confirm>
    </div>
</template>
<script>
    import Split from 'base/split/split'
    import Yue from 'components/insurance/life/pay_step/children/yue'
    import {kuaiqianPay, weiXinPay} from 'api/life/pay.js'
    import {yue, yuePayRequest} from 'api/life/insurance.js'
    import {mapGetters} from 'vuex'
    import {CODE_OK} from 'service/variable.js'
    import Confirm from 'base/confirm/confirm'
	import {confirm} from 'common/js/mixin.js'
    export default {
        mixins: [confirm],
        computed: {
            ...mapGetters([
                'lifePolicy',
                'lifeInsuranceRules',
                'webStatus'
            ]),
            totalPrice () {
                return this.$route.query.totalPrice
            },
            // realPay () {
            //     return this.$route.query.totalPrice.toString()
            // },
            yueValue () {
                return this.customerYue
            },
            policyId () {
                return this.$route.query.policyId
            },
            supplierPayType () {
                if (this.payType === '1') {
                    return JSON.parse(this.lifeInsuranceRules.supplierPayType).supplierPayType[0].mobile
                }
            },
            payType () {
                return this.lifeInsuranceRules === undefined ? this.$route.query.payType : this.lifeInsuranceRules.payType
            }
        },
        data () {
            return {
                customerYue: '',
                yuePayStatus: false,
                realPay: this.$route.query.totalPrice.toString(),
                mixNeedPay: 0,
                btnStatus: true
            }
        },
        methods: {
            // 快钱支付
            kuaiqian_pay () {
                console.log(this.mixNeedPay + '块钱')
                kuaiqianPay(this.policyId, this.mixNeedPay)
            },
            // 微信支付
            weixin_pay () {
                console.log(this.mixNeedPay + '微信')
                weiXinPay(this.policyId, this.mixNeedPay)
            },
            yue_pay () {
                yue().then(res => {
                    if (res.data.code === CODE_OK) {
                        this.customerYue = res.data.agentCommission.AvailableMoney.toString()
                        this.$refs.yue.showFlag = true
                    } else {
                        this.showConfirm(res.result.msg)
                    }
                })
            },
            queryYuePayGrey () {
                // this.showConfirm('请勿重复付款')
                console.log('grey')
            },
            passParams (data) {
                console.log(data)
                console.log(data.needPay)
                console.log('uuttt')
                this.mixNeedPay = data.yuePay
                console.log(this.$route.query.totalPrice + 'total')
                console.log(this.realPay)
                if (data.needPay === 0) {
                    this.yuePayStatus = true
                } else {
                    this.yuePayStatus = false
                }
            },
            queryYuePay () {
                this.yuePayStatus = false
                yuePayRequest(this.policyId, this.realPay).then(res => {
                    if (res.result.resultCode === 1) {
                        this.$router.push({
                            path: 'success_pay',
                            query: {
                                policyid: res.result.policyId
                            }
                        })
                    } else {
                        this.showConfirm(res.result.msg)
                    }
                })
            }
        },
        components: {
            Split,
            Yue,
            Confirm
        }
    }
</script>
<style lang="stylus" scoped>
    @import '~common/stylus/mixin.styl'
    @import '~common/stylus/variable.styl'
    .order-price
        background-color: #ffffff
        .item
            display: flex
            margin: 0 (30/$scale)
            border-bottom: (2/$scale) solid #e6e6e6
            .left
                display block
                vertical-align top
                .text
                    line-height: (100/$scale)
                    font-size: (30/$scale)
                    color: rgb(68,68,68)
            .right
                display block
                flex: 1
                text-align: right
                vertical-align top
                .text
                    font-size: (30/$scale)
                    color: rgb(68,68,68)
                .actual-price
                    color: $color-theme
            &:last-child
                border-bottom: none
    .preferential-choice
        background-color: #ffffff
        .title
            padding: 0 (30/$scale)
            line-height: (100/$scale)
            font-size: (30/$scale)
            border-bottom: (2/$scale) solid #e6e6e6
            color: #888888
        .list
            margin: 0 (30/$scale)
            .item
                display: flex
                border-bottom: (2/$scale) solid #e6e6e6
                .left
                    line-height: (100/$scale)
                    font-size: 0
                    .text
                        display: inline-block
                        vertical-align: top
                        font-size: (30/$scale)
                        color: rgb(136,136,136)
                    .num
                       display: inline-block 
                       vertical-align: top
                       font-size: (30/$scale)
                       color: $color-theme
                .right
                    flex: 1
                    font-size: 0
                    text-align: right
                    .text
                        display: inline-block
                        vertical-align: top
                        line-height: (100/$scale)
                        font-size: (30/$scale)
                        color: #888888
                    .icon-back
                        display: inline-block
                        vertical-align: top
                        margin-top: (25/$scale)
                        transform: rotate(180deg)
                        font-size: (45/$scale)
                        color: #888888
                &:last-child
                    border-bottom: none
    .pay-way
        background-color: #ffffff
        .title
            display: flex
            padding: 0 (30/$scale)
            line-height: (100/$scale)
            font-size: (30/$scale)
            border-bottom: (2/$scale) solid #e6e6e6
            color: #888888
            .rest
                flex: 1
                text-align: right
                .money
                    margin-left: (10/$scale)
                    color: $color-theme
        .list
            margin-left: (30/$scale)
            .item
                display: flex
                border-bottom: (2/$scale) solid #e6e6e6
                .left
                    font-size: 0
                    .icon
                        display: inline-block
                        margin-top: (20/$scale)
                        width: (60/$scale)
                        height: (60/$scale)
                        background-repeat: no-repeat
                        background-size: (60/$scale) (60/$scale)
                        background-position: center center
                    .icon-yu-e
                        bg-image('yu_e')
                    .icon-weixin
                        bg-image('weixin')  
                    .icon-kuaiqian
                        bg-image('kuaiqian')
                    .icon-zhifubao
                        bg-image('zhifubao')
                    .text
                        display: inline-block
                        vertical-align: top
                        margin-top: (37/$scale)
                        margin-left: (30/$scale)
                        font-size: (30/$scale)
                        color: rgb(136,136,136)
                .right
                    flex: 1
                    text-align: right
                    .icon-back
                        display: inline-block
                        vertical-align: top
                        margin-top: (25/$scale)
                        transform: rotate(180deg)
                        font-size: (45/$scale)
                        color: #888888
                &:last-child
                    border-bottom: none
    .yuePayBtn
        position : fixed
        left : 0
        bottom : 0
        width: 100%
        height: (98/$scale)
        line-height: (98/$scale)
        text-align : center
        font-size: (34/$scale)
        color : $color-btn
        background: $color-background-btn
    .yuePayGreyBtn
        position : fixed
        left : 0
        bottom : 0
        width: 100%
        height: (98/$scale)
        line-height: (98/$scale)
        text-align : center
        font-size: (34/$scale)
        color : $color-btn
        background: #ccc
</style>