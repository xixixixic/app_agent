<template>
    <div class="mainPolicyWarp">
       <div class="mainPolicy"  v-for='(item, index) in fuList' :key="index">
            <div class="mainTitle">
                <div class='mainTitleP fuTitle'>
                    <span class="fuIco"></span>
                    <span class="fuPolicyName">{{item.is_bind === 1?item.product_name:item.prodName}}</span>
                </div>
                <div class="btn">
                    <button class="mainBtn deleteBtn"  @click="deleteFuPolicys(item, index)">
                        删除
                    </button>
                </div>
            </div>
            <div class="list">
                <p class="listTitle">保额</p>
                <p class="listTitle">保费</p>
                <p class="listTitle">保险期间</p>
                <p class="listTitle">缴费期间</p>
            </div>
            <div class="list lastList">
                <p class="listTitle">{{item.amnt}}元</p>
                <p class="listTitle">{{item.is_bind === 1?item.premium:item.prem}}元</p>
                <p class="listTitle">{{item.insureYear === '106'?'终身':item.insureYear + '年'}}</p>
                <p class="listTitle">{{item.payYear === 0? '趸交': item.payYear + '年'}}</p>
            </div>
        </div>
        <div class="addFupolicy">
            <button class='addFuBtn' @click='addFuPolicy'>+ 添加附加险</button>
        </div>
        <fu-policy-detail ref='fuPolicyDetail'></fu-policy-detail>
        <confirm  ref="confirm" :text="confirmText"></confirm>
    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import {queryAdditionalRiskParam, culateAdditionalRiskPremium} from 'api/long-life/guang-da/insurance.js'
import {RET_OK} from 'service/variable.js'
import FuPolicyDetail from 'components/insurance/guang-da/choose-policy/child/fu-policy-detail/fu-policy-detail.vue'
import Confirm from 'base/confirm/confirm'
import {confirm} from 'common/js/mixin.js'
export default {
    mixins: [confirm],
    data () {
        return {
            defaultFuData: {},
            test: ''
        }
    },
    computed: {
        fuList () {
           return this.guangdaPolicy.selectFuPolicy
        },
        payTimes () {
            return this.guangdaMainRisk.premiumPeriod === '' ? '-' : this.guangdaMainRisk.premiumPeriod === 0 ? '趸交' : this.guangdaMainRisk.premiumPeriod + '年'
        },
        ...mapGetters([
            'guangdaPolicy',
            'guangdaMainRisk'
		])
    },
    created () {
        console.log('必选附加险')
        console.log(this.guangdaPolicy.selectFuPolicy)
        console.log(this.fuList)
    },
    methods: {
        addFuPolicy () {
            // console.log('增加附加险------')
            // console.log(this.guangdaPolicy.fuPolicy)
            if (this.guangdaPolicy.fuPolicy.length === 0) {
                this.showConfirm('无可选附加险')
                return false
            } else {
                this.$refs.fuPolicyDetail.fuShow = true
            }
        },
        deleteFuPolicys (item, index) {
            if (item.is_bind === 1) {
                this.showConfirm('必选附加险不可删除')
                return false
            } else {
                this.DELET_GUANGDA_FU(index)
            }
        },
        ...mapMutations({
            DELET_GUANGDA_FU: 'DELET_GUANGDA_FU'
		})
    },
    components: {
        FuPolicyDetail,
        Confirm
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
.addFupolicy
    width: (710/$scale)
    margin: 0 auto
    .addFuBtn
        width: 100%
        height: (100/$scale)
        border: none
        background: #fff
        font-size: (34/$scale)
        color: $color-theme
        outline: none
        margin-bottom: (120/$scale)
</style>