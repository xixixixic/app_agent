<template>
	<div class="insuranceDetail">
		<div class="detailTop borderBottom">
			<p class="insuranceTitleDes">指定修理厂险</p>
			<div class="insurancePrice">
				<p class="inPriceDropDown">
					<select class='select' v-model='xiulichangValue' v-on:change='xiulicahngShows()'>
						<option v-for='item in xiulichang'>{{item.name}}</option>
					</select>
				</p>
			</div>
			<p class="statusWarp">
				<a href="javascript:(void)" class="statusA">
					<span class="status">否</span>
				</a>
			</p>
		</div>
		<div class="insuranceDetail xiulichang" v-show='xiulichangShow'>
			<div class="detailTop">
				<p class="insuranceTitleDes">费率</p>
				<div class="insurancePrice">
					<p class="inPriceDropDown">
						<select class='select' v-model='xiulichangClassValue'  v-on:change='setOption'>
							<option v-for='item in xiulichangClass'>{{item.name}}</option>
						</select>
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
            xiulichang: [
                 {name: '不投保'},
                 {name: '投保'}
            ],
            xiulichangValue: '不投保',
            xiulichangClass: [
                {name: '国产'},
                {name: '进口'}
               ],
            xiulichangShow: false,
            xiulichangName: '指定修理厂险',
            xiulichangClassValue: '国产'
        }
    },
    created () {
        this.setValue()
        this.xiulicahngShows()
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
        setValue () {
           // this.xiulichangValue = this.duCarPremium.kinds[0].amount
           if (this.duCarPremium.kinds[7]) {
                this.xiulichangValue = this.duCarPremium.kinds[7].amount ? '不投保' : '投保'
            }
            this.setPremium({
                    field1: 'kinds#7',
                    field2: 'kindCode',
                    value: 'Q4'
                })
            this.setPremium({
                    field1: 'kinds#7',
                    field2: 'kindName',
                    value: this.xiulichangName
               })
            this.setPremium({
                    field1: 'kinds#7',
                    field2: 'model',
                    value: 'N'
                })
        },
        setOption () {
            let value = this.xiulichangClassValue
            if (value === '国产') {
                  this.setPremium({
                    field1: 'kinds#7',
                    field2: 'rate',
                    value: '10'
                })
            } else if (value === '进口') {
                this.setPremium({
                    field1: 'kinds#7',
                    field2: 'rate',
                    value: '15'
                })
            }
        },
        xiulicahngShows () {
                let value = this.xiulichangValue
                if (value === '投保') {
                    this.xiulichangShow = true
                    this.setPremium({
                        field1: 'kinds#7',
                        field2: 'amount',
                        value: ''
                    })
                } else {
                    this.xiulichangShow = false
                    this.setPremium({
                        field1: 'kinds#7',
                        field2: 'amount',
                        value: value
                    })
                }
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
    	background: #fff
    	.detailTop
    		display: flex
    		align-items: center
    		width: 100%
    		height: (100/$scale)
    		line-height: (100/$scale)
			&.borderBottom
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
				width: (280/$scale)
				height: 100%
				.inPriceDropDown
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
	.xiulichang
   		background: #f0f0f0
</style>