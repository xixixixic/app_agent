<template>
    <div class="item">
        <div class="inner">
            <div class="left">
                <span class="text">年固定收入(万元)</span>
            </div>
            <div class="right">
                <span class="text">{{content}}</span>
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
        }
    }
</script>
<style scoped lang="stylus">
    @import '~components/insurance/life/sure_step/children/stylus/common.styl'
</style>