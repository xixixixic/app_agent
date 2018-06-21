<template>
	<div class="allInfo">
		<div v-if='!loadingShow'>
			<slider-bar :defaultSelected='defaultSelected'></slider-bar>
			<show-applicant-info></show-applicant-info>
			<split></split>
			<show-insured-info></show-insured-info>
			<split></split>
			<show-bank-info></show-bank-info>
			<split></split>
			<show-policy></show-policy>
			<split></split>
			<show-health-info></show-health-info>
			<info-footer text="确认提交" @next='_next()'></info-footer>
		</div>
		<loading v-if='loadingShow'></loading>
		<confirm  ref="confirm" :text="confirmText" :urlparam='urlparam'></confirm>
	</div>
</template>

<script>
import SliderBar from 'base/sliderBar/sliderBar'
import Split from 'base/split/split'
import {confirmPolicyInfo} from 'api/long-life/chang-cheng/insurance.js'
import {RET_OK, CODE_OK} from 'service/variable.js'
import InfoFooter from 'base/footer/footer'
import ShowApplicantInfo from 'components/insurance/chang-cheng/review-all-info/show-applicant-info.vue'
import ShowInsuredInfo from 'components/insurance/chang-cheng/review-all-info/show-insured-info.vue'
import ShowBankInfo from 'components/insurance/chang-cheng/review-all-info/show-bank-info.vue'
import ShowPolicy from 'components/insurance/chang-cheng/review-all-info/show-policy.vue'
import ShowHealthInfo from 'components/insurance/chang-cheng/review-all-info/show-health-info.vue'
import ClientConfirm from 'components/insurance/chang-cheng/review-all-info/confirm/showTip.vue'
import Confirm from 'base/confirm/confirm'
import {confirm} from 'common/js/mixin.js'
import {mapMutations, mapGetters} from 'vuex'
import Loading from 'base/loading/loading'
export default {
	mixins: [confirm],
	data () {
		return {
			defaultValue: {},
			confirmText: '',
			loadingShow: false,
			urlparam: '',
			applicantLastObj: '',
			insuredLastObj: ''
		}
	},
	computed: {
		Info () {
			return this.defaultValue
		},
		defaultSelected () {
			return 9
		},
		...mapGetters([
			'webStatus','changChengBankDetail', 'changChengBaseInfo', 'changChengPolicyInfo', 'changchengHealthPolicy', 'changChengCertificePic'
		])
	},
	created () {
		this.setDefault()
	},
	methods: {
		setDefault () {
			this.setChangChengCertificate({
				field1: 'returnYingFlag',
				value: true
            })
		},
		_next () {
			this.loadingShow = true
				// 纳税人信息 投被保人为同一人
				if (this.changChengBaseInfo.insured.relaToAppntCode === '00') {
					console.log('同一人')
					for (let i in this.changChengBaseInfo.InsuredTaxBaseInfo) {
						for (let j in this.changChengBaseInfo.ApplicantTaxBaseInfo) {
							if (i === j) {
								this.setChangChengBaseInfo({
									field1: 'ApplicantTaxBaseInfo',
									field2: j,
									value: this.changChengBaseInfo.InsuredTaxBaseInfo[i]
								})
							}
						}
					}
					this.setChangChengBaseInfo({
						field1: 'applicant',
						field2: 'taxBaseInfo',
						value: this.changChengBaseInfo.ApplicantTaxBaseInfo
					})
					this.setChangChengBaseInfo({
						field1: 'insured',
						field2: 'taxBaseInfo',
						value: this.changChengBaseInfo.InsuredTaxBaseInfo
					})
				} else {
					this.setChangChengBaseInfo({
						field1: 'applicant',
						field2: 'taxBaseInfo',
						value: this.changChengBaseInfo.ApplicantTaxBaseInfo
					})
					this.setChangChengBaseInfo({
						field1: 'insured',
						field2: 'taxBaseInfo',
						value: this.changChengBaseInfo.InsuredTaxBaseInfo
					})
				}

				let sgParam = []
				for (let i = 0; i < this.changChengBaseInfo.sgbenificiary.length; i++) {
					if (this.changChengBaseInfo.sgbenificiary[i].rapidType === '2') {
						sgParam.push({'rapidType': this.changChengBaseInfo.sgbenificiary[i].rapidType, 'type': this.changChengBaseInfo.sgbenificiary[i].type})
					} else {
						sgParam.push(this.changChengBaseInfo.sgbenificiary[i])
					}
				}
				let params = {
					appntInfo: this.changChengBaseInfo.applicant,
					insuredInfo: this.changChengBaseInfo.insured,
					bankInfo: this.changChengBankDetail.bankInfo,
					beneInfo: sgParam.concat(this.changChengBaseInfo.scbenificiary),
					appntNoticeInfo: this.changchengHealthPolicy.appntNoticeInfo,
					insuredNoticeInfo: this.changchengHealthPolicy.insuredNoticeInfo,
					productInfo: {
						productId: this.changChengBaseInfo.productId
					},
					riskInfo: this.changChengPolicyInfo.allRisks,
					imgInfo: this.changChengCertificePic.cardPath,
					fsImgInfo: this.changChengCertificePic.yxjPath
				}

				confirmPolicyInfo(params).then(res => {
				if (res.ret === RET_OK) {
					if (res.data.code === CODE_OK) {
						this.loadingShow = false
						if (this.webStatus === true) { // 代理人
							this.$router.push({
								name: 'success-trial'
							})
						} else {
							this.$router.push({
								name: 'showTip'
							})
						}
					} else if (res.data.code === '600000') {
						this.loadingShow = false
						if (this.webStatus === true) { // 代理人
							this.urlparam = '100003'
							this.showConfirm(res.data.remarkMsg)
						} else {
							this.$router.push({
								name: 'showTip',
								params: {
									status: false,
									msg: res.data.remarkMsg
								}
							})
						}
					} else {
						this.loadingShow = false
						this.showConfirm(res.data.remarkMsg)
					}
				}
			})
		},
		...mapMutations({
			setChangChengCertificate: 'SET_LONGLIFE_CHANGCHENG_CERTIFICATEPIC',
			setChangChengBaseInfo: 'SET_LONGLIFE_CHANGCHENG_BASEINFO'
        })
	},
	components: {
		InfoFooter,
		SliderBar,
		ShowApplicantInfo,
		ShowInsuredInfo,
		ShowPolicy,
		ShowBankInfo,
		ShowHealthInfo,
		Split,
		Confirm,
		ClientConfirm,
		Loading
    }
}
</script>

<style lang='stylus' scoped>

</style>