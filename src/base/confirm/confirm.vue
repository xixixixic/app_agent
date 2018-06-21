<template>
    <transition name="confirm-fade">
        <div class="confirm" v-show="showFlag" @click.stop>
            <div class="confirm-wrapper">
                <div class="confirm-content">
                    <div class="title">提示信息</div>
                    <p class="text">{{text}}</p>
                    <div class="operate">
                        <div @click="cancel" class="operate-btn left">{{cancelBtnText}}</div>
                        <div @click="confirm(urlparam)" class="operate-btn right">{{confirmBtnText}}</div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import {mapMutations, mapGetters} from 'vuex'
  export default {
    props: {
        text: {
            type: String,
            default: ''
        },
        confirmBtnText: {
            type: String,
            default: '确定'
        },
        cancelBtnText: {
            type: String,
            default: '取消'
        },
        urlparam: {
            type: String,
            default: ''
        },
        clearFlag: {
            type: String,
            default: ''
        }
    },
    computed: {
           ...mapGetters([
               'tianCarPremium'
          ])
        },
    data () {
        return {
            showFlag: false
        }
    },
    methods: {
        ...mapMutations({
                setTianCarPremium: 'SET_CAR_TIANAN_PREMIUM'
            }),
        show () {
            this.showFlag = true
        },
        hide () {
            this.showFlag = false
        },
        cancel () {
            if (this.urlparam === '100003') {
               this.goIndex()
            } else {
                this.hide()
                this.$emit('cancel')
            }
        },
        confirm () {
            if (this.urlparam === '100003') {
               this.goIndex()
            } else {
                this.$emit('confirm')
                this.hide()
            }

            if (this.clearFlag === '2') {
                this.setTianCarPremium({
                    field1: 'policy',
                    field2: 'checkCode',
                    value: ''
                })
            }
        },
        goIndex () {
            let host = window.location.host
			if (host === 'www.jimuwang.com.cn') {
				window.location.href = 'http://www.jimuwang.com.cn/wx_agent/#/index'
			} else if (host === 'test.kakabx.com') {
			window.location.href = 'http://test.kakabx.com/wx_agent/#/index'
			} else {
				window.location.href = 'http://localhost:8077/#/index'
			}
        }
    }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
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
            background: $color-background-main
            .title
                height: (90/$scale)
                line-height: (90/$scale)
                text-align: center
                font-size: (32/$scale)
                border-top-left-radius: (20/$scale)
                border-top-right-radius: (20/$scale)
                background: rgb(246,246,246)
                color: $color-main
            .text
                padding: (45/$scale) (0/$scale) (45/$scale) (20/$scale)
                line-height: (42/$scale)            
                text-indent: 2em
                font-size: (28/$scale)
            .operate
                display: flex
                align-items: center
                text-align: center
                font-size: (30/$scale)
                .operate-btn
                    flex: 1
                    line-height: (90/$scale)
                    border-top: (1/$scale) solid #e6e6e6
                    color: #999999
                    &.left
                        border-right: (1/$scale) solid #e6e6e6
                    &.right
                        color: $color-theme
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