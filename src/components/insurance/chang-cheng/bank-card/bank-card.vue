<template>
    <div class="applicantInfo">
		<div v-if='!loadingShow'>
			<slider-bar :defaultSelected='defaultSelected'></slider-bar>
			<split></split>
			<div class="detailTitle">
				<a class="titleLeft">银行卡信息</a>
			</div>
			<policy-comfirm-num :Info='Info'></policy-comfirm-num>
			<policy-num></policy-num>
			<bank-name :Info='Info'></bank-name>
			<account-name :Info='Info'></account-name>
			<account-num :Info='Info'></account-num>
			<benifit-bank-name :Info='Info'></benifit-bank-name>
			<benifit-account-name :Info='Info'></benifit-account-name>
			<benifit-account-num :Info='Info'></benifit-account-num>
            <fu-policy-go-on :Info='Info'></fu-policy-go-on>
			<yi-jiao-policy :Info='Info'></yi-jiao-policy>
            <unpay-policy :Info='Info'></unpay-policy>
			<sheng-cun-jin :Info='Info'></sheng-cun-jin>
		</div>
		<div id="applicantBirthDayContainer"></div>
		<div id="insuredBirthDayContainer"></div>
        <info-footer text="下一步" @next='_next' v-if='!loadingShow'></info-footer>
		<confirm  ref="confirm" :text="confirmText"></confirm>
		<loading v-if='loadingShow'></loading>
	</div>
</template>

<script>
import InfoFooter from 'base/footer/footer'
import Split from 'base/split/split'
import sliderBar from 'base/sliderBar/sliderBar'
import PolicyComfirmNum from 'components/insurance/chang-cheng/bank-card/child/policy-comfirm-num/policy-comfirm-num.vue'
import PolicyNum from 'components/insurance/chang-cheng/bank-card/child/policy-num/policy-num.vue'
import BankName from 'components/insurance/chang-cheng/bank-card/child/bank-name/bank-name.vue'
import AccountName from 'components/insurance/chang-cheng/bank-card/child/account-name/account-name.vue'
import AccountNum from 'components/insurance/chang-cheng/bank-card/child/account-num/account-num.vue'
import BenifitAccountName from 'components/insurance/chang-cheng/bank-card/child/benifit-account-name/benifit-account-name.vue'
import BenifitAccountNum from 'components/insurance/chang-cheng/bank-card/child/benifit-account-num/benifit-account-num.vue'
import BenifitBankName from 'components/insurance/chang-cheng/bank-card/child/benifit-bank-name/benifit-bank-name.vue'
import FuPolicyGoOn from 'components/insurance/chang-cheng/bank-card/child/fu-policy-go-on/fu-policy-go-on.vue'
import YiJiaoPolicy from 'components/insurance/chang-cheng/bank-card/child/yi-jiao-policy/yi-jiao-policy.vue'
import UnpayPolicy from 'components/insurance/chang-cheng/bank-card/child/unpay-policy/unpay-policy.vue'
import ShengCunJin from 'components/insurance/chang-cheng/bank-card/child/sheng-cun-jin/sheng-cun-jin.vue'
import {mapGetters, mapMutations} from 'vuex'
import {previewPolicyInfo} from 'api/long-life/chang-cheng/insurance.js'
import {RET_OK, CODE_OK} from 'service/variable.js'
import Confirm from 'base/confirm/confirm'
import {confirm} from 'common/js/mixin.js'
import Loading from 'base/loading/loading'
export default {
	mixins: [confirm],
	data () {
        return {
			confirmText: '',
			loadingShow: false,
			applicantLastObj: '',
			insuredLastObj: ''
        }
	},
	computed: {
		Info () {
			return {
				type: 'bankInfo',
				init: this.changChengBankDetail.init,
				defaultInsPolicyNo: this.changChengBankDetail.bankInfo.insPolicyNo,
				defaultInsBankName: this.changChengBankDetail.bankInfo.bank,
				defaultAccountName: this.changChengBankDetail.bankInfo.bankAccName,
				defaultAccountNum: this.changChengBankDetail.bankInfo.bankAccNo,
				defaultBenifitAccountName: this.changChengBankDetail.bankInfo.beneBankAccName,
				defaultBenifitAccountNum: this.changChengBankDetail.bankInfo.beneBankAccNo,
				defaultBenifitInsBankName: this.changChengBankDetail.bankInfo.beneBank,
				defaultFuPolicyGoOn: this.changChengBankDetail.bankInfo.isReInsurance,
				defaultYiJiaoPolicy: this.changChengBankDetail.bankInfo.treatmentOfInsurance,
				defaultUnpayPolicy: this.changChengBankDetail.bankInfo.optionOfInsurance,
				defaultShengcun: this.changChengBankDetail.bankInfo.aliveGetMode
			}
		},
		defaultSelected () {
			return 6
		},
		...mapGetters([
			'changChengBankDetail', 'changChengBaseInfo', 'changChengPolicyInfo', 'changchengHealthPolicy'
		])
	},
    methods: {
        _next () {
			if (this.changChengBankDetail.bankInfo.aliveGetMode === 'Y') {
				if (this.changChengBankDetail.bankInfo.insPolicyNo === '') {
					this.showConfirm('请检查投保单确认书号填写')
				} else if (this.changChengBankDetail.bankInfo.tradeNo === '') {
					this.showConfirm('请检查是否申请交易串号')
				} else if (this.changChengBankDetail.bankInfo.bank === '') {
					this.showConfirm('请检查开户银行选择')
				} else if (this.changChengBankDetail.bankInfo.bankAccName === '') {
					this.showConfirm('请检查账户名填写')
				} else if (this.changChengBankDetail.bankInfo.bankAccNo === '') {
					this.showConfirm('请检查账户号码填写')
				} else if (this.changChengBankDetail.bankInfo.isReInsurance === '') {
					this.showConfirm('请检查一年期内附加险是否自动续保选择')
				} else if (this.changChengBankDetail.bankInfo.treatmentOfInsurance === '') {
					this.showConfirm('请检查溢交保险费处理方式选择')
				} else if (this.changChengBankDetail.bankInfo.optionOfInsurance === '') {
					this.showConfirm('请检查保险费逾期未付选择')
				} else if (this.changChengBankDetail.bankInfo.beneBank === '') {
					this.showConfirm('请检查受益人开户银行选择')
				} else if (this.changChengBankDetail.bankInfo.beneBankAccName === '') {
					this.showConfirm('请检查受益人账户名填写')
				} else if (this.changChengBankDetail.bankInfo.beneBankAccNo === '') {
					this.showConfirm('请检查受益人账户号码填写')
				} else {
					this.setParams()
				}
			} else if (this.changChengBankDetail.bankInfo.aliveGetMode === 'N') {
				if (this.changChengBankDetail.bankInfo.insPolicyNo === '') {
					this.showConfirm('请检查投保单确认书号填写')
				} else if (this.changChengBankDetail.bankInfo.tradeNo === '') {
					this.showConfirm('请检查是否申请交易串号')
				} else if (this.changChengBankDetail.bankInfo.bank === '') {
					this.showConfirm('请检查开户银行选择')
				} else if (this.changChengBankDetail.bankInfo.bankAccName === '') {
					this.showConfirm('请检查账户名填写')
				} else if (this.changChengBankDetail.bankInfo.bankAccNo === '') {
					this.showConfirm('请检查账户号码填写')
				} else if (this.changChengBankDetail.bankInfo.isReInsurance === '') {
					this.showConfirm('请检查一年期内附加险是否自动续保选择')
				} else if (this.changChengBankDetail.bankInfo.treatmentOfInsurance === '') {
					this.showConfirm('请检查溢交保险费处理方式选择')
				} else if (this.changChengBankDetail.bankInfo.optionOfInsurance === '') {
					this.showConfirm('请检查保险费逾期未付选择')
				} else {
					this.setParams()
				}
			}
		},
		setParams () {
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
				for (let i = 0; i < this.changchengHealthPolicy.appntNoticeInfo.length; i++) {
                        if (this.changchengHealthPolicy.appntNoticeInfo[i].code === 'P425') {
                            this.changchengHealthPolicy.appntNoticeInfo.splice(i, 1)
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
					riskInfo: this.changChengPolicyInfo.allRisks
				}
				console.log(params)
				console.log('paramsparamsparamsparamsparams')
				previewPolicyInfo(params).then(res => {
					if (res.ret === RET_OK) {
						if (res.data.code === CODE_OK) {
							this.loadingShow = false
							this.$router.push({
								name: 'upload-card'
							})
						} else {
							this.loadingShow = false
							this.showConfirm(res.data.remarkMsg)
						}
					} else {
						this.loadingShow = false
						this.showConfirm(res.data.remarkMsg)
					}
				})
		},
		...mapMutations({
			setChangChengBaseInfo: 'SET_LONGLIFE_CHANGCHENG_BASEINFO'
		})
    },
    components: {
        InfoFooter,
		Split,
		PolicyComfirmNum,
		PolicyNum,
		BankName,
		AccountName,
		AccountNum,
		BenifitAccountName,
		BenifitAccountNum,
		BenifitBankName,
		FuPolicyGoOn,
		YiJiaoPolicy,
		UnpayPolicy,
		Confirm,
		sliderBar,
		ShengCunJin,
		Loading
    }
}
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable.styl'
@import '~common/stylus/mixin.styl'
.applicantInfo
	margin-bottom: (100/$scale)
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