<template>
    <div class="item">
        <div class="inner">
            <div class="left">
                <span class="text">与投保人关系</span>
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