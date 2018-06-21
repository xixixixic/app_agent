<template>
    <div class="wrap">
        <div class="code-info border-1px">
            <span class="text">产品报备编号：<span  v-html="codeInfo.reportno"></span></span>
        </div>
        <div class="service">
            <div class="item"><i class="icon-check"></i>7*24小时</div>
            <div class="item" v-if="codeInfo.isInsure === 1"><i class="icon-check"></i>电子保单</div>
            <div class="item" v-else><i class="icon-check"></i>纸质保单</div>
            <div class="item"><i class="icon-check"></i>协助理赔</div>
        </div>
    </div>
</template>
<script>
export default {
   props: {
        codeInfo: {
            type: Object,
            default: {}
        }
   }
}
</script>
<style lang="stylus" scoped>
    @import '~common/stylus/mixin.styl'
    .wrap
        padding : 0 (30/$scale) 
        background : #fafafa
        .code-info
            display : table             
            width : 100%   
            height : (74/$scale)
            border-1px(rgb(230,230,230))       
            .text
                display : table-cell
                vertical-align : middle
                line-height : (50/$scale)
                font-size : (26/$scale)
                color : $color-main
        .service
            display : flex
            width : 100%  
            height : (74/$scale)
            line-height : (74/$scale)
            font-size : (28/$scale)
            color : #555555
            .item
                flex : 1
                .icon-check
                    display: inline-block
                    margin-right: (10/$scale)
                    margin-top: (5/$scale)
                    font-size: (28/$scale)
                    font-weight: bold
                    color: $color-theme
</style>
