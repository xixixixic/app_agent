<template>
    <div class="successTrial">
        <div class="warp">
            <div class="pic">
            </div>
            <div class="des">
                订单已提交审核！
            </div>
            <div class="btn" @click='backToIndex'>
                返回首页
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        backToIndex () {
            console.log('000')
            let host = window.location.host
            if (host === 'www.jimuwang.com.cn') {
                location.href = 'http://www.jimuwang.com.cn/wx_agent/#/index'
            } else if (host === 'test.kakabx.com') {
                location.href = 'http://test.kakabx.com/wx_agent/#/index'
            } else {
                location.href = 'http://localhost:8077/#/index'
            }
        }
    }
}
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable.styl'
@import '~common/stylus/mixin.styl'
.successTrial
    .warp
        .pic
            width: (197/$scale)
            height: (162/$scale)
            bg-image: ('arr')
            background-size: contain
            background-repeat: no-repeat
            margin: (120/$scale) auto (76/$scale) auto
        .des
            font-size: (34/$scale)
            color: #FFA200
            text-align: center
        .btn
            font-size: (34/$scale)
            width: (444/$scale)
            height: (134/$scale)
            line-height: (124/$scale)
            text-align: center
            color: #fff
            bg-image: ('blue')
            background-size: contain
            background-repeat: no-repeat
            margin: (100/$scale) auto 0 auto
</style>