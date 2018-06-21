<template>
    <div class="applicantInfo">
		<div class='insuredWarp' v-if='!loadingShow'>
			<slider-bar :defaultSelected='defaultSelected'></slider-bar>
			<split></split>
			<div class="detailTitle">
				<a class="titleLeft">被保人基本信息</a>
			</div>
			<name :Info='Info'></name>
			<sex :Info='Info'></sex>
			<card :Info='Info'></card>
			<card-effective-day :Info='Info'></card-effective-day>
			<birthday :Info='Info'></birthday>
			<split></split>
			<edu :Info='Info'></edu>
			<marrige :Info='Info'></marrige>
			<nation :Info='Info'></nation>
			<!-- 同投保人差异字段 -->
			<mobile-phone :Info='Info'></mobile-phone>
			<email :Info='Info'></email>
			<split></split>
			<div class="detailTitle">
				<a class="titleLeft">被保人联系地址</a>
			</div>
			<!-- 单位名称 -->
			<company-name :Info='Info'></company-name>
			<!-- 工作内容 -->
			<position-name :Info='Info'></position-name>
			<!-- 单位地址 -->
			<!-- <unit-single-address :Info='Info'></unit-single-address> -->
			<!-- 家庭地址 -->
			<!-- <home-address :Info='Info'></home-address> -->
			<home-zip-code :Info='Info'></home-zip-code>
			<home-phone :Info='Info'></home-phone>
			<!-- 现住址 -->
			<contact-address :Info='Info'></contact-address>
			<!-- 单位地址 -->
			<unit-address :Info='Info'></unit-address>
			<!-- 兼职 -->
			<part-time-job :Info='Info'></part-time-job>
			<split></split>
			<div class="detailTitle">
				<a class="titleLeft">被保人纳税身份声明</a>
			</div>
			<tax-people-info :Info='Info'></tax-people-info>
			<fei-ju-min-insured :Info='Info'></fei-ju-min-insured>
		</div>
        <info-footer text="下一步" @next='_next'></info-footer>
		<confirm  ref="confirm" :text="confirmText"></confirm>
		<loading v-if='loadingShow'></loading>
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
import TongXunAddress from 'components/insurance/chang-cheng/perfect-info/child/tong-xun-address/tong-xun-address.vue'
import CardEffectiveDay from 'components/insurance/chang-cheng/perfect-info/child/card-efffective-day/card-efffective-day.vue'
import Birthday from 'components/insurance/chang-cheng/perfect-info/child/birthday/birthday.vue'
import Marrige from 'components/insurance/chang-cheng/perfect-info/child/marrige/marrige.vue'
import Edu from 'components/insurance/chang-cheng/perfect-info/child/edu/edu.vue'
import Nation from 'components/insurance/chang-cheng/perfect-info/child/nation/nation.vue'
import Telephone from 'components/insurance/chang-cheng/perfect-info/child/telephone/telephone.vue'
import HomePhone from 'components/insurance/chang-cheng/perfect-info/child/home-phone/home-phone.vue'
import Email from 'components/insurance/chang-cheng/perfect-info/child/email/email.vue'
import ZipCode from 'components/insurance/chang-cheng/perfect-info/child/zipcode/zipcode.vue'
import HomeZipCode from 'components/insurance/chang-cheng/perfect-info/child/home-zipcode/home-zipcode.vue'
import ContactAddress from 'components/insurance/chang-cheng/perfect-info/child/contact-address/contact-address.vue'
import UnitAddress from 'components/insurance/chang-cheng/perfect-info/child/unit-address/unit-address.vue'
import TaxPeopleInfo from 'components/insurance/chang-cheng/perfect-info/child/tax-people-info/tax-people-info.vue'
import HomeAddress from 'components/insurance/chang-cheng/perfect-info/child/home-address/home-address.vue'
import PartTimeJob from 'components/insurance/chang-cheng/perfect-info/child/part-time-job/part-time-job.vue'
import FeiJuMinInsured from 'components/insurance/chang-cheng/perfect-info/child/fei-ju-min-insured/fei-ju-min-insured.vue'
import MobilePhone from 'components/insurance/chang-cheng/perfect-info/child/mobile-phone/mobile-phone.vue'
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
	},
	mounted () {
	},
	computed: {
		Info () {
			return {
				type: 'insured',
				defaultName: this.changChengBaseInfo.insured.name,
				defaultSex: this.changChengBaseInfo.insured.sex,
				defaultCardType: this.changChengBaseInfo.insured.cardType,
				defaultCardNum: this.changChengBaseInfo.insured.cardNo,
				defaultCardeEffectivDate: this.changChengBaseInfo.insured.iDValiDate,
				defaultBirthday: this.changChengBaseInfo.insured.birthday,
				defaultNation: this.changChengBaseInfo.insured.nation,
				defaultEdu: this.changChengBaseInfo.insured.edu,
				defaultMarrige: this.changChengBaseInfo.insured.marryState,
				defaultPhone: this.changChengBaseInfo.insured.mobile,
				defaultTelephone: this.changChengBaseInfo.insured.phone,
				defaultEmail: this.changChengBaseInfo.insured.email,
				defaultZipCode: this.changChengBaseInfo.insured.zipCode,
				defaultHomeZipCode: this.changChengBaseInfo.insured.homeZipCode,
				defaultContactAddress: this.changChengBaseInfo.insured.provinceName + this.changChengBaseInfo.insured.cityName + this.changChengBaseInfo.insured.countyName, // 现住址
				defaultContactAddressDetail: this.changChengBaseInfo.insured.streetName,
				defaultUnitAddress: this.changChengBaseInfo.insured.provinceName2 + this.changChengBaseInfo.insured.cityName2 + this.changChengBaseInfo.insured.countyName2, // 单位地址
				defaultUnitAddressDetail: this.changChengBaseInfo.insured.streetName2,
				defaultTaxPeopleInfo: this.changChengBaseInfo.insured.taxResident,
				defaultCardValidationType: this.changChengBaseInfo.insured.iDValiDateType,
				defaultHomeAddress: this.changChengBaseInfo.insured.homeAddress,
				defaultCompanyName: this.changChengBaseInfo.insured.grpName,
				defaultPositionName: this.changChengBaseInfo.insured.position,
				defaultPartTimeJob: this.changChengBaseInfo.insured.plurality,
				defaultPostalAddress: this.changChengBaseInfo.insured.postalAddress,
				defaultHomePhone: this.changChengBaseInfo.insured.homePhone
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
			if(this.changChengBaseInfo.insured.cardType === '') {
				this.showConfirm('请检查被保人证件类型选择')
			} else if (this.changChengBaseInfo.insured.cardNo === '') {
				this.showConfirm('请检查被保人身份证号码填写')
			} else if (this.changChengBaseInfo.insured.iDValiDateType === '') {
				this.showConfirm('请检查被保人证件有效期类型')
			} else if (this.changChengBaseInfo.insured.showEffectiveDate === true && this.changChengBaseInfo.insured.iDValiDate === '') {
				this.showConfirm('请检查被保人证件有效期日期')
			} else if (this.changChengBaseInfo.insured.edu === '') {
				this.showConfirm('请检查被保人教育程度选择')
			} else if (this.changChengBaseInfo.insured.marryState === '') {
				this.showConfirm('请检查被保人婚姻状况选择')
			} else if (this.changChengBaseInfo.insured.nation === '') {
				this.showConfirm('请检查被保人国籍选择')
			} else if (this.changChengBaseInfo.insured.mobile === '') {
				this.showConfirm('请检查被保人手机号码填写')
			} else if (this.changChengBaseInfo.insured.email === '') {
				this.showConfirm('请检查被保人邮箱填写')
			} else if (this.changChengBaseInfo.insured.grpName === '') {
				this.showConfirm('请检查被保人工作单位名称填写')
			} else if (this.changChengBaseInfo.insured.position === '') {
				this.showConfirm('请检查被保人工作内容填写')
			}else if (this.changChengBaseInfo.insured.homeZipCode === '') {
				this.showConfirm('请检查被保人家庭邮政编码填写')
			} else if (this.changChengBaseInfo.insured.homePhone === '') {
				this.showConfirm('请检查被保人家庭电话填写')
			} else if (this.changChengBaseInfo.insured.provinceName === '') {
				this.showConfirm('请检查被保人现住地地址选择')
			} else if (this.changChengBaseInfo.insured.streetName === '') {
				this.showConfirm('请检查被保人现住地详细地址填写')
			} else if (this.changChengBaseInfo.insured.provinceName2 === '') {
				this.showConfirm('请检查被保人学校/单位选择')
			} else if (this.changChengBaseInfo.insured.streetName2 === '') {
				this.showConfirm('请检查被保人学校/单位详细地址填写')
			} else if (this.changChengBaseInfo.insured.plurality === '') {
				this.showConfirm('请检查被保人兼职内容填写')
			} else if (this.changChengBaseInfo.insured.taxResident === '') {
				this.showConfirm('请检查被保人纳税身份选择')
			} else if (this.changChengBaseInfo.insured.taxResident === '2' || this.changChengBaseInfo.insured.taxResident === '3') {
				if (this.changChengBaseInfo.InsuredTaxBaseInfo.lName === '') {
					this.showConfirm('请检查被保人纳税人姓填写')
				} else if (this.changChengBaseInfo.InsuredTaxBaseInfo.tName === '') {
					this.showConfirm('请检查被保人纳税人名填写')
				} else if (this.changChengBaseInfo.InsuredTaxBaseInfo.birthDate === '') {
					this.showConfirm('请检查被保人纳税人出生日期填写')
				} else if (this.changChengBaseInfo.InsuredTaxBaseInfo.inAddressProvince === '') {
					this.showConfirm('请检查被保人纳税人现居地址(省)填写')
				} else if (this.changChengBaseInfo.InsuredTaxBaseInfo.inAddressCity === '') {
					this.showConfirm('请检查被保人纳税人现居地址(市)填写')
				} else if (this.changChengBaseInfo.InsuredTaxBaseInfo.inAddressCounty === '') {
					this.showConfirm('请检查被保人纳税人现居地址(县)填写')
				} else if (this.changChengBaseInfo.InsuredTaxBaseInfo.inAddressStreet === '') {
					this.showConfirm('请检查被保人纳税人现居地址街道填写')
				} else if (this.changChengBaseInfo.InsuredTaxBaseInfo.bornAddressProvince === '') {
					this.showConfirm('请检查被保人纳税人出生地(省)填写')
				} else if (this.changChengBaseInfo.InsuredTaxBaseInfo.bornAddressCity === '') {
					this.showConfirm('请检查被保人纳税人出生地(市)填写')
				} else if (this.changChengBaseInfo.InsuredTaxBaseInfo.bornAddressCounty === '') {
					this.showConfirm('请检查被保人纳税人出生地(县)填写')
				} else if (this.changChengBaseInfo.InsuredTaxBaseInfo.bornAddressStreet === '') {
					this.showConfirm('请检查被保人纳税人出生地街道填写')
				} else if (this.changChengBaseInfo.InsuredTaxBaseInfo.identificationNum === '' && this.changChengBaseInfo.InsuredTaxBaseInfo.reason === '') {
					this.showConfirm('请检查被保人纳税人税收居民国（地区）及纳税人识别号填写或者检查不能提供居民国（地区）纳税人识别号原因')
				} else if (this.changChengBaseInfo.InsuredTaxBaseInfo.reason === '2') {
					if (this.changChengBaseInfo.InsuredTaxBaseInfo.reasonInfo === '') {
						this.showConfirm('请检查被保人纳税人不能提供居民国（地区）纳税人识别号原因具体原因填写')
					}
				} else if (this.changChengBaseInfo.InsuredTaxBaseInfo.autograph === '') {
					this.showConfirm('请检查被保人纳税人签名人身份选择')
				} else {
					let bornAdd = this.changChengBaseInfo.InsuredTaxBaseInfo.bornAddressProvince + this.changChengBaseInfo.InsuredTaxBaseInfo.bornAddressCity + this.changChengBaseInfo.InsuredTaxBaseInfo.bornAddressCounty + this.changChengBaseInfo.InsuredTaxBaseInfo.bornAddressStreet
					let inAdd = this.changChengBaseInfo.InsuredTaxBaseInfo.inAddressProvince + this.changChengBaseInfo.InsuredTaxBaseInfo.inAddressCity + this.changChengBaseInfo.InsuredTaxBaseInfo.inAddressCounty + this.changChengBaseInfo.InsuredTaxBaseInfo.inAddressStreet
					this.setChangChengBaseInfo({
						field1: 'InsuredTaxBaseInfo',
						field2: 'bornAddress',
						value: bornAdd
					})
					this.setChangChengBaseInfo({
						field1: 'InsuredTaxBaseInfo',
						field2: 'inAddress',
						value: inAdd
					})
					if (this.changChengBaseInfo.insured.relaToAppntCode === '00') {
						if (this.changChengBaseInfo.applicant.mobile === '') {
							this.showConfirm('请检查被保人手机号码填写')
						} else {
							for (let i in this.changChengBaseInfo.insured) {
								for (let j in this.changChengBaseInfo.applicant) {
									if (i === j) {
										this.setChangChengBaseInfo({
											field1: 'applicant',
											field2: j, // 家庭邮编
											value: this.changChengBaseInfo.insured[i]
										})
									} else if (i === 'homeZipCode') {
										console.log('homeZipCode')
										this.setChangChengBaseInfo({
											field1: 'applicant',
											field2: 'zipCode', // 家庭邮编
											value: this.changChengBaseInfo.insured.homeZipCode
										})
										console.log('homeZipCode')
									}
								}
							}
							this.$router.push({
								name: 'perfect-benifit-info'
							})
						}
					} else {
						this.$router.push({
							name: 'perfect-benifit-info'
						})
					}
				}
			} else {
				if (this.changChengBaseInfo.insured.relaToAppntCode === '00') {
					if (this.changChengBaseInfo.insured.mobile === '') {
						this.showConfirm('请检查被保人手机号码填写')
					} else {
						for (let i in this.changChengBaseInfo.insured) {
							for (let j in this.changChengBaseInfo.applicant) {
								if (i === j) {
									this.setChangChengBaseInfo({
										field1: 'applicant',
										field2: j, // 家庭邮编
										value: this.changChengBaseInfo.insured[i]
									})
								} else if (i === 'homeZipCode') {
									console.log('homeZipCode')
									this.setChangChengBaseInfo({
										field1: 'applicant',
										field2: 'zipCode', // 家庭邮编
										value: this.changChengBaseInfo.insured.homeZipCode
									})
									console.log('homeZipCode')
								}
							}
						}
						this.$router.push({
							name: 'perfect-benifit-info'
						})
					}
				} else {
					this.$router.push({
						name: 'perfect-benifit-info'
					})
				}
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
		Telephone,
		HomePhone,
		Email,
		ZipCode,
		HomeZipCode,
		ContactAddress,
		UnitAddress,
		TaxPeopleInfo,
		FeiJuMinInsured,
		Confirm,
		CardEffectiveDay,
		HomeAddress,
		CompanyName,
		PositionName,
		Split,
		sliderBar,
		PartTimeJob,
		TongXunAddress,
		MobilePhone,
		Loading
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