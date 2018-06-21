<template>
  <div class="wrap">
      <div class="tab border-1px" id="searchBar">   
          <li v-for="(item,index) in detailInfo.productDetails"  class="item" :class="{'active': selected === index}"  @click="tabDetail(index)">{{item.detailTypeName}}</li> 
      </div>
      <div class="container">
            <div class="item">
                <div class="desc-box" v-html="detailInfo.productDetails[selected].details"></div>
            </div>
            <split></split>
            <duty-info :plans="detailInfo.plans" v-show="selected === 0"></duty-info>
            <div class="item" v-show="selected === 0">
                <div class="title">投保前请您仔细阅读：</div>
                <div class="download">
                    <div class="file"><i class="icon-download"></i><span class="text"><a :href="detailInfo.accessorys[0].fileurl">产品条款</a></span></div>
                    <div class="file"><i class="icon-download"></i><span class="text"><a :href="detailInfo.accessorys[1].fileurl">产品汇率</a></span></div>
                    <div class="file"><i class="icon-download"></i><span class="text"><a :href="detailInfo.accessorys[2].fileurl">客户告知书</a></span></div>
                </div>        
                <div class="download" v-show="detailInfo.electronicNotify.length !== 0">
                    <div class="file" @click="electronicsDeclaration">
                        <i class="icon-download"></i><span class="text">电子投保告知与声明</span>
                    </div>
                </div>
            </div>
      </div>
  </div>
</template>
<script>
    import Split from 'base/split/split'
    import Duty from 'components/product/life/duty-info'
    export default {
        props: {
            detailInfo: {
                type: Object,
                default: {}
            }
        },
        data () {
            return {
                selected: 0
            }
        },
        computed: {
            productId () {
                return this.$route.params.productId
            }
        },
        methods: {
            tabDetail (index, selector) {
                console.log(index)
                this.selected = index
                let total = this.$el.querySelector(selector).offsetTop
                // Chrome
                document.body.scrollTop = total
                // Firefox
                document.documentElement.scrollTop = total
                // Safari
                window.pageYOffset = total
            },
            electronicsDeclaration () {
                this.$router.push({
                    name: 'electronicsDeclaration',
                    params: {
                        title: '电子投保告知与声明',
                        content: this.electronicNotify,
                        productId: this.productId
                    }
                })
            },
            handleScroll () {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                let tabOffsetTop = document.querySelector('#tab').offsetTop
                let cptsOffsetTop = document.querySelector('#img_0').offsetTop
                let tbxzOffsetTop = document.querySelector('#img_1').offsetTop
                let dxalOffsetTop = document.querySelector('#img_2').offsetTop
                console.log(scrollTop)
                console.log(tabOffsetTop)
                if (scrollTop > tabOffsetTop) {
                    this.tabFixed = true
                }
                if (scrollTop < cptsOffsetTop) {
                    this.selected = 0
                } else if (scrollTop > cptsOffsetTop && scrollTop < tbxzOffsetTop) {
                    this.selected = 1
                } else if (scrollTop > cptsOffsetTop && scrollTop > tbxzOffsetTop && scrollTop < dxalOffsetTop) {
                    this.selected = 2
                }
            }
        },
        components: {
            'duty-info': Duty,
            'split': Split
        }
    }
</script>
<style lang="stylus" scoped>
    @import '~common/stylus/mixin.styl'
    .wrap
        border-top : (20/$scale) solid #f4f4f4
        background : #ffffff
        .tab
            margin : 0 (30/$scale)
            display : flex
            height : (90/$scale)
            border-1px(rgb(230,230,230))
            .item
                flex : 1
                margin : (29/$scale) 0
                font-size : (30/$scale)
                text-align : center
                border-right : (2/$scale) solid #999999
                color : $color-main
                &.active
                    color : $color-theme
                &:last-child
                    border-right: none
        .container
            .item
                margin : 0 (30/$scale)
                .title
                    padding-top: (20/$scale)
                    font-size: (28/$scale)
                .desc-box
                    margin-top: (10/$scale)
                    line-height: (40/$scale)
                    font-size: (24/$scale)
                    color: #666666
                .download
                    display: flex
                    padding: (15/$scale) 0
                    .file
                        flex: 1
                        display: flex
                        .text
                            font-size: (28/$scale)
                            color: #666666
                            text-decoration: underline
                        .icon-download
                            margin-right: (18/$scale)
                            font-size: (30/$scale)
                            color: $color-theme
                &.active
                    display: block
</style>
