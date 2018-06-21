<template>
    <div class="applicantInfo">
		<div class='insuredWarp'>
			<slider-bar :defaultSelected='defaultSelected'></slider-bar>
			<split></split>
			<div class="detailTitle">
				<a class="titleLeft">投保人基本信息</a>
			</div>
			<name :Info='Info'></name>
			<sex :Info='Info'></sex>
			<card :Info='Info'></card>
			<card-effective-day :Info='Info'></card-effective-day>
			<birthday :Info='Info'></birthday>
			<split></split>
			<nation :Info='Info'></nation>
			<edu :Info='Info'></edu>
			<marrige :Info='Info'></marrige>
			<mobile-phone :Info='Info'></mobile-phone>
			<email :Info='Info'></email>
			<split></split>
			<div class="detailTitle">
				<a class="titleLeft">投保人联系地址</a>
			</div>
			<!-- 单位名称 -->
			<company-name :Info='Info'></company-name>
			<!-- 工作内容 -->
			<position-name :Info='Info'></position-name>
			<!-- 单位/学校地址 -->
			<unit-address :Info='Info'></unit-address>
			<!-- 现住址 -->
			<contact-address :Info='Info'></contact-address>
			<!-- 现居邮编 -->
			<zip-code :Info='Info'></zip-code>
			<!-- 兼职 -->
			<part-time-job :Info='Info'></part-time-job>
			<split></split>
			<div class="detailTitle">
				<a class="titleLeft">投保人纳税身份声明</a>
			</div>
			<tax-people-info :Info='Info'></tax-people-info>
			<fei-ju-min :Info='Info'></fei-ju-min>
		</div>
        <info-footer text="下一步" @next='_next'></info-footer>
		<confirm  ref="confirm" :text="confirmText"></confirm>
	</div>
</template>

<script>
import InfoFooter from 'base/footer/footer'
import Split from 'base/split/split'
import sliderBar from 'base/sliderBar/sliderBar'
import Name from 'components/insurance/chang-cheng/perfect-info/child/name/name.vue'
import CompanyName from 'components/insurance/chang-cheng/perfect-info/child/company-name/company-name.vue'
import PositionName from 'components/insurance/chang-cheng/perfect-info/child/position-name/position-name.vue'
import Sex from 'components/insurance/chang-cheng/perfect-info/child/sex/sex.vue'
import Card from 'components/insurance/chang-cheng/perfect-info/child/card/card.vue'
import CardEffectiveDay from 'components/insurance/chang-cheng/perfect-info/child/card-efffective-day/card-efffective-day.vue'
import Birthday from 'components/insurance/chang-cheng/perfect-info/child/birthday/birthday.vue'
import Marrige from 'components/insurance/chang-cheng/perfect-info/child/marrige/marrige.vue'
import Edu from 'components/insurance/chang-cheng/perfect-info/child/edu/edu.vue'
import Nation from 'components/insurance/chang-cheng/perfect-info/child/nation/nation.vue'
import MobilePhone from 'components/insurance/chang-cheng/perfect-info/child/mobile-phone/mobile-phone.vue'
import HomeAddress from 'components/insurance/chang-cheng/perfect-info/child/home-address/home-address.vue'
import TongXunAddress from 'components/insurance/chang-cheng/perfect-info/child/tong-xun-address/tong-xun-address.vue'
import Email from 'components/insurance/chang-cheng/perfect-info/child/email/email.vue'
import ZipCode from 'components/insurance/chang-cheng/perfect-info/child/zipcode/zipcode.vue'
import PartTimeJob from 'components/insurance/chang-cheng/perfect-info/child/part-time-job/part-time-job.vue'
import HomeZipCode from 'components/insurance/chang-cheng/perfect-info/child/home-zipcode/home-zipcode.vue'
import ContactAddress from 'components/insurance/chang-cheng/perfect-info/child/contact-address/contact-address.vue'
import UnitAddress from 'components/insurance/chang-cheng/perfect-info/child/unit-address/unit-address.vue'
import TaxPeopleInfo from 'components/insurance/chang-cheng/perfect-info/child/tax-people-info/tax-people-info.vue'
import FeiJuMin from 'components/insurance/chang-cheng/perfect-info/child/fei-ju-min/fei-ju-min.vue'
import {mapGetters, mapMutations} from 'vuex'
import Confirm from 'base/confirm/confirm'
import {confirm} from 'common/js/mixin.js'
export default {
	mixins: [confirm],
    data () {
        return {
			baseInfoDefault: {}, // 设置初始值
			confirmText: '',
			defaultAreaData: {}
        }
	},
	created () {
	},
	mounted () {
	},
	computed: {
		Info () {
			return {
				type: 'applicant',
				defaultName: this.changChengBaseInfo.applicant.name,
				defaultSex: this.changChengBaseInfo.applicant.sex,
				defaultCardType: this.changChengBaseInfo.applicant.cardType,
				defaultCardeEffectivDate: this.changChengBaseInfo.applicant.iDValiDate,
				defaultCardNum: this.changChengBaseInfo.applicant.cardNo,
				defaultBirthday: this.changChengBaseInfo.applicant.birthday,
				defaultNation: this.changChengBaseInfo.applicant.nation,
				defaultEdu: this.changChengBaseInfo.applicant.edu,
				defaultMarrige: this.changChengBaseInfo.applicant.marryState,
				defaultPhone: this.changChengBaseInfo.applicant.mobile,
				defaultEmail: this.changChengBaseInfo.applicant.email,
				defaultZipCode: this.changChengBaseInfo.applicant.zipCode,
				defaultHomeZipCode: this.changChengBaseInfo.applicant.homeZipCode,
				defaultContactAddress: this.changChengBaseInfo.applicant.provinceName + this.changChengBaseInfo.applicant.cityName + this.changChengBaseInfo.applicant.countyName, // 现住址
				defaultContactAddressDetail: this.changChengBaseInfo.applicant.streetName,
				defaultUnitAddress: this.changChengBaseInfo.applicant.provinceName2 + this.changChengBaseInfo.applicant.cityName2 + this.changChengBaseInfo.applicant.countyName2, // 单位/学校住址
				defaultUnitAddressDetail: this.changChengBaseInfo.applicant.streetName2,
				defaultTaxPeopleInfo: this.changChengBaseInfo.applicant.taxResident,
				defaultCardValidationType: this.changChengBaseInfo.applicant.iDValiDateType,
				defaultHomeAddress: this.changChengBaseInfo.applicant.homeAddress, // 家庭地址
				defaultTongXunAddress: this.changChengBaseInfo.applicant.address, // 通讯地址
				defaultCompanyName: this.changChengBaseInfo.applicant.grpName,
				defaultPositionName: this.changChengBaseInfo.applicant.position,
				defaultPartTimeJob: this.changChengBaseInfo.applicant.plurality,
				defaultPostalAddress: this.changChengBaseInfo.applicant.postalAddress, // 单位住址
				areaList: this.defaultAreaData
			}
		},
		defaultSelected () {
			return 3
		},
		...mapGetters([
			'changChengBaseInfo'
		])
	},
    methods: {
		_next () {
			if (this.changChengBaseInfo.applicant.cardType === '') {
				this.showConfirm('请检查投保人证件类型选择')
			} else if (this.changChengBaseInfo.applicant.cardNo === '') {
				this.showConfirm('请检查投保人身份证号码填写')
			} else if (this.changChengBaseInfo.applicant.iDValiDateType === '') {
				this.showConfirm('请检查投保人证件有效期类型')
			} else if (this.changChengBaseInfo.applicant.showEffectiveDate === true && this.changChengBaseInfo.applicant.iDValiDate === '') {
				this.showConfirm('请检查投保人证件有效期日期')
			} else if (this.changChengBaseInfo.applicant.nation === '') {
				this.showConfirm('请检查投保人国籍选择')
			} else if (this.changChengBaseInfo.applicant.edu === '') {
				this.showConfirm('请检查投保人教育程度选择')
			} else if (this.changChengBaseInfo.applicant.marryState === '') {
				this.showConfirm('请检查投保人婚姻状况选择')
			} else if (this.changChengBaseInfo.applicant.mobile === '') {
				this.showConfirm('请检查投保人手机号码填写')
			} else if (this.changChengBaseInfo.applicant.email === '') {
				this.showConfirm('请检查投保人电子邮箱填写')
			} else if (this.changChengBaseInfo.applicant.grpName === '') {
				this.showConfirm('请检查投保人工作单位名称填写')
			} else if (this.changChengBaseInfo.applicant.position === '') {
				this.showConfirm('请检查投保人工作内容填写')
			} else if (this.changChengBaseInfo.applicant.provinceName2 === '') {
				this.showConfirm('请检查投保人学校/单位选择')
			} else if (this.changChengBaseInfo.applicant.streetName2 === '') {
				this.showConfirm('请检查投保人学校/单位详细地址填写')
			} else if (this.changChengBaseInfo.applicant.provinceName === '') {
				this.showConfirm('请检查投保人现住地地址选择')
			} else if (this.changChengBaseInfo.applicant.streetName === '') {
				this.showConfirm('请检查投保人现住地详细地址填写')
			} else if (this.changChengBaseInfo.applicant.zipCode === '') {
				this.showConfirm('请检查投保人现居邮编')
			} else if (this.changChengBaseInfo.applicant.plurality === '') {
				this.showConfirm('请检查投保人兼职内容填写')
			} else if (this.changChengBaseInfo.applicant.taxResident === '') {
				this.showConfirm('请检查投保人纳税身份选择')
			} else if (this.changChengBaseInfo.applicant.taxResident === '2' || this.changChengBaseInfo.applicant.taxResident === '3') {
				console.log('请检查投保人纳税人')
				if (this.changChengBaseInfo.ApplicantTaxBaseInfo.lName === '') {
					this.showConfirm('请检查投保人纳税人姓填写')
				} else if (this.changChengBaseInfo.ApplicantTaxBaseInfo.tName === '') {
					this.showConfirm('请检查投保人纳税人名填写')
				} else if (this.changChengBaseInfo.ApplicantTaxBaseInfo.birthDate === '') {
					this.showConfirm('请检查投保人纳税人出生日期填写')
				} else if (this.changChengBaseInfo.ApplicantTaxBaseInfo.inAddressProvince === '') {
					this.showConfirm('请检查投保人纳税人现居地址(省)填写')
				} else if (this.changChengBaseInfo.ApplicantTaxBaseInfo.inAddressCity === '') {
					this.showConfirm('请检查投保人纳税人现居地址(市)填写')
				} else if (this.changChengBaseInfo.ApplicantTaxBaseInfo.inAddressCounty === '') {
					this.showConfirm('请检查投保人纳税人现居地址(县)填写')
				} else if (this.changChengBaseInfo.ApplicantTaxBaseInfo.inAddressStreet === '') {
					this.showConfirm('请检查投保人纳税人现居地址街道填写')
				} else if (this.changChengBaseInfo.ApplicantTaxBaseInfo.bornAddressProvince === '') {
					this.showConfirm('请检查投保人纳税人出生地(省)填写')
				} else if (this.changChengBaseInfo.ApplicantTaxBaseInfo.bornAddressCity === '') {
					this.showConfirm('请检查投保人纳税人出生地(市)填写')
				} else if (this.changChengBaseInfo.ApplicantTaxBaseInfo.bornAddressCounty === '') {
					this.showConfirm('请检查投保人纳税人出生地(县)填写')
				} else if (this.changChengBaseInfo.ApplicantTaxBaseInfo.bornAddressStreet === '') {
					this.showConfirm('请检查投保人纳税人出生地街道填写')
				} else if (this.changChengBaseInfo.ApplicantTaxBaseInfo.identificationNum === '' && this.changChengBaseInfo.ApplicantTaxBaseInfo.reason === '') {
					this.showConfirm('请检查投保人纳税人税收居民国（地区）及纳税人识别号填写或者检查不能提供居民国（地区）纳税人识别号原因')
				} else if (this.changChengBaseInfo.ApplicantTaxBaseInfo.reason === '2') {
					if (this.changChengBaseInfo.ApplicantTaxBaseInfo.reasonInfo === '') {
						this.showConfirm('请检查投保人纳税人不能提供居民国（地区）纳税人识别号原因具体原因填写')
					} else {
						this.$router.push({
							name: 'perfect-insured-info'
						})
					}
				} else if (this.changChengBaseInfo.ApplicantTaxBaseInfo.autograph === '') {
					this.showConfirm('请检查投保人纳税人签名人身份选择')
				} else {
					let bornAdd = this.changChengBaseInfo.ApplicantTaxBaseInfo.bornAddressProvince + this.changChengBaseInfo.ApplicantTaxBaseInfo.bornAddressCity + this.changChengBaseInfo.ApplicantTaxBaseInfo.bornAddressCounty + this.changChengBaseInfo.ApplicantTaxBaseInfo.bornAddressStreet
					let inAdd = this.changChengBaseInfo.ApplicantTaxBaseInfo.inAddressProvince + this.changChengBaseInfo.ApplicantTaxBaseInfo.inAddressCity + this.changChengBaseInfo.ApplicantTaxBaseInfo.inAddressCounty + this.changChengBaseInfo.ApplicantTaxBaseInfo.inAddressStreet
					this.setChangChengBaseInfo({
						field1: 'ApplicantTaxBaseInfo',
						field2: 'bornAddress',
						value: bornAdd
					})
					this.setChangChengBaseInfo({
						field1: 'ApplicantTaxBaseInfo',
						field2: 'inAddress',
						value: inAdd
					})
					this.$router.push({
						name: 'perfect-insured-info'
					})
				}
			} else {
				// console.log(params)
				this.$router.push({
					name: 'perfect-insured-info'
				})
			}
		},
		...mapMutations({
			setChangChengBaseInfo: 'SET_LONGLIFE_CHANGCHENG_BASEINFO'
		})
    },
    components: {
		InfoFooter,
		Name,
		Sex,
		Card,
		Birthday,
		Marrige,
		Edu,
		Nation,
		MobilePhone,
		Email,
		ZipCode,
		HomeZipCode,
		ContactAddress,
		UnitAddress,
		TaxPeopleInfo,
		CardEffectiveDay,
		Confirm,
		HomeAddress,
		CompanyName,
		PositionName,
		Split,
		sliderBar,
		TongXunAddress,
		PartTimeJob,
		FeiJuMin
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