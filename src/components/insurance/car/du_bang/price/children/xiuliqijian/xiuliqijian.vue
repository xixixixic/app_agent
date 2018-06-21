<template>
<div class='xiuliqijian'>
	<div class="insuranceDetail">
		<div class="detailTop borderBottom">
			<p class="insuranceTitleDes">{{xiuliqijianName}}</p>
			<div class="insurancePrice">
				<p class="inPriceDropDown">
					<select class='select' v-model='xiuliqijianValue' v-on:change='setOption'>
						<option v-for='item in xiuliqijian'>{{item.name}}</option>
					</select>
				</p>
			</div>
			<p class="statusWarp">
				<a href="javascript:void(0)" class="statusA">
					<span class="status">否</span>
				</a>
			</p>
		</div>
	</div>
	<div class="insuranceDetail boli" v-show='xiuliqijianShow'>
			<div class="detailTop borderBottom">
				<p class="insuranceTitleDes">数量</p>
				<div class="insurancePrice">
					<p class="inPriceDropDown">
						<input type="text" v-model='num' class="dropInput" @blur="setNum"/>
					</p>
				</div>
				<p class="statusWarp">
					<a href="javascript:void(0)">
						<span class="boliStatus">*此为必填项</span>
					</a>
				</p>
			</div>
		</div>
		<div class="insuranceDetail boli" v-show='xiuliqijianShow'>
			<div class="detailTop borderBottom borderNo">
				<p class="insuranceTitleDes">单位金额</p>
				<div class="insurancePrice">
					<p class="inPriceDropDown">
						<input type="text" v-model='siglePrice'  class="dropInput" @blur="setSiglePrice"/>
					</p>
				</div>
				<p class="statusWarp">
					<a href="javascript:void(0)">
						<span class="boliStatus">*此为必填项</span>
					</a>
				</p>
			</div>
		</div>
</div>
</template>

<script>
import {mapMutations, mapGetters} from 'vuex'
export default {
    data () {
        return {
            xiuliqijian: [
                 {name: '不投保'},
                 {name: '投保'}
            ],
            xiuliqijianValue: '不投保',
            Ind: 1,
            xiuliqijianName: '修理期间费用补偿险',
            status: [
                 {value: '是'},
                 {value: '否'}
            ],
            num: '',
            siglePrice: '',
            xiuliqijianShow: false
        }
    },
    created () {
        this.setValue()
        this.xiuliqijianShows()
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
        setValue () {
			if (this.duCarPremium.kinds[10]) {
                this.xiuliqijianValue = this.duCarPremium.kinds[10].amount === '' ? '投保' : '不投保'
				this.Ind = this.duCarPremium.kinds[10].model === 'Y' ? 0 : 1
				this.num = this.duCarPremium.kinds[10].quantity
				this.siglePrice = this.duCarPremium.kinds[10].unitAmount
            }
            this.setPremium({
                    field1: 'kinds#10',
                    field2: 'kindCode',
                    value: 'T'
                })
            this.setPremium({
                    field1: 'kinds#10',
                    field2: 'kindName',
                    value: this.xiuliqijianName
                })
            this.setPremium({
                    field1: 'kinds#10',
                    field2: 'model',
                    value: 'N'
                })
        },
        xiuliqijianShows () {
                let value = this.xiuliqijianValue
                if (value === '投保') {
                    this.xiuliqijianShow = true
                    this.setPremium({
                        field1: 'kinds#10',
                        field2: 'amount',
                        value: ''
                    })
                } else {
                    this.xiuliqijianShow = false
                    this.setPremium({
                        field1: 'kinds#10',
                        field2: 'amount',
                        value: value
                    })
                }
        },
        setNum () {
            this.setPremium({
                field1: 'kinds#10',
                field2: 'quantity',
                value: this.num
            })
            this.num = this.duCarPremium.kinds[10].quantity
        },
        setSiglePrice () {
            this.setPremium({
                field1: 'kinds#10',
                field2: 'unitAmount',
                value: this.siglePrice
            })
        },
        setOption () {
            let value = this.xiuliqijianValue
            if (value === '投保') {
                this.setPremium({
                    field1: 'kinds#10',
                    field2: 'amount',
                    value: ''
                })
           } else {
                this.setPremium({
                    field1: 'kinds#10',
                    field2: 'amount',
                    value: value
                })
            }
            this.xiuliqijianShows()
        }
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