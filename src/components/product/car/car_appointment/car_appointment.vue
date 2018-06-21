<template>
	<div class="carInfoWarp">
        <loading v-if='loadingShow'></loading>
		<div class="carInfo">
			<p class="detailTitle">
				<a class="titleLeft">车辆信息</a>
			</p>
			<div class="detail">
				<div class="info lastInfo">
					<p class="desTitle">车辆所在地</p>
					<p class="placeholders carArea">
						<input type="text" id='appointCarAddress' placeholder="请选择车辆所在地" class="placeholdersInput" v-model='areaValue'/>
					</p>
				</div>
				<div id='appointArea'></div>
			</div>
			<div class="detail">
				<div class="info">
					<p class="desTitle" ref="licenseNoTitle">车牌号</p>
					<p class="license">
						<span class="redGou" @click="changeGou()" v-if='gouStatus'></span>
						<span class="redCircle" @click="changeCircle()" v-if='circleStatus'></span>
						新车未上牌
					</p>
					<p class="placeholders cph" v-if='circleStatus'>
						<input type="text" placeholder="请填写车牌号" class="placeholdersInput" v-model='licenseNoValue' @blur='setLicenseNo' maxlength='7'/>
					</p>
				</div>
				<div :class="this.licenseNoTip !== '' ? 'errTip' : 'hide'">
					<span class="errIco"></span>
					<span class="errText">{{licenseNoTip}}填写有误</span>
				</div>
			</div>
			<div class="detail">
				<div class="info">
					<p class="desTitle">品牌型号</p>
					<p class="placeholders">
						<input type="text" placeholder="请填写品牌型号" class="placeholdersInput" v-model='brandModelValue'/>
					</p>
				</div>
				<div class="errTip hide"></div>
			</div>
			<div class="detail">
				<div class="info">
					<p class="desTitle">车架号</p>
					<p class="placeholders">
						<input type="text" placeholder="请填写车架号" class="placeholdersInput" v-model='frameNoValue' maxlength="17"/>
					</p>
				</div>
				<div class="errTip hide"></div>
			</div>
			<div class="detail">
				<div class="info">
					<p class="desTitle">发动机号</p>
					<p class="placeholders">
						<input type="text" placeholder="请填写发动机号" class="placeholdersInput" v-model='engineNoValue' maxlength='7'/>
					</p>
				</div>
				<div class="errTip hide"></div>
			</div>
			<div class="detail">
				<div class="info">
					<p class="desTitle">购置日期</p>
					<p class="placeholders">
						<input type="text" id="purchaseDate" placeholder="请选择购置日期" class="placeholdersInput" v-model='purchaseCarDate'/>	 
					</p>
				</div>
			</div>
			<div id="purchaseCalendar"></div>
			<div class="detail">
				<div class="info">
					<p class="desTitle">注册日期</p>
					<p class="placeholders">
						<input type="text" id="registDate" placeholder="请选择注册日期" class="placeholdersInput" v-model='registDate'/>
					</p>
				</div>
			</div>
			<div id="registCalendar"></div>
			<div class="detail">
				<div class="info">
					<p class="desTitle">起保日期</p>
					<p class="placeholders">
						<input type="text" id="qiBaoDate" placeholder="请选择起保日期" class="placeholdersInput" v-model='qibaoDate'/>
					</p>
				</div>
			</div>
			<div id="qibBaoCalendar"></div>
			<div class="baseInfo">
				<p class="detailTitle">
					<a class="titleLeft">车主信息</a>
				</p>
				<div class="detail">
					<div class="info">
						<p class="desTitle" ref='ownerNameTitle'>车主姓名</p>
						<p class="placeholders">
							<input type="text" placeholder="请填写车主姓名" class="placeholdersInput"  v-model='ownerName' @blur="setOwnerName"/>
						</p>
					</div>
					<div :class="this.ownerNameTip !== '' ? 'errTip' : 'hide'">
						<span class="errIco"></span>
						<span class="errText">{{ownerNameTip}}填写有误</span>
					</div>
				</div>
				<div class="detail">
					<div class="info lastInfo">
						<p class="desTitle" ref='payPhoneTitle'>手机号码</p>
						<p class="placeholders">
							<input type="text" placeholder="请填写手机号码" class="placeholdersInput" v-model='payPhoneValue' @blur="setPayPhone"/>
						</p>
					</div>
					<div :class="this.payPhoneTip !== '' ? 'errTip' : 'hide'">
						<span class="errIco"></span>
						<span class="errText">{{payPhoneTip}}填写有误</span>
					</div>
				</div>
			</div>
		</div>
		<confirm  ref="confirm" :text="confirmText" @confirm="confirm"></confirm>
		<info-footer text="立即预约" @next='_next'></info-footer>
	</div>
</template>

<script>
    import InfoFooter from 'base/footer/footer'
    import Loading from 'base/loading/loading'
    import Split from 'base/split/split'
    import Confirm from 'base/confirm/confirm'
    import {confirm} from 'common/js/mixin.js'
    import {mapMutations} from 'vuex'
    import {linkage} from 'common/js/linkage-util.js'
    import {calendar} from 'common/js/calendar-util.js'
    import {loginUrl} from 'service/login-url.js'
    import {selectArea, carReserve} from 'api/car/car-appointment/appointment.js'
    import {RET_OK, CODE_OK} from 'service/variable.js'
    import guohuDate from 'components/insurance/car/du_bang/car_info/children/guohuqi/guohuqi'
    import RegisterDate from 'components/insurance/car/du_bang/car_info/children/register_date/register_date'
    export default {
        mixins: [confirm],
        data () {
            return {
                licenseNoValue: '',
                brandModelValue: '',
                frameNoValue: '',
                engineNoValue: '',
                registDate: '',
                purchaseCarDate: '',
                qibaoDate: '',
                areaValue: '',
                ownerName: '',
                payPhoneValue: '',
                licenseNoTip: '',
                frameNoTip: '',
                ownerNameTip: '',
                payPhoneTip: '',
                loadingShow: false,
                ownerNameStatus: true,
                cardNoStatus: true,
                licenseNoStatus: true,
                frameNoStatus: true,
                gouStatus: false,
                circleStatus: true,
                pcArray: [],
                provinceId: '',
                cityId: '',
                areaId: '',
                date: '',
                startDefaultDate: ''
            }
        },
        mounted () {
            this.getPurchaseDay()
            this.getRegisterDay()
            this.getQiBaoDay()
        },
        created () {
            this.setDefault()
            this.setToken(this.$route.params.token)
            this.getResidence()
        },
        methods: {
            ...mapMutations({
                 setToken: 'SET_TOKEN'
            }),
            setDefault () {
               if (this.licenseNoValue === '') {
                   this.licenseNoStatus = false
               }
               if (this.frameNoValue === '') {
                   this.frameNoStatus = false
               }
               if (this.ownerName === '') {
                   this.ownerNameStatus = false
               }
               if (this.ownerCard === '') {
                   this.cardNoStatus = false
               }
               let d = new Date()
               let str = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
               this.date = str
               this.startDefaultDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + (d.getDate() + 1)
            },
            changeGou () {
                this.gouStatus = false
                this.circleStatus = true
            },
            changeCircle () {
                this.gouStatus = true
                this.circleStatus = false
                this.licenseNoValue = ''
                this.licenseNoTip = ''
            },
            setLicenseNo () {
                let licenseNo = this.licenseNoValue
                 if (/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/.test(licenseNo) === false) {
                    this.licenseNoTip = this.$refs.licenseNoTitle.innerHTML
                    this.licenseNoStatus = false
                } else {
                    this.licenseNoTip = ''
                    this.licenseNoStatus = true
                }
            },
            setFrameNo () {
                let frameNo = this.frameNoValue
                if (/^[a-zA-Z0-9]{17}$/.test(frameNo) === false || frameNo === '') {
                    this.frameNoTip = this.$refs.frameNoTitle.innerHTML
                    this.frameNoStatus = false
                } else {
                    this.frameNoTip = ''
                    this.frameNoStatus = true
                }
            },
            setOwnerName () {
                let name = this.ownerName
                 if (/^([\u4e00-\u9fa5]){2,7}$/.test(name) === false || name === '') {
                    this.ownerNameTip = this.$refs.ownerNameTitle.innerHTML
                    this.ownerNameStatus = false
                } else {
                    this.ownerNameTip = ''
                    this.ownerNameStatus = true
                }
            },
            setPayPhone () {
                 let payPhone = this.payPhoneValue
                 if (/^1[3|4|5|7|8][0-9]{9}$/.test(payPhone) === false || payPhone === '') {
                    this.payPhoneTip = this.$refs.payPhoneTitle.innerHTML
                    this.payPhoneStatus = false
                } else {
                    this.payPhoneTip = ''
                    this.payPhoneStatus = true
                }
            },
            getResidence () {
                selectArea().then(res => {
                    console.log(res)
                    if (res.ret === RET_OK) {
                        if (res.data.code === CODE_OK) {
                            this.pcArray = res.data.pcs
                            this.choiceResidence()
                        }
                    }
                })
            },
            choiceResidence () {
            let vm = this
                linkage('appointCarAddress', 'appointArea', vm.pcArray, function (arr) {
                    let str = ''
                    for (let obj of arr) {
                        str += obj.value + ' '
                    }
                    vm.areaValue = str
                    vm.provinceId = arr[0].id
                    vm.cityId = arr[1].id
                    vm.areaId = arr[2].id
                })
            },
            getPurchaseDay () {
                let vm = this
                calendar('purchaseDate', 'purchaseCalendar', '1990-1-1', new Date() + 1, this.date, function (arr1, arr2) {
                    vm.purchaseCarDate = arr2.join('-')
                })
            },
            getRegisterDay () {
                let vm = this
                calendar('registDate', 'registCalendar', '1990-1-1', new Date() + 1, this.date, function (arr1, arr2) {
                    vm.registDate = arr2.join('-')
                })
            },
            getQiBaoDay () {
                let vm = this
                calendar('qiBaoDate', 'qibBaoCalendar', this.startDefaultDate, new Date() + 1, this.startDefaultDate, function (arr1, arr2) {
                    vm.qibaoDate = arr2.join('-')
                })
            },
            confirm () {
                    location.href = loginUrl
            },
            _next () {
                if (this.address === '') {
                   this.showConfirm('请选择车辆所在地')
                } else if (this.licenseNoValue === '' && this.isCircle === true && this.licenseNoStatus === false) {
                   this.showConfirm('请检查车牌号填写')
                } else if (this.brandModelValue === '') {
                    this.showConfirm('请检查品牌型号填写')
                } else if (this.frameNoValue === '') {
                    this.showConfirm('请检查车架号填写')
                } else if (this.engineNoValue === '') {
                    this.showConfirm('请检查发动机号填写')
                } else if (this.registDate === '') {
                    this.showConfirm('请检查注册日期填写')
                } else if (this.ownerNameStatus === false) {
                    this.showConfirm('请检查车主姓名填写')
                } else if (this.cardNoStatus === false) {
                    this.showConfirm('请检查身份证号填写')
                } else {
                    this.loadingShow = true
                    let data = {
                        provinceId: this.provinceId,
                        cityId: this.cityId,
                        areaId: this.areaId,
                        licensePlateNo: this.licenseNoValue,
                        brandName: this.brandModelValue,
                        frameNo: this.frameNoValue,
                        engineNo: this.engineNoValue,
                        purchaseDate: this.purchaseCarDate,
                        registerDate: this.registDate,
                        startDate: this.qibaoDate,
                        ownerName: this.ownerName,
                        ownerPhone: this.payPhoneValue
                    }
                    console.log(data)
                    carReserve(data).then(res => {
                       console.log(res)
                        if (res.ret === RET_OK) {
                            if (res.data.code === CODE_OK) {
                                this.loadingShow = false
                                this.showConfirm('预约成功，一个工作日，您的私人顾问会与您联系')
                            } else {
                                this.loadingShow = false
                                this.showConfirm(res.data.msg)
                            }
                        }
                    })
                }
            }
        },
        components: {
            Split,
            InfoFooter,
            guohuDate,
            RegisterDate,
            Loading,
            Confirm
        }
    }
</script>

<style lang="stylus" scoped>
	@import '~common/stylus/variable.styl'
	@import '~common/stylus/mixin.styl'
	.carInfoWarp
		padding: 0 (30/$scale) (100/$scale) (30/$scale)
		.upload
			.closeX
				font-size: (30/$scale)
				position: absolute
				top: (20/$scale)
				left: (596/$scale)
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
			.titleLeft
				color: #FF4456
			.titleRight
				color: #333
				float: right
				font-size: 15px
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
				position: relative
				.redCircle
					bg-image('redCircle')
					display: inline-block
					width: (32/$scale)
					height: (32/$scale)
					position: absolute
					left: (-50/$scale)
					top: (34/$scale)
					background-size: cover
					margin-right: (30/$scale)
				.redGou
					bg-image('gou')
					position: absolute
					left: (-50/$scale)
					top: (34/$scale)
					display: inline-block
					width: (32/$scale)
					height: (32/$scale)
					background-size: cover
					margin-right: (30/$scale)
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
			.carArea
				width: (500/$scale)
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