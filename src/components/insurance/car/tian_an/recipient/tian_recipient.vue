<template>
	<div class="carInfoWarp">
		<loading v-if='loadingShow'></loading>
		<div v-else>
			<div class="carInfo">
				<p class="detailTitle">
					<a class="titleLeft">收件人信息</a>
				</p>
				<div class="detail">
					<div class="info">
						<p class="desTitle">保单配送方式：</p>
						<p class="placeholders">
							<select class='select' v-model='deliveryValue' v-on:change='setOption()'>
								<option v-for='item in delivery'>{{item.name}}</option>
							</select>
						</p>
					</div>
				</div>
				<div class="detail">
					<div class="info">
						<p class="desTitle" ref='nameTitle'>收件人姓名</p>
						<p class="placeholders">
							<input type="text" placeholder="请填写收件人姓名" class="placeholdersInput" v-model='recipientName' @blur='verName'/>
						</p>
					</div>
					<div :class="this.nameTip !== '' ? 'errTip' : 'hide'">
                        <span class="errIco"></span>
                        <span class="errText">{{nameTip}}填写有误</span>
                    </div>
				</div>
				<div class="detail">
					<div class="info">
						<p class="desTitle" ref='phoneTitle'>联系方式</p>
						<p class="placeholders">
							<input type="text" placeholder="请填写联系方式" class="placeholdersInput" v-model='recipientPhone' @blur='verPhone'/>
						</p>
					</div>
					<div :class="this.phoneTip !== '' ? 'errTip' : 'hide'">
                        <span class="errIco"></span>
                        <span class="errText">{{phoneTip}}填写有误</span>
                    </div>
				</div>
				<div class="detail">
					<div class="info">
						<p class="desTitle" ref='faPiao'>发票抬头</p>
						<p class="placeholders">
							<input type="text" placeholder="请填写发票抬头" class="placeholdersInput" v-model='invoice' @blur='setInvoice'/>
						</p>
					</div>
				</div>
				<div class="detail">
					<div class="info">
						<p class="desTitle">配送时间</p>
						<p class="placeholders">
							<input type="text" id="deliverydateWarp" placeholder="请选择配送时间" class="placeholdersInput" v-model='deliveryDate'/>
						</p>
					</div>
					<div id="deliveryCalendar"></div>
				</div>
				<div class="detail">
					<div class="info">
						<p class="desTitle">配送地址</p>
						<p class="placeholders">
							<input type="text" id='tianRecipientAddress' placeholder="请选择地址" class="placeholdersInput" v-model='recipientAddress'/>
						</p>
					</div>
					<div id='tianRecipientArea'></div>
				</div>
                <div class="detail">
					<div class="info lastInfo">
						<p class="desTitle" ref='detailAddressTitle'>详细地址</p>
						<p class="placeholders">
							<input type="text" placeholder="请填写详细地址" class="placeholdersInput" v-model='detailAddress' @blur="verDetail"/>
						</p>
					</div>
				</div>
			</div>
			<info-footer text="下一步" @next='_next'></info-footer>
		</div>
        <confirm  ref="confirm" :text="confirmText"></confirm>
	</div>
</template>

<script>
	import InfoFooter from 'base/footer/footer'
	import Split from 'base/split/split'
	import {linkage} from 'common/js/linkage-util.js'
    import {recipient} from 'api/car/tian-an/insurance.js'
    import {selectAllArea} from 'api/car/du-bang/insurance.js'
	import {RET_OK, CODE_OK} from 'service/variable.js'
	import {calendar} from 'common/js/calendar-util.js'
	import {mapGetters, mapMutations} from 'vuex'
	import Loading from 'base/loading/loading'
	import Confirm from 'base/confirm/confirm'
	import {confirm} from 'common/js/mixin.js'
	export default {
        mixins: [confirm],
        data () {
            return {
                isCircle: false,
                isStatusA: false,
                isStatusB: true,
                recipientName: '',
                recipientPhone: '',
                invoice: '',
                deliveryDate: '',
                recipientAddress: '',
                delivery: [
                    {name: '天安快递给客户'},
                    {name: '天安快递给五星'}
                ],
                deliveryValue: '天安快递给客户',
                pcArray: [],
                loadingShow: false,
                phoneStatus: true,
                nameStatus: true,
                addressStatus: true,
                nameTip: '',
                phoneTip: '',
                detailAddress: ''
            }
        },
        mounted () {
            this.getDay()
        },
        computed: {
            ...mapGetters([
                'tianCarRecipient', 'tianCarOrder'
            ])
        },
        created () {
            this._getResidence()
            this.setDefault()
            console.log(this.detailAddress)
            console.log('this.detailAddress')
            console.log(this.tianCarRecipient)
        },
        methods: {
            ...mapMutations({
                setTianRecipent: 'SET_CAR_TIANAN_RECIPIENT',
                setTianOrder: 'SET_CAR_TIANAN_ORDERPASS'
            }),
            setDefault () {
                console.log(this.tianCarRecipient)
                let acceptName = this.tianCarRecipient.policyPostInfo.acceptName
                this.recipientName = acceptName
                let acceptTelephone = this.tianCarRecipient.policyPostInfo.acceptTelephone
                this.recipientPhone = acceptTelephone
                let invoiceTitle = this.tianCarRecipient.policyPostInfo.invoiceTitle
                this.invoice = invoiceTitle
                let appointmentTime = this.tianCarRecipient.policyPostInfo.appointmentTime
                this.deliveryDate = appointmentTime
                let selectAddress = this.tianCarRecipient.selectAddress
                this.recipientAddress = selectAddress
                let detailAddressValue = this.tianCarRecipient.detailAddress
                this.detailAddress = detailAddressValue
                if (this.recipientName === '') {
                    this.nameStatus = false
                }
                if (this.recipientPhone === '') {
                    this.phoneStatus = false
                }
                if (this.detailAddress === '') {
                    this.addressStatus = false
                }
                this.setOption()
            },
            setOption () {
                let value = this.deliveryValue
                if (value === '天安快递给客户') {
                   this.setTianRecipent({
                        field1: 'policyPostInfo',
                        field2: 'deliveryType',
                        value: '1'
                    })
                } else if (value === '天安快递给五星') {
                    this.setTianRecipent({
                        field1: 'policyPostInfo',
                        field2: 'deliveryType',
                        value: '2'
                    })
                }
            },
            verName () {
                let name = this.recipientName
                if (/^([\u4e00-\u9fa5]){2,7}$/.test(name) === false) {
                    this.nameStatus = false
                    this.nameTip = this.$refs.nameTitle.innerHTML
                } else {
                    this.nameTip = ''
                    this.setTianRecipent({
                        field1: 'policyPostInfo',
                        field2: 'acceptName',
                        value: this.recipientName
                    })
                    this.nameStatus = true
                    // console.log(this.tianCarRecipient)
                }
            },
            verPhone () {
                let phone = this.recipientPhone
                if (/^1[3|4|5|7|8][0-9]{9}$/.test(phone) === false) {
                    this.phoneStatus = false
                    this.phoneTip = this.$refs.phoneTitle.innerHTML
                } else {
                    this.phoneTip = ''
                    this.setTianRecipent({
                        field1: 'policyPostInfo',
                        field2: 'acceptTelephone',
                        value: this.recipientPhone
                    })
                    this.phoneStatus = true
                }
            },
            setInvoice () {
                this.setTianRecipent({
                    field1: 'policyPostInfo',
                    field2: 'invoiceTitle',
                    value: this.invoice
                })
            },
            getDay () {
                let vm = this
                let d = new Date()
                let str = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + (d.getDate() + 1)
                calendar('deliverydateWarp', 'deliveryCalendar', str, new Date() + 1, str, function (arr1, arr2) {
                    vm.deliveryDate = arr2.join('-')
                    vm.setTianRecipent({
                        field1: 'policyPostInfo',
                        field2: 'appointmentTime',
                        value: vm.deliveryDate
                    })
                })
            },
            _getResidence () {
                selectAllArea().then(res => {
                    console.log(res)
                    if (res.ret === RET_OK) {
                        if (res.data.code === CODE_OK) {
                            this.pcArray = res.data.pcs
                            console.log(this.pcArray)
                            this.choiceResidence()
                        }
                    }
                })
            },
            choiceResidence () {
            let vm = this
                linkage('tianRecipientAddress', 'tianRecipientArea', vm.pcArray, function (arr) {
                    console.log(arr)
                    let str = ''
                    for (let obj of arr) {
                        str += obj.value + ' '
                    }
                    vm.recipientAddress = str
                    vm.setTianRecipent({
                        field1: 'selectAddress',
                        value: vm.recipientAddress
                    })
                    vm.setTianRecipent({
                        field1: 'policyPostInfo',
                        field2: 'acceptProvince',
                        value: arr[0].id.toString()
                    })
                    vm.setTianRecipent({
                        field1: 'policyPostInfo',
                        field2: 'acceptCity',
                        value: arr[1].id.toString()
                    })
                    vm.setTianRecipent({
                        field1: 'policyPostInfo',
                        field2: 'acceptTown',
                        value: arr[2].id.toString()
                    })
                })
            },
            verDetail () {
                let detailAddress = this.detailAddress
                if (/^[a-zA-Z0-9\u4e00-\u9fa5\s]+$/.test(detailAddress) === false) {
                    this.addressStatus = false
                    this.detailAddressTip = this.$refs.detailAddressTitle.innerHTML
                } else {
                    this.detailAddressTip = ''
                    // let addressRes = this.recipientAddress + this.detailAddress
                    this.setTianRecipent({
                        field1: 'detailAddress',
                        value: detailAddress
                    })
                    this.addressStatus = true
                }
            },
            _next () {
                if (this.nameStatus === false || this.recipientName === '') {
                   this.showConfirm('请检查收件人姓名填写')
                } else if (this.recipientPhone === '' || this.phoneStatus === false) {
                   this.showConfirm('请检查收件人联系方式')
                } else if (this.invoice === '') {
                    this.showConfirm('请检查发票抬头填写')
                } else if (this.deliveryDate === '') {
                    this.showConfirm('请选择配送时间')
                } else if (this.recipientAddress === '') {
                    this.showConfirm('请选择配送地址')
                } else if (this.detailAddress === '' || this.addressStatus === false) {
                    this.showConfirm('请检查详细地址填写')
                } else {
                    this.loadingShow = true
                    this.setTianRecipent({
                        field1: 'policyPostInfo',
                        field2: 'acceptAddress',
                        value: this.recipientAddress + this.detailAddress
                    })
                    let data = this.tianCarRecipient
                    recipient(data).then(res => {
                        console.log(res)
                        if (res.ret === RET_OK) {
                            if (res.data.code === CODE_OK) {
                                this.loadingShow = false
                                this.setTianOrder({ // 交强险投保单号
                                    field1: 'bzProposalNo',
                                     value: res.data.busProposalNo
                                })
                                this.setTianOrder({ // 商业险投保单号
                                    field1: 'busProposalNo',
                                    value: res.data.bzProposalNo
                                })
                                this.setTianOrder({ // 主保单号
                                    field1: 'proposalNo',
                                    value: res.data.proposalNo
                                })
                                this.setTianOrder({ // 订单id
                                    field1: 'carPolicyId',
                                    value: res.data.carPolicyId
                                })
                                this.$router.push({
                                    name: 'order'
                                })
                            } else {
                                this.loadingShow = false
                                this.showConfirm(res.msg)
                        }
                        } else {
                            this.loadingShow = false
                            this.showConfirm(res.msg)
                        }
                    })
                }
            }
        },
        components: {
            Split,
            InfoFooter,
            Loading,
            Confirm
        }
	}
</script>

<style lang="stylus" scoped>
	@import '~common/stylus/variable.styl'
	@import '~common/stylus/mixin.styl'
	.carInfoWarp
		padding: 0 0 (100/$scale) 0
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
			padding: 0 (30/$scale)
			background: #fff
			.titleLeft
				color: #FF4456
			.titleRight
				color: #333
				float: right
				font-size: 15px
		.detail
			width: 100%
			background: #fff
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
				margin-right: (30/$scale)
				.errIco
					width: (28/$scale)
					height: (28/$scale)
					display: inline-block
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
				margin-left: (30/$scale)
			.license
				color: #444
				display: flex
				align-items: center
				margin-left: (60/$scale)
				.circle
					width: (30/$scale)
					height: (30/$scale)
					display: inline-block
					background-size: contain
					background-repeat: no-repeat
					float: left
					margin-right: (14/$scale)
				.circleGou
					width: (30/$scale)
					height: (30/$scale)
					display: inline-block
					background-size: contain
					background-repeat: no-repeat
					float: left
					margin-right: (14/$scale)
			.placeholders
				color: #BBB
				margin-right: (30/$scale)
				.select
					width: (260/$scale)
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
</style>