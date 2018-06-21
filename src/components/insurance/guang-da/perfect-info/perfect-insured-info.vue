<template>
    <div class="applicantInfo">
		<slider-bar :defaultSelected="defaultSelected"></slider-bar>
		<div class='insuredWarp'>
			<div class="detailTitle">
				<a class="titleLeft">被保人信息</a>
			</div>
			<relationship :Info='Info'></relationship>
			<name :Info='Info'></name>
			<sex :Info='Info'></sex>
			<height :Info='Info'></height>
			<weight :Info='Info'></weight>
			<card :Info='Info'></card>
			<id-exp-date :Info='Info'></id-exp-date>
			<birthday :Info='Info'></birthday>
			<nation :Info='Info'></nation>
			<marrige :Info='Info'></marrige>
			<income :Info='Info'></income>	
			<phone :Info='Info'></phone>
			<email :Info='Info'></email>
			<zip-code :Info='Info'></zip-code>
			<grp-name :Info='Info'></grp-name>
			<contact-address :Info='Info'></contact-address>
			<div class="detailTitle">
				<a class="titleLeft">被保人纳税身份声明</a>
			</div>
			<tax-people-info :Info='Info'></tax-people-info>
			<tax-number :Info='Info'></tax-number>
		</div>
        <info-footer text="下一步" @next='_next'></info-footer>
		<confirm  ref="confirm" :text="confirmText"></confirm>
	</div>
</template>

<script>
import InfoFooter from 'base/footer/footer'
import sliderBar from 'base/sliderBar/sliderBar'
import Name from 'components/insurance/guang-da/common/child/name/name.vue'
import Relationship from 'components/insurance/guang-da/common/child/relationship/relationship.vue'
import Sex from 'components/insurance/guang-da/common/child/sex/sex.vue'
import Card from 'components/insurance/guang-da/common/child/card/card.vue'
import Birthday from 'components/insurance/guang-da/common/child/birthday/birthday.vue'
import Marrige from 'components/insurance/guang-da/common/child/marrige/marrige.vue'
import Nation from 'components/insurance/guang-da/common/child/nation/nation.vue'
import Income from 'components/insurance/guang-da/common/child/income/income.vue'
import Phone from 'components/insurance/guang-da/common/child/mobile-phone/mobile-phone.vue'
import Email from 'components/insurance/guang-da/common/child/email/email.vue'
import ZipCode from 'components/insurance/guang-da/common/child/zipcode/zipcode.vue'
import Height from 'components/insurance/guang-da/common/child/height/height.vue'
import Weight from 'components/insurance/guang-da/common/child/weight/weight.vue'
import IdExpDate from 'components/insurance/guang-da/common/child/idExpDate/idExpDate.vue'
import GrpName from 'components/insurance/guang-da/common/child/grpName/grpName.vue'
import ContactAddress from 'components/insurance/guang-da/common/child/contact-address/contact-address.vue'
import TaxPeopleInfo from 'components/insurance/guang-da/common/child/tax-people-info/tax-people-info.vue'
import TaxNumber from 'components/insurance/guang-da/common/child/taxnumber/taxnumber.vue'
import {RET_OK, CODE_OK} from 'service/variable.js'
import {mapGetters} from 'vuex'
import Confirm from 'base/confirm/confirm'
import {confirm} from 'common/js/mixin.js'
export default {
	mixins: [confirm],
    data () {
        return {
			defaultSelected: 3
        }
	},
	computed: {
		Info () {
			return {
				type: 'insurants',
				defaultName: this.guangdaTrail.policy.custInfo.insurants.insurant[0].name, // 姓名  1
				defaultSex: this.guangdaTrail.policy.custInfo.insurants.insurant[0].sex, // 性别  1 
				defaultIdType: this.guangdaTrail.policy.custInfo.insurants.insurant[0].idType, // 证件类型  1
				defaultIdNo: this.guangdaTrail.policy.custInfo.insurants.insurant[0].idNo, // 证件号码  1 
				defaultBirthday: this.guangdaTrail.policy.custInfo.insurants.insurant[0].birthday, // 生日 1 
				defaultappOccupation: this.guangdaTrail.policy.custInfo.insurants.insurant[0].insOccupation, // 职业名称 1
				defaultOccupationCode: this.guangdaTrail.policy.custInfo.insurants.insurant[0].occupationCode, // 职业代码 1
				defaultOccupationType: this.guangdaTrail.policy.custInfo.insurants.insurant[0].occupationType, // 职业类别 1
				defaultIncome: this.guangdaTrail.policy.custInfo.insurants.insurant[0].salary, // 年收入 1
				defaultRelToApp: this.guangdaTrail.policy.custInfo.insurants.insurant[0].relToApp, // 与投保人关系 1
				defaultNation: this.guangdaTrail.policy.custInfo.insurants.insurant[0].nativePlace, // 国籍 2
				defaultMarrige: this.guangdaTrail.policy.custInfo.insurants.insurant[0].marriage, // 婚姻状况 2 
				defaultMobile: this.guangdaTrail.policy.custInfo.insurants.insurant[0].mobile, // 手机 2
				defaultEmail: this.guangdaTrail.policy.custInfo.insurants.insurant[0].email, // 邮箱 2 
				defaultZipCode: this.guangdaTrail.policy.custInfo.insurants.insurant[0].zipCode, // 邮编 2 
				defaultHeight: this.guangdaTrail.policy.custInfo.insurants.insurant[0].stature, // 身高 2
				defaultWeight: this.guangdaTrail.policy.custInfo.insurants.insurant[0].avoirdupois, // 体重 2
				defaultGrpName: this.guangdaTrail.policy.custInfo.insurants.insurant[0].grpName, // 工作单位 2
				defaultIdExpDate: this.guangdaTrail.policy.custInfo.insurants.insurant[0].idExpDate, // 证件有效期 2
				defaultCommunity: this.guangdaPolicy.insuredCommunity, // 社区 2
				defaultStreet: this.guangdaPolicy.insuredStree, // 街道 2
				defaultPostalAddress: this.guangdaPolicy.insuredAlladress, // 联系地址 2
				defaultRelationId: this.guangdaPremiumRisk.insured.relationId, // 与投保人关系
				defaultTaxIdentity: this.guangdaTrail.policy.custInfo.insurants.insurant[0].insurantTaxInfo.taxIdentity,  // 税收居民身份
				defalutTin: this.guangdaTrail.policy.custInfo.insurants.insurant[0].insurantTaxInfo.taxInfoList.taxInfo[0].tin // 纳税人编号
			}
		},
		...mapGetters([
			'guangdaTrail',
			'guangdaPremiumRisk',
			'guangdaPolicy'
		])
	},
    methods: {
		_next () {
			if (!this.validate(this.Info)) {
				this.showConfirm('请查看被保人信息是否填写正确!')
                return false
			} else {
				this.$router.push({
                	path: '/guangdabeneficiary-detail'
				})
				
			}
		},
		validate (obj) {
			console.log('获取验证数据')
			console.log(obj)
			let flag = true
			for(let field in obj) {
				if (field === 'defalutTin' && obj[field] === '') {
					flag = false
				} else if (field === 'defaultBirthday' && obj[field] === '请选择出生日期') {
					flag = false
				} else if (field === 'defaultCommunity' && obj[field] === '') {
					flag = false
				} else if (field === 'defaultFamilyIncome' && obj[field] === '') {
					flag = false
				} else if (field === 'defaultGrpName' && obj[field] === '') {
					flag = false
				} else if (field === 'defaultHeight' && obj[field] === '') {
					flag = false
				} else if (field === 'defaultIdExpDate' && obj[field] === '请选择证件有效期') {
					flag = false
				} else if (field === 'defaultIdNo' && obj[field] === '') {
					flag = false
				}else if (field === 'defaultIdType' && obj[field] === '') {
					flag = false
				} else if (field === 'defaultIncome' && obj[field] === '') {
					flag = false
				} else if (field === 'defaultMarrige' && obj[field] === '') {
					flag = false
				} else if (field === 'occupationCode' && obj[field] === '') {
					flag = false
				} else if (field === 'defaultMobile' && obj[field] === '') {
					flag = false
				} else if (field === 'defaultName' && obj[field] === '') {
					flag = false
				} else if (field === 'defaultOccupationCode' && obj[field] === '') {
					flag = false
				}else if (field === 'defaultNation' && obj[field] === '') {
					flag = false
				} else if (field === 'defaultOccupationType' && obj[field] === '') {
					flag = false
				} else if (field === 'defaultPostalAddress' && obj[field] === '') {
					flag = false
				} else if (field === 'defaultResidentType' && obj[field] === '') {
					flag = false
				} else if (field === 'defaultSex' && obj[field] === '') {
					flag = false
				} else if (field === 'defaultStreet' && obj[field] === '') {
					flag = false
				} else if (field === 'defaultTaxIdentity' && obj[field] === '') {
					flag = false
				} else if (field === 'defaultWeight' && obj[field] === '') {
					flag = false
				} else if (field === 'defaultZipCode' && obj[field] === '') {
					flag = false
				} else if (field === 'defaultappOccupation' && obj[field] === '') {
					flag = false
				}
			}
			return flag
		}
    },
    components: {
		InfoFooter,
		Name,
		Sex,
		Relationship,
		Card,
		Birthday,
		Marrige,
		Nation,
		Phone,
		Email,
		Income,
		ZipCode,
		Height,
		Weight,
		IdExpDate,
		GrpName,
		ContactAddress,
		TaxPeopleInfo,
		TaxNumber,
		sliderBar,
		Confirm
    }
}
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable.styl'
@import '~common/stylus/mixin.styl'
.insuredWarp
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