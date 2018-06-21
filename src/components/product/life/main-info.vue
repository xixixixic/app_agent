<template>
    <div class="main-info">
        <div class="img-box">
            <img class="img" :src="mainInfo.imgurl"/>
        </div>
        <div class="information">
            <div class="box">
                 <div class="name">{{mainInfo.productName}}</div>
                 <div class="logo"><img :src="'./static/image/companyLogo/bx' + mainInfo.supplierId + '.png'" class="img"/></div>
            </div>
            <div class="price" v-if='this.rateInfo.productLifeRisks[0].processType !== 1'>¥{{rateInfo.premium}}</div>
            <div class="fit-pepole">适用人群：{{mainInfo.occupationDetails}}</div>        
        </div>
    </div>
</template>
<script>
export default {
    props: {
        mainInfo: {
            type: Object,
            default: {}
        },
        rateInfo: {
            type: Object,
            default: {}
        }
    },
    computed: {
       
    },
    created () {
        // console.log(this.rateInfo)
        // console.log('this.rateInfo')
    }
}
</script>
<style lang="stylus" scoped>
    @import '~common/stylus/variable.styl'
    .main-info
        .img-box
            width : 100%
            height : (350/$scale)
            background : #cccccc
            .img
                width : 100%
                height : 100%
        .information
            padding : (30/$scale)
            width : 100%
            box-sizing : border-box
            background : $color-background-main
            .box
                display : flex
                .name
                    flex: 1
                    margin-right : (102/$scale)
                    line-height : (40/$scale)
                    font-size: (32/$scale)
                    color : $color-main
                .logo
                    width : (220/$scale)
                    height : (70/$scale)
                    .img
                        display : block
                        width : 100%
                        height : 100%
            .price
                margin-top : (28/$scale)
                font-size : (30/$scale)
                font-weight : bold
                color : $color-price
            .fit-pepole
                margin-top : (28/$scale)
                color : #666666
                font-size : (26/$scale)
                line-height: (40/$scale)
</style>
