<template>
	<div class="insuranceDetail">
		<div class='warp'>
			<div class="detailTop borderBottom">
				<p class="insuranceTitleDes">{{weixiuchangName}}</p>
				<div class="insurancePrice">
					<p class="inPriceDropDown">
						<select class='select' v-model='weixiuchangValue' v-on:change='setOption'>
							<option v-for='item in weixiuchang'>{{item.name}}</option>
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
            weixiuchang: [
                 {name: '不投保'},
                 {name: '国产'},
                 {name: '进口'}
            ],
            weixiuchangValue: '不投保',
            weixiuchangName: '指定维修厂'
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
            if (this.tianCarPremium.ItemKindRequestDto[11]) {
					let res = this.tianCarPremium.ItemKindRequestDto[11].valueType
					console.log(res)
					console.log('sssss')
                    if (res === '') {
                        this.weixiuchangValue = '不投保'
                    } else if (res === '1') {
                        this.weixiuchangValue = '国产'
                    } else if (res === '2') {
                        this.weixiuchangValue = '进口'
                    }
                }
            this.setPremium({
                    field1: 'ItemKindRequestDto#11',
                    field2: 'kindCode',
                    value: '85'
                })
            this.setPremium({
                    field1: 'ItemKindRequestDto#11',
                    field2: 'kindName',
                    value: this.weixiuchangName
              })
        },
        setOption () {
            let value = this.weixiuchangValue
            if (value === '不投保') {
                this.setPremium({
                    field1: 'ItemKindRequestDto#11',
                    field2: 'amount',
                    value: value
                })
				this.setPremium({
                    field1: 'ItemKindRequestDto#11',
                    field2: 'valueType',
                    value: ''
				})
           } else if (value === '国产') {
                this.setPremium({
                    field1: 'ItemKindRequestDto#11',
                    field2: 'valueType',
                    value: '1'
				})
				this.setPremium({
                    field1: 'ItemKindRequestDto#11',
                    field2: 'amount',
                    value: '1'
                })
           } else if (value === '进口') {
                this.setPremium({
                    field1: 'ItemKindRequestDto#11',
                    field2: 'valueType',
                    value: '2'
				})
				this.setPremium({
                    field1: 'ItemKindRequestDto#11',
                    field2: 'amount',
                    value: '2'
                })
			}
			console.log('ddddd')
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