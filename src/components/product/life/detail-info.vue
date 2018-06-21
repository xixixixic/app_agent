<template>
  <div class="wrap" id="wrap">
      <div class="tab border-1px" id="tab" :class="tabFixed == true ? 'isFixed' :''">   
        <ul>
          <li v-for="(item,index) in tab"  class="item"  @click.native="tabDetail(index)" :class="{'active': selected === index}">
               {{item.detailTypeName}}
          </li> 
        </ul>
      </div>
      <div class="desc cpts" id="img_0">
          <img :src="detailInfo.productDetailImage.cpts" alt="">
          <!-- <img src="./cpts.jpg" alt=""> -->
      </div>
      <div class="desc tbxz" id="img_1">
            <img :src="detailInfo.productDetailImage.tbxz" alt="">
            <!--  <img src="./tbxz.jpg" alt="">  -->
            <div class="download">
                <div class="title">
                    <h2 class="text"></h2>
                </div>
                <div class="list">
                    <li class="item" v-show="detailInfo.electronicNotify.length !== 0">投保与告知声明</li>
                    <li class="item" @click="fileUrl(detailInfo.accessorys[0].fileurl)">产品条款</li>
                    <li class="item" @click="fileUrl(detailInfo.accessorys[1].fileurl)">客户告知书</li>
                    <li class="item" @click="fileUrl(detailInfo.accessorys[2].fileurl)">产品汇率</li>
                </div>
        </div>
      </div>
      <div class="desc dxal"   id="img_2">
           <!--    <img src="./dxal.jpg" alt=""> -->
           <img :src="detailInfo.productDetailImage.dxal" alt="">
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
                selected: 0,
                tab: [
                    {
                        detailTypeName: '产品特色'
                    },
                    {
                        detailTypeName: '投保须知'
                    },
                    {
                        detailTypeName: '典型案例'
                    }
                ],
                tabFixed: false
            }
        },
        mounted () {
            // window.addEventListener('scroll', this.handleScroll)
        },
        created () {
            // console.log('获取location中的消息')
            // console.log(this.productId)
            window.addEventListener('scroll', this.handleScroll)
        },
        computed: {
            productId () {
                return this.$route.params.productId
            }
        },
        methods: {
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
            fileUrl (url) {
                location.href = url
            },
            handleScroll () {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                let wrapOffsetTop = document.querySelector('#wrap').offsetTop
                let cptsOffsetTop = document.querySelector('#img_0').offsetTop
                let tbxzOffsetTop = document.querySelector('#img_1').offsetTop
                let dxalOffsetTop = document.querySelector('#img_2').offsetTop
                // let dxalOffsetTop = document.querySelector('#img_2').offsetTop
                if (scrollTop > wrapOffsetTop) {
                    this.tabFixed = true
                } else {
                    this.tabFixed = false
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
    @import '~common/stylus/variable.styl'
    .wrap
        border-top : (20/$scale) solid #f4f4f4
        background : #ffffff
        .tab
            &>ul
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
            &.isFixed
                position fixed
                top 0
                left 0
                width 100%
                z-index 99999
                background-color #ffffff
        .desc>img
            width 100%
        .dxal
            margin-top (50/$scale)
        .download
            .title
                display flex
                align-items center
                justify-content center
                .text
                    color #94000e
                    width (600/$scale)
                    height (60/$scale)
                    margin-top (50/$scale)
                    bg-image('beforeRead')
                    background-size contain
                    background-repeat no-repeat
            .list
                display flex
                justify-content space-around
                align-items center
                flex-wrap wrap
                .item
                    margin-top (50/$scale)
                    width (260/$scale)
                    height (70/$scale)
                    font-size (30/$scale)
                    line-height @height
                    border-radius (10/$scale)
                    text-align center
                    color #ffffff
                    background-color $color-theme
</style>