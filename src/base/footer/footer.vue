<template>
    <footer class="footer" @click="next">{{text}}</footer>
</template>
<script>
    export default {
        props: {
            text: {
                type: String,
                default: '下一步'
            }
        },
        methods: {
            next () {
                this.$emit('next')
            }
        }
    }
</script>
<style lang="stylus" scoped>
     @import '~common/stylus/variable.styl'
    .footer
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
</style>