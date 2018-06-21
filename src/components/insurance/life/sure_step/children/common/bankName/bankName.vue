<template>
    <div class="item">
        <div class="inner">
            <div class="left">
                <span class="text">开户银行</span>
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
            client: {
                type: String,
                default: ''
            },
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