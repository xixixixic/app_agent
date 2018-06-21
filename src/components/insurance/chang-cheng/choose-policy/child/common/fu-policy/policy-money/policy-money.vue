<template>
    <div class="mainInfoLi">
        <span class="spanLeft">保额</span>
        <span class="spanRight">
            <input type="text" placeholder='请填写保额' v-model='money' v-on:input='setMoney'>
        </span>
    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
export default {
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
            showSelectdropWrap: false
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
            this.money = this.changChengPolicyInfo.mainPolicy.amount
        },
        setMoney () {
            this.setChangChengPolicyInfo({
				field1: this.mainDetailPilicyType,
				field2: 'amount',
				value: this.money
            })
        },
        ...mapMutations({
			setChangChengPolicyInfo: 'SET_LONGLIFE_CHANGCHENG_POLICYINFO'
		})
    }
}
</script>

<style lang='stylus' scoped>
@import '~components/insurance/chang-cheng/choose-policy/child/stylus/common.styl'
</style>