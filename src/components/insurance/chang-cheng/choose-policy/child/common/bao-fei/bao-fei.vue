<template>
<div>
    <div class="mainInfoLi">
        <span class="spanLeft">保费</span>
        <span class="spanRight">
            <input type="text" placeholder='请填写保费' v-model='money' @blur='setMoney'>
        </span>
    </div>
    <div class='wrongTip' v-show='wrongTipStatus'>
        <p class='wrongWord'>投保规则错误</p>
        <p class='wrongWord'>1.最低为{{this.changChengPolicyInfo.minPremium}}元且增加部分为{{this.changChengPolicyInfo.premiumIncreaRatio}}的整数倍</p>
    </div>
    <confirm  ref="confirm" :text="confirmText"></confirm>
</div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import Confirm from 'base/confirm/confirm'
import {confirm} from 'common/js/mixin.js'
export default {
    mixins: [confirm],
    props: {
        mainDetailPilicyType: { // 主险附险类型
            type: String,
            default: function () {
                return ''
            }
        }
    },
    data () {
        return {
            money: '',
            showSelectdropWrap: false,
            wrongTipStatus: false,
            confirmText: ''
        }
    },
    computed: {
        ...mapGetters([
			'changChengPolicyInfo'
		])
    },
    created () {
        this.setDefault()
    },
    methods: {
        setDefault () {
            this.money = this.changChengPolicyInfo.mainPolicy.premium
        },
        setMoney () {
            if (this.changChengPolicyInfo.mainPolicy.ensurePeriod === '') {
                this.setChangChengPolicyInfo({
                    field1: this.mainDetailPilicyType,
                    field2: 'premium',
                    value: this.money
                })
                this.showConfirm('请先选择保险期间')
            } else if (this.changChengPolicyInfo.mainPolicy.renewPeriod === '') {
                this.setChangChengPolicyInfo({
                    field1: this.mainDetailPilicyType,
                    field2: 'premium',
                    value: this.money
                })
                this.showConfirm('请先选择缴费期间')
            } else {
                let money = this.money
                if (money >= this.changChengPolicyInfo.minPremium && (money - this.changChengPolicyInfo.minPremium)%this.changChengPolicyInfo.premiumIncreaRatio === 0) {
                    this.setChangChengPolicyInfo({
                        field1: this.mainDetailPilicyType,
                        field2: 'premium',
                        value: this.money
                    })
                    this.wrongTipStatus = false
                } else {
                    this.setChangChengPolicyInfo({
                        field1: this.mainDetailPilicyType,
                        field2: 'premium',
                        value: ''
                    })
                    this.wrongTipStatus = true
                    this.money = ''
                } 
            }
        },
        ...mapMutations({
			setChangChengPolicyInfo: 'SET_LONGLIFE_CHANGCHENG_POLICYINFO'
        })
    },
    components: {
        Confirm
    }
}
</script>

<style lang='stylus' scoped>
@import '~components/insurance/chang-cheng/choose-policy/child/stylus/common.styl'
.wrongTip
    font-size: (30/$scale)
    color: #ff4456
    height: (100/$scale)
    line-height: (50/$scale)
    padding: (20/$scale) 0 0 (30/$scale)
</style>