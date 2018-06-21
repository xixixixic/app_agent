<template>
    <div class="title">
        <div class="inner">
            <i  class="text-icon" :class="{'heart-icon':state === 0 ,'money-icon':state === 1 }"></i>
            <div class="text">{{title}}</div>
            <i @click="toggeleInfo" :class="iconDownClass"></i>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            title: {
                type: String,
                default: ''
            },
            state: {
                type: Number,
                default: 0
            },
            showhealthTold: {
                type: Boolean,
                default: true
            },
            showmoneyTold: {
                type: Boolean,
                default: true
            }
        },
        computed: {
            iconDownClass () {
                if (this.state === 0) {
                    if (!this.showhealthTold) return 'icon-circle_down'
                     else return 'icon-circle_up'
                } else if (this.state === 1) {
                    if (!this.showmoneyTold) return 'icon-circle_down'
                     else return 'icon-circle_up'
                }
            }
        },
        methods: {
            toggeleInfo () {
                if (this.state === 0) {
                    this.$emit('clickhealthTold')
                } else if (this.state === 1) {
                    this.$emit('clickmoneyTold')
                }
            }
        }
    }
</script>
<style scoped lang="stylus">
    @import '~common/stylus/variable.styl'
    @import '~common/stylus/mixin.styl'
    .title
        padding: 0 (20/$scale)
        border-bottom: (1/$scale) solid #E6E6E6
        .inner
            display: flex
            .text-icon
                display inline-block
                height (40/$scale)
                width (40/$scale)
                bg-image('heart')
                background-size cover
                margin (20/$scale)  (20/$scale)  (20/$scale) 0
                border-radius (20/$scale)
            .heart-icon
                bg-image('heart')
            .money-icon
                bg-image('money')
            .text
                line-height: (90/$scale)
                font-weight: normal
                font-size: (30/$scale)
                color: rgb(51,51,51)
            .icon-circle_up, .icon-circle_down
                flex: 1
                line-height: (100/$scale)
                font-size: (40/$scale)
                text-align: right
                color: $color-theme
</style>