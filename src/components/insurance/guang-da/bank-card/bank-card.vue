<template>
    <div class="applicantInfo">
		<slider-bar :defaultSelected="defaultSelected"></slider-bar>
		<div>
			<div class="detailTitle">
				<a class="titleLeft">银行卡信息</a>
			</div>
			<bankAccName></bankAccName>
			<bankAccNo></bankAccNo>
		</div>
        <info-footer text="下一步" @next='_next'></info-footer>
		<confirm  ref="confirm" :text="confirmText"></confirm>
	</div>
</template>

<script>
import sliderBar from 'base/sliderBar/sliderBar'
import bankAccName from 'components/insurance/guang-da/bank-card/child/bankAccName.vue'
import bankAccNo from 'components/insurance/guang-da/bank-card/child/bankAccNo.vue'
import {mapGetters, mapMutations} from 'vuex'
import InfoFooter from 'base/footer/footer'
import Confirm from 'base/confirm/confirm'
import {confirm} from 'common/js/mixin.js'
import Split from 'base/split/split'
export default {
	mixins: [confirm],
	data () {
        return {
			defaultSelected: 6
        }
	},
	created () {
		console.log('-------银行卡信息-------')
		console.log(this.guangdaTrail)
    },
	computed: {
        ...mapGetters([
            'guangdaTrail'
		])
    },
    methods: {
        _next () {
			if (this.guangdaTrail.policy.productInfo.bankAccName === '' || this.guangdaTrail.policy.productInfo.bankCode === ''  || this.guangdaTrail.policy.productInfo.bankAccNo === '') {
					this.confirmText = '请检查银行卡信息是否输入正确'
                    this.$refs.confirm.show()
			} else {
				this.$router.push({
                	path: '/guangdaupload-card'
                })
			}
		},
    },
    components: {
		bankAccName,
		bankAccNo,
        InfoFooter,
		Split,
		Confirm,
		sliderBar
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
				// width: (110/$scale)
				height: (50/$scale)
				background: #ffffff
				color: #666
				border: 1px solid #E6E6E6
				border-radius: 3px
			.redSex
				border: 1px solid $color-theme-border
				color: #fff
				// width: (110/$scale)
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
</style>