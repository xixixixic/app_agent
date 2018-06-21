<template>
	<div class="policyInfo">
			<ducarapplicant ref='ducarApplicant'></ducarapplicant>
			<split></split>
			<ducarinsured ref='ducarInsured'></ducarinsured>
			<split></split>
		<confirm  ref="confirm" :text="confirmText"></confirm>			
		<info-footer text="下一步" @next='next'></info-footer>
	</div>
</template>

<script>
	import InfoFooter from 'base/footer/footer'
	import Split from 'base/split/split'
	import Confirm from 'base/confirm/confirm'
	import {confirm} from 'common/js/mixin.js'
	// import {stopReturn} from 'common/js/disableBrowserBack.js'
	import ducarapplicant from 'components/insurance/car/du_bang/first_step/children/car_applicant/car_applicant'
	import ducarinsured from 'components/insurance/car/du_bang/first_step/children/car_insured/car_insured'
	export default {
        mixins: [confirm],
        data () {
            return {
            }
        },
		created () {
			// this.stop()
		},
        methods: {
            next () {
				this.$refs.ducarInsured.verName()
				this.$refs.ducarInsured.verCard()
				this.$refs.ducarInsured.verPhone()
				this.$refs.ducarInsured.verEmail()
				this.$refs.ducarInsured.setPayPhone()
                if (this.$refs.ducarApplicant.nameStatus === false || this.$refs.ducarApplicant.nameValue === '') {
                   this.showConfirm('请检查投保人姓名填写')
                } else if (this.$refs.ducarApplicant.phoneStatus === false || this.$refs.ducarApplicant.phoneValue === '') {
                   this.showConfirm('请检查投保人手机号填写')
                } else if (this.$refs.ducarApplicant.cardNoStatus === false || this.$refs.ducarApplicant.cardValue === '') {
                   this.showConfirm('请检查投保人身份证填写')
                } else if (this.$refs.ducarApplicant.emailStatus === false || this.$refs.ducarApplicant.emailValue === '') {
                   this.showConfirm('请检查投保人邮箱填写')
                } else if (this.$refs.ducarApplicant.addressValue === '请填写地址') {
                   this.showConfirm('请检查投保人地址填写')
                } else if (this.$refs.ducarInsured.nameStatus === false || this.$refs.ducarInsured.nameValue === '') {
                   this.showConfirm('请检查被保人姓名填写')
                } else if (this.$refs.ducarInsured.phoneStatus === false || this.$refs.ducarInsured.phoneValue === '') {
                   this.showConfirm('请检查被保人手机号填写')
                } else if (this.$refs.ducarInsured.cardNoStatus === false || this.$refs.ducarInsured.cardValue === '') {
                   this.showConfirm('请检查被保人身份证填写')
                } else if (this.$refs.ducarInsured.emailStatus === false || this.$refs.ducarInsured.emailValue === '') {
                   this.showConfirm('请检查被保人邮箱填写')
                } else if (this.$refs.ducarInsured.insuredAddressValue === '请填写地址') {
                   this.showConfirm('请检查被保人地址填写')
                } else if (this.$refs.ducarInsured.payPhoneStatus === false || this.$refs.ducarInsured.payPhoneValue === '') {
                   this.showConfirm('请检查被保人支付手机号填写')
                } else {
                    this.$router.push({
                        name: 'duCar_info'
                    })
                }
			}
			},
        components: {
            Split,
            InfoFooter,
            ducarapplicant,
            ducarinsured,
            Confirm
        }
	}
</script>

<style lang="stylus" scoped>
	@import '~common/stylus/variable.styl'
	@import '~common/stylus/mixin.styl'
	.policyInfo
		padding-bottom: (100/$scale)
		.detailTitle
			font-size: (32/$scale)
			line-height: (100/$scale)
			color: #333
			border-bottom: 1px solid #FF4456
			background: #fff
			.titleLeft
				color: #FF4456
			.titleRight
				color: #333
				float: right
				font-size: 15px
		.detail
			width: 100%
			border-bottom: 1px solid #E6E6E6
			.info
				font-size: (28/$scale)
				display: flex
				justify-content: space-between
				line-height: (100/$scale)
			.lastInfo
				border-bottom: none
			.errTip
				padding: (20/$scale) 0
				text-align: right
				font-size: 0
				position: relative
				display: block
			.hide
				display: none
				font-size: 0
			.errIco
				width: (28/$scale)
				height: (28/$scale)
				display: inline-block
				bg-image('warn')
				background-size: contain
				background-repeat: no-repeat
			.errText
				display: inline-block
				vertical-align: top
				margin-left: (10/$scale)
				font-size: (28/$scale)
				color: #ff4456
			.desTitle
				color: #444
			.placeholders
				color: #BBB
				.choose
					margin-right: (20/$scale)
				.arr
					bg-image('rightArr')
					width: (20/$scale)
					height: (30/$scale)
					display: inline-block
					background-size: contain
					background-repeat: no-repeat
					float: right
					margin-top: (36/$scale)
				.sex
					width: (110/$scale)
					height: (50/$scale)
					background: #ffffff
					color: #666
					border: 1px solid #E6E6E6
					border-radius: 3px
				.redSex
					border: 1px solid #FF4455
					color: #FF4455
					width: (110/$scale)
					height: (50/$scale)
					background: #ffffff
					border-radius: 3px
				.placeholdersInput
					text-align: right
					background: transparent
</style>