<template>
    <div class="applicantInfo">
		<div class='insuredWarp'>
			<slider-bar :defaultSelected='defaultSelected'></slider-bar>
			<split></split>
			<sg-benifit-info :Info='Info' :list='list'></sg-benifit-info>
			<sc-benifit-info :Info='Info' :list='list'></sc-benifit-info>
			<split></split>
		</div>
        <info-footer text="下一步" @next='_next'></info-footer>
		<confirm  ref="confirm" :text="confirmText"></confirm>
	</div>
</template>

<script>
import InfoFooter from 'base/footer/footer'
import sliderBar from 'base/sliderBar/sliderBar'
import SgBenifitInfo from 'components/insurance/chang-cheng/perfect-info/child/sgbenifit-info/sgbenifit-info.vue'
import ScBenifitInfo from 'components/insurance/chang-cheng/perfect-info/child/scbenifit-info/scbenifit-info.vue'
import Name from 'components/insurance/chang-cheng/perfect-info/child/name/name.vue'
import Sex from 'components/insurance/chang-cheng/perfect-info/child/sex/sex.vue'
import Card from 'components/insurance/chang-cheng/perfect-info/child/card/card.vue'
import Birthday from 'components/insurance/chang-cheng/perfect-info/child/birthday/birthday.vue'
import Nation from 'components/insurance/chang-cheng/perfect-info/child/nation/nation.vue'
import Split from 'base/split/split'
import {baseInfo} from 'api/long-life/chang-cheng/insurance.js'
import {RET_OK, CODE_OK} from 'service/variable.js'
import {mapGetters} from 'vuex'
import Confirm from 'base/confirm/confirm'
import {confirm} from 'common/js/mixin.js'
export default {
	mixins: [confirm],
    data () {
        return {
			baseInfoDefault: {}, // 设置初始值
			confirmText: '',
			defaultScLot: 0,
			defaultScGrade: 0,
			maxScGrade: '',
			defaultLot: 0,
			defaultGrade: 0,
			maxGrade: ''
        }
	},
	computed: {
		Info () {
			return {
				type: 'benificiary',
				defaultSgType: this.changChengBaseInfo.benificiary.sgType,
				defaultScType: this.changChengBaseInfo.benificiary.scType
			}
		},
		list () {
			return this.baseInfoDefault
		},
		defaultSelected () {
			return 3
		},
		...mapGetters([
			'changChengBaseInfo'
		])
	},
	created () {
		this.setDefault()
	},
    methods: {
		clientChoice (pos) {
			return {
				typeField: 'applicantList#' + pos
			}
		},
		setDefault () {
			baseInfo().then(res => {
				if (res.ret === RET_OK) {
					if (res.data.code === CODE_OK) {
						this.loadingShow = false
						this.baseInfoDefault = res.data
					} else {
						this.loadingShow = false
						this.showConfirm(res.msg)
					}
				}
			})
		},
		_next () {
			if (this.changChengBaseInfo.sgbenificiary.length === 0) {
				this.showConfirm('请检查是否选择身故受益人类型或者是否填写详细受益人信息')
			} else if (this.changChengBaseInfo.scbenificiary.length === 0) {
				this.showConfirm('请检查是否选择生存受益人类型或者是否填写详细受益人信息')
			} else {
					if (this.changChengBaseInfo.benificiary.sgType === '2') { // 受益人选的其他
						this.checkSgNull()
					} else if (this.changChengBaseInfo.benificiary.scType === '2') {
						this.checkScNull()
					} else {
						this.oneParam()
					}
			}
		},
		oneParam () { // 身故受益人是法定
			let sgParam = []
			for (let i = 0; i < this.changChengBaseInfo.sgbenificiary.length; i++) {
				if (this.changChengBaseInfo.sgbenificiary[i].rapidType === '2') {
					sgParam.push({'rapidType': this.changChengBaseInfo.sgbenificiary[i].rapidType, 'type': this.changChengBaseInfo.sgbenificiary[i].type})
				}
			}
			if (sgParam.length !== 0) {
				// let params = {
				// 	flag: '3',
				// 	beneBaseInfo: sgParam.concat(this.changChengBaseInfo.scbenificiary)
				// }
				// perFectBaseInfo(params).then(res => {
				// 	if (res.ret === RET_OK) {
				// 		if (res.data.code === CODE_OK) {
							this.$router.push({
								name: 'health-told'
							})
				// 		} else {
				// 			this.showConfirm(res.data.remarkMsg)
				// 		}
				// 	}
				// })
			} else {
				this.twoParam()
			}
		},
		twoParam () { // 两个受益人都是其他
			this.$router.push({
				name: 'health-told'
			})
		},
		checkScNull () { // 判断生存受益人内容是否全部填写
			for (let i = 0; i < this.changChengBaseInfo.scbenificiary.length; i++) {
			let j = i + 1
				if (this.changChengBaseInfo.scbenificiary[i].name === '') {
					this.showConfirm('请检查生存受益人' + j + '姓名填写')
					return false
				} else if (this.changChengBaseInfo.scbenificiary[i].birthday === '') {
					this.showConfirm('请检查生存受益人' + j + '出生日期选择')
					return false
				} else if (this.changChengBaseInfo.scbenificiary[i].cardNo === '') {
					this.showConfirm('请检查生存受益人' + j + '身份证号码填写')
					return false
				} else if (this.changChengBaseInfo.scbenificiary[i].cardValidationType === '') {
					this.showConfirm('请检查生存受益人' + j + '证件有效期类型选择')
					return false
				} else if ((this.changChengBaseInfo.scbenificiary[i].cardValidationType === '1' && this.changChengBaseInfo.scbenificiary[i].iDEndDate === '') || (this.changChengBaseInfo.scbenificiary[i].cardValidationType === '1' && this.changChengBaseInfo.scbenificiary[i].iDStartDate === '')) {
					this.showConfirm('请检查生存受益人' + j + '证件有效起止期是否选择')
					return false
				} else if (this.changChengBaseInfo.scbenificiary[i].nation === '') {
					this.showConfirm('请检查生存受益人' + j + '国籍选择')
					return false
				} else if (this.changChengBaseInfo.scbenificiary[i].jobCode === '') {
					this.showConfirm('请检查生存受益人' + j + '职业名称选择')
					return false
				} else if (this.changChengBaseInfo.scbenificiary[i].relaToInsuredCode === '') {
					this.showConfirm('请检查生存受益人' + j + '与被保人关系选择')
					return false
				} else if (this.changChengBaseInfo.scbenificiary[i].lot === '') {
					this.showConfirm('请检查生存受益人' + j + '受益比例填写')
					return false
				} else if (this.changChengBaseInfo.scbenificiary[i].grade === '') {
					this.showConfirm('请检查生存受益人' + j + '受益顺序填写')
					return false
				} else if (this.changChengBaseInfo.scbenificiary[i].phone === '') {
					this.showConfirm('请检查生存受益人' + j + '手机号码填写')
					return false
				} else {
					if (this.changChengBaseInfo.benificiary.sgType === '') {
						this.showConfirm('请检查身故受益人类型选择')
						return false
					} else if (this.changChengBaseInfo.benificiary.scType === '') {
						this.showConfirm('请检查生存受益人类型选择')
						return false
					}
				}
			}
			this.checkScOrder()
		},
		checkSgNull (data) { // 判断身故受益人内容是否全部填写
			console.log('checkSgNull')
				for (let i = 0; i < this.changChengBaseInfo.sgbenificiary.length; i++) {
				let j = i + 1
					if (this.changChengBaseInfo.sgbenificiary[i].name === '') {
						this.showConfirm('请检查身故受益人' + j + '姓名填写')
						return false
					} else if (this.changChengBaseInfo.sgbenificiary[i].birthday === '') {
						this.showConfirm('请检查身故受益人' + j + '出生日期选择')
						return false
					} else if (this.changChengBaseInfo.sgbenificiary[i].cardNo === '') {
						this.showConfirm('请检查身故受益人' + j + '身份证号码填写')
						return false
					} else if (this.changChengBaseInfo.sgbenificiary[i].jobCode === '') {
						this.showConfirm('请检查身故受益人' + j + '职业名称选择')
						return false
					} else if (this.changChengBaseInfo.sgbenificiary[i].cardValidationType === '') {
						this.showConfirm('请检查身故受益人' + j + '证件有效期类型选择')
						return false
					} else if ((this.changChengBaseInfo.sgbenificiary[i].cardValidationType === '1' && this.changChengBaseInfo.sgbenificiary[i].iDEndDate === '') || (this.changChengBaseInfo.sgbenificiary[i].cardValidationType === '1' && this.changChengBaseInfo.sgbenificiary[i].iDStartDate === '')) {
						this.showConfirm('请检查身故受益人' + j + '证件有效起止期是否选择')
						return false
					} else if (this.changChengBaseInfo.sgbenificiary[i].nation === '') {
						this.showConfirm('请检查身故受益人' + j + '国籍选择')
						return false
					} else if (this.changChengBaseInfo.sgbenificiary[i].relaToInsuredCode === '') {
						this.showConfirm('请检查身故受益人' + j + '与被保人关系选择')
						return false
					} else if (this.changChengBaseInfo.sgbenificiary[i].lot === '') {
						this.showConfirm('请检查身故受益人' + j + '受益比例填写')
						return false
					} else if (this.changChengBaseInfo.sgbenificiary[i].grade === '') {
						this.showConfirm('请检查身故受益人' + j + '受益顺序填写')
						return false
					} else if (this.changChengBaseInfo.sgbenificiary[i].phone === '') {
						this.showConfirm('请检查身故受益人' + j + '手机号码填写')
						return false
					} else {
						if (this.changChengBaseInfo.benificiary.sgType === '') {
							this.showConfirm('请检查身故受益人类型选择')
							return false
						} else if (this.changChengBaseInfo.benificiary.scType === '') {
							this.showConfirm('请检查生存受益人类型选择')
							return false
						}
					}
				}
				this.checkSgOrder(data)
		},
		checkSgOrder (flag) { // 判断受益人内容填写之后受益比例是否正确
			let arr = []
			for (let i = 0; i < this.changChengBaseInfo.sgbenificiary.length; i++) {
				arr.push(this.changChengBaseInfo.sgbenificiary[i].oderList[0].nativeCode)
			}
			this.maxGrade = Number(arr[0])
			for (let h = 1; h < arr.length; h++) {
				if (arr[h] > this.maxGrade) {
					this.maxGrade = Number(arr[h])
				}
			}
			this.defaultLot = 0
			for (let i = 0; i < this.changChengBaseInfo.sgbenificiary.length; i++) {
				this.defaultGrade = Number(this.changChengBaseInfo.sgbenificiary[i].oderList[0].nativeCode) // grade
				if (this.defaultGrade === this.maxGrade) {
					this.defaultLot += Number(this.changChengBaseInfo.sgbenificiary[i].lot * 100) // lot
				}
			}
			if (this.defaultLot === 100) {
				// 身故受益人选其他 字段校验完毕 继续校验生存选其他的字段
				if (this.changChengBaseInfo.benificiary.scType === '2') {
					if (flag === false) {
						this.twoParam()
					} else {
						this.checkScNull()
					}
				} else {
					this.twoParam()
				}
				console.log('身故受益人 100')
			} else {
				this.showConfirm('请检查身故受益人最后一级受益人比例填写，同级受益人比例之和必须等于100%')
			}
		},
		checkScOrder () {
			// maxGrade要取最大的级别来判断下面的lot
			let arr = []
			for (let i = 0; i < this.changChengBaseInfo.scbenificiary.length; i++) {
				arr.push(this.changChengBaseInfo.scbenificiary[i].oderList[0].nativeCode)
			}
			this.maxScGrade = Number(arr[0])
			for (let h = 1; h < arr.length; h++) {
				if (arr[h] > this.maxScGrade) {
					this.maxScGrade = Number(arr[h])
				}
			}
			this.defaultScLot = 0
			for (let i = 0; i < this.changChengBaseInfo.scbenificiary.length; i++) {
				this.defaultScGrade = Number(this.changChengBaseInfo.scbenificiary[i].oderList[0].nativeCode) // grade
				if (this.defaultScGrade === this.maxScGrade) {
					this.defaultScLot += Number(this.changChengBaseInfo.scbenificiary[i].lot * 100) // lot
				}
			}
			if (this.defaultScLot === 100) {
				// this.oneParam()
				console.log('生存 100')
				if (this.changChengBaseInfo.benificiary.sgType === '2') { // 身故为其他
					this.checkSgNull(false)
					return false
				} else if (this.changChengBaseInfo.benificiary.sgType === '0') { // 身故为法定
					this.oneParam()
				} else {
					console.log('this.twoParam')
					this.twoParam()
				}
				return false
			} else {
				this.showConfirm('请检查生存受益人最后一级受益人比例填写，同级受益人比例之和必须等于100%')
			}
		}
    },
    components: {
		InfoFooter,
		Name,
		Sex,
		Card,
		Birthday,
		Nation,
		Split,
		SgBenifitInfo,
		ScBenifitInfo,
		Confirm,
		Split,
		sliderBar
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