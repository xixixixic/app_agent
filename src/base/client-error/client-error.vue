<template>
    <div>
        <div class="content">
            <div class="rocket"></div>
            <div class="desc">
                <h1 class="sorry">SORRY</h1>
                <p class="text">{{this.$route.query.msg}}</p>
            </div>
            <div class="btn" @click="$router.go('-1')">返回上一步</div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
    @import '~common/stylus/mixin.styl'
    .content
        display flex
        flex-direction column
        align-items center
        justify-content center
        .rocket
            width (565/$scale)
            height (404/$scale)
            bg-image('rocket')
            background-size @width @height 
            background-repeat no-repeat
        .desc
            margin-top (100/$scale)
            text-align center
            color #444444
            .sorry
                font-size (44/$scale)                
            .text
                margin-top (40/$scale)
                line-height (60/$scale)
                font-size (34/$scale)
        .btn
            btn((100/$scale), (480/$scale), (90/$scale), $color-theme, (34/$scale), #ffffff, (50/$scale))
</style>
