<template>
<div class='jingshensunhai'>
	<div class="insuranceDetail">
		<div class="detailTop borderBottom">
			<p class="insuranceTitleDes">{{jingshensunhaiName}}</p>
			<div class="insurancePrice">
				<p class="inPriceDropDown">
					<select class='select' v-model='jingshensunhaiValue' v-on:change='setOption'>
						<option v-for='item in jingshensunhai'>{{item.name}}</option>
					    <!--<option>投保</option>-->
					</select>
				</p>
			</div>
			<p class="statusWarp">
				<a href="javascript:void(0)" class="statusA">
					<span v-for='(item,index) in status' :class="Ind === index ? 'redStatus' : 'status'" @click="yesStatus(index)">{{item.value}}</span>
				</a>
			</p>
		</div>
	</div>
	<div class="insuranceDetail boli" v-show='jingshensunhaiShow'>
		<div class="detailTop borderBottom borderNo">
			<p class="insuranceTitleDes">输入金额</p>
			<div class="insurancePrice">
				<p class="inPriceDropDown">
					<input type="text" v-model='siglePrice'  class="dropInput" @blur="setSiglePrice" placeholder="输入1000的整数倍"/>
				</p>
			</div>
			<p class="statusWarp">
				<a href="javascript:void(0)">
					<span class="boliStatus">*此为必填项</span>
				</a>
			</p>
		</div>
	</div>
	<confirm  ref="confirm" :text="confirmText"></confirm>
</div>
</template>

<script>
import {mapMutations, mapGetters} from 'vuex'
import Confirm from 'base/confirm/confirm'
import {confirm} from 'common/js/mixin.js'
export default {
    mixins: [confirm],
    data () {
        return {
            jingshensunhai: [
                 {name: '不投保'},
                 {name: '投保'}
            ],
            jingshensunhaiValue: '不投保',
            status: [
                 {value: '是'},
                 {value: '否'}
                ],
            Ind: 1,
            jingshensunhaiName: '精神损害抚慰金责任险',
            jingshensunhaiShow: false,
            siglePrice: ''
        }
    },
   created () {
		this.setValue()
		this.setOption()
    },
    computed: {
         ...mapGetters([
             'duCarPremium'
            ])
    },
    methods: {
        ...mapMutations({
           setPremium: 'SET_CAR_DUBANG_PREMIUM'
       }),
        yesStatus (index) {
            let yesOrno = this.jingshensunhaiValue
            if (yesOrno === '投保') {
                this.Ind = index
                let value = this.status[index].value
                if (value === '是') {
                    this.setPremium({
                        field1: 'kinds#8',
                        field2: 'model',
                        value: 'Y'
                    })
                } else {
                    this.setPremium({
                        field1: 'kinds#8',
                        field2: 'model',
                        value: 'N'
                    })
                }
            } else {
                    this.showConfirm('不计免赔不能单独投保，请先投对应险种')
            }
        },
        setValue () {
			// console.log(this.duCarPremium.kinds[8].amount)
			// console.log('this.duCarPremium.kinds[8].amount')
            if (this.duCarPremium.kinds[8]) {
				this.jingshensunhaiValue = this.duCarPremium.kinds[8].amount === '不投保' ? '不投保' : '投保'
                this.Ind = this.duCarPremium.kinds[8].model === 'Y' ? 0 : 1
				this.siglePrice = this.duCarPremium.kinds[8].amount === '不投保' ? '' : this.duCarPremium.kinds[8].amount
				this.setPremium({
                    field1: 'kinds#8',
                    field2: 'amount',
                    value: this.siglePrice
                })
			}
            this.setPremium({
                    field1: 'kinds#8',
                    field2: 'kindCode',
                    value: 'R'
                })
            this.setPremium({
                    field1: 'kinds#8',
                    field2: 'kindName',
                    value: this.jingshensunhaiName
               })
            this.setPremium({
                    field1: 'kinds#8',
                    field2: 'model',
                    value: 'N'
               })
        },
        setOption () {
            let value = this.jingshensunhaiValue
            if (value === '投保') {
                this.jingshensunhaiShow = true
            } else {
				console.log('ffgg')
                this.jingshensunhaiShow = false
                this.setPremium({
                    field1: 'kinds#8',
                    field2: 'amount',
                    value: value
                })
                this.Ind = 1
                this.setPremium({
                        field1: 'kinds#8',
                        field2: 'model',
                        value: 'N'
                    })
            }
        },
        setSiglePrice () {
            this.setPremium({
                field1: 'kinds#8',
                field2: 'amount',
                value: this.siglePrice
            })
        }
    },
    components: {
        Confirm
    }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
@import '~common/stylus/mixin.styl'
   .insuranceDetail
    	font-size: (26/$scale)
    	color: #222
    	background: #FFF
    .boli
    	background: #f0f0f0
    	.detailTop
    		display: flex
    		align-items: center
    		width: 100%
    		height: (100/$scale)
    		line-height: (100/$scale)
		.borderBottom
			border-bottom: 1px solid #dcdcdc
			display: flex
			align-items: center
			width: 100%
			height: (100/$scale)
			line-height: (100/$scale)
			&.borderNo
				border: none
			.insuranceTitleDes
				display: flex
				align-items: center
				width: (240/$scale)
				height: 100%
				line-height: (40/$scale)
				font-size: (26/$scale)
				margin-left: (30/$scale)
			.insurancePrice
				width: (280/$scale)
				height: 100%
				.inPriceDropDown
					.dropInput
						width: (220/$scale)
						height: (60/$scale)
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