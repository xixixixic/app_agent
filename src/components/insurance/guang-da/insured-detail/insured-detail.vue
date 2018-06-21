<template>
    <div class="applicantInfo">
		<div class='insuredWarp'>
			<div class="detailTitle">
				<a class="titleLeft">被保人信息</a>
			</div>
			<div class="detail">
				<div class="info">
					<p class="desTitle" ref='nameTitle'>姓名</p>
					<p class="placeholders">
						<input type="text" placeholder="请填写姓名" class="placeholdersInput" v-model="applicantName" @blur='verName'/>
					</p>
				</div>
				<div :class="this.applicantNameTip !== '' ? 'errTip' : 'hide'">
					<span class="errIco"></span>
					<span class="errText">{{applicantNameTip}}填写有误</span>
				</div>
			</div>
			<div class="detail">
				<div class="info">
					<p class="desTitle" ref='nameTitle'>性别</p>
						<p class="placeholders">
							<button :class="isStatusA === false ? 'sex' : 'redSex'">男</button>
							<button :class="isStatusB === false ? 'sex' : 'redSex'">女</button>
						</p>
				</div>
			</div>
			<div class="detail">
				<div class="info">
					<p class="desTitle">出生日期</p>
					<p class="placeholders">
						<span class="choice" id="insuredBirthDay" :class="{'active': applicantBirth === '请选择出生日期'}">{{applicantBirth}}</span>
						<i class="icon-right_arrow" v-if="applicantBirth === '请选择出生日期'"></i>
					</p>
				</div>
			</div>
			<div class="detail">
				<div class="info">
					<p class="desTitle" ref='nameTitle'>身份证<i class="icon-down_arrow sfzIco"></i></p>
						<p class="placeholders">
							<input type="text" placeholder="请填写证件号码" class="placeholdersInput" v-model="applicantName" @blur='verName'/>
						</p>
				</div>
			</div>
			<div class="detail">
				<div class="info">
					<p class="desTitle">证件有效期</p>
					<p class="placeholders">
						<span class="choice" id="cardEffectiveDay" :class="{'active': cardEffective === '请选择有效日期'}">{{cardEffective}}</span>
						<i class="icon-right_arrow" v-if="cardEffective === '请选择有效日期'"></i>		 
					</p>
				</div>
				<div id='applicantArea'></div>
			</div>
			<div class="detail">
				<div class="info">
					<p class="desTitle" ref='nameTitle'>职业</p>
						<p class="placeholders">
							<input type="text" placeholder="请填写证件号码" class="placeholdersInput" v-model="applicantName" @blur='verName'/>
						</p>
				</div>
			</div>
			<div class="detail">
				<div class="info">
					<p class="desTitle">国籍/户籍</p>
					<p class="placeholders">
					</p>
				</div>
				<div id='applicantArea'></div>
			</div>
			<div class="detail">
				<div class="info">
					<p class="desTitle">婚姻状况</p>
					<p class="placeholders">
					</p>
				</div>
				<div id='applicantArea'></div>
			</div>
			<div class="detail">
				<div class="info">
					<p class="desTitle">教育程度</p>
					<p class="placeholders">
					</p>
				</div>
				<div id='applicantArea'></div>
			</div>
			<div class="detail">
				<div class="info">
					<p class="desTitle">邮箱</p>
					<p class="placeholders">
						<input type="text" placeholder="请填写邮箱" class="placeholdersInput" v-model="applicantName" @blur='verName'/>
					</p>
				</div>
			</div>
			<div class="detail">
				<div class="info">
					<p class="desTitle">手机号码</p>
					<p class="placeholders">
						<input type="text" placeholder="请填写手机号码" class="placeholdersInput" v-model="applicantName" @blur='verName'/>
					</p>
				</div>
			</div>
			<div class="detail">
				<div class="info">
					<p class="desTitle">工作单位/学校名称</p>
					<p class="placeholders">
						<input type="text" placeholder="请填写工作单位/学校名称" class="placeholdersInput" v-model="applicantName" @blur='verName'/>
					</p>
				</div>
			</div>
			<div class="detail">
				<div class="info">
					<p class="desTitle">工作内容</p>
					<p class="placeholders">
						<input type="text" placeholder="请填写工作内容" class="placeholdersInput" v-model="applicantName" @blur='verName'/>
					</p>
				</div>
			</div>
			<div class="detail">
				<div class="info">
					<p class="desTitle">单位地址/学校地址</p>
					<p class="placeholders">
						<input type="text" placeholder="请填写单位地址/学校地址" class="placeholdersInput" v-model="applicantName" @blur='verName'/>
					</p>
				</div>
				<div id='applicantArea'></div>
			</div>
			<div class="detail">
				<div class="info">
					<p class="desTitle">现地址</p>
					<p class="placeholders">
						<span id='nowAddress' class="normal" :class="{'active': areaValue === '请选择所在地'}">{{areaValue}}</span>
						<i class="icon-right_arrow" v-if="areaValue === '请选择所在地'"></i>
					</p>
				</div>
			</div>
			<div class="detail">
				<div class="info">
					<p class="desTitle">镇（乡）街道</p>
					<p class="placeholders">
						<input type="text" placeholder="请填写详细地址" class="placeholdersInput" v-model="applicantName" @blur='verName'/>
					</p>
				</div>
			</div>
			<div class="detail lastDetail">
				<div class="info lastInfo">
					<p class="desTitle">邮编</p>
					<p class="placeholders">
						<input type="text" placeholder="请填写邮编" class="placeholdersInput" v-model="applicantName" @blur='verName'/>
					</p>
				</div>
			</div>
		</div>
		<div id="insuredBirthDayContainer"></div>
		<div id="cardEffectiveDayContainer"></div>
		<div id="nowArea"></div>
        <info-footer text="下一步" @next='_next'></info-footer>
	</div>
</template>

<script>
import InfoFooter from 'base/footer/footer'
import Split from 'base/split/split'
import SelectDrop from 'components/insurance/life/first_step/children/common/selectDrop/selectDrop'
import {calendar} from 'common/js/calendar-util.js'
import {linkage} from 'common/js/linkage-util.js'
export default {
    data () {
        return {
			applicantNameTip: '',
			applicantName: '',
			insuredNameTip: '',
			insuredName: '',
			applicantBirth: '请选择出生日期',
			cardEffective: '请选择有效日期',
			isStatusA: false,
			isStatusB: true,
			areaValue: '请选择所在地'
        }
	},
	mounted () {
		this.insuredBirthdayCalendar()
		this.cardEffectiveCalendar()
	},
    methods: {
        _next () {
            console.log('3')
		},
		verName () {
			console.log('3')
		},
		insuredBirthdayCalendar () {
			let vm = this
			calendar('insuredBirthDay', 'insuredBirthDayContainer', this.birthdayStart, this.birthdayEnd, this.birthdayEnd, function (arr1, arr2) {
				vm.applicantBirth = arr2.join('-')
			})
		},
		cardEffectiveCalendar () {
			let vm = this
			calendar('cardEffectiveDay', 'cardEffectiveDayContainer', this.birthdayStart, this.birthdayEnd, this.birthdayEnd, function (arr1, arr2) {
				vm.cardEffective = arr2.join('-')
			})
		},
		getResidence () { // 获取现地址
			// selectArea().then(res => {
			// 	if (res.ret === RET_OK) {
			// 		if (res.data.code === CODE_OK) {
			// 			this.pcArray = res.data.allowCoverAreas
			// 			this.choiceResidence()
			// 		}
			// 	}
			// })
		},
		choiceResidence () {
			let vm = this
			linkage('nowAddress', 'nowArea', vm.pcArray, function (arr) {
				let str = ''
				for (let obj of arr) {
					str += obj.value + ' '
				}
				vm.areaValue = str
			})
		}
    },
    components: {
        InfoFooter,
		Split,
		SelectDrop
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
			.sfzIco
				margin-left: (10/$scale)
				font-size: (30/$scale)
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
				color: $color-theme-placeholder
			.normal
				color: #333
				text-align: right
				width: 100%
				&.active
					color: #bbb
</style>