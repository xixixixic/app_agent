<template>
    <div class="riskContainer">
        <div class="main-risk" v-for="item in policyViceExtList" v-show="item.masterStat === 1">
            <div class="inner">
                <div class="title">
                    <h1 class="text">{{item.productNew.shortName}}</h1>
                    <span class="icon"></span>
                </div>
                <div class="content">
                    <div class="item">
                        <dl class="option">
                            <dt class="i_top">保险期限</dt>
                            <dd class="i_bottom">{{item.insuranceRate.coverPeriodStr}}</dd>
                        </dl>
                    </div>
                    <div class="item">
                        <dl class="option">
                            <dt class="i_top">缴费期限</dt>
                            <dd class="i_bottom">{{item.insuranceRate.premiumPeriodStr}}</dd>
                        </dl>
                    </div>
                    <div class="item">
                        <dl class="option">
                            <dt class="i_top">保额</dt>
                            <dd class="i_bottom">¥{{item.amount}}</dd>
                        </dl>
                    </div>
                    <div class="item">
                        <dl class="option">
                            <dt class="i_top">首期保费</dt>
                            <dd class="i_bottom price">¥{{item.insuranceRate.premium}}</dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
        <!-- <split v-show="masterStat !== 1"></split> -->
        <div class="total-price">
            共计：<span class="text">¥{{totalPrice}}</span>
        </div>
    </div>
</template>
<script>
    import Split from 'base/split/split'
    export default {
        props: {
            policyViceExtList: {
                type: Array,
                default: []
            }
        },
        computed: {
            totalPrice () {
                let total = 0
                for (let i = 0; i < this.policyViceExtList.length; i++) {
                    total += this.policyViceExtList[i].premium
                }
                console.log(this.policyViceExtList)
                return total
            }
        },
        components: {
            Split
        }
    }
</script>
<style scoped lang="stylus">
    @import '~common/stylus/mixin.styl'
    .riskContainer
        width: 100%
        .main-risk
            background-color: #ffffff
            .inner
                margin: 0 (30/$scale)
            .title
                font-size: 0
                border-bottom: (2/$scale) solid #e6e6e6
                .text
                    display: inline-block
                    vertical-align: top
                    line-height: (90/$scale)
                    font-size: (30/$scale)
                    color: #222222
                .icon
                    display: inline-block
                    vertical-align: top
                    margin-top: (10/$scale)
                    margin-left: (14/$scale)
                    width: (64/$scale)
                    height: (64/$scale)
                    bg-image('main_risk_icon')
                    background-size: (44/$scale) (44/$scale)
                    background-repeat: no-repeat
                    background-position: center center
            .content
                display: flex
                .item
                    flex: 1
                    .option
                        padding: (28/$scale) 0
                        text-align: center
                        .i_top
                            font-size: (28/$scale)
                            color: rgb(153,153,153)
                        .i_bottom
                            margin-top: (26/$scale)
                            font-size: (28/$scale)
                            color: rgb(85,85,85)
                        .price
                            color: $color-theme
        .additonal-risk
            background-color: #ffffff
            .inner
                margin: 0 (30/$scale)
            .title
                font-size: 0
                border-bottom: (2/$scale) solid #e6e6e6
                .text
                    display: inline-block
                    vertical-align: top
                    line-height: (90/$scale)
                    font-size: (30/$scale)
                    color: #222222
                .icon
                    display: inline-block
                    vertical-align: top
                    margin-top: (10/$scale)
                    margin-left: (14/$scale)
                    width: (64/$scale)
                    height: (64/$scale)
                    bg-image('additional_risk_icon')
                    background-size: (44/$scale) (44/$scale)
                    background-repeat: no-repeat
                    background-position: center center
            .content
                display: flex
                border-bottom: (2/$scale) solid #e6e6e6
                .item
                    flex: 1
                    .option
                        padding: (28/$scale) 0
                        text-align: center
                        .i_top
                            font-size: (28/$scale)
                            color: rgb(153,153,153)
                        .i_bottom
                            margin-top: (26/$scale)
                            font-size: (28/$scale)
                            color: rgb(85,85,85)
                        .price
                            color: $color-theme
        .total-price
            padding: 0 (30/$scale)
            height: (90/$scale)
            line-height: @height
            text-align: right
            font-size: (28/$scale)
            color: #222222
            background-color: #ffffff
            .text
                font-weight: bold
                color: $color-theme
</style>