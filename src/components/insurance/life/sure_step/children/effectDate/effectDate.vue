<template>
    <div class="effectDate">
        <div class="left"><span class="text">生效日期</span></div>
        <div class="right"><span class="text">{{effectDate}}</span></div>
    </div>
</template>
<script>
    export default {
        props: {
            effectDate: {
                type: String,
                default: ''
            }
        }
    }
</script>
<style scoped lang="stylus">
    @import '~common/stylus/variable.styl'
    .effectDate
        padding: 0 (30/$scale)
        background-color: #ffffff
        display: flex
        .left
            // display: inline-block
            width: (180/$scale)    
            .text
                vertical-align: top
                line-height: (100/$scale)    
                font-size: (30/$scale)
                font-weight: bold
                color: rgb(68,68,68)
        .right
            // display: inline-block
            width: (525/$scale)
            .text
                vertical-align: top
                line-height: (100/$scale)    
                font-size: (28/$scale)
                color: rgb(51,51,51)
</style>