<template>
	<div class="insuranceDetail">
		<div class='warp'>
			<div class="detailTop borderBottom">
				<p class="insuranceTitleDes">{{wufazhaodaoName}}</p>
				<div class="insurancePrice">
					<p class="inPriceDropDown">
						<select class='select' v-model='wufazhaodaoValue' v-on:change='setOption'>
							<option v-for='item in wufazhaodao'>{{item.name}}</option>
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
            wufazhaodao: [
                 {name: '不投保'},
                 {name: '投保'}
            ],
            wufazhaodaoValue: '不投保',
            wufazhaodaoName: '无法找到第三方特约险'
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
            if (this.tianCarPremium.ItemKindRequestDto[10]) {
					this.wufazhaodaoValue = this.tianCarPremium.ItemKindRequestDto[10].amount === '0' ? '投保' : '不投保'
					console.log(this.tianCarPremium.ItemKindRequestDto[10])
					console.log('this.tianCarPremium.ItemKindRequestDto[10].amount')
                }
            this.setPremium({
                    field1: 'ItemKindRequestDto#10',
                    field2: 'kindCode',
                    value: '17'
                })
            this.setPremium({
                    field1: 'ItemKindRequestDto#10',
                    field2: 'kindName',
                    value: this.wufazhaodaoName
               })
            this.setPremium({
                    field1: 'ItemKindRequestDto#10',
                    field2: 'deductableFlag',
                    value: '0'
              })
        },
        setOption () {
            let value = this.wufazhaodaoValue
            if (value === '投保') {
                this.setPremium({
                    field1: 'ItemKindRequestDto#10',
                    field2: 'amount',
                    value: '0'
                })
            } else {
                this.setPremium({
                    field1: 'ItemKindRequestDto#10',
                    field2: 'amount',
                    value: value
                })
            }
            this.setPremium({
                field1: 'pageShow#10',
                field2: 'toubao',
                value: value
               })
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
    	padding: 0 (30/$scale)
    	background: #fff
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