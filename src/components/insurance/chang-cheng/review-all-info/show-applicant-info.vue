<template>
    <div class="applicantInfo">
		<div class='insuredWarp'>
			<div class="detailTitle">
				<a class="titleLeft">投保人信息</a>
			</div>
			<name :InfoDetail='InfoDetail'></name>
			<sex :InfoDetail='InfoDetail'></sex>
			<card :InfoDetail='InfoDetail'></card>
			<birthday :InfoDetail='InfoDetail'></birthday>
			<!-- <edu :InfoDetail='InfoDetail'></edu> -->
			<marrige :InfoDetail='InfoDetail'></marrige>
			<nation :InfoDetail='InfoDetail'></nation>
			<telephone :InfoDetail='InfoDetail'></telephone>
			<email :InfoDetail='InfoDetail'></email>
			<zip-code :InfoDetail='InfoDetail'></zip-code>
			<home-zip-code :InfoDetail='InfoDetail'></home-zip-code>
			<!-- 常住地址 -->
			<contact-address :InfoDetail='InfoDetail'></contact-address>
			<!-- 单位地址 -->
			<unit-address :InfoDetail='InfoDetail'></unit-address>
			<div class="detailTitle">
				<a class="titleLeft">投保人纳税身份声明</a>
			</div>
			<tax-people-info :InfoDetail='InfoDetail'></tax-people-info>
		</div>
	</div>
</template>

<script>
import Name from 'components/insurance/chang-cheng/review-all-info/child/name/name.vue'
import Sex from 'components/insurance/chang-cheng/review-all-info/child/sex/sex.vue'
import Card from 'components/insurance/chang-cheng/review-all-info/child/card/card.vue'
import Birthday from 'components/insurance/chang-cheng/review-all-info/child/birthday/birthday.vue'
import Marrige from 'components/insurance/chang-cheng/review-all-info/child/marrige/marrige.vue'
import Edu from 'components/insurance/chang-cheng/review-all-info/child/edu/edu.vue'
import Nation from 'components/insurance/chang-cheng/review-all-info/child/nation/nation.vue'
import Telephone from 'components/insurance/chang-cheng/review-all-info/child/telephone/telephone.vue'
import Phone from 'components/insurance/chang-cheng/review-all-info/child/phone/phone.vue'
import Email from 'components/insurance/chang-cheng/review-all-info/child/email/email.vue'
import ZipCode from 'components/insurance/chang-cheng/review-all-info/child/zip-code/zip-code.vue'
import HomeZipCode from 'components/insurance/chang-cheng/review-all-info/child/home-zip-code/home-zip-code.vue'
import ContactAddress from 'components/insurance/chang-cheng/review-all-info/child/contact-address/contact-address.vue'
import UnitAddress from 'components/insurance/chang-cheng/review-all-info/child/unit-address/unit-address.vue'
import BenificiaryAccount from 'components/insurance/chang-cheng/review-all-info/child/benificiary-account/benificiary-account.vue'
import BenificiaryAccountName from 'components/insurance/chang-cheng/review-all-info/child/benificiary-account-name/benificiary-account-name.vue'
import BenificiaryAccountBank from 'components/insurance/chang-cheng/review-all-info/child/benificiary-account-bank/benificiary-account-bank.vue'
import TaxPeopleInfo from 'components/insurance/chang-cheng/review-all-info/child/tax-people-info/tax-people-info.vue'
import {mapGetters} from 'vuex'
export default {
	computed: {
		InfoDetail () {
			return this.changChengBaseInfo.applicant
		},
		...mapGetters([
			'changChengBaseInfo'
		])
	},
    methods: {
		_next () {
		}
    },
    components: {
		Name,
		Sex,
		Card,
		Birthday,
		Marrige,
		Edu,
		Nation,
		Telephone,
		Phone,
		Email,
		ZipCode,
		HomeZipCode,
		ContactAddress,
		UnitAddress,
		BenificiaryAccount,
		BenificiaryAccountName,
		BenificiaryAccountBank,
		TaxPeopleInfo
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