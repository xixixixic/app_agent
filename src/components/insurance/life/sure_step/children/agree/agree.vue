<template>
    <div class="agree-declaration" @click="ifAgree">
        <div class="icon">
            <i class="icon-no_check" :class="agreeClass"></i>
        </div>
        <div class="text">我已阅读并接受投保声明全部内容</div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                selected: false
            }
        },
        computed: {
            agreeClass () {
                if (this.selected === false) {
                    return 'icon-no_check'
                } else {
                    return 'icon-check'
                }
            }
        },
        methods: {
            ifAgree () {
                this.selected = !this.selected
            }
        }
    }
</script>
<style lang="stylus" scoped>
    @import '~common/stylus/variable.styl'
    .agree-declaration
        padding: (34/$scale) (30/$scale) (32/$scale)
        font-size: 0
        .icon
            display: inline-block
            vertical-align: top
            margin-top: (3/$scale)
            .icon-check, .icon-no_check
                font-size: (34/$scale)
                color: $color-theme
        .text
            display: inline-block
            vertical-align: top
            margin-left: (10/$scale)
            line-height: (36/$scale)
            font-size: (28/$scale)
            color: rgb(102,102,102)
</style>