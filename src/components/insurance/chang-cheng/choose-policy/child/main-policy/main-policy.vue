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
            <p class="listTitle">{{policyMoney}}</p>
            <p class="listTitle">{{shouldPayMoney}}</p>
            <p class="listTitle">{{policyTimes}}</p>
            <p class="listTitle">{{payTimes}}</p>
        </div>
        <main-policy-detail ref='detail' :mainDetailData='mainDetailData'></main-policy-detail>
        <confirm  ref="confirm" :text="confirmText" @confirm='showWarp'></confirm>
    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import MainPolicyDetail from 'components/insurance/chang-cheng/choose-policy/child/main-policy-detail/main-policy-detail.vue'
import Confirm from 'base/confirm/confirm'
import {confirm} from 'common/js/mixin.js'
export default {
    mixins: [confirm],
    props: {
        mainPolicyInfo: { // 接收主险默认数据
            type: Object,
            default: function () {
                return {}
            }
        }
    },
    data () {
        return {
            confirmText: ''
        }
    },
    computed: {
        mainDetailData () {
            return {
                type: 'mainPolicy',
                policyTime: this.mainPolicyInfo.coverPeriods,
                policyTimeCodes: this.changChengPolicyInfo.mainPolicy.ensurePeriodCode,
                payTime: this.mainPolicyInfo.premiumPeriods,
                payTimeCodes: this.changChengPolicyInfo.mainPolicy.renewPeriodCode.toString(),
                zhuShouMoney: this.mainPolicyInfo.getMoneyYears,
                zhuShouMoneyCode: this.changChengPolicyInfo.mainPolicy.getMoneyYearCode.toString()
            }
        },
        policyMoney () {
            return this.changChengPolicyInfo.mainPolicy.amount === '' ? '-' : this.changChengPolicyInfo.mainPolicy.amount
        },
        shouldPayMoney () {
            return this.changChengPolicyInfo.mainPolicy.premium === '' ? '-' : this.changChengPolicyInfo.mainPolicy.premium
        },
        policyTimes () {
            return this.changChengPolicyInfo.mainPolicy.ensurePeriod === '' ? '-' : this.changChengPolicyInfo.mainPolicy.ensurePeriod
        },
        payTimes () {
            return this.changChengPolicyInfo.mainPolicy.renewPeriod === '' ? '-' : this.changChengPolicyInfo.mainPolicy.renewPeriod
        },
        mainPolicyName () {
            return this.changChengPolicyInfo.mainPolicyName === '' ? '-' : this.changChengPolicyInfo.mainPolicyName
        },
        ...mapGetters([
			'changChengPolicyInfo'
		])
    },
    created () {
        // this.setDefault()
    },
    methods: {
        showWarp () {
            console.log('showWarpshowWarpshowWarpshowWarp')
            this.addFuPolicyInfo()
            this.setChangChengPolicyInfo({
                field1: 'fuPolicy',
                value: []
            })
            this.setChangChengPolicyInfo({
                field1: 'mainPolicy',
                field2: 'amount',
                value: this.changChengPolicyInfo.mainPolicy.amount
            })
            this.setChangChengPolicyInfo({
                field1: 'mainPolicy',
                field2: 'ensurePeriod',
                value: ''
            })
            this.setChangChengPolicyInfo({
                field1: 'mainPolicy',
                field2: 'ensurePeriodCode',
                value: ''
            })
            this.setChangChengPolicyInfo({
                field1: 'mainPolicy',
                field2: 'getMoneyYear',
                value: ''
            })
            this.setChangChengPolicyInfo({
                field1: 'mainPolicy',
                field2: 'getMoneyYearCode',
                value: ''
            })
            this.setChangChengPolicyInfo({
                field1: 'mainPolicy',
                field2: 'getMoneyYearCode',
                value: ''
            })
            this.setChangChengPolicyInfo({
                field1: 'mainPolicy',
                field2: 'mainRiskFlag',
                value: ''
            })
            this.setChangChengPolicyInfo({
                field1: 'mainPolicy',
                field2: 'premium',
                value: this.changChengPolicyInfo.mainPolicy.premium
            })
            this.setChangChengPolicyInfo({
                field1: 'mainPolicy',
                field2: 'renewPeriod',
                value: ''
            })
            this.setChangChengPolicyInfo({
                field1: 'mainPolicy',
                field2: 'renewPeriodCode',
                value: ''
            })
            if (this.changChengPolicyInfo.flag === 1) {
                this.setChangChengPolicyInfo({
                    field1: 'mainPolicy',
                    field2: 'premium',
                    value: ''
                })
            } else if ((this.changChengPolicyInfo.flag === 2)) {
                this.setChangChengPolicyInfo({
                    field1: 'mainPolicy',
                    field2: 'amount',
                    value: ''
                })
            }
            this.$refs.detail.showMainPolicy = true
        },
        editMainPolicy () {
            console.log(this.changChengPolicyInfo.mainPolicyTip)
            if (this.changChengPolicyInfo.mainPolicyTip === false) {
                this.$refs.detail.showMainPolicy = true
            } else {
                this.showConfirm('点击编辑，将重置之前主附险选择')
            }
        },
        ...mapMutations({
            setChangChengPolicyInfo: 'SET_LONGLIFE_CHANGCHENG_POLICYINFO',
            addFuPolicyInfo: 'SET_ADD_CHANGCHENG_FUPOLICYINFO'
		})
    },
    components: {
        MainPolicyDetail,
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
            width: (130/$scale)
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