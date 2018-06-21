<template>
    <transition name="confirm-fade">
        <div class="confirm">
            <div class="confirm-wrapper">
                <div class="confirm-content">
                    <div class="title">{{title}}</div>
                    <p class="text">{{text}}</p>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
  export default {
    data () {
        return {
            title: '友情提示',
            text: '链接已失效,  请代理人重新分享一次'
        }
    }
}
</script>

<style lang='stylus' scoped>
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
                padding: (45/$scale) (10/$scale)
                line-height: (42/$scale)            
                text-indent: 2em
                font-size: (28/$scale)
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
                    &.right
                        margin-left (50/$scale)
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