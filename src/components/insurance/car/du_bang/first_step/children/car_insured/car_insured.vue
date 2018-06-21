<template>
	<div class="applicantInfo">
		<div class="detailTitle">
			<a class="titleLeft">被保人信息</a>
			<p class="titleLeft">
				<span class="redGou" @click="changeGou()" v-if='gouStatus'></span>
				<span class="redCircle" @click="changeCircle()" v-if='circleStatus'></span>
				<a class='same'>同投保人</a>
			</p>
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
		<div class="detail">
			<div class="info lastInfo">
				<p class="desTitle">地址</p>
				<p class="placeholders">
					<!-- <input type="text" id='insuredAddress' placeholder="请填写地址" class="placeholdersInput" v-model='insuredAddressValue' @blur="setAdress"/> -->
                    <span id='insuredAddress' class="normal" :class="{'active': insuredAddressValue === '请填写地址'}">{{insuredAddressValue}}</span>
				</p>
			</div>
            <div id='insuredArea'></div>
		</div>
		<div class="detail lastInfo">
			<div class="info lastInfo">
				<p class="desTitle" ref='payPhoneTitle'>支付手机号</p>
				<p class="placeholders">
					<input type="text" placeholder="请填写支付手机号" class="placeholdersInput" v-model='payPhoneValue' @blur="setPayPhone"/>
				</p>
			</div>
			<div :class="this.payPhoneTip !== '' ? 'errTip' : 'hide'">
				<span class="errIco"></span>
				<span class="errText">{{payPhoneTip}}填写有误</span>
			</div>
		</div>
	</div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import {linkage} from 'common/js/linkage-util.js'
import {selectAllArea} from 'api/car/du-bang/insurance.js'
import {RET_OK, CODE_OK} from 'service/variable.js'
    export default {
        data () {
            return {
                nameValue: '',
                cardValue: '',
                phoneValue: '',
                emailValue: '',
                insuredAddressValue: '',
                payPhoneValue: '',
                cardTip: '',
                nameTip: '',
                phoneTip: '',
                emailTip: '',
                payPhoneTip: '',
                phoneStatus: true,
                nameStatus: true,
                cardNoStatus: true,
                emailStatus: true,
                payPhoneStatus: true,
                gouStatus: false,
                circleStatus: true
            }
        },
        created () {
            this.setDefault()
            this.getResidence()
        },
        computed: {
           ...mapGetters([
               'duCarTouBeiBaoRen'
          ])
        },
        methods: {
           ...mapMutations({
              setCarInsured: 'SET_CAR_DUBANG_TOUBEIBAOREN'
            }),
            setDefault () {
               let name = this.duCarTouBeiBaoRen.insured.name
               let card = this.duCarTouBeiBaoRen.insured.cardNo
               let phone = this.duCarTouBeiBaoRen.insured.phone
               let email = this.duCarTouBeiBaoRen.insured.email
               let address = this.duCarTouBeiBaoRen.insured.address
               let payPhone = this.duCarTouBeiBaoRen.payPhone
               this.nameValue = name
               this.cardValue = card
               this.phoneValue = phone
               this.emailValue = email
               this.insuredAddressValue = address
               this.payPhoneValue = payPhone
               this.gouStatus = this.duCarTouBeiBaoRen.gouStatus
               this.circleStatus = this.duCarTouBeiBaoRen.circleStatus
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
               if (this.payPhoneValue === '') {
                   this.payPhoneStatus = false
               }
            },
            changeGou () {
                console.log('111')
                this.gouStatus = false
                this.circleStatus = true
                this.setCarInsured({
                        field1: 'circleStatus',
                        value: true
                    })
                this.setCarInsured({
                        field1: 'gouStatus',
                        value: false
                    })
                this.setCarInsured({
                        field1: 'insured',
                        field2: 'name',
                        value: ''
                    })
                this.setCarInsured({
                        field1: 'insured',
                        field2: 'cardNo',
                        value: ''
                    })
                this.setCarInsured({
                        field1: 'insured',
                        field2: 'phone',
                        value: ''
                    })
                this.setCarInsured({
                        field1: 'insured',
                        field2: 'email',
                        value: ''
                    })
                this.setCarInsured({
                        field1: 'insured',
                        field2: 'address',
                        value: '请填写地址'
                    })
                this.setDefault()
            },
            changeCircle () {
                this.gouStatus = true
                this.circleStatus = false
                this.setCarInsured({
                        field1: 'circleStatus',
                        value: false
                    })
                this.setCarInsured({
                        field1: 'gouStatus',
                        value: true
                    })
                this.setCarInsured({
                        field1: 'insured',
                        field2: 'name',
                        value: this.duCarTouBeiBaoRen.applicant.name
                    })
                this.setCarInsured({
                        field1: 'insured',
                        field2: 'cardNo',
                        value: this.duCarTouBeiBaoRen.applicant.cardNo
                    })
                this.setCarInsured({
                        field1: 'insured',
                        field2: 'phone',
                        value: this.duCarTouBeiBaoRen.applicant.phone
                    })
                this.setCarInsured({
                        field1: 'insured',
                        field2: 'email',
                        value: this.duCarTouBeiBaoRen.applicant.email
                    })
                this.setCarInsured({
                        field1: 'insured',
                        field2: 'address',
                        value: this.duCarTouBeiBaoRen.applicant.address
                    })
                this.setDefault()
            },
            verName () {
            let name = this.nameValue
                 if (/^([\u4e00-\u9fa5]){2,7}$/.test(name) === false || name === '') {
                    this.nameTip = this.$refs.nameTitle.innerHTML
                    this.nameStatus = false
                } else {
                    this.nameTip = ''
                    this.setCarInsured({
                        field1: 'insured',
                        field2: 'name',
                        value: this.nameValue
                    })
                    this.nameStatus = true
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
                        this.cardTip = '出生日期非法'
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
                       this.setCarInsured({
                            field1: 'insured',
                            field2: 'cardNo',
                            value: this.cardValue
                       })
                       this.cardNoStatus = true
                    }
            },
            verPhone () {
                let phone = this.phoneValue
                 if (/^1[3|4|5|7|8][0-9]{9}$/.test(phone) === false || phone === '') {
                    this.phoneTip = this.$refs.phoneTitle.innerHTML
                    this.phoneStatus = false
                } else {
                    this.phoneTip = ''
                    this.setCarInsured({
                        field1: 'insured',
                        field2: 'phone',
                        value: this.phoneValue
                    })
                    this.phoneStatus = true
                }
            },
            verEmail () {
                let email = this.emailValue
                 if (/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(email) === false || email === '') {
                    this.emailTip = this.$refs.emailTitle.innerHTML
                    this.emailStatus = false
                } else {
                    this.emailTip = ''
                    this.setCarInsured({
                        field1: 'insured',
                        field2: 'email',
                        value: this.emailValue
                    })
                    this.emailStatus = true
                }
            },
            setPayPhone () {
                 let payPhone = this.payPhoneValue
                 if (/^1[3|4|5|7|8][0-9]{9}$/.test(payPhone) === false || payPhone === '') {
                    this.payPhoneTip = this.$refs.payPhoneTitle.innerHTML
                    this.payPhoneStatus = false
                } else {
                    this.payPhoneTip = ''
                    this.setCarInsured({
                        field1: 'payPhone',
                        value: this.payPhoneValue
                    })
                    this.payPhoneStatus = true
                }
            },
            getResidence () {
                selectAllArea().then(res => {
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
                linkage('insuredAddress', 'insuredArea', vm.pcArray, function (arr) {
                    let str = ''
                    for (let obj of arr) {
                        str += obj.value + ' '
                    }
                    vm.insuredAddressValue = str
                     vm.setCarInsured({
                        field1: 'insured',
                        field2: 'address',
                        value: vm.insuredAddressValue
                    })
                })
            },
            setAdress () {
                    this.setCarInsured({
                        field1: 'insured',
                        field2: 'address',
                        value: this.insuredAddressValue
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
    	display: flex
    	justify-content: space-between
    	background: #fff
    	padding-left: (30/$scale)
    	.titleLeft
    		color: #FF4456
    		position: relative
    		.redCircle
    			bg-image('redCircle')
    			display: inline-block
    			width: (32/$scale)
    			height: (32/$scale)
    			position: absolute
    			left: (-50/$scale)
    			top: (32/$scale)
    			background-size: cover
    			margin-right: (30/$scale)
			.redGou
				bg-image('gou')
				position: absolute
				left: (-50/$scale)
				top: (32/$scale)
				display: inline-block
				width: (32/$scale)
				height: (32/$scale)
				background-size: cover
				margin-right: (30/$scale)
		.titleRight
			color: #333
			float: right
			font-size: 15px
	.lastInfo
		border-bottom: none!important
	.detail
		width: 100%
		border-bottom: 1px solid #E6E6E6
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