<template>
    <div class="yue" v-show='showFlag'>
        <div class="yueWarp">
            <h3 class="title">
                用户余额
            </h3>
            <div class="content">
                <p class='detail'>可用金额 <span class='price'>{{yueValue}}元</span></p>
                <p class='detail'>用于支付 <input type="text" v-model='yuePay' class='write' v-on:input='changMoney' :placeholder='placeholder'>元</p>
                <p class='detail'>还需支付 <span class='price'>{{needPay}}元</span></p>
                <div class="btnGrounp">
                    <div class="cancle btn" @click="cancleBtn">
                        取消
                    </div>
                    <div class="sure btn" @click='sure'>
                        确定
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
export default {
    props: {
        yueValue: {
            type: String,
            default: ''
        },
        realPay: {
            type: String,
            default: ''
        }
    },
    computed: {
            ...mapGetters([
                'lifePolicy'
            ])
    },
    created () {
        // this.yuePay = this.lifePolicy.yuePay
    },
    data () {
        return {
            yuePay: '',
            shouldPay: this.realPay,
            showFlag: false,
            placeholder: '',
            needPay: this.realPay
        }
    },
    methods: {
        ...mapMutations({
                setLifePolicy: 'SET_LIFE_POLICYINFO'
            }),
        cancleBtn () {
            this.showFlag = false
        },
        changMoney () {
            if (Number(this.yuePay) >= Number(this.yueValue) || Number(this.yuePay) < 0 || Number(this.yuePay) > this.realPay) {
                this.placeholder = '请输入正确的金额'
                this.yuePay = ''
                this.needPay = Number(this.realPay)
            } else {
                this.placeholder = ''
                if (this.yuePay === '') {
                    this.needPay = Number(this.realPay)
                } else {
                    this.needPay = Number(this.realPay) - Number(this.yuePay)
                }
            }
        },
        sure () {
            this.showFlag = false
            this.$emit('newNodeEvent', {yuePay: this.yuePay, needPay: this.needPay})
        }
    }
}
</script>

<style scoped lang="stylus">
@import '~common/stylus/mixin.styl'
.yue
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 998
    background-color: rgba(0,0,0, 0.5)
    .yueWarp
        width: (650/$scale)
        font-size: (32/$scale)
        margin: (200/$scale) auto 0 auto
        .title
            width: 100%
            height: (90/$scale)
            line-height: (90/$scale)
            text-align: center
            background: #FFDCD7
            color: #222
            border-top-right-radius: (16/$scale)
            border-top-left-radius: (16/$scale)
        .content
            font-size: (30/$scale)
            background: #fff
            padding-top: (60/$scale)
            border-bottom-right-radius: (16/$scale)
            border-bottom-left-radius: (16/$scale)
            .detail
                margin-left: (90/$scale)
                &:nth-child(2)
                    margin-top: (52/$scale)
                    margin-bottom: (52/$scale)
                .price
                    color: #FF4456
                    margin-left: (30/$scale)
                .write
                    width: (260/$scale)
                    height: (80/$scale)
                    border: 1px solid #c0c0c0
                    border-radius: (10/$scale)
                    margin-right: (10/$scale)
                    margin-left: (30/$scale)
                    text-indent: (10/$scale)
            .btnGrounp
                display: flex
                justify-content: center
                margin-top: (90/$scale)
                padding-bottom: (60/$scale)
                .btn
                    width: (200/$scale)
                    height: (80/$scale)
                    line-height: (80/$scale)
                    text-align: center
                    color: #fff
                    border-radius: (14/$scale)
                .cancle
                    background: #86c8ff
                .sure
                    background: #ff4456
                    margin-left: (70/$scale)

</style>