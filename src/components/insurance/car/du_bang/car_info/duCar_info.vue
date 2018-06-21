<template>
	<div class="carInfoWarp">
        <loading v-if='loadingShow'></loading>
		<div v-else>
			<div class="carInfo">
				<div class="upload">
					<span class='closeX' @click='deleteImg' v-if='picShow'>X</span>
					<p class="showPic" v-if='picShow'>
						<img :src='imgUrl' alt='' class="jszPic">
					</p>
					<p class="uploadBtn" v-show='addBtn'>
						<span class="add">+</span>上传行驶本照片
						<input type="file" class="uploadInput" accept='image' @change='upload'/>
					</p>
				</div>
				<p class="detailTitle">
					<a class="titleLeft">车辆信息</a>
				</p>
                <div class="detail">
                    <div class="info">
                        <p class="desTitle">车辆所在地</p>
                        <p class="placeholders">
                            <span id='carValueArea' class="normal" :class="{'active': addressValue === '请选择车辆所在地'}">{{addressValue}}</span>
                        </p>
                    </div>
                    <div id='carArea'></div>
                </div>
				<div class="detail">
					<div class="info">
						<p class="desTitle" ref="licensePlateNoTitle">车牌号</p>
						<p class="license">
							<span class="redGou" @click="changeGou()" v-if='gouStatus'></span>
							<span class="redCircle" @click="changeCircle()" v-if='circleStatus'></span>
							新车未上牌
						</p>
						<p class="placeholders cph" v-if='circleStatus'>
							<input type="text" placeholder="请填写车牌号" class="placeholdersInput" v-model='licensePlateNoValue' @blur='setlicensePlateNo' maxlength='7'/>
						</p>
					</div>
					<div :class="this.licensePlateNoTip !== '' ? 'errTip' : 'hide'">
						<span class="errIco"></span>
						<span class="errText">{{licensePlateNoTip}}填写有误</span>
					</div>
				</div>
				<div class="detail">
					<div class="info">
						<p class="desTitle">品牌型号</p>
						<p class="placeholders">
							<input type="text" placeholder="请填写品牌型号" class="placeholdersInput" v-model='brandModelValue' @blur="setBrandModel"/>
						</p>
					</div>
					<div class="errTip hide"></div>
				</div>
				<div class="detail">
					<div class="info">
						<p class="desTitle">车架号</p>
						<p class="placeholders">
							<input type="text" placeholder="请填写车架号" class="placeholdersInput" v-model='frameNoValue' @blur="setFrameNo" maxlength="17"/>
						</p>
					</div>
					<div class="errTip hide"></div>
				</div>
				<div class="detail">
					<div class="info">
						<p class="desTitle">发动机号</p>
						<p class="placeholders">
							<input type="text" placeholder="请填写发动机号" class="placeholdersInput" v-model='engineNoValue' @blur="setEngineNo" maxlength='9'/>
						</p>
					</div>
					<div class="errTip hide"></div>
				</div>
				<register-date ref="registerDate"></register-date>
				<div class="detail">
					<div class="info lastInfo">
						<p class="desTitle">是否过户</p>
						<p class="placeholders">
							<button :class="this.isStatusA === false ? 'status' : 'redStatus'"  @click="statusA">是</button>
							<button :class="this.isStatusB === false ? 'status' : 'redStatus'"  @click="statusB">否</button>
						</p>
					</div>
					<div class="errTip hide"></div>
				</div>
				<split></split>
				<guohu-date v-if='guohuShow' ref='guoHu'></guohu-date>
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
							<p class="desTitle">身份证号码</p>
							<p class="placeholders">
								<input type="text" placeholder="请填写身份证号码" class="placeholdersInput" v-model='ownerCard' @blur="verCard"/>
							</p>
						</div>
						<div :class="this.ownerCardTip !== '' ? 'errTip' : 'hide'">
							<span class="errIco"></span>
							<span class="errText">{{ownerCardTip}}填写有误</span>
						</div>
					</div>
				</div>
			</div>
			<split></split>
			<confirm  ref="confirm" :text="confirmText"></confirm>
			<info-footer text="下一步" @next='_next'></info-footer>
		</div>
	</div>
</template>

<script>
    import InfoFooter from 'base/footer/footer'
    import Loading from 'base/loading/loading'
    import Split from 'base/split/split'
    import Confirm from 'base/confirm/confirm'
    import {confirm} from 'common/js/mixin.js'
    import {mapGetters, mapMutations} from 'vuex'
    import Exif from 'exif-js'
    import {selectArea} from 'api/car/du-bang/insurance.js'
    import {linkage} from 'common/js/linkage-util.js'
    import {RET_OK, CODE_OK} from 'service/variable.js'
    import guohuDate from 'components/insurance/car/du_bang/car_info/children/guohuqi/guohuqi'
    import RegisterDate from 'components/insurance/car/du_bang/car_info/children/register_date/register_date'
    export default {
        mixins: [confirm],
        data () {
            return {
                isStatusA: false,
                isStatusB: true,
                imgUrl: '',
                licensePlateNoValue: '',
                addressValue: '',
                brandModelValue: '',
                frameNoValue: '',
                engineNoValue: '',
                registDate: '',
                ownerName: '',
                ownerCard: '',
                licensePlateNoTip: '',
                frameNoTip: '',
                ownerNameTip: '',
                ownerCardTip: '',
                guohuShow: false,
                loadingShow: false,
                picShow: false,
                ownerNameStatus: true,
                cardNoStatus: true,
                licensePlateNoStatus: true,
                frameNoStatus: true,
                gouStatus: false,
                circleStatus: true,
                pcArray: [],
                addBtn: true
            }
        },
        computed: {
            ...mapGetters([
                'duCarInfoOwner', 'duCarConfig'
            ])
        },
        created () {
            this.setDefault()
            this.guhuStatus()
            this.getResidence()
        },
        methods: {
            ...mapMutations({
                setDuCarInfoOwner: 'SET_CAR_DUBANG_CARINFO_OWNER',
                setDuCarConfig: 'SET_CAR_DUBANG_CONFIG'
            }),
            setDefault () {
               let address = this.duCarInfoOwner.address
               let card = this.duCarInfoOwner.carOwner.cardNo
               let name = this.duCarInfoOwner.carOwner.name
               let licensePlateNo = this.duCarInfoOwner.carInfo.licensePlateNo
               let brandModel = this.duCarInfoOwner.carInfo.brandModel
               let frameNo = this.duCarInfoOwner.carInfo.frameNo
               let engineNo = this.duCarInfoOwner.carInfo.engineNo
               let registDate = this.duCarInfoOwner.carInfo.registDate
               let drivingLicenseBase64 = this.duCarInfoOwner.carInfo.drivingLicenseBase64
               this.addressValue = address
               this.ownerCard = card
               this.ownerName = name
               this.licensePlateNoValue = licensePlateNo
               this.brandModelValue = brandModel
               this.frameNoValue = frameNo
               this.engineNoValue = engineNo
               this.registDate = registDate
               this.imgUrl = drivingLicenseBase64
               this.circleStatus = this.duCarInfoOwner.circleStatus
               this.gouStatus = this.duCarInfoOwner.gouStatus
               this.isStatusA = this.duCarInfoOwner.isStatusA
               this.isStatusB = this.duCarInfoOwner.isStatusB
                console.log(this.duCarInfoOwner)
                console.log(this.duCarInfoOwner.isStatusB)
               if (this.licensePlateNoValue === '') {
                   this.licensePlateNoStatus = false
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
               if (this.imgUrl) {
                    this.picShow = true
                    this.addBtn = false
                } else {
                    this.addBtn = true
                }
            },
            changeGou () {
                this.gouStatus = false
                this.circleStatus = true
                this.setDuCarInfoOwner({
                        field1: 'circleStatus',
                        value: true
                    })
                this.setDuCarInfoOwner({
                        field1: 'gouStatus',
                        value: false
                   })
            },
            changeCircle () {
                this.gouStatus = true
                this.circleStatus = false
                this.licensePlateNoTip = ''
                this.setDuCarInfoOwner({
                        field1: 'carInfo',
                        field2: 'licensePlateNo',
                        value: ''
                    })
                this.setDuCarInfoOwner({
                        field1: 'circleStatus',
                        value: false
                    })
                this.setDuCarInfoOwner({
                        field1: 'gouStatus',
                        value: true
                    })
            },
            verCard () {
                let aCity = {11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江', 31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北', 43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏', 61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: '新疆', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外'}
                let card = this.ownerCard
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
                        this.setDuCarInfoOwner({
                          field1: 'carOwner',
                          field2: 'cardNo',
                          value: this.ownerCard
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
                        this.setDuCarInfoOwner({
                          field1: 'carOwner',
                          field2: 'cardNo',
                          value: this.ownerCard
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
                       this.setDuCarInfoOwner({
                          field1: 'carOwner',
                          field2: 'cardNo',
                          value: this.ownerCard
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
                      this.setDuCarInfoOwner({
                          field1: 'carOwner',
                          field2: 'cardNo',
                          value: this.ownerCard
                       })
                    this.cardNoStatus = true
                }
            },
            setlicensePlateNo () {
                let licensePlateNo = this.licensePlateNoValue
                 if (/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/.test(licensePlateNo) === false) {
                    this.licensePlateNoTip = this.$refs.licensePlateNoTitle.innerHTML
                    this.licensePlateNoStatus = false
                } else {
                    this.licensePlateNoTip = ''
                    this.setDuCarInfoOwner({
                         field1: 'carInfo',
                         field2: 'licensePlateNo',
                         value: this.licensePlateNoValue
                    })
                    this.licensePlateNoStatus = true
                }
            },
            setBrandModel () {
                this.setDuCarInfoOwner({
                    field1: 'carInfo',
                    field2: 'brandModel',
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
                    this.setDuCarInfoOwner({
                        field1: 'carInfo',
                        field2: 'frameNo',
                        value: this.frameNoValue
                    })
                    this.frameNoStatus = true
                }
            },
            setEngineNo () {
                this.setDuCarInfoOwner({
                    field1: 'carInfo',
                    field2: 'engineNo',
                    value: this.engineNoValue
                })
            },
            setOwnerName () {
                let name = this.ownerName
                 if (/^([\u4e00-\u9fa5]){2,7}$/.test(name) === false || name === '') {
                    this.ownerNameTip = this.$refs.ownerNameTitle.innerHTML
                    this.ownerNameStatus = false
                } else {
                    this.ownerNameTip = ''
                    this.setDuCarInfoOwner({
                        field1: 'carOwner',
                        field2: 'name',
                        value: this.ownerName
                    })
                    this.ownerNameStatus = true
                }
            },
            setOwnerCard () {
                this.setDuCarInfoOwner({
                    field1: 'carOwner',
                    field2: 'cardNo',
                    value: this.ownerCard
                })
            },
            _next () {
                if (this.imgUrl === '') {
                   this.showConfirm('请上传行驶本照片')
                } else if (this.addressValue === '请选择车辆所在地') {
                   this.showConfirm('请选择车辆所在地')
                } else if (this.licensePlateNoValue === '' && this.circleStatus === true && this.licensePlateNoStatus === false) {
                   this.showConfirm('请检查车牌号填写')
                } else if (this.brandModelValue === '') {
                    this.showConfirm('请检查品牌型号填写')
                } else if (this.frameNoValue === '') {
                    this.showConfirm('请检查车架号填写')
                } else if (this.engineNoValue === '') {
                    this.showConfirm('请检查发动机号填写')
                } else if (this.$refs.registerDate.registerdate === '请选择车辆注册日期') {
                    this.showConfirm('请选择注册日期填写')
                } else if (this.isStatusA === true) {
                    if (this.$refs.guoHu.guhudate === '请选择车辆过户日期') {
                        this.showConfirm('请选择车辆过户日期')
                    } else if (this.ownerNameStatus === false) {
                        this.showConfirm('请检查车主姓名填写')
                    } else if (this.cardNoStatus === false) {
                        this.showConfirm('请检查身份证号填写')
                    } else {
                        this.$router.push({
                            name: 'duCar_config'
                        })
                    }
                } else if (this.ownerNameStatus === false) {
                    this.showConfirm('请检查车主姓名填写')
                } else if (this.cardNoStatus === false) {
                    this.showConfirm('请检查身份证号填写')
                } else {
                    this.$router.push({
                        name: 'duCar_config'
                    })
                }
            },
            statusA () {
                this.isStatusA = true
                this.isStatusB = false
                this.setDuCarInfoOwner({
                        field1: 'isStatusA',
                        value: true
                   })
                this.setDuCarInfoOwner({
                        field1: 'isStatusB',
                        value: false
                   })
                this.guhuStatus()
            },
            statusB () {
                this.isStatusA = false
                this.isStatusB = true
                this.setDuCarInfoOwner({
                        field1: 'isStatusA',
                        value: false
                   })
                this.setDuCarInfoOwner({
                        field1: 'isStatusB',
                        value: true
                   })
                this.guhuStatus()
            },
            guhuStatus () {
               let status = this.isStatusA
               if (status === true) {
                   this.guohuShow = true
                   this.setDuCarInfoOwner({
                        field1: 'carInfo',
                        field2: 'isTransfer',
                        value: '1'
                   })
                   if (this.duCarInfoOwner.carInfo.transferDate !== '' && this.duCarInfoOwner.carInfo.transferDate !== '请选择车辆过户日期') {
                       console.log(this.duCarInfoOwner.carInfo.transferDate)
                       console.log('this.duCarInfoOwner.carInfo.transferDate')
                   } else {
                       this.setDuCarInfoOwner({
                            field1: 'carInfo',
                            field2: 'transferDate',
                            value: '请选择车辆过户日期'
                        })
                        console.log('666')
                   }
               } else {
                   this.guohuShow = false
                   this.setDuCarInfoOwner({
                        field1: 'carInfo',
                        field2: 'isTransfer',
                        value: '0'
                   })
                   this.setDuCarInfoOwner({
                        field1: 'carInfo',
                        field2: 'transferDate',
                        value: ''
                   })
               }
            },
            getResidence () {
                selectArea().then(res => {
                    console.log(res)
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
                linkage('carValueArea', 'carArea', vm.pcArray, function (arr) {
                    let str = ''
                    for (let obj of arr) {
                        str += obj.value + ' '
                    }
                    vm.addressValue = str
                    vm.setDuCarInfoOwner({
                        field1: 'address',
                        value: vm.addressValue
                    })
                    if (arr.length === 2) {
                        vm.setDuCarInfoOwner({
                            field1: 'carInfo',
                            field2: 'provinceId',
                            value: arr[0].id
                        })
                        vm.setDuCarInfoOwner({
                            field1: 'carInfo',
                            field2: 'cityId',
                            value: arr[1].id
                        })
                    } else if (arr.length === 3) {
                        vm.setDuCarInfoOwner({
                            field1: 'carInfo',
                            field2: 'areaId',
                            value: arr[2].id
                        })
                        vm.setDuCarInfoOwner({
                            field1: 'carInfo',
                            field2: 'provinceId',
                            value: arr[0].id
                        })
                        vm.setDuCarInfoOwner({
                            field1: 'carInfo',
                            field2: 'cityId',
                            value: arr[1].id
                        })
                    }
                })
            },
            // 删除头像
            deleteImg () {
                this.imgUrl = ''
                this.picShow = false
                this.addBtn = true
            },
            // 头像上传
            upload (e) {
                this.picShow = true
                let files = e.target.files || e.dataTransfer.files
                if (!files.length) return
                this.picValue = files[0]
                this.imgPreview(this.picValue)
            },
            imgPreview (file) {
                let self = this
                let Orientation
                // 去获取拍照时的信息,解决拍出来的照片旋转问题
                Exif.getData(file, function () {
                    Orientation = Exif.getTag(this, 'Orientation')
                })
                // 看支持不支持FileReader
                if (!file || !window.FileReader) return
                if (/^image/.test(file.type)) {
                    // 创建一个reader
                    let reader = new FileReader()
                    // 将图片2将转成base64格式
                    reader.readAsDataURL(file)
                    // 读取成功后的回调
                    reader.onloadend = async function () {
                        let result = this.result
                        let img = new Image()
                        img.src = result
                        // 判断图片是否大于100K,是就直接上传，反之压缩图片
                        if (this.result.length <= (200 * 1024)) {
                            self.imgUrl = this.result
                            self.setDuCarInfoOwner({
                                    field1: 'carInfo',
                                    field2: 'drivingLicenseBase64',
                                    value: self.imgUrl
                                })
                            self.addBtn = false
                            console.log('sss')
                        } else {
                            img.onload = function () {
                                let data = self.compress(img, Orientation)
                                self.imgUrl = data
                                self.setDuCarInfoOwner({
                                    field1: 'carInfo',
                                    field2: 'drivingLicenseBase64',
                                    value: self.imgUrl
                                })
                                self.addBtn = false
                                console.log('aaa')
                            }
                        }
                    }
                }
            },
            rotateImg (img, direction, canvas) {
                // 最小与最大旋转方向，图片旋转4次后回到原方向
                const minStep = 0
                const maxStep = 3
                if (img === null) return
                // img的高度和宽度不能在img元素隐藏后获取，否则会出错
                let height = img.height
                let width = img.width
                let step = 2
                if (step === null) {
                    step = minStep
                }
                if (direction === 'right') {
                    step++
                    // 旋转到原位置，即超过最大值
                    step > maxStep && (step = minStep)
                } else {
                    step--
                    step < minStep && (step = maxStep)
                }
                // 旋转角度以弧度值为参数
                let degree = step * 90 * Math.PI / 180
                let ctx = canvas.getContext('2d')
                switch (step) {
                    case 0:
                        canvas.width = width
                        canvas.height = height
                        ctx.drawImage(img, 0, 0)
                        break
                    case 1:
                        canvas.width = height
                        canvas.height = width
                        ctx.rotate(degree)
                        ctx.drawImage(img, 0, -height)
                        break
                    case 2:
                        canvas.width = width
                        canvas.height = height
                        ctx.rotate(degree)
                        ctx.drawImage(img, -width, -height)
                        break
                    case 3:
                        canvas.width = height
                        canvas.height = width
                        ctx.rotate(degree)
                        ctx.drawImage(img, -width, 0)
                        break
                }
            },
            compress (img, Orientation) {
                let canvas = document.createElement('canvas')
                let ctx = canvas.getContext('2d')
                // 瓦片canvas
                let tCanvas = document.createElement('canvas')
                // let tctx = tCanvas.getContext('2d')
                let initSize = img.src.length
                let width = img.width
                let height = img.height
                // 如果图片大于四百万像素，计算压缩比并将大小压至400万以下
                let ratio
                if ((ratio = width * height / 4000000) > 1) {
                    console.log('大于400万像素')
                    ratio = Math.sqrt(ratio)
                    width /= ratio
                    height /= ratio
                } else {
                    ratio = 1
                }
                canvas.width = width
                canvas.height = height
                // 铺底色
                ctx.fillStyle = '#fff'
                ctx.fillRect(0, 0, canvas.width, canvas.height)
                // 如果图片像素大于100万则使用瓦片绘制
                let count
                if ((count = width * height / 1000000) > 1) {
                    console.log('超过100W像素')
                    count = ~~(Math.sqrt(count) + 1) // 计算要分成多少块瓦片
                    // 计算每块瓦片的宽和高
                    let nw = ~~(width / count)
                    let nh = ~~(height / count)
                    tCanvas.width = nw
                    tCanvas.height = nh
                    for (let i = 0; i < count; i++) {
                        for (let j = 0; j < count; j++) {
                            ctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh)
                            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh)
                        }
                    }
                } else {
                    ctx.drawImage(img, 0, 0, width, height)
                }
                // 修复ios上传图片的时候 被旋转的问题
                if (Orientation !== '' && Orientation !== 1) {
                    switch (Orientation) {
                        case 6: // 需要顺时针(向左)90度旋转
                            this.rotateImg(img, 'left', canvas)
                            break
                        case 8: // 需要逆时针(向右)90度旋转
                            this.rotateImg(img, 'right', canvas)
                            break
                        case 3: // 需要180度旋转
                            this.rotateImg(img, 'right', canvas)
                            this.rotateImg(img, 'right', canvas)
                            break
                    }
                }
                // 进行最小压缩
                let ndata = canvas.toDataURL('image/jpeg', 0.1)
                console.log('压缩前：' + initSize)
                console.log('压缩后：' + ndata.length)
                console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + '%')
                tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0
                return ndata
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
		padding-bottom: (100/$scale)
		.upload
			display: flex
			justify-content: center
			align-items: center
			.closeX
				font-size: (30/$scale)
				position: absolute
				top: (26/$scale)
				left: (620/$scale)
			.uploadBtn
				width: (540/$scale)
				height: (70/$scale)
				border: 1px solid #FF4455
				font-size: (28/$scale)
				color: #FF4455
				text-align: center
				line-height: (70/$scale)
				position: relative
				margin: (30/$scale) 0
			.showPic
				border: 1px solid pink
				width: 70%
				margin: (30/$scale) auto
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
			padding-left: (30/$scale)
			background: #fff
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
				padding: 0 (30/$scale)
				background: #fff
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
				.normal
					color: #333
				.active
					color: #bbb
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