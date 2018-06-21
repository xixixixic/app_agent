<template>
    <div class="applicantInfo">
		<div class='insuredWarp'>
			<div class="detailTitle">
				<a class="titleLeft">银行卡信息</a>
			</div>
			<bank-info-name :InfoDetail='InfoDetail'></bank-info-name>
			<bank-info-bank-name :InfoDetail='InfoDetail'></bank-info-bank-name>
			<bank-info-account-num :InfoDetail='InfoDetail'></bank-info-account-num>
			<bank-info-yi-jiao :InfoDetail='InfoDetail'></bank-info-yi-jiao>
			<bank-info-unpay :InfoDetail='InfoDetail'></bank-info-unpay>
		</div>
	</div>
</template>

<script>
import Split from 'base/split/split'
import BankInfoName from 'components/insurance/chang-cheng/review-all-info/child/bank-info-name/bank-info-name.vue'
import BankInfoBankName from 'components/insurance/chang-cheng/review-all-info/child/bank-info-bank-name/bank-info-bank-name.vue'
import BankInfoAccountNum from 'components/insurance/chang-cheng/review-all-info/child/bank-info-account-num/bank-info-account-num.vue'
import BankInfoYiJiao from 'components/insurance/chang-cheng/review-all-info/child/bank-info-yi-jiao/bank-info-yi-jiao.vue'
import BankInfoUnpay from 'components/insurance/chang-cheng/review-all-info/child/bank-info-unpay/bank-info-unpay.vue'
import {mapGetters} from 'vuex'
export default {
	computed: {
		InfoDetail () {
			return this.changChengBankDetail.bankInfo
		},
		...mapGetters([
			'changChengBankDetail'
		])
	},
    methods: {
		_next () {
		}
    },
    components: {
		BankInfoName,
		BankInfoBankName,
		BankInfoAccountNum,
		BankInfoYiJiao,
		BankInfoUnpay,
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