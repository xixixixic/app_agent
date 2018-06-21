<template>
    <div class="applicantInfo">
		<slider-bar :defaultSelected="defaultSelected"></slider-bar>
		<div class='insuredWarp'>
			<sg-benifit-info></sg-benifit-info>
			<sc-benifit-info></sc-benifit-info>
			<split></split>
		</div>
        <info-footer text="下一步" @next='_next'></info-footer>
		<confirm  ref="confirm" :text="confirmText"></confirm>
	</div>
</template>

<script>
import InfoFooter from 'base/footer/footer'
import sliderBar from 'base/sliderBar/sliderBar'
import SgBenifitInfo from 'components/insurance/guang-da/common/child/sgbenifit-info/sgbenifit-info.vue'
import ScBenifitInfo from 'components/insurance/guang-da/common/child/scbenifit-info/scbenifit-info.vue'
import Split from 'base/split/split'
import {RET_OK, CODE_OK} from 'service/variable.js'
import Confirm from 'base/confirm/confirm'
import {confirm} from 'common/js/mixin.js'
import {mapGetters, mapMutations} from 'vuex'
export default {
	mixins: [confirm],
    data () {
        return {
			defaultSelected: 3
        }
	},
	computed: {
		...mapGetters([
			'guangdaTrail',
			'guangdaPremiumRisk'
		]),
		bnfCount () {
			return this.guangdaTrail.policy.custInfo.bnfInfo.beneficiaries.beneficiary.length
		},
		sAccountName () {
			return this.guangdaTrail.policy.policyInfo.sAccountName
		},
		sBankName () {
			return this.guangdaTrail.policy.policyInfo.sBankName
		},
		sBankNo () {
			return this.guangdaTrail.policy.policyInfo.sBankNo
		},
		bfcyRatio () {
			let num = 0
			if (this.bnfCount > 0) {
				this.guangdaTrail.policy.custInfo.bnfInfo.beneficiaries.beneficiary.map((item, index, arr) =>{
					if (item.bfcyRatio !== '') {
						num += parseInt(item.bfcyRatio)
					}
				})
				return num
			}
		}
	},
    methods: {
		_next () {
			// 检查身故受益人信息
			let vm = this
			let bnfInfo = vm.guangdaTrail.policy.custInfo.bnfInfo
			let bnfArr = bnfInfo.beneficiaries.beneficiary
			let bnfType = bnfInfo.bnfType
			let flag, flag1
			if (bnfType === '0' || bnfType === '1') {
				if (bnfType === '1') {
					if (bnfArr.length > 0) {
						bnfArr.map ((item, index, arr) => {
							if (item.bfcyBirthday === this.guangdaPremiumRisk.insured.birthday) {
								vm.showConfirm('请检查身故受益人年龄是否填写正确')
								flag = false
							} else if (!vm.validate(item)) {
									vm.showConfirm('请检查身故受益人信息是否填写完整')
									flag = false
                   			} else {
								if (vm.bfcyRatio !== 100) {
									vm.showConfirm('单个或多个受益人的比例,总共应该为100')
									flag = false
								} else {
									flag = true
								}
							}
						})
					} else {
						vm.showConfirm('请添加指定身故受益人!')
						flag = false
                		// return false
					}
				} else {
					flag = true
				}
			}
				// 检查生存受益人信息
				if (vm.sAccountName === '' || vm.sBankName === '' || vm.sBankNo === '') {
					vm.showConfirm('请检查生存受益人信息是否填写完整!')
					flag1 = false
					// return false
				} else {
					flag1 = true
				}
			if (flag && flag1) {
				vm.SET_LONGLIFE_GUANGDA_POLICYINFO({
					type: 4,
					field1: 'bnfInfo',
					field2: 'beneficiaries',
					field3: 'bnfCount',
					value: vm.bnfCount
				})
				vm.$router.push({
					// path: '/guangdabank-card'
					path: 'guangdahealth-told'
				})
			}
		},
		...mapMutations({
            SET_LONGLIFE_GUANGDA_POLICYINFO: 'SET_LONGLIFE_GUANGDA_POLICYINFO'
		}),
		validate (obj) {
			let flag = true
			for(let field in obj) {
				if (field === 'bfcyBirthday' && obj[field] === '请选择出生日期') {
					flag = false
				} else if (field === 'belongWith' && obj[field] === '') {
					flag = false
				} else if (field === 'bfcyIdCode' && obj[field] === '') {
					flag = false
				} else if (field === 'bfcyIdExpDate' && obj[field] === '请选择证件有效期') {
					flag = false
				} else if (field === 'bfcyIdType' && obj[field] === '') {
					flag = false
				} else if (field === 'bfcyLevel' && obj[field] === '') {
					flag = false
				} else if (field === 'bfcyName' && obj[field] === '') {
					flag = false
				} else if (field === 'bfcyRatio' && obj[field] === '') {
					flag = false
				} else if (field === 'bfcySex' && obj[field] === '') {
					flag = false
				} else if (field === 'relToIns' && obj[field] === '') {
					flag = false
				}
			}
			return flag
		},
    },
    components: {
		InfoFooter,
		Split,
		SgBenifitInfo,
		ScBenifitInfo,
		sliderBar,
		Confirm
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