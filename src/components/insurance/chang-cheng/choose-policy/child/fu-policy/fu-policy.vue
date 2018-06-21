<template>
    <div class="mainPolicyWarp">
       <div class="mainPolicy" v-show='fuListStatus' v-for='(item, index) in fuList'>
            <div class="mainTitle">
                <div class='mainTitleP fuTitle'>
                    <span class="fuIco"></span>
                    <span class="fuPolicyName">{{item.productName}}</span>
                </div>
                <div class="btn">
                    <button class="mainBtn deleteBtn" v-if="item.mainRiskFlag=== '3' ? false : true" @click="deleteFuPolicys(item)">
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
                <p class="listTitle">{{item.amount === '' ? '-': item.amount}}</p>
                <p class="listTitle">{{item.premium === '' ? '-': item.premium}}</p>
                <p class="listTitle">{{item.ensurePeriod === '' ? '-': item.ensurePeriod}}</p>
                <p class="listTitle">{{item.renewPeriod === '' ? '-': item.renewPeriod}}</p>
            </div>
        </div>
        <div class="addFupolicy">
            <button class='addFuBtn' @click='addFuPolicy'>+ 添加附加险</button>
        </div>
        <fu-policy-detail ref='fuPolicyDetail' @listStatus='changeListStatus' :fuPolicyData='fuPolicyData'></fu-policy-detail>
        <confirm  ref="confirm" :text="confirmText"></confirm>
    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import {getFuPolicy, deleteFuPolicy} from 'api/long-life/chang-cheng/insurance.js'
import {RET_OK, CODE_OK} from 'service/variable.js'
import FuPolicyDetail from 'components/insurance/chang-cheng/choose-policy/child/fu-policy-detail/fu-policy-detail.vue'
import Confirm from 'base/confirm/confirm'
import {confirm} from 'common/js/mixin.js'
export default {
    mixins: [confirm],
    data () {
        return {
            // fuListStatus: false,
            defaultFuData: {},
            confirmText: '',
            test: ''
        }
    },
    computed: {
        fuList () {
            return this.changChengPolicyInfo.fuPolicy
        },
        fuPolicyData () {
            return {
                type: 'fuPolicy',
                policyList: this.defaultFuData.risks
            }
        },
        fuListStatus () {
            return this.changChengPolicyInfo.fuPolicyStatus
        },
        ...mapGetters([
			'changChengPolicyInfo', 'changChengBaseInfo'
		])
    },
    mounted () {
        this.setDefault()
    },
    methods: {
        setDefault () {
            // for (let i = 0; i < this.$refs.fuPolicyDetail.length; i++) {
                this.$refs.fuPolicyDetail.fuShow = false
            // }
        },
        clientChoice (pos) {
            return {
                typeField: 'fuPolicy#' + pos
            }
        },
        addFuPolicy () {
            if (this.changChengPolicyInfo.mainPolicy.ensurePeriodCode === '' || this.changChengPolicyInfo.mainPolicy.renewPeriodCode === '' || this.changChengPolicyInfo.mainPolicy.amount === '' || this.changChengPolicyInfo.mainPolicy.getMoneyYearCode === '') {
                this.showConfirm('请先完善主险相关信息')
            } else {
                let params = {
                    productInfo: {
                        productId: this.changChengBaseInfo.productId.toString()
                    },
                    insuredBaseInfo: this.changChengBaseInfo.insured,
                    appntBaseInfo: this.changChengBaseInfo.applicant,
                    policyInfo: {
                        ensurePeriod: this.changChengPolicyInfo.mainPolicy.ensurePeriodCode.toString(),
                        renewPeriod: this.changChengPolicyInfo.mainPolicy.renewPeriodCode.toString(),
                        amount: this.changChengPolicyInfo.mainPolicy.amount,
                        getMoneyYear: this.changChengPolicyInfo.mainPolicy.getMoneyYearCode.toString(),
                        premium: this.changChengPolicyInfo.mainPolicy.premium
                    }
                }
                getFuPolicy(params).then(res => {
                    if (res.ret === RET_OK) {
                        if (res.data.code === CODE_OK) {
                            this.defaultFuData = res.data
                            if (res.data.risks.length === 0) {
                                this.showConfirm('该险暂无附加险可选')
                            } else {
                                this.$refs.fuPolicyDetail.fuShow = true
                            }
                        } else {
                            this.showConfirm(res.data.remarkMsg)
                        }
                    }
                })
            }
        },
        editFuPolicy (index) {
            console.log(index)
            this.$refs.fuPolicyDetail.fuShow = true
        },
        deleteFuPolicys (item) {
            this.deleteChangChengFuPolicyInfo(item)
            let risks = this.changChengPolicyInfo.allRisks
            for(let i = 0; i < risks.length; i++){
                if(risks[i].fjxId === item.fjxId){
                    console.log(risks[i].fjxId === item.fjxId)
                    risks.splice(i, 1)
                }
            }
        },
        changeListStatus (e) {
            console.log(e)
            this.setChangChengPolicyInfo({
				field1: 'fuPolicyStatus',
				value: e
            })
            this.fuListStatus = e
        },
        ...mapMutations({
            addFuPolicyInfo: 'SET_ADD_CHANGCHENG_FUPOLICYINFO',
            setChangChengPolicyInfo: 'SET_LONGLIFE_CHANGCHENG_POLICYINFO',
            deleteChangChengFuPolicyInfo: 'SET_DELETE_CHANGCHENG_FUPOLICYINFO'
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