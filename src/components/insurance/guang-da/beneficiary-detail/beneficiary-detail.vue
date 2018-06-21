<template>
    <div class="applicantInfo">
		<div class='insuredWarp'>
			<div class="detailTitle">
				<a class="titleLeft">身故受益人</a>
			</div>
			<div class="detail">
				<div class="info lastInfo">
					<p class="benificialType" v-for='(item, index) in sgBenificial'>
						<span @click="addArr(index, 'sg')" :class="sgind === index ? 'gouIco' : 'circleIco'"></span>
						<span>{{item.name}}</span>
					</p>
				</div>
			</div>
			<div class="detailWarp" v-show='sgBenificiaryDetail'>
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
						<p class="desTitle">联系电话</p>
						<p class="placeholders">
							<input type="text" placeholder="请填写联系电话" class="placeholdersInput" v-model="applicantName" @blur='verName'/>
						</p>
					</div>
					<div id='applicantArea'></div>
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
								<span class="choice" id="insuredBirthDay" :class="{'active': sgBenificiary === '请选择职业'}">{{sgBenificiary}}</span>
							<i class="icon-right_arrow" v-if="sgBenificiary === '请选择职业'"></i>
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
						<p class="desTitle">地址序号</p>
						<p class="placeholders">
						</p>
					</div>
					<div id='applicantArea'></div>
				</div>
				<div class="detail">
					<div class="info">
						<p class="desTitle">受益比例</p>
						<p class="placeholders">
						</p>
					</div>
					<div id='applicantArea'></div>
				</div>
				<div class="detail">
					<div class="info">
						<p class="desTitle">受益顺序</p>
						<p class="placeholders">
							<input type="text" placeholder="请填写邮箱" class="placeholdersInput" v-model="applicantName" @blur='verName'/>
						</p>
					</div>
				</div>
				<div class="detail">
					<div class="info">
						<p class="desTitle">与被保人关系</p>
						<p class="placeholders">
							<input type="text" placeholder="请填写手机号码" class="placeholdersInput" v-model="applicantName" @blur='verName'/>
						</p>
					</div>
				</div>
				<div class="detail">
					<div class="info lastInfo">
						<p class="desTitle">邮编</p>
						<p class="placeholders">
							<input type="text" placeholder="请填写邮编" class="placeholdersInput" v-model="applicantName" @blur='verName'/>
						</p>
					</div>
				</div>
			</div>
			<split v-if="addBenificiary === 1"></split>
			<div class="addBenificiary" v-if="addBenificiary === 1" @click="addBenificiarys('sg')">
				+ 添加受益人
			</div>
			<split></split>
			<div class="detailTitle">
				<a class="titleLeft">生存受益人</a>
			</div>
			<div class="detail">
				<div class="info lastInfo">
					<p class="benificialType" v-for='(item, index) in sgBenificial'>
						<span @click="addArr(index, 'sc')" :class="scind === index ? 'gouIco' : 'circleIco'"></span>
						<span>{{item.name}}</span>
					</p>
				</div>
			</div>
			<div class="detailWarp" v-show='scBenificiaryDetail'>
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
						<p class="desTitle">联系电话</p>
						<p class="placeholders">
							<input type="text" placeholder="请填写联系电话" class="placeholdersInput" v-model="applicantName" @blur='verName'/>
						</p>
					</div>
					<div id='applicantArea'></div>
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
						<p class="desTitle">地址序号</p>
						<p class="placeholders">
						</p>
					</div>
					<div id='applicantArea'></div>
				</div>
				<div class="detail">
					<div class="info">
						<p class="desTitle">受益比例</p>
						<p class="placeholders">
						</p>
					</div>
					<div id='applicantArea'></div>
				</div>
				<div class="detail">
					<div class="info">
						<p class="desTitle">受益顺序</p>
						<p class="placeholders">
							<input type="text" placeholder="请填写邮箱" class="placeholdersInput" v-model="applicantName" @blur='verName'/>
						</p>
					</div>
				</div>
				<div class="detail">
					<div class="info">
						<p class="desTitle">与被保人关系</p>
						<p class="placeholders">
							<input type="text" placeholder="请填写手机号码" class="placeholdersInput" v-model="applicantName" @blur='verName'/>
						</p>
					</div>
				</div>
				<div class="detail">
					<div class="info lastInfo">
						<p class="desTitle">邮编</p>
						<p class="placeholders">
							<input type="text" placeholder="请填写邮编" class="placeholdersInput" v-model="applicantName" @blur='verName'/>
						</p>
					</div>
				</div>
			</div>
			<split v-if="addBenificiary === 2"></split>
			<div class="addBenificiary lastAddBenificiary" v-if="addBenificiary === 2" @click="addBenificiarys('sc')">
				+ 添加受益人
			</div>
			<split></split>
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
			sgBenificiary: '请选择职业',
			isStatusA: false,
			isStatusB: true,
			areaValue: '请选择所在地',
			sgBenificiaryDetail: false,
			scBenificiaryDetail: false,
			addBenificiary: 0,
			sgBenificial: [
				{name: '法定'},
				{name: '投保人'},
				{name: '其他'}
			],
			sgind: 4,
			scind: 4
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
		// 获取现地址
		getResidence () {
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
		},
		// 选择受益人类型
		addArr (index, status) {
			console.log(status)
			if (status === 'sg') {
				this.sgind = index
				if (index === 2) {
					this.addBenificiary = 1
				} else {
					this.addBenificiary = 0
					this.sgBenificiaryDetail = false
				}
			} else if (status === 'sc') {
				this.scind = index
				if (index === 2) {
					this.addBenificiary = 2
				} else {
					this.addBenificiary = 0
					this.scBenificiaryDetail = false
				}
			}
		},
		// 添加受益人详细信息
		addBenificiarys (data) {
			if (data === 'sg') {
				this.sgBenificiaryDetail = true
			} else {
				this.scBenificiaryDetail = true
			}
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
		.benificialType
			// diplay: flex
			// align-items: center
			line-height: (100/$scale)
			.gouIco
				width: (32/$scale)
				height: (32/$scale)
				display: inline-block
				bg-image('gou')
				background-size: cover
			.circleIco
				width: (32/$scale)
				height: (32/$scale)
				display: inline-block
				bg-image('redCircle')
				background-size: cover
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
	.addBenificiary
		font-size: (34/$scale)
		height: (100/$scale)
		line-height: (100/$scale)
		text-align: center
		background: #fff
		color: $color-theme
		&.lastAddBenificiary
			margin-bottom: (100/$scale)
</style>