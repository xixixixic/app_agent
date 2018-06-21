<template>
    <div class="applicantInfo">
		<div v-if='!loadingShow'>
			<slider-bar :defaultSelected='defaultSelected'></slider-bar>
			<split></split>
			<applicant :defaultValue='defaultValue' ref='applicantRef' @firstPage='changeValue'></applicant>
			<split></split>
			<insured :defaultValue='defaultValue' ref='insuredRef'></insured>
			<info-footer text="下一步" @next='_next'></info-footer>
		</div>
		<confirm  ref="confirm" :text="confirmText"></confirm>
		<loading v-if='loadingShow'></loading>
	</div>
</template>

<script>
import InfoFooter from 'base/footer/footer'
import Split from 'base/split/split'
import sliderBar from 'base/sliderBar/sliderBar'
import Applicant from 'components/insurance/chang-cheng/base-info/child/applicant/applicant.vue'
import Insured from 'components/insurance/chang-cheng/base-info/child/insured/insured.vue'
import {baseInfo, submitBaseInfo} from 'api/long-life/chang-cheng/insurance.js'
import {selectAllArea} from 'api/car/du-bang/insurance.js'
import {RET_OK, CODE_OK} from 'service/variable.js'
import {mapGetters, mapMutations} from 'vuex'
import Confirm from 'base/confirm/confirm'
import {confirm} from 'common/js/mixin.js'
import Loading from 'base/loading/loading'
export default {
	mixins: [confirm],
    data () {
        return {
			baseInfoDefault: {}, // 设置初始值
			confirmText: '',
			loadingShow: false
        }
	},
	created () {
		this.setDefault()
	},
	mounted () {
	},
	computed: {
		defaultValue () {
			return this.baseInfoDefault
		},
		defaultSelected () {
			return 1
		},
		...mapGetters([
			'changChengBaseInfo', 'changChengPolicyInfo'
		])
	},
    methods: {
        _next () {
			if (this.changChengBaseInfo.applicant.name === '') {
				this.showConfirm('请检查投保人姓名填写')
			} else if (this.changChengBaseInfo.applicant.sex === '') {
				this.showConfirm('请检查投保人性别选择')
			} else if (this.changChengBaseInfo.applicant.birthday === '') {
				this.showConfirm('请检查投保人出生日期选择')
			} else if (this.changChengBaseInfo.applicant.jobCode === '') {
				this.showConfirm('请检查投保人职业名称选择')
			} else if (this.changChengBaseInfo.insured.relaToAppntCode === '') {
				this.showConfirm('请检查被保人与投保人关系选择')
			} else if (this.changChengBaseInfo.insured.relaToAppntCode === '00') {
				if (this.changChengBaseInfo.applicant.name !== this.changChengBaseInfo.insured.name) {
					this.showConfirm('投被保人姓名不一致，不是本人')
				} else if (this.changChengBaseInfo.applicant.sex !== this.changChengBaseInfo.insured.sex) {
					this.showConfirm('投被保人性别不一致，不是本人')
				} else if (this.changChengBaseInfo.applicant.birthday !== this.changChengBaseInfo.insured.birthday) {
					this.showConfirm('投被保人生日不一致，不是本人')
				} else if (this.changChengBaseInfo.applicant.jobCode !== this.changChengBaseInfo.insured.jobCode) {
					this.showConfirm('投被保人职位不一致，不是本人')
				} else {
					this.sendRequest()
				}
			} else if (this.changChengBaseInfo.insured.name === '') {
				this.showConfirm('请检查被保人姓名填写')
			} else if (this.changChengBaseInfo.insured.sex === '') {
				this.showConfirm('请检查被保人性别选择')
			} else if (this.changChengBaseInfo.insured.birthday === '') {
				this.showConfirm('请检查被保人出生日期选择')
			} else if (this.changChengBaseInfo.insured.jobCode === '') {
				this.showConfirm('请检查被保人职业名称选择')
			} else {
				this.sendRequest()
			}
		},
		sendRequest () {
			this.loadingShow = true
			console.log(this.changChengBaseInfo.productId)
			console.log(typeof this.changChengBaseInfo.productId)
			console.log(this.changChengBaseInfo.productId.toString())
			console.log(typeof this.changChengBaseInfo.productId.toString())
			let params = {
				productInfo: {
					productId: this.changChengBaseInfo.productId.toString()
				},
				appntBaseInfo: this.changChengBaseInfo.applicant,
				insuredBaseInfo: this.changChengBaseInfo.insured
			}
			submitBaseInfo(params).then(res => {
				if (res.ret === RET_OK) {
					if (res.data.code === CODE_OK) {
						this.loadingShow = false
						this.setChangChengPolicyInfo({
							field1: 'minMoney',
							value: res.data.minAmount
						})
						this.setChangChengPolicyInfo({
							field1: 'addRate',
							value: res.data.amountIncreaRatio
						})
						this.setChangChengPolicyInfo({
							field1: 'minPremium',
							value: res.data.minPremium
						})
						this.setChangChengPolicyInfo({
							field1: 'premiumIncreaRatio',
							value: res.data.premiumIncreaRatio
						})
						this.setChangChengPolicyInfo({
							field1: 'flag',
							value: res.data.flag
						})
						this.setChangChengBaseInfo({
							field1: 'backStatus',
							value: true
						})
						this.$router.push({
							name: 'choose-policy'
						})
					} else {
						this.loadingShow = false
						this.showConfirm(res.data.remarkMsg)
					}
				}
			})
		},
		setDefault () {
			this.loadingShow = true
			baseInfo().then(res => {
				if (res.ret === RET_OK) {
					if (res.data.code === CODE_OK) {
						this.loadingShow = false
						this.baseInfoDefault = res.data
						this.setChangChengBaseInfo({
							field1: 'relationList',
							value: res.data.relaToAppntCode
						})
					} else {
						this.loadingShow = false
						this.showConfirm(res.msg)
					}
				}
			})
		},
		changeValue () {
			this.setChangChengBaseInfo({
				field1: 'insured',
				field2: 'name',
				value: this.changChengBaseInfo.applicant.name
			})
		},
		...mapMutations({
			setChangChengBaseInfo: 'SET_LONGLIFE_CHANGCHENG_BASEINFO',
			setChangChengPolicyInfo: 'SET_LONGLIFE_CHANGCHENG_POLICYINFO'
		})
    },
    components: {
        InfoFooter,
		Split,
		Applicant,
		Insured,
		Confirm,
		Loading,
		sliderBar
    }
}
</script>

<style lang='stylus' scoped>
</style>