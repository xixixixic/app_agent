<template>
	<div class="carInfoWarp">
		<loading v-if='loadingShow'></loading>
		<div v-else>
			<div class="carInfo">
				<p class="detailTitle">
					<a class="titleLeft">车辆配置</a>
				</p>
				<div class="detail">
					<div class="info">
						<p class="desTitle" ref="licenseNoTitle">车牌号</p>
						<p class="license">
							<span class="redGou" @click="changeGou()" v-if='gouStatus'></span>
							<span class="redCircle" @click="changeCircle()" v-if='circleStatus'></span>
							新车未上牌
						</p>
						<p class="placeholders cph" v-if='circleStatus'>
							<input type="text" placeholder="请填写车牌号" class="placeholdersInput" v-model='licenseNoValue' @blur='setLicenseNo' maxlength="7"/>
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
							<input type="text" placeholder="请填写品牌型号" class="placeholdersInput" v-model='brandNamelValue' @blur="setBrandName"/>
						</p>
					</div>
					<div class="errTip hide"></div>
				</div>
				<div class="detail">
					<div class="info">
						<p class="desTitle">车辆所在地</p>
						<p class="placeholders">
                            <span id='tianCarAddress' class="normal" :class="{'active': areaValue === '请选择车辆所在地'}">{{areaValue}}</span>
						</p>
					</div>
				</div>
				<div id="tianCarArea"></div>
				<div class="detail">
					<div class="info">
						<p class="desTitle" ref='frameNoTitle'>车架号</p>
						<p class="placeholders">
							<input type="text" placeholder="请填写车架号" class="placeholdersInput" v-model='frameNoValue' @blur="setFrameNo" maxlength="17"/>
						</p>
					</div>
					<div :class="this.frameNoTip !== '' ? 'errTip' : 'hide'">
						<span class="errIco"></span>
						<span class="errText">{{frameNoTip}}填写有误</span>
					</div>
				</div>
				<div class="detail">
					<div class="info">
						<p class="desTitle">发动机号</p>
						<p class="placeholders">
							<input type="text" placeholder="请填写发动机号" class="placeholdersInput" v-model='engineNoValue' @blur="setEngineNo" maxlength="9"/>
						</p>
					</div>
					<div class="errTip hide"></div>
				</div>
				<purchase-date ref='purchaseDateValue'></purchase-date>
				<enroll-date ref='enrollDate'></enroll-date>
				<div class="detail">
					<div class="info">
						<p class="desTitle">是否即时生效</p>
						<p class="placeholders">
							<button :class="isStatusA === false ? 'status' : 'redStatus'" @click="statusA">是</button>
							<button :class="isStatusB === false ? 'status' : 'redStatus'"  @click="statusB">否</button>
						</p>
					</div>
				</div>
				<start-date v-if='jssxShow' ref='startDate'></start-date>
			</div>
			<split class='splitBar'></split>
			<div class="carOwner">
				<p class="detailTitle">
					<a class="titleLeft">车主信息</a>
				</p>
				<div class="detail">
					<div class="info">
						<p class="desTitle" ref='nameTitle'>车主姓名</p>
						<p class="placeholders">
							<input type="text" placeholder="请填写车主姓名" class="placeholdersInput" v-model='ownerNameValue' @blur="setCarOwnerName"/>
						</p>
					</div>
					<div :class="this.nameTip !== '' ? 'errTip' : 'hide'">
						<span class="errIco"></span>
						<span class="errText">{{nameTip}}填写有误</span>
					</div>
				</div>
				<div class="detail">
					<div class="info lastInfo">
						<p class="desTitle">身份证号</p>
						<p class="placeholders">
							<input type="text" placeholder="请填写身份证号" class="placeholdersInput" v-model='cardValue' @blur="setCard"/>
						</p>
					</div>
					<div :class="this.ownerCardTip !== '' ? 'errTip' : 'hide'">
						<span class="errIco"></span>
						<span class="errText">{{ownerCardTip}}填写有误</span>
					</div>
				</div>
                <split class='splitBar'></split>
			</div>
			<confirm  ref="confirm" :text="confirmText"></confirm>
			<info-footer text="下一步" @next='_next'></info-footer>
		</div>
	</div>
</template>

<script>
	import InfoFooter from 'base/footer/footer'
	import Split from 'base/split/split'
	import StartDate from 'components/insurance/car/tian_an/car_info/children/start_date/start_date'
	import PurchaseDate from 'components/insurance/car/tian_an/car_info/children/purchase_date/purchase_date'
	import EnrollDate from 'components/insurance/car/tian_an/car_info/children/enroll_date/enroll_date'
	import {mapGetters, mapMutations} from 'vuex'
	import {selectArea} from 'api/car/tian-an/insurance.js'
	import {RET_OK, CODE_OK} from 'service/variable.js'
	import Loading from 'base/loading/loading'
	import {linkage} from 'common/js/linkage-util.js'
	import Confirm from 'base/confirm/confirm'
	import {confirm} from 'common/js/mixin.js'
	import {formatDate} from 'common/js/date-add-util.js'
	export default {
        mixins: [confirm],
        data () {
            return {
                isCircle: true,
                isStatusA: false,
                isStatusB: true,
                licenseNoValue: '',
                brandNamelValue: '',
                frameNoValue: '',
                engineNoValue: '',
                enrollDateValue: '',
                startDateValue: '',
                purchaseDateValue: '',
                areaValue: '',
                ownerNameValue: '',
                cardValue: '',
                loadingShow: false,
                jssxShow: true,
                pcArray: [],
                nameTip: '',
                licenseNoTip: '',
                frameNoTip: '',
                ownerCardTip: '',
                nameStatus: true,
                cardNoStatus: true,
                brandStatus: true,
                licenseNoStatus: true,
                frameNoStatus: true,
                engineStatus: true,
                gouStatus: false,
                circleStatus: true,
                confirmText: ''
            }
        },
        computed: {
            ...mapGetters([
                'tianCarInfo', 'tianCarConfig'
            ])
        },
        created () {
            this.setDefault()
            this.getResidence()
            console.log(this.$refs)
            console.log(this.$refs.purchaseDateValue)
            console.log('this.$refs.purchaseDateValue.purchaseDate')
        },
        methods: {
            ...mapMutations({
                setTianCarInfo: 'SET_CAR_TIANAN_CARINFO',
                setTianCarConfig: 'SET_CAR_TIANAN_CONFIG'
            }),
            setDefault () {
                let licenseNo = this.tianCarInfo.carInfo.licenseNo
                let brandName = this.tianCarInfo.carInfo.brandName
                let frameNo = this.tianCarInfo.carInfo.frameNo
                let engineNo = this.tianCarInfo.carInfo.enginNo
                let purchaseDate = this.tianCarInfo.carInfo.purchaseDate
                let enrollDate = this.tianCarInfo.carInfo.enrollDate
                let areas = this.tianCarInfo.areas
                let name = this.tianCarInfo.carOwner.name
                let cardNo = this.tianCarInfo.carOwner.cardNo
                this.licenseNoValue = licenseNo
                this.brandNamelValue = brandName
                this.frameNoValue = frameNo
                this.engineNoValue = engineNo
                this.purchaseDateValue = purchaseDate
                this.enrollDateValue = enrollDate
                this.areaValue = areas
                this.ownerNameValue = name
                this.cardValue = cardNo
                this.circleStatus = this.tianCarInfo.circleStatus
                this.gouStatus = this.tianCarInfo.gouStatus
                if (this.ownerNameValue === '') {
                   this.nameStatus = false
                }
                if (this.cardValue === '') {
                   this.cardNoStatus = false
                }
                if (this.licenseNoValue === '') {
                   this.licenseNoStatus = false
                }
                if (this.frameNoValue === '') {
                   this.frameNoStatus = false
                }
            },
            changeGou () {
                this.gouStatus = false
                this.circleStatus = true
                this.setTianCarInfo({
                        field1: 'circleStatus',
                        value: true
                    })
                this.setTianCarInfo({
                        field1: 'gouStatus',
                        value: false
                   })
            },
            changeCircle () {
                this.gouStatus = true
                this.circleStatus = false
                this.licenseNoTip = ''
                this.setTianCarInfo({
                        field1: 'carInfo',
                        field2: 'licenseNo',
                        value: ''
                    })
                this.setTianCarInfo({
                        field1: 'circleStatus',
                        value: false
                    })
                this.setTianCarInfo({
                        field1: 'gouStatus',
                        value: true
                    })
            },
            setBrandName () {
                this.setTianCarInfo({
                    field1: 'carInfo',
                    field2: 'brandName',
                    value: this.brandNamelValue
                })
            },
            setLicenseNo () {
                let licenseNo = this.licenseNoValue
                 if (/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/.test(licenseNo) === false) {
                    this.licenseNoTip = this.$refs.licenseNoTitle.innerHTML
                    this.licenseNoStatus = false
                } else {
                    this.licenseNoTip = ''
                    this.setTianCarInfo({
                         field1: 'carInfo',
                         field2: 'licenseNo',
                         value: this.licenseNoValue
                    })
                    this.licenseNoStatus = true
                }
            },
            setBrandModel () {
                this.setTianCarInfo({
                    field1: 'carInfo',
                    field2: 'brandName',
                    value: this.brandModelValue
                })
            },
            setFrameNo () {
                let frameNo = this.frameNoValue
                if (/^[a-zA-Z0-9]{17}$/.test(frameNo) === false || frameNo === '') {
                    this.frameNoTip = this.$refs.frameNoTitle.innerHTML
                    this.frameNoStatus = false
                } else {
                    this.frameNoTip = ''
                    this.setTianCarInfo({
                        field1: 'carInfo',
                        field2: 'frameNo',
                        value: this.frameNoValue
                    })
                    this.frameNoStatus = true
                }
            },
            setEngineNo () {
                this.setTianCarInfo({
                    field1: 'carInfo',
                    field2: 'enginNo',
                    value: this.engineNoValue
                })
            },
            getResidence () {
                selectArea().then(res => {
                    console.log(res)
                    console.log('hhh')
                    if (res.ret === RET_OK) {
                        if (res.data.code === CODE_OK) {
                            this.pcArray = res.data.allowCoverAreas
                            this.choiceResidence()
                        }
                    }
                })
            },
            choiceResidence () {
            let vm = this
                linkage('tianCarAddress', 'tianCarArea', vm.pcArray, function (arr) {
                    console.log(arr)
                    let str = ''
                    for (let obj of arr) {
                        str += obj.value + ' '
                    }
                    vm.areaValue = str
                    vm.setTianCarInfo({
                        field1: 'areas',
                        value: vm.areaValue
                    })
                    vm.setTianCarInfo({
                        field1: 'carInfo',
                        field2: 'cityCode',
                        value: arr[1].id
                    })
                })
            },
            setCarOwnerName () {
                let name = this.ownerNameValue
                if (/^([\u4e00-\u9fa5]){2,7}$/.test(name) === false || name === '') {
                    this.nameTip = this.$refs.nameTitle.innerHTML
                    this.nameStatus = false
                } else {
                    this.nameTip = ''
                    this.setTianCarInfo({
                        field1: 'carOwner',
                        field2: 'name',
                        value: this.ownerNameValue
                    })
                    this.nameStatus = true
                }
            },
            setCard () {
                let aCity = {11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江', 31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北', 43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏', 61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: '新疆', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外'}
                let card = this.cardValue
                    if (!/^\d{17}(\d|x)$/i.test(card) || card === '') {
                        this.ownerCardTip = '身份证长度或格式'
                        this.cardNoStatus = false
                        return false
                    } else {
                        this.ownerCardTip = ''
                        this.cardNoStatus = true
                    }
                let lasts = card.substring(card.length - 1, card.length)
                    if (isNaN(lasts) && lasts !== 'X' || card === '') {
                        this.ownerCardTip = '身份证号最后一位错误，应该是大写X'
                        this.cardNoStatus = false
                        return false
                    } else {
                        this.ownerCardTip = ''
                        this.cardNoStatus = true
                        this.setTianCarInfo({
                            field1: 'carOwner',
                            field2: 'cardNo',
                            value: this.cardValue
                        })
                    }
                card = card.replace(/x$/i, 'a')
                    if (aCity[parseInt(card.substr(0, 2))] === null || card === '') {
                        this.ownerCardTip = '身份证地区'
                        this.cardNoStatus = false
                        return false
                    } else {
                        this.ownerCardTip = ''
                        this.cardNoStatus = true
                        this.setTianCarInfo({
                            field1: 'carOwner',
                            field2: 'cardNo',
                            value: this.cardValue
                        })
                    }
                let sBirthday = card.substr(6, 4) + '-' + Number(card.substr(10, 2)) + '-' + Number(card.substr(12, 2))
                let d = new Date(sBirthday.replace(/-/g, '/'))
                   if (sBirthday !== (d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()) || card === '') {
                        this.ownerCardTip = '出生日期非法'
                        this.cardNoStatus = false
                        return false
                    } else {
                        this.ownerCardTip = ''
                        this.setTianCarInfo({
                            field1: 'carOwner',
                            field2: 'cardNo',
                            value: this.cardValue
                        })
                       this.cardNoStatus = true
                    }
                let iSum = 0
                for (var i = 17; i >= 0; i--) {
                    iSum = (Math.pow(2, i) % 11) * parseInt(card.charAt(17 - i), 11) + iSum
                }
                if (iSum % 11 !== 1) {
                    this.ownerCardTip = '身份证号非法'
                    this.cardNoStatus = false
                    return false
                } else {
                    this.ownerCardTip = ''
                    this.setTianCarInfo({
                        field1: 'carOwner',
                        field2: 'cardNo',
                        value: this.cardValue
                    })
                    this.cardNoStatus = true
                }
            },
            _next () {
                if (this.licenseNoValue === '' && this.circleStatus === true && this.licenseNoStatus === false) {
                   this.showConfirm('请检查车牌号填写')
                } else if (this.brandNamelValue === '') {
                    this.showConfirm('请检查品牌型号填写')
                } else if (this.areaValue === '请选择车辆所在地') {
                    this.showConfirm('请选择车辆所在地')
                } else if (this.frameNoValue === '' || this.frameNoStatus === false) {
                    this.showConfirm('请检查车架号填写')
                } else if (this.engineNoValue === '') {
                    this.showConfirm('请检查发动机号填写')
                } else if (this.$refs.purchaseDateValue.purchaseDate === '请选择日期') {
                    console.log('???')
                    this.showConfirm('请选择购置日期')
                } else if (this.$refs.enrollDate.enrolldate === '请选择日期') {
                    this.showConfirm('请选择注册日期')
                } else if (this.jssxShow === true && this.$refs.startDate.startDate === '请选择日期') {
                    this.showConfirm('请选择起保日期')
                } else if (this.ownerNameStatus === false || this.ownerNameValue === '') {
                    this.showConfirm('请检查车主姓名填写')
                } else if (this.cardNoStatus === false || this.cardValue === '') {
                    this.showConfirm('请检查身份证号填写')
                } else {
                    this.$router.push({
                        name: 'tiancar_config'
                    })
                    // this.loadingShow = true
                    // let data = {
                    //     carInfo: this.tianCarInfo.carInfo,
                    //     carOwner: this.tianCarInfo.carOwner
                    // }
                    // queryCarModel(data).then(res => {
                    // console.log(res)
                    //     if (res.ret === RET_OK) {
                    //         if (res.data.code === CODE_OK) {
                    //             this.loadingShow = false
                    //             let car = res.data.vehicleModelList
                    //             this.setTianCarConfig({
                    //                 carList: car
                    //             })
                    //             let msgs = res.msg
                    //         console.log(res.msg)
                    //         console.log(msgs)
                    //             this.$router.push({
                    //                 name: 'tiancar_config'
                    //             })
                    //         } else {
                    //             this.loadingShow = false
                    //             this.showConfirm(res.data.msg)
                    //         }
                    //     } else {
                    //         this.loadingShow = false
                    //         this.showConfirm(res.msg)
                    //     }
                    // })
                }
            },
            statusA () {
                this.isStatusA = true
                this.isStatusB = false
                this.jssxStatus()
            },
            statusB () {
                this.isStatusA = false
                this.isStatusB = true
                this.jssxStatus()
            },
            jssxStatus () { // 即时生效日期
                let status = this.isStatusA
                if (status === true) {
                    this.jssxShow = false
                    let date = new Date()
                    // let newDate = DateAdd(1, 0, date)
                    date.setDate(date.getDate() + 1)
                    let resDate = formatDate(date, 'yyyy-MM-dd')
                    console.log(resDate)
                    this.setTianCarInfo({
                        field1: 'carInfo',
                        field2: 'startDate',
                        value: resDate
                    })
                } else {
                    this.jssxShow = true
                    this.setTianCarInfo({
                        field1: 'carInfo',
                        field2: 'startDate',
                        value: '请选择日期'
                    })
                }
            }
        },
        components: {
            Split,
            InfoFooter,
            StartDate,
            PurchaseDate,
            EnrollDate,
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
		background: #fff
		.splitBar
			margin: 0 (-30/$scale)
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
				.redCircle
					bg-image('redCircle')
					width: (30/$scale)
					height: (30/$scale)
					display: inline-block
					background-size: contain
					background-repeat: no-repeat
					float: left
					margin-right: (14/$scale)
				.redGou
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
			.normal
				color: #333
				text-align: right
				width: 100%
				&.active
					color: #bbb
</style>