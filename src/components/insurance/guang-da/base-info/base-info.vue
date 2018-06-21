<template>
    <div class="applicantInfo">
		<slider-bar :defaultSelected="defaultSelected"></slider-bar>
		<applicant></applicant>
        <split></split>
		<insured></insured>
        <info-footer text="下一步" @next='_next'></info-footer>
		<!-- 弹框 -->
        <confirm  ref="confirm" :text="confirmText"></confirm>
	</div>
</template>

<script>
import sliderBar from 'base/sliderBar/sliderBar'
import InfoFooter from 'base/footer/footer'
import Split from 'base/split/split'
import Applicant from 'components/insurance/guang-da/base-info/applicant/applicant.vue'
import Insured from 'components/insurance/guang-da/base-info/insured/insured.vue'
import {trialDataInit} from 'api/long-life/guang-da/insurance.js'
import {CODE_OK} from 'service/variable.js'
import {mapGetters, mapMutations} from 'vuex'
import Confirm from 'base/confirm/confirm'
import {confirm} from 'common/js/mixin.js'
export default {
	mixins: [confirm],
    data () {
        return {
			defaultSelected: 1
        }
	},
	created () {
		this.setDefault()
	},
	mounted () {
	},
	computed: {
		...mapGetters([
			'guangda'
		]),
		productId () {
            return this.$route.query.productId
		},
		supplierId () {
            return this.$route.query.supplierId
		}
	},
    methods: {
        _next () {
			let insured = this.guangda.guangdaPremiumRisk.insured
			let applicant = this.guangda.guangdaPremiumRisk.applicant
			if (!this.validate(applicant)) {
				this.showConfirm('请查看投保人信息是否填写正确!')
                return false
			} else if (!this.validate(insured)) {
				this.showConfirm('请查看被保人信息是否填写正确!')
                return false
			} else {
				let flag = true
				if (insured.relationId === '00') {
					for (let field in applicant) {
						if (field === 'birthday' && applicant[field] !== insured[field]) {
							flag = false
						} else if (field === 'idNo' && applicant[field] !== insured[field]) {
							flag = false
						} else if (field === 'idType' && applicant[field] !== insured[field]) {
							flag = false
						} else if (field === 'name' && applicant[field] !== insured[field]) {
							flag = false
						} else if (field === 'occupationCode' && applicant[field] !== insured[field]) {
							flag = false
						} else if (field === 'sex' && applicant[field] !== insured[field]) {
							flag = false
						}
					}
				} else if (insured.relationId === '33' || insured.relationId === '38' || insured.relationId === '39'){
					if (applicant['sex'] === insured['sex']){
						flag = false
					}
				} else if (insured.relationId === '37') {
					if (applicant['sex'] === 2 || insured['sex'] === 2) {
						flag = false
					}
				} else if (insured.relationId === '40'){
					if (applicant['sex'] === 1 || insured['sex'] === 1) {
						flag = false
					}
				} else if (insured.relationId !== '00') {
					if (applicant['birthday'] === insured['birthday']) {
						flag = false
					}
				} else {
					flag = true
				}
				if (flag) {
					this.$router.push({
                		path: '/guangdachoose-policy'
            		})
				} else {
					this.showConfirm('请检查投保人与被保人关系是否选择正确!')
                	return false
				}
			}
		},
		validate (obj) {
			let flag = true
			for(let field in obj) {
				if (field === 'birthday' && obj[field] === '请选择出生日期') {
					flag = false
				} else if (field === 'idNo' && obj[field] === '') {
					flag = false
				} else if (field === 'idType' && obj[field] === '') {
					flag = false
				} else if (field === 'name' && obj[field] === '') {
					flag = false
				} else if (field === 'occupationCode' && obj[field] === '') {
					flag = false
				} else if (field === 'sex' && obj[field] === '') {
					flag = false
				} else if (field === 'relationId' && obj[field] === '') {
					flag = false
				} else if (field === 'annualIncome' && obj[field] === '') {
					flag = false
				}
			}
			return flag
		},
		setDefault () {
			 let data = {
				    'productId' :this.productId
			    }
			trialDataInit (data).then(res => {
                if (res.ret=== 200) {
                    this.SET_GUANGDA_DIC({value: res.data})
                }          
            })
		},
		...mapMutations({
                SET_GUANGDA_DIC: 'SET_GUANGDA_DIC'
            })
    },
    components: {
        InfoFooter,
		Split,
		Applicant,
		Insured,
		sliderBar,
		Confirm
    }
}
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable.styl'
@import '~common/stylus/mixin.styl'
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
.detail
	padding: 0 (30/$scale)
	background: #fff
	&.lastDetail
			margin-bottom: (100/$scale)
	.info
		font-size: (28/$scale)
		display: flex
		justify-content: space-between
		line-height: (100/$scale)
		background: #fff
		border-bottom: 1px solid #E6E6E6
		&.lastInfo
			border-bottom: none
	.hide
		display: none
	.errTip
		display: block
		padding: (20/$scale) 0
		text-align: right
		font-size: 0
		position: relative
		.errIco
			width: (28/$scale)
			height: (28/$scale)
			display: inline-block
			// bg-image('warn')
			background-size: contain
			background-repeat: no-repeat
		.errText
			display: inline-block
			vertical-align: top
			margin-right: (10/$scale)
			font-size: (28/$scale)
			color: #ff4456
	.desTitle
		color: $color-a-left
	.desPosition
		width: 60%
	.placeholders
		color: $color-a-right
		.choose
			margin-right: (20/$scale)
		.choice
			color: $color-main
			&.active
				color: $color-theme-placeholder
		.arr
			// bg-image('rightArr')
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
			border: 1px solid $color-theme-border
			color: #fff
			width: (110/$scale)
			height: (50/$scale)
			background: $color-theme
			border-radius: 3px
		.placeholdersInput
			text-align: right
			background: transparent
			color: $color-a-right
		.normal
			color: #333
			text-align: right
			width: 100%
			&.active
				color: #bbb
				line-height: (100/$scale)
	.position
		line-height: (30/$scale)
.test
	.hide
		display: none
	.show
		display: block
</style>