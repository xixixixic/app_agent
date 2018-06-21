<template>
	<div class="policyInfo">
		<loading v-if='loadingShow'></loading>
		<div v-else>
				<tian-car-applicant ref='applicant'></tian-car-applicant>
				<split></split>
				<tian-car-insured ref='insured'></tian-car-insured>
				<split></split>
			<info-footer text="下一步" @next='_next'></info-footer>
			<confirm  ref="confirm" :text="confirmText"></confirm>
		</div>
	</div>
</template>

<script>
	import InfoFooter from 'base/footer/footer'
	import Split from 'base/split/split'
	import Loading from 'base/loading/loading'
	import {mapGetters} from 'vuex'
	import Confirm from 'base/confirm/confirm'
    import {confirm} from 'common/js/mixin.js'
	import {insuredAndApplicant} from 'api/car/tian-an/insurance.js'
	import {RET_OK, CODE_OK} from 'service/variable.js'
	import TianCarApplicant from 'components/insurance/car/tian_an/insured_and_applicant/children/car_applicant/car_applicant'
	import TianCarInsured from 'components/insurance/car/tian_an/insured_and_applicant/children/car_insured/car_insured'
	export default {
        mixins: [confirm],
        data () {
            return {
                loadingShow: false
            }
        },
        computed: {
            ...mapGetters([
                'tianCarInsuredAndApplicant'
            ])
        },
        methods: {
            _next () {
				this.$refs.insured.verName()
				this.$refs.insured.verCard()
				this.$refs.insured.verPhone()
                if (this.$refs.applicant.nameStatus === false || this.$refs.applicant.nameValue === '') {
                   this.showConfirm('请检查投保人姓名填写')
				} else if (this.$refs.applicant.phoneValue === '' || this.$refs.applicant.phoneStatus === 'false') {
                    this.showConfirm('请检查投保人手机号填写')
                } else if (this.$refs.applicant.cardValue === '' || this.$refs.applicant.cardNoStatus === false) {
                   this.showConfirm('请检查投保人身份证号填写')
                } else if (this.$refs.applicant.addressValue === '') {
                    this.showConfirm('请检查投保人地址填写')
                } else if (this.$refs.insured.nameValue === '' || this.$refs.insured.nameStatus === false) {
                    this.showConfirm('请检查被保人姓名填写')
                } else if (this.$refs.insured.cardValue === '' || this.$refs.insured.cardNoStatus === false) {
                   this.showConfirm('请检查被保人身份证号填写')
                } else if (this.$refs.insured.phoneValue === '' || this.$refs.insured.phoneStatus === 'false') {
                    this.showConfirm('请检查被保人手机号填写')
                } else if (this.$refs.insured.addressValue === '') {
                    this.showConfirm('请检查被保人地址填写')
                } else {
                this.loadingShow = true
                let data = this.tianCarInsuredAndApplicant
                insuredAndApplicant(data).then(res => {
                    console.log(res)
                    if (res.ret === RET_OK) {
                        if (res.data.code === CODE_OK) {
                            this.loadingShow = false
                            this.$router.push({
                                name: 'tian_recipient'
                            })
                        }
                    }
                })
                }
            }
        },
        components: {
            Split,
            InfoFooter,
            TianCarApplicant,
            TianCarInsured,
            Loading,
            Confirm
        }
	}
</script>

<style lang="stylus" scoped>
	@import '~common/stylus/variable.styl'
	@import '~common/stylus/mixin.styl'
	.policyInfo
		.detailTitle
			font-size: (32/$scale)
			line-height: (100/$scale)
			color: #333
			border-bottom: 1px solid #FF4456
			background: #fff
			margin: 0 (30/$scale)
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
				.birthDay
					background: #fff
</style>