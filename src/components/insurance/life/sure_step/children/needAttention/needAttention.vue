<template>
    <div>  
        <div class='need-attention' @click='showNeedAttention'>
            <span class='text'>注意事项</span>
            <span class='icon'>
                <i class='icon-right_arrow'></i>
            </span>
        </div>
    </div>
</template>
<script>
    export default {
        methods: {
            showNeedAttention () {
                this.$router.push({
                    path: '/needAttention'
                })
            }
        }
    }
</script>
<style lang='stylus' scoped>
    @import '~components/insurance/life/sure_step/children/stylus/common.styl'
</style>