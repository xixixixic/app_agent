<template>
  <div class="loading" v-show="showFlag">
    <div class="loading-img"></div>
    <div class="text">正在努力的加载中...</div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        showFlag: true
      }
    },
    methods: {
      show () {
        this.showFlag = true
      },
      hide () {
        this.showFlag = false
      }
    }
  }
</script>
<style lang="stylus"  scoped>
  @import '~common/stylus/variable.styl'
  .loading
    position fixed
    left 50%
    top 50%
    transform translate3d(-50%, -50%, 0)
    .loading-img
      margin: 0 auto
      width: (50/$scale)
      height: (50/$scale)
      background-image: url('loading@2x.gif')
      background-size: (50/$scale) (50/$scale)
      background-repeat: no-repeat
      background-position: center center
    .text
      margin-top (10/$scale)
      text-align: center
      font-size: (24/$scale)
      color: #333333
</style>