<template>
    <div class="applicantInfo">
		<div class='insuredWarp'>
			<div class="detailTitle">
				<a class="titleLeft">保险计划</a>
			</div>
			<div v-for='item in InfoDetail'>
				<policy-name :InfoDetail='item.productName'></policy-name>
				<policy-amount :InfoDetail='Number(item.amount)'></policy-amount>
				<policy-time :InfoDetail='item.ensurePeriod'></policy-time>
				<policy-should-pay :InfoDetail='item.premium'></policy-should-pay>
				<policy-renewPeriod :InfoDetail='item.renewPeriod'></policy-renewPeriod>
				<split></split>
			</div>
			<policy-all-total :InfoDetail='allMoney'></policy-all-total>
		</div>
	</div>
</template>

<script>
import Split from 'base/split/split'
import PolicyName from 'components/insurance/chang-cheng/review-all-info/child/policy-name/policy-name.vue'
import PolicyAmount from 'components/insurance/chang-cheng/review-all-info/child/policy-amount/policy-amount.vue'
import PolicyTime from 'components/insurance/chang-cheng/review-all-info/child/policy-time/policy-time.vue'
import PolicyShouldPay from 'components/insurance/chang-cheng/review-all-info/child/policy-should-pay/policy-should-pay.vue'
import PolicyRenewPeriod from 'components/insurance/chang-cheng/review-all-info/child/policy-renewPeriod/policy-renewPeriod.vue'
import PolicyAllTotal from 'components/insurance/chang-cheng/review-all-info/child/policy-all-total/policy-all-total.vue'
import {mapGetters} from 'vuex'
export default {
	computed: {
		InfoDetail () {
			let obj = this.changChengPolicyInfo.mainPolicy
			let key = 'productName'
			let value = this.changChengPolicyInfo.mainPolicyName
			obj[key] = value
			return this.changChengPolicyInfo.fuPolicy.concat(this.changChengPolicyInfo.mainPolicy)
		},
		allMoney () {
			let total = 0
			for (let i in this.InfoDetail) {
				total += Number(this.InfoDetail[i].premium)
			}
			return total
		},
		...mapGetters([
			'changChengPolicyInfo'
		])
	},
    methods: {
		setDefault () {
		}
    },
    components: {
		PolicyName,
		PolicyAmount,
		PolicyTime,
		PolicyShouldPay,
		PolicyRenewPeriod,
		PolicyAllTotal,
		Split
    }
}
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable.styl'
@import '~common/stylus/mixin.styl'
.insuredWarp
	.detailTitle
		font-size: (30/$scale)
		line-height: (100/$scale)
		color: #333
		border-bottom: 1px solid $color-theme
		background: #fff
		padding-left: (30/$scale)
		.titleLeft
			color: $color-main
			font-weight: bold
		.titleRight
			color: #333
			float: right
			font-size: 15px
</style>