<template>
    <div class="item">
        <div class="inner">
            <div class="left">
                <span class="text">性别</span>
            </div>
            <div class="right">
                <span class="text">{{sex}}</span>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            content: {
                type: String,
                default: ''
            }
        },
        computed: {
            sex () {
                return this.content === '1' ? '男' : '女'
            }
        }
    }
</script>
<style scoped lang="stylus">
    @import '~components/insurance/life/sure_step/children/stylus/common.styl'
</style>