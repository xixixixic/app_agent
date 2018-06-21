<template>
    <div class="mianPolicy">
        <div class="policyWarp">
            <div class="mainTitle">
                选择附加险
            </div>
            <div class="mainInfo">
                <ul class='mainInfoUl'>
                    <li class="mainInfoLi"><span class="spanLeft">请选择附加险</span><span class="spanRight"><i class="icon-down_arrow ico"></i></span></li>
                    <li class="mainInfoLi"><span class="spanLeft">保险期间</span><span class="spanRight">20年<i class="icon-down_arrow ico"></i></span></li>
                    <li class="mainInfoLi"><span class="spanLeft">缴费期间</span><span class="spanRight">20年<i class="icon-down_arrow ico"></i></span></li>
                    <li class="mainInfoLi">
                        <span class="spanLeft">保额</span>
                        <span class="spanRight">
                            <input type="text" placeholder='请填写保额'>
                        </span>
                    </li>
                    <li class="mainInfoLi"><span class="spanLeft">保费</span><span class="spanRight">1000元</span></li>
                    <li class="mainInfoLi"><span class="spanLeft">祝寿金领取年龄</span><span class="spanRight">70周岁<i class="icon-down_arrow ico"></i></span></li>
                </ul>
            </div>
            <div class="btnGrounp">
                <div class='btnGrey'>取消</div>
                <div class='btn'>确定</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
        }
    }
}
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable.styl'
@import '~common/stylus/mixin.styl'
.mianPolicy
    width: 100%
    height: 100%
    position: fixed
    top: 0
    left: 0
    background: rgba(0,0,0,0.5)
    .policyWarp
        width: (710/$scale)
        margin: (100/$scale) auto 0 auto
        background: #fff
        border-radius: (10/$scale)
        .mainTitle
            height: (100/$scale)
            line-height: (100/$scale)
            text-align: center
            color: $color-main
            background: #AAD0ff
            font-size: (34/$scale)
            border-radius: (10/$scale) (10/$scale) 0 0
        .mainInfo
            .mainInfoUl
                .mainInfoLi
                    list-style: none
                    font-size: (30/$scale)
                    height: (100/$scale)
                    line-height: (100/$scale)
                    border-bottom: 1px solid #dcdcdc
                    padding: 0 (40/$scale) 0 (30/$scale)
                    display: flex
                    justify-content: space-between
                    .spanLeft
                        color: $color-a-left
                    .spanRight
                        color: $color-a-right
                        .ico
                            margin-left: (20/$scale)
                            color: $color-theme-placeholder
                        input
                            text-align: right
        .btnGrounp
            display: flex
            justify-content: space-evenly
            .btn
                width: (200/$scale)
                height: (70/$scale)
                line-height: (70/$scale)
                text-align: center
                font-size: (30/$scale)
                color: #fff
                bg-image('blue')
                background-size: cover
                margin: (70/$scale) 0
            .btnGrey
                width: (200/$scale)
                height: (70/$scale)
                line-height: (70/$scale)
                text-align: center
                font-size: (30/$scale)
                color: #fff
                bg-image('lightBlue')
                background-size: cover
                margin: (70/$scale) 0
</style>