<template>
	<div class="insuranceDetail">
		<div class="detailTop borderBottom">
			<p class="insuranceTitleDes">{{jidongcheName}}</p>
			<div class="insurancePrice">
				<p class="inPriceDropDown">
					<select class='select' v-model='jidongcheValue' v-on:change='setOption'>
						<option v-for='item in jidongche'>{{item.name}}</option>
					    <!--<option>投保</option>-->
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
</template>

<script>
import {mapMutations, mapGetters} from 'vuex'
export default {
    data () {
        return {
            jidongche: [
                 {name: '不投保'},
                 {name: '投保'}
            ],
            jidongcheValue: '不投保',
            jidongcheName: '机动车损失保险无法找到第三方特约险'
        }
    },
    created () {
        this.setValue()
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
            if (this.duCarPremium.kinds[9]) {
                this.jidongcheValue = this.duCarPremium.kinds[9].amount ? '不投保' : '投保'
                this.Ind = this.duCarPremium.kinds[9].model === 'Y' ? 0 : 1
            }
            this.setPremium({
                    field1: 'kinds#9',
                    field2: 'kindCode',
                    value: 'S'
                })
            this.setPremium({
                    field1: 'kinds#9',
                    field2: 'kindName',
                    value: this.jidongcheName
               })
            this.setPremium({
                    field1: 'kinds#9',
                    field2: 'model',
                    value: 'N'
               })
        },
        setOption () {
            let value = this.jidongcheValue
            if (value === '投保') {
                this.setPremium({
                    field1: 'kinds#9',
                    field2: 'amount',
                    value: ''
                   })
                } else {
                this.setPremium({
                    field1: 'kinds#9',
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