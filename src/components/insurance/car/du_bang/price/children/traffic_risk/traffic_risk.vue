<template>
	<div class="insuranceWarp">
		<div class="insuranceDetail">
			<div class="detailTop borderBottom">
				<p class="insuranceTitleDes">纳税类型</p>
				<div class="insurancePrice">
					<p class="inPriceDropDown">
						<select class='select' v-model='trafficValue' v-on:change='setOption'>
							<option v-for='item in traffic'>{{item.name}}</option>
						</select>
						<i class="arr"></i>
					</p>
				</div>
			</div>
		</div>
		<div class="insuranceDetail">
			<div class="detailTop borderBottom" v-if='dataStatus'>
				<p class="insuranceTitleDes">纳税起期</p>
				<div class="insurancePrice">
					<p class="inPriceDropDown">
					    <a class="text" :class="{'active': this.duCarPremium.carShipTax.taxStartDate !== ''}"> {{this.duCarPremium.carShipTax.taxStartDate}}</a>			 
					</p>
				</div>
			</div>
		</div>
		<div class="insuranceDetail">
			<div class="detailTop borderBottom" v-if='dataStatus'>
				<p class="insuranceTitleDes">纳税止期</p>
				<div class="insurancePrice">
					<p class="inPriceDropDown">
						<a class="text" :class="{'active': this.duCarPremium.carShipTax.taxEndDate !== ''}"> {{this.duCarPremium.carShipTax.taxEndDate}}</a>
					</p>
				</div>
			</div>
		</div>
		<div class="insuranceDetail">
			<div class="detailTop borderBottom" v-if='wsStatus'>
				<p class="insuranceTitleDes">开具完税凭证的税务机关名称</p>
				<div class="insurancePrice">
					<p class="inPriceDropDown">
						<input type="text" placeholder="请输入相应机关名称" class="trafficInput" v-model='wsjgName' @blur="setWsJg"/>
					</p>
				</div>
			</div>
		</div>
		<div class="insuranceDetail">
			<div class="detailTop borderBottom" v-if='wsStatus'>
				<p class="insuranceTitleDes">完税凭证号码</p>
				<div class="insurancePrice">
					<p class="inPriceDropDown">
						<input type="text" placeholder="请输入完税凭证号码" class="trafficInput" v-model='wsNum' @blur="setWsNum"/>
					</p>
				</div>
			</div>
		</div>
		<div class="insuranceDetail">
			<div class="detailTop borderBottom" v-if='jmsReasonCase'>
				<p class="insuranceTitleDes">减免税原因</p>
				<div class="insurancePrice">
					<p class="inPriceDropDown">
						<select class='select' v-model='jmsReasonValue' v-on:change='setJmsReason'>
							<option v-for='item in jmsReason'>{{item.name}}</option>
						</select>
						<i class="arr"></i>
					</p>
				</div>
			</div>
		</div>
		<div class="insuranceDetail">
			<div class="detailTop borderBottom" v-if='jmsReasonCase'>
				<p class="insuranceTitleDes">减免税方案</p>
				<div class="insurancePrice">
					<p class="inPriceDropDown">
						<select class='select' v-model='jmsCaseValue' v-on:change='setJmsCase'>
							<option v-for='item in jmsCase'>{{item.name}}</option>
						</select>
						<i class="arr"></i>
					</p>
				</div>
			</div>
		</div>
		<div class="insuranceDetail">
			<div class="detailTop borderBottom" v-if='bljm'>
				<p class="insuranceTitleDes">比例减免</p>
				<div class="insurancePrice">
					<p class="inPriceDropDown">
						<input type="text" placeholder="请输入减免比例" class="trafficInput" v-model='bljmValue' @blur="setBljm"/>
					</p>
				</div>
			</div>
		</div>
		<div class="insuranceDetail">
			<div class="detailTop borderBottom" v-if='jmje'>
				<p class="insuranceTitleDes">减免金额</p>
				<div class="insurancePrice">
					<p class="inPriceDropDown">
						<input type="text" placeholder="请输入减免金额" class="trafficInput" v-model='jmjeValue' @blur="setJmje"/>
					</p>
				</div>
			</div>
		</div>
		<div class="insuranceDetail">
			<div class="detailTop borderBottom" v-if='jmsStatus'>
				<p class="insuranceTitleDes">减免税凭证号</p>
				<div class="insurancePrice">
					<p class="inPriceDropDown">
						<input type="text" placeholder="请输入减免税凭证号" class="trafficInput" v-model='jmsNum' @blur="setJmsNum"/>
					</p>
				</div>
			</div>
		</div>
		<div class="insuranceDetail">
			<div class="detailTop borderBottom" v-if='jmsStatus'>
				<p class="insuranceTitleDes">开具减免税凭证的税务机关名称</p>
				<div class="insurancePrice">
					<p class="inPriceDropDown">
						<input type="text" placeholder="请输入相应机关名称" class="trafficInput" v-model='jmsJgName' @blur="setJmsJg"/>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
export default {
    data () {
        return {
            traffic: [],
            trafficValue: '',
            trafficStatus: false,
            wsjgName: '',
            wsNum: '',
            jmsReason: [
                {name: '具备减免税证明'},
                {name: '其他'}
            ],
            jmsReasonValue: '具备减免税证明',
            jmsCase: [
                {name: '比例减免'},
                {name: '金额减免'}
            ],
            jmsCaseValue: '比例减免',
            bljmValue: '',
            jmjeValue: '',
            jmsNum: '',
            jmsJgName: '',
            dataStatus: false, // 纳税起止期
            wsStatus: false, // 完税凭证号码和机关单位
            jmsReasonCase: false, // 减免税原因和方案
            bljm: false, // 比例满减
            jmje: false, // 减免金额
            jmsStatus: false // 减免税凭证号码和机关单位
          }
      },
    computed: {
         ...mapGetters([
             'duCarPremium'
            ])
    },
    created () {
    this.setDefault()
    },
    methods: {
        ...mapMutations({
           setPremium: 'SET_CAR_DUBANG_PREMIUM'
        }),
        setOption () {
            let value = this.trafficValue
            if (value === '完税') {
                this.trafficStatus = true
                this.setPremium({
                    field1: 'carShipTax',
                    field2: 'taxRelif',
                    value: 'P'
                })
                this.setWs()
            } else if (value === '正常纳税(推荐)') {
                this.trafficStatus = false
                this.setPremium({
                    field1: 'carShipTax',
                    field2: 'taxRelif',
                    value: 'T'
                })
                this.setZc()
            } else if (value === '税费减半(推荐)') {
                this.trafficStatus = false
                this.setPremium({
                    field1: 'carShipTax',
                    field2: 'taxRelif',
                    value: 'C'
                })
                this.setJs()
            } else if (value === '免税(推荐)') {
                this.trafficStatus = false
                this.setPremium({
                    field1: 'carShipTax',
                    field2: 'taxRelif',
                    value: 'E'
                })
                this.setMs()
            }
        },
        setDefault () {
            let hfCode = this.duCarPremium.hfCode
            if (hfCode === '0') { // 正常缴纳
                let trafficArr = this.traffic
                let duCarPremiumArr = this.duCarPremium.trafficRiskName
                trafficArr.push(duCarPremiumArr[0], duCarPremiumArr[1])
                this.trafficValue = trafficArr[0].name
                this.setPremium({
                    field1: 'carShipTax',
                    field2: 'taxRelif',
                    value: 'T'
                })
                this.setZc()
            } else if (hfCode === '2' || hfCode === '4') { // 减税
                let trafficArr = this.traffic
                let duCarPremiumArr = this.duCarPremium.trafficRiskName
                trafficArr.push(duCarPremiumArr[2], duCarPremiumArr[1])
                this.trafficValue = trafficArr[0].name
                this.setPremium({
                    field1: 'carShipTax',
                    field2: 'taxRelif',
                    value: 'C'
                })
                this.setPremium({ // 减免税原因
                    field1: 'carShipTax',
                    field2: 'deDucationdueCode',
                    value: 'C'
                })
                this.setPremium({
                    field1: 'carShipTax',
                    field2: 'deDucationdueType',
                    value: 'P'
                })
                this.setJs()
            } else if (hfCode === '1' || hfCode === '3') { // 免税
                let trafficArr = this.traffic
                let duCarPremiumArr = this.duCarPremium.trafficRiskName
                trafficArr.push(duCarPremiumArr[3], duCarPremiumArr[1])
                this.trafficValue = trafficArr[0].name
                this.setPremium({
                    field1: 'carShipTax',
                    field2: 'taxRelif',
                    value: 'E'
                })
                this.setPremium({ // 减免税原因
                    field1: 'carShipTax',
                    field2: 'deDucationdueCode',
                    value: 'C'
                })
                this.setPremium({
                    field1: 'carShipTax',
                    field2: 'deDucationdueType',
                    value: 'P'
                })
                this.setMs()
            }
        },
        setJs () { // 减免税显示
            this.dataStatus = false
            this.wsStatus = false
            this.jmsReasonCase = true
            this.bljm = true
            this.jmsStatus = true
            this.bljmValue = this.duCarPremium.carShipTax.deDucationduePropotion
            this.jmsNum = this.duCarPremium.carShipTax.deDucationDocumentNumber
            this.jmsJgName = this.duCarPremium.carShipTax.deTaxDepartment
        },
        setZc () { // 正常纳税显示
            this.dataStatus = false
            this.wsStatus = false
            this.jmsReasonCase = false
            this.bljm = false
            this.jmsStatus = false
        },
        setMs () { // 免税显示
            this.dataStatus = false
            this.wsStatus = false
            this.jmsReasonCase = true
            this.bljm = false
            this.jmsStatus = true
        },
        setWs () { // 完税显示
            this.dataStatus = true
            this.wsStatus = true
            this.jmsReasonCase = false
            this.bljm = false
            this.jmsStatus = false
        },
        setWsJg () { // 完税机构
            let value = this.wsjgName
            console.log(this.wsjgName)
            let vm = this
            vm.setPremium({
                    field1: 'carShipTax',
                    field2: 'taxDepartment',
                    value: value
                })
            console.log(this.duCarPremium)
            console.log(this.duCarPremium.carShipTax)
            console.log(this.duCarPremium.carShipTax.taxDepartment)
            console.log('this.duCarPremium.carShipTax.taxDepartment')
        },
        setWsNum () { // 完税凭证号码
            let value = this.wsNum
            let vm = this
                vm.setPremium({
                    field1: 'carShipTax',
                    field2: 'taxDocumentNumber',
                    value: value
                })
        },
        setJmsReason () { // 减免税原因
            let value = this.jmsReasonValue
            let vm = this
            if (value === '具备减免税证明') {
                vm.setPremium({
                    field1: 'carShipTax',
                    field2: 'deDucationdueCode',
                    value: 'C'
                })
            } else {
                vm.setPremium({
                    field1: 'carShipTax',
                    field2: 'deDucationdueCode',
                    value: 'O'
                })
            }
        },
        setJmsCase () { // 减免税方案
            let value = this.jmsCaseValue
            let vm = this
            vm.bljm = true
            vm.jmje = false
            if (value === '比例减免') {
                vm.setPremium({
                    field1: 'carShipTax',
                    field2: 'deDucationdueType',
                    value: 'P'
                })
            } else if (value === '金额减免') {
                vm.setPremium({
                    field1: 'carShipTax',
                    field2: 'deDucationdueType',
                    value: 'A'
                })
                vm.bljm = false
                vm.jmje = true
            }
        },
        setBljm () { // 减免比例
            let value = this.bljmValue
            let vm = this
                vm.setPremium({
                    field1: 'carShipTax',
                    field2: 'deDucationduePropotion',
                    value: value
                })
        },
        setJmje () { // 减免金额
            let value = this.jmjeValue
            let vm = this
                vm.setPremium({
                    field1: 'carShipTax',
                    field2: 'deDucation',
                    value: value
                })
        },
        setJmsNum () { // 减免税凭证号
            let value = this.jmsNum
            let vm = this
                vm.setPremium({
                    field1: 'carShipTax',
                    field2: 'deDucationDocumentNumber',
                    value: value
                })
        },
        setJmsJg () { // 减免税凭证的税务机关名称
            let value = this.jmsJgName
            let vm = this
                vm.setPremium({
                    field1: 'carShipTax',
                    field2: 'deTaxDepartment',
                    value: value
                })
        }
    }
   }
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
@import '~common/stylus/mixin.styl'
.insuranceWarp
   .insuranceDetail
    	font-size: (26/$scale)
    	color: #222
    	background: #fff
    	.detailTop
    		display: flex
    		align-items: center
    		justify-content: space-between
    		width: 100%
    		height: (100/$scale)
    		line-height: (100/$scale)
		.borderBottom
			border-bottom: 1px solid #dcdcdc
			.insuranceTitleDes
				display: flex
				align-items: center
				width: (240/$scale)
				height: 100%
				line-height: (40/$scale)
				font-size: (26/$scale)
				margin-left: (30/$scale)
			.insurancePrice
				width: (260/$scale)
				height: 100%
				.inPriceDropDown
					.text
						color: #bbb
						&.active
							color $color-main
					.select
						width: (220/$scale)
						height: (60/$scale)
						border: 1px solid #ccc
						border-radius: 5px
						direction: ltr
						appearance:none
						padding-left: (20/$scale)
						color: #333
						outline: none
						overflow:hidden
						background: #fff
					.arr
						bg-image('rightArr')
						width: (20/$scale)
						height: (30/$scale)
						display: inline-block
						background-size: contain
						background-repeat: no-repeat
						float: right
						margin-top: (36/$scale)
					.trafficInput
						width: (240/$scale)
			.statusWarp
				width: (160/$scale)
				.statusA
					border: 1px solid #FF4455
					display: flex
					border-radius: 3px
					justify-content: center
					.status
						width: (78/$scale)
						height: (60/$scale)
						line-height: (60/$scale)
						text-align: center
						display: inline-block
						color: #999
					.redStatus
						width: (78/$scale)
						height: (60/$scale)
						line-height: (60/$scale)
						text-align: center
						display: inline-block
						background: #FF4455
						color: #fff
			.boliStatus
				color: #FF4455
				border: none
		.detailDown
			display:flex
			align-items: center
			font-size: (26/$scale)
			border-bottom: 1px solid #dcdcdc
			height: (100/$scale)
			line-height: (100/$scale)
			.downTitle
				width: (240/$scale)
			.downInput
				width: (280/$scale)
				.inputPrice
					border: 1px solid #dcdcdc
					width: (220/$scale)
					height: (55/$scale)
					border-radius: 5px
					text-indent: (20/$scale)
			.tip
				width: (180/$scale)
				line-height: (40/$scale)
				font-size: (24/$scale)
				color: #FF4455
</style>