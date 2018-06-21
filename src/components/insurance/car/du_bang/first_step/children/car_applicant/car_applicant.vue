<template>
	<div class="applicantInfo">
		<div class="detailTitle">
			<a class="titleLeft">投保人信息</a>
		</div>
		<div class="detail">
			<div class="info">
				<p class="desTitle" ref='nameTitle'>姓名</p>
				<p class="placeholders">
					<input type="text" placeholder="请填写姓名" class="placeholdersInput" v-model="nameValue" @blur='verName'/>
				</p>
			</div>
			<div :class="this.nameTip !== '' ? 'errTip' : 'hide'">
				<span class="errIco"></span>
				<span class="errText">{{nameTip}}填写有误</span>
			</div>
		</div>
		<div class="detail">
			<div class="info">
				<p class="desTitle" ref='phoneTitle'>手机号码</p>
				<p class="placeholders">
					<input type="text" placeholder="请填写手机号码" class="placeholdersInput" v-model='phoneValue' @blur='verPhone'/>
				</p>
			</div>
			<div :class="this.phoneTip !== '' ? 'errTip' : 'hide'">
				<span class="errIco"></span>
				<span class="errText">{{phoneTip}}填写有误</span>
			</div>
		</div>
		<div class="detail">
			<div class="info">
				<p class="desTitle" ref='idTitle'>身份证号码</p>
				<p class="placeholders">
					<input type="text" placeholder="请填写身份证号码" class="placeholdersInput" v-model="cardValue" @blur='verCard'/>
				</p>
			</div>
			<div :class="this.cardTip !== '' ? 'errTip' : 'hide'">
				<span class="errIco"></span>
				<span class="errText">{{cardTip}}填写有误</span>
			</div>
		</div>
		<div class="detail">
			<div class="info">
				<p class="desTitle" ref='emailTitle'>邮箱</p>
				<p class="placeholders">
					<input type="text" placeholder="请填写邮箱" class="placeholdersInput" v-model='emailValue' @blur='verEmail'/>
				</p>
			</div>
			<div :class="this.emailTip !== '' ? 'errTip' : 'hide'">
				<span class="errIco"></span>
				<span class="errText">{{emailTip}}填写有误</span>
			</div>
		</div>
		<div class="detail lastInfo">
			<div class="info">
				<p class="desTitle">地址</p>
				<p class="placeholders">
                    <span id='address' class="normal" :class="{'active': addressValue === '请填写地址'}">{{addressValue}}</span>
				</p>
			</div>
            <div id='applicantArea'></div>
		</div>
	</div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import {linkage} from 'common/js/linkage-util.js'
import {selectAllArea} from 'api/car/du-bang/insurance.js'
import {RET_OK, CODE_OK} from 'service/variable.js'
// import API from 'service/config.js'
// import {RET_OK, CODE_OK} from 'service/variable.js'
// import applicantarea from 'components/insurance/car/du_bang/first_step/children/applicant_area/applicant_area'
    export default {
        data () {
            return {
                nameValue: '',
                cardValue: '',
                phoneValue: '',
                emailValue: '',
                addressValue: '',
                sexValue: '男',
                cardTip: '',
                nameTip: '',
                phoneTip: '',
                emailTip: '',
                pcArray: [],
                residence: '请选择', // 居住地回显
                phoneStatus: true,
                nameStatus: true,
                cardNoStatus: true,
                emailStatus: true
            }
        },
        created () {
        this.setDefault()
        this.getResidence()
        },
        computed: {
           ...mapGetters([
               'duCarTouBeiBaoRen'
          ]),
          default () {
              this.setDefault()
          }
        },
        methods: {
           ...mapMutations({
              setCarApplicant: 'SET_CAR_DUBANG_TOUBEIBAOREN'
            }),
            setDefault () {
               let name = this.duCarTouBeiBaoRen.applicant.name
               let card = this.duCarTouBeiBaoRen.applicant.cardNo
               let phone = this.duCarTouBeiBaoRen.applicant.phone
               let email = this.duCarTouBeiBaoRen.applicant.email
               let address = this.duCarTouBeiBaoRen.applicant.address
               this.value = this.duCarTouBeiBaoRen.applicant.address
               this.nameValue = name
               this.cardValue = card
               this.phoneValue = phone
               this.emailValue = email
               this.addressValue = address
               if (this.nameValue === '') {
                   this.nameStatus = false
               }
               if (this.cardValue === '') {
                   this.cardNoStatus = false
               }
               if (this.phoneValue === '') {
                   this.phoneStatus = false
               }
               if (this.emailValue === '') {
                   this.emailStatus = false
               }
            // console.log(this.nameStatus)
            // console.log(this.phoneStatus)
            // console.log(this.cardNoStatus)
            // console.log(this.emailStatus)
            },
            verName () {
                let name = this.nameValue
                if (/^([\u4e00-\u9fa5]){2,7}$/.test(name) === false || name === '') {
                    this.nameTip = this.$refs.nameTitle.innerHTML
                    this.nameStatus = false
                } else {
                    this.nameTip = ''
                    this.setCarApplicant({
                        field1: 'applicant',
                        field2: 'name',
                        value: this.nameValue
                    })
                    this.nameStatus = true
                    console.log(this.duCarTouBeiBaoRen.applicant.name)
                    console.log(this.nameStatus)
                }
            },
            verCard () {
                let aCity = {11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江', 31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北', 43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏', 61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: '新疆', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外'}
                let card = this.cardValue
                    if (!/^\d{17}(\d|x)$/i.test(card) || card === '') {
                        this.cardTip = '身份证长度或格式'
                        this.cardNoStatus = false
                        return false
                    } else {
                        this.cardTip = ''
                        this.cardNoStatus = true
                    }
                    console.log('err')
                let lasts = card.substring(card.length - 1, card.length)
                    if (isNaN(lasts) && lasts !== 'X' || card === '') {
                        this.cardTip = '身份证号最后一位错误，应该是大写X'
                        this.cardNoStatus = false
                        return false
                    } else {
                        this.cardTip = ''
                        this.cardNoStatus = true
                    }
                card = card.replace(/x$/i, 'a')
                    if (aCity[parseInt(card.substr(0, 2))] === null || card === '') {
                        this.cardTip = '身份证地区'
                        this.cardNoStatus = false
                        return false
                    } else {
                        this.cardTip = ''
                        this.cardNoStatus = true
                    }
                let sBirthday = card.substr(6, 4) + '-' + Number(card.substr(10, 2)) + '-' + Number(card.substr(12, 2))
                let d = new Date(sBirthday.replace(/-/g, '/'))
                   if (sBirthday !== (d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()) || card === '') {
                        this.cardTip = '身份证号出生日期'
                        this.cardNoStatus = false
                        return false
                    }
                let iSum = 0
                for (var i = 17; i >= 0; i--) {
                    iSum += (Math.pow(2, i) % 11) * parseInt(card.charAt(17 - i), 11)
                }
                if (iSum % 11 !== 1) {
                    this.cardTip = '你输入的身份证号'
                    this.cardNoStatus = false
                    return false
                } else {
                       this.cardTip = ''
                       this.setCarApplicant({
                            field1: 'applicant',
                            field2: 'cardNo',
                            value: this.cardValue
                        })
                        this.cardNoStatus = true
                    }
            },
            verPhone () {
                let phone = this.phoneValue
                 if (/^1[3|4|5|7|8][0-9]{9}$/.test(phone) === false || phone === '') {
                    this.phoneStatus = false
                    this.phoneTip = this.$refs.phoneTitle.innerHTML
                } else {
                    this.phoneTip = ''
                    this.setCarApplicant({
                        field1: 'applicant',
                        field2: 'phone',
                        value: this.phoneValue
                    })
                    this.phoneStatus = true
                }
            },
            verEmail () {
                let email = this.emailValue
                 if (/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(email) === false || email === '') {
                    this.emailTip = this.$refs.emailTitle.innerHTML
                    this.emailStatus = false
                } else {
                    this.emailTip = ''
                    this.setCarApplicant({
                        field1: 'applicant',
                        field2: 'email',
                        value: this.emailValue
                    })
                    this.emailStatus = true
                }
            },
            getResidence () {
                selectAllArea().then(res => {
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
                linkage('address', 'applicantArea', vm.pcArray, function (arr) {
                    let str = ''
                    for (let obj of arr) {
                        str += obj.value + ' '
                    }
                    vm.addressValue = str
                    vm.setCarApplicant({
                        field1: 'applicant',
                        field2: 'address',
                        value: vm.addressValue
                    })
                })
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import '~common/stylus/variable.styl'
    @import '~common/stylus/mixin.styl'
    .detailTitle
    	font-size: (32/$scale)
    	line-height: (100/$scale)
    	color: #333
    	border-bottom: 1px solid #FF4456
    	background: #fff
    	padding-left: (30/$scale)
    	.titleLeft
    		color: #FF4456
		.titleRight
			color: #333
			float: right
			font-size: 15px
	.detail
		width: 100%
		border-bottom: 1px solid #E6E6E6
	.lastInfo
			border-bottom: none
		.info
			font-size: (28/$scale)
			display: flex
			justify-content: space-between
			line-height: (100/$scale)
			background: #fff
			padding: 0 (30/$scale)
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
			.sex
				width: (110/$scale)
				height: (50/$scale)
				background: #ffffff
				color: #666
				border: 1px solid #E6E6E6
				border-radius: 3px
			.redSex
				border: 1px solid #FF4455
				color: #FF4455
				width: (110/$scale)
				height: (50/$scale)
				background: #ffffff
				border-radius: 3px
			.placeholdersInput
				text-align: right
				background: transparent
			.normal
				color: #333
				text-align: right
				width: 100%
				&.active
					color: #bbb
</style>