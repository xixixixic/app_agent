<template>
	<div class="insuranceDetail">
		<div class='warp'>
			<div class="detailTop borderBottom">
				<p class="insuranceTitleDes">{{chesunjueduiName}}</p>
				<div class="insurancePrice">
					<p class="inPriceDropDown">
						<select class='select' v-model='chesunjueduiValue' v-on:change='setOption'>
							<option v-for='item in chesunjuedui'>{{item.name}}</option>
						</select>
					</p>
				</div>
				<p class="statusWarp">
					<a href="javascript:(void)" class="statusA">
						<span class="status">否</span>
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
            chesunjuedui: [
                {name: '不投保'},
                {name: '300'},
                {name: '500'},
                {name: '1000'},
                {name: '2000'}
            ],
            chesunjueduiValue: '不投保',
            status: [
                 {value: '是'},
                 {value: '否'}
                ],
            Ind: 1,
            chesunjueduiName: '车损绝对免赔额'
        }
    },
    created () {
        this.setValue()
    },
    computed: {
         ...mapGetters([
             'tianCarPremium'
            ])
    },
    methods: {
        ...mapMutations({
           setPremium: 'SET_CAR_TIANAN_PREMIUM'
       }),
        setValue () {
            if (this.tianCarPremium.ItemKindRequestDto[1]) {
                    let res = this.tianCarPremium.ItemKindRequestDto[1].amount
                    this.chesunjueduiValue = this.tianCarPremium.ItemKindRequestDto[1].amount === '不投保' ? '不投保' : res
            }
            this.setPremium({
                    field1: 'ItemKindRequestDto#1',
                    field2: 'kindCode',
                    value: '76'
                })
            this.setPremium({
                    field1: 'ItemKindRequestDto#1',
                    field2: 'kindName',
                    value: this.chesunjueduiName
               })
            this.setPremium({
                    field1: 'ItemKindRequestDto#1',
                    field2: 'deductableFlag',
                    value: '0'
             })
        },
        setOption () {
            let value = this.chesunjueduiValue
            if (value === '投保') {
                this.setPremium({
                    field1: 'ItemKindRequestDto#1',
                    field2: 'amount',
                    value: '0'
                })
           } else {
                this.setPremium({
                    field1: 'ItemKindRequestDto#1',
                    field2: 'amount',
                    value: value
                })
           }
           this.setPremium({
                field1: 'pageShow#1',
                field2: 'toubao',
                value: value
            })
            this.chesunjueduiValue = this.tianCarPremium.pageShow[1].toubao
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
    	padding: 0 (30/$scale)
    	.detailTop
    		display: flex
    		align-items: center
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
</style>