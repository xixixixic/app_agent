<template>
    <div class="item">
        <div class="inner effectDate">
            <div class="left"><span class="text">生效日期</span></div>
            <div class="right"><span class="text">{{effectDate}}</span></div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            effectDate: {
                type: String
            }
        }
    }
</script>
<style lang="stylus"  scoped>
     @import '~components/insurance/first_step/children/common/stylus/common.styl'
</style>