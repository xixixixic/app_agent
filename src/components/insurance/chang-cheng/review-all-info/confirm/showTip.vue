<template>
    <transition name="confirm-fade">
        <div class="confirm" v-show="showFlag" @click.stop>
            <div class="confirm-wrapper">
                <div class="confirm-content">
                    <div class="title">{{title}}</div>
                    <p class="text">{{text}}。</p>
                    <p class="djs">{{time}}s</p>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
  export default {
    props: {
        confirmBtnText: {
            type: String,
            default: '确定'
        }
    },
    data () {
        return {
            showFlag: true,
            text: '支付成功，请耐心等待审核。页面即将关闭。',
            time: '5',
            title: '友情提示'
        }
    },
    created () {
        this.indexSystems()
    },
    methods: {
        indexSystems () {
            if (this.$route.params.status === false) {
                this.text = this.$route.params.msg
            }
            let that = this
            var readSec = setInterval(function () {
                 that.time = --that.time
                if (that.time === 0) {
                    clearInterval(readSec)
                    that.time = 0
                    WeixinJSBridge.call('closeWindow')
                }
            }, 1000)
        }
    }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin"
  @import "~common/stylus/variable"

  .confirm
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 998
    background-color: rgba(0,0,0, 0.5)
    &.confirm-fade-enter-active
      animation: confirm-fadein 0.3s
      .confirm-content
        animation: confirm-zoom 0.3s
    .confirm-wrapper
        position: absolute
        top: 50%
        left: 50%
        transform: translate(-50%, -50%)
        z-index: 999
        .confirm-content
            width: (600/$scale)
            border-radius: (20/$scale)
            background: #ffffff
            .title
                height: (90/$scale)
                line-height: (90/$scale)
                text-align: center
                font-size: (32/$scale)
                border-top-left-radius: (20/$scale)
                border-top-right-radius: (20/$scale)
                background: rgb(170,208,255)
                color: $color-main
            .text
                padding: (45/$scale) (10/$scale) 0 (10/$scale)
                line-height: (42/$scale)            
                text-indent: 2em
                font-size: (28/$scale)
            .djs
                font-size: (30/$scale)
                text-align: center
                padding-bottom: (30/$scale)
                color: #ff4456
            .operate
                display: flex
                align-items: center
                justify-content: center
                text-align: center
                padding-bottom (40/$scale)
                font-size: (30/$scale)
                .operate-btn
                    width (218/$scale)
                    height (88/$scale)
                    line-height (78/$scale)
                    text-align center
                    background-size @width @height
                    background-repeat no-repeat
                    color #ffffff
                    &.left
                        bg-image('lightBlue')
                    &.right
                        margin-left (50/$scale)
                        bg-image('blue')
  @keyframes confirm-fadein
    0%
      opacity: 0
    100%
      opacity: 1

  @keyframes confirm-zoom
    0%
      transform: scale(0)
    50%
      transform: scale(1.1)
    100%
      transform: scale(1)
</style>