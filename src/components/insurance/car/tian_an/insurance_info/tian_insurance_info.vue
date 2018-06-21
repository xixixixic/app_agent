<template>
	<div class="carInfoWarp">
		<loading v-if='loadingShow'></loading>
		<div v-else>
			<div class="carInfo">
				<p class="detailTitle">
					<a class="titleLeft">投保信息</a>
				</p>
				<div class="detail">
					<div class="info">
						<p class="desTitle">总公里数(公里)</p>
						<p class="placeholders">
							<input type="number" placeholder="请输入总公里数" class="placeholdersInput" v-model='totalMileageValue' @blur="setTotalMileage"/>
						</p>
					</div>
					<div class="errTip hide"></div>
				</div>
				<div class="detail">
					<div class="info">
						<p class="desTitle">是否过户</p>
						<p class="placeholders">
							<button :class="isStatusA === false ? 'status' : 'redStatus'" @click="statusA">是</button>
							<button :class="isStatusB === false ? 'status' : 'redStatus'"  @click="statusB">否</button>
						</p>
					</div>
				</div>
				<guo-hu-date v-if='guohuShow'></guo-hu-date>
				<div class="detail">
					<div class="info">
						<p class="desTitle">被保人职业</p>
						<p class="placeholders">
							<select class='select' v-model='occupationValue' v-on:change='setOccupation'>
								<option v-for='item in occupation'>{{item.name}}</option>
							</select>
						</p>
					</div>
					<div class="errTip hide"></div>
				</div>
				<div class="detail">
					<div class="info">
						<p class="desTitle">被保人初次领证日期</p>
						<p class="placeholders">
							<input type="text" placeholder="请选择" id="firstDate" class="placeholdersInput" v-model='firstDate' @blur="setFirstDate"/>
						</p>
					</div>
					<div id="firstCalendar"></div>
				</div>
				<div class="detail">
					<div class="info">
						<p class="desTitle">家庭车辆台数</p>
						<p class="placeholders">
							<input type="text" placeholder="请输入台数" class="placeholdersInput" v-model='carNumValue' @blur="setCarNum"/>
						</p>
					</div>
					<div class="errTip hide"></div>
				</div>
				<div class="detail">
					<div class="info lastInfo">
						<p class="desTitle">指定行驶区域</p>
						<p class="placeholders">
							<button :class="areaStatusA === false ? 'status' : 'redStatus'" @click="areaStatusAChange">省内</button>
							<button :class="areaStatusB === false ? 'status' : 'redStatus'"  @click="areaStatusBChange">国内</button>
						</p>
					</div>
					<div class="errTip hide"></div>
				</div>
			</div>
			<confirm  ref="confirm" :text="confirmText"></confirm>
			<info-footer text="下一步" @next='_next'></info-footer>
		</div>
	</div>
</template>

<script>
	import InfoFooter from 'base/footer/footer'
	import Confirm from 'base/confirm/confirm'
    import {confirm} from 'common/js/mixin.js'
	import GuoHuDate from 'components/insurance/car/tian_an/insurance_info/children/guohu_date/guohu_date'
	import Split from 'base/split/split'
	import Loading from 'base/loading/loading'
	import {mapGetters, mapMutations} from 'vuex'
	import {calendar} from 'common/js/calendar-util.js'
	import {insuranceInfo} from 'api/car/tian-an/insurance.js'
    import {RET_OK, CODE_OK} from 'service/variable.js'
	export default {
        mixins: [confirm],
        data () {
            return {
                isStatusA: false,
                isStatusB: true,
                areaStatusA: false,
                areaStatusB: true,
                totalMileageValue: '',
                occupationValue: '公务员',
                occupation: [
                    {name: '公务员'},
                    {name: '教师'},
                    {name: '医生'},
                    {name: '金融行业'},
                    {name: '其他事业单位'},
                    {name: '企业管理'},
                    {name: '产业工人'},
                    {name: '其他'}
                ],
                firstDate: '',
                carNumValue: '',
                transferDate: '',
                loadingShow: false,
                guohuShow: false
            }
        },
        computed: {
            ...mapGetters([
                'tianCarInsuranceInfo'
            ])
        },
        mounted () {
            this.getFirstday()
            // this.getGuoHuday()
        },
        created () {
            this.setDefault()
        },
        methods: {
            ...mapMutations({
                setCarInsuranceInfo: 'SET_CAR_TIANAN_INSURANCEINFO'
            }),
            setDefault () {
                console.log(this.tianCarInsuranceInfo)
                let totalMileage = this.tianCarInsuranceInfo.baseMessage.runMileRate
                this.totalMileageValue = totalMileage
                let occupation = this.tianCarInsuranceInfo.baseMessage.occupation
                if (occupation) {
                    this.occupationValue = occupation
                }
                let firstDate = this.tianCarInsuranceInfo.baseMessage.acceptLicenseDate
                this.firstDate = firstDate
                let transferDate = this.tianCarInsuranceInfo.baseMessage.transferDate
                this.transferDate = transferDate
                let carNum = this.tianCarInsuranceInfo.baseMessage.familyCarCount
                this.carNumValue = carNum
                this.setCarInsuranceInfo({
                    field1: 'baseMessage',
                    field2: 'occupation',
                    value: this.occupationValue
                })
                this.setCarInsuranceInfo({
                    field1: 'baseMessage',
                     field2: 'transferFlag',
                    value: '0'
                })
                this.setCarInsuranceInfo({
                    field1: 'baseMessage',
                    field2: 'transferDate',
                    value: ''
                })
                this.setCarInsuranceInfo({
                    field1: 'baseMessage',
                    field2: 'travelArea',
                    value: '0'
                })
            },
            setTotalMileage () {
                this.setCarInsuranceInfo({
                    field1: 'baseMessage',
                    field2: 'runMileRate',
                    value: this.totalMileageValue
                })
            },
            setOccupation () {
                this.setCarInsuranceInfo({
                    field1: 'baseMessage',
                    field2: 'occupation',
                    value: this.occupationValue
                })
            },
            setFirstDate () {
                this.setCarInsuranceInfo({
                    field1: 'baseMessage',
                    field2: 'acceptLicenseDate',
                    value: this.firstDate
                })
            },
            setCarNum () {
                this.setCarInsuranceInfo({
                    field1: 'baseMessage',
                    field2: 'familyCarCount',
                    value: this.carNumValue
                })
            },
            _next () {
                if (this.totalMileageValue === '') {
                   this.showConfirm('请填写总公里数')
                } else if (this.firstDate === '' || this.firstDate === '') {
                   this.showConfirm('请选择初次领证日期')
                } else if (this.carNumValue === '') {
                    this.showConfirm('请填写家庭车辆台数')
                } else {
                    this.loadingShow = true
                    let data = this.tianCarInsuranceInfo
                    console.log(data)
                    insuranceInfo(data).then(res => {
                    console.log(res)
                        if (res.ret === RET_OK) {
                            if (res.data.code === CODE_OK) {
                                this.loadingShow = false
                                this.$router.push({
                                    name: 'tian_price'
                                })
                            }
                        }
                    })
                }
           },
            statusA () {
                this.isStatusA = true
                 this.isStatusB = false
                this.guhuStatus()
            },
            statusB () {
                this.isStatusA = false
                this.isStatusB = true
                this.guhuStatus()
            },
            guhuStatus () {
               let status = this.isStatusA
               if (status === true) {
                   this.guohuShow = true
                   this.setCarInsuranceInfo({
                        field1: 'baseMessage',
                        field2: 'transferFlag',
                        value: '1'
                   })
               } else {
                   this.guohuShow = false
                   this.setCarInsuranceInfo({
                        field1: 'baseMessage',
                        field2: 'transferFlag',
                        value: '0'
                   })
                   this.setCarInsuranceInfo({
                        field1: 'baseMessage',
                        field2: 'transferDate',
                        value: ''
                   })
               }
            },
            areaStatusAChange () {
                this.areaStatusA = true
                this.areaStatusB = false
                this.setCarInsuranceInfo({
                    field1: 'baseMessage',
                    field2: 'travelArea',
                    value: '0'
                })
            },
            areaStatusBChange () {
                this.areaStatusA = false
                this.areaStatusB = true
                this.setCarInsuranceInfo({
                    field1: 'baseMessage',
                    field2: 'travelArea',
                    value: '1'
                })
            },
            getFirstday () {
                let d = new Date()
                let str = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
                let vm = this
                calendar('firstDate', 'firstCalendar', '1990-01-01', str, '2010-01-01', function (arr1, arr2) {
                    vm.date = arr2.join('-')
                    vm.setCarInsuranceInfo({
                        field1: 'baseMessage',
                        field2: 'acceptLicenseDate',
                        value: vm.date
                    })
                    vm.firstDate = vm.date
                })
            }
        },
        components: {
            Split,
            InfoFooter,
            Loading,
            GuoHuDate,
            Confirm
        }
	}
</script>

<style lang="stylus" scoped>
	@import '~common/stylus/variable.styl'
	@import '~common/stylus/mixin.styl'
	.carInfoWarp
		padding-bottom: (100/$scale)
		.carInfo
			background: #fff
			padding: 0 (30/$scale)
			.upload
				.uploadBtn
					width: (540/$scale)
					height: (70/$scale)
					border: 1px solid #FF4455
					font-size: (28/$scale)
					color: #FF4455
					text-align: center
					line-height: (70/$scale)
					margin: (30/$scale) auto 0 auto
					position: relative
				.showPic
					border: 1px solid pink
					width: 70%
					margin: (20/$scale) auto
					height: (300/$scale)
					.jszPic
						width: 100%
						height: 100%
				.uploadInput
					position: absolute
					width: 100%
					height: 100%
					top: 0
					left: 0
					opacity: 0
			.detailTitle
				font-size: (32/$scale)
				line-height: (100/$scale)
				color: #333
				border-bottom: 1px solid #FF4456
				margin: 0 (-30/$scale)
				padding: 0 (30/$scale)
				background: #fff
				.titleLeft
					color: #FF4456
				.titleRight
					color: #333
					float: right
					font-size: 15px
			.gerySplit
				background: #f6f6f6
				height: (30/$scale)
				width: 100%
				display: block
			.detail
				width: 100%
				.info
					font-size: (28/$scale)
					display: flex
					justify-content: space-between
					line-height: (100/$scale)
					border-bottom: 1px solid #E6E6E6
				.lastInfo
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
						bg-image('warn')
						background-size: contain
						background-repeat: no-repeat
					.errText
						display: inline-block
						vertical-align: top
						margin-left: (10/$scale)
						font-size: (28/$scale)
						color: #ff4456
				.desTitle
					color: #444
				.license
					color: #444
					display: flex
					align-items: center
					margin-left: (60/$scale)
					.circle
						bg-image('redCircle')
						width: (30/$scale)
						height: (30/$scale)
						display: inline-block
						background-size: contain
						background-repeat: no-repeat
						float: left
						margin-right: (14/$scale)
					.circleGou
						bg-image('gou')
						width: (30/$scale)
						height: (30/$scale)
						display: inline-block
						background-size: contain
						background-repeat: no-repeat
						float: left
						margin-right: (14/$scale)
				.placeholders
					color: #BBB
					.select
							width: (220/$scale)
							height: (60/$scale)
							border: solid 1px #dcdcdc
							border-radius: 5px
							background: url(down@2x.png) no-repeat 
							background-size: (25/$scale) (15/$scale)
							background-position: (170/$scale) center
							direction: ltr
							appearance:none
							padding-left: (20/$scale)
							color: #333
							outline: none
							overflow:hidden
					.choose
						margin-right: (20/$scale)
					.arr
						bg-image('rightArr')
						width: (20/$scale)
						height: (30/$scale)
						display: inline-block
						background-size: contain
						background-repeat: no-repeat
						float: right
						margin-top: (36/$scale)
				.cph
					width: (240/$scale)
				.status
					width: (110/$scale)
					height: (50/$scale)
					background: #ffffff
					color: #666
					border: 1px solid #E6E6E6
					border-radius: 3px
				.redStatus
					color: #FF4455
					width: (110/$scale)
					height: (50/$scale)
					background: #ffffff
					border: 1px solid #FF4455
					border-radius: 3px
				.placeholdersInput
					text-align: right
					width: 100%
					background: transparent
</style>