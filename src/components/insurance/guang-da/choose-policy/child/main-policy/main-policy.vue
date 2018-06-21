<template>
    <div class="mainPolicy">
        <div class="mainTitle">
            <div class='mainTitleP zhuTitle'>
                <span class="ico"></span>
                <span class="policyName">{{mainPolicyName}}</span>
            </div>
            <button class="mainBtn editBtn" @click='editMainPolicy'>
                编辑
            </button>
        </div>
        <div class="list">
            <p class="listTitle">保额</p>
            <p class="listTitle">保费</p>
            <p class="listTitle">保险期间</p>
            <p class="listTitle">缴费期间</p>
        </div>
        <div class="list lastList">
            <p class="listTitle">{{policyMoney}}元</p>
            <p class="listTitle">{{shouldPayMoney}}元</p>
            <p class="listTitle">终身</p>
            <p class="listTitle">{{payTimes}}</p>
        </div>
        <main-policy-detail ref='detail'></main-policy-detail>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import MainPolicyDetail from 'components/insurance/guang-da/choose-policy/child/main-policy-detail/main-policy-detail.vue'
export default {
    computed: {
         ...mapGetters([
                'guangda',
                'guangdaMainRisk',
                'guangdaPolicy'
            ]),
        policyMoney () {
            return this.guangdaMainRisk.amount === '' ? '-' : this.guangdaMainRisk.amount
        },
        shouldPayMoney () {
            return this.guangdaPolicy.mainPolicy.premium === '' ? '-' : this.guangdaPolicy.mainPolicy.premium
        },
        payTimes () {
            return this.guangdaMainRisk.premiumPeriod === '' ? '-' : this.guangdaMainRisk.premiumPeriod === 0 ? '趸交' : this.guangdaMainRisk.premiumPeriod + '年'
        },
        mainPolicyName () {
            return this.guangdaPolicy.productName === '' ? '-' : this.guangdaPolicy.productName
        }
    },
    methods: {
        editMainPolicy () {
            this.$refs.detail.showMainPolicy = true
        }
    },
    components: {
        MainPolicyDetail
    }
}
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable.styl'
@import '~common/stylus/mixin.styl'
.mainPolicy
    width: (710/$scale)
    background: #fff
    margin: (20/$scale) auto 0 auto
    border-radius: (10/$scale)
    padding-bottom: (30/$scale)
    .mainTitle
        font-size: (30/$scale)
        height: (108/$scale)
        display: flex
        align-items: center
        justify-content: space-between
        .mainTitleP
            font-weight: bold
            color: $color-main
            overflow: hidden
            .ico
                bg-image('zhu')
                width: (44/$scale)
                height: (44/$scale)
                display: inline-block
                background-size: contain
                margin: 0 (10/$scale) 0 (24/$scale)
                float: left
            .policyName
                float: left
                width: (465/$scale)
                height: (44/$scale)
                display: inline-block
                line-height: (44/$scale)
                overflow: hidden
                text-overflow:ellipsis
                white-space: nowrap
            .fuPolicyName
                float: left
                width: (340/$scale)
                height: (44/$scale)
                display: inline-block
                line-height: (44/$scale)
                overflow: hidden
                text-overflow:ellipsis
                white-space: nowrap
            .fuIco
                bg-image('fu')
                width: (44/$scale)
                height: (44/$scale)
                display: inline-block
                background-size: contain
                margin: 0 (10/$scale) 0 (24/$scale)
                float: left
        .mainBtn
            width: (100/$scale)
            height: (50/$scale)
            background: #fff
            border-radius: (10/$scale)
            font-size: (26/$scale)
            margin-right: (30/$scale)
            &.editBtn
                border: 1px solid $color-theme-border
                color: $color-theme
            &.deleteBtn
                border: 1px solid #ff4456
                color: #ff4456
            &.fuEditBtn
                margin-right: (20/$scale)
    .list
        font-size: (26/$scale)
        width: (670/$scale)
        height: (90/$scale)
        display: flex
        margin: 0 auto
        border: 1px solid #e6e6e6
        &.lastList
            border-top: none
        .listTitle
            line-height: (90/$scale)
            flex: 1
            text-align: center
            border-right: 1px solid #e6e6e6
            &:last-child
                border-right: none
</style>