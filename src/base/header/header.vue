<template>
    <header class="header">
      <a class="back" @click="back()">
        <i class="icon-left_arrow"></i>
      </a>   
      <p class="title">{{$route.meta.title}}</p>
      <div class="collection">
          <i class="icon-collection"></i>
      </div>
    </header>
</template>
<script>
    export default {
        props: {
            title: {
              type: String,
              default: ''
            },
            back: {
                type: Function,
                default () {
                    this.$router.go(-1)
                }
            }
        }
    }
</script>
<style lang="stylus" scoped>
    @import '~common/stylus/variable.styl'
     .header
        position: relative
        width: 100%
        height: (88/$scale)
        background: $color-background-main
        .title
            line-height: (88/$scale)
            font-size: (34/$scale)
            text-align: center
            color : #222222
        .back
            position: absolute
            left: 0
            top: 0
            padding: (20/$scale) (10/$scale) (20/$scale) (10/$scale)
            .icon-left_arrow
              display: block     
              font-size: (50/$scale)     
        .collection
            position: absolute
            right: 0
            top: 0
            padding: (20/$scale) (20/$scale) (20/$scale) (10/$scale)    
            .icon-collection
              display: block     
              font-size: (50/$scale)
              &.active
                color: $color-theme    
</style>