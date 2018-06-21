<template>
	<div class="insuranceDetail">
		<div class="detailTop borderBottom">
			<p class="insuranceTitleDes">{{ziranName}}</p>
			<div class="insurancePrice">
				<p class="inPriceDropDown">
					<select class='select' v-model='ziranValue' v-on:change='setOption'>
						<option v-for='item in ziran'>{{item.name}}</option>
					</select>
				</p>
			</div>
			<p class="statusWarp">
				<a href="javascript:(void)" class="statusA">
					<span v-for='(item,index) in status' :class="Ind === index ? 'redStatus' : 'status'" @click="yesStatus(index)">{{item.value}}</span>
				</a>
			</p>
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
            ziran: [
                 {name: '不投保'},
                 {name: '投保'}
            ],
            ziranValue: '不投保',
            status: [
                 {value: '是'},
                 {value: '否'}
                ],
            Ind: 1,
            ziranName: '自燃损失险'
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
        yesStatus (index) {
            let yesOrno = this.ziranValue
            if (yesOrno === '投保') {
                this.Ind = index
                let value = this.status[index].value
                if (value === '是') {
                    this.setPremium({
                        field1: 'kinds#12',
                        field2: 'model',
                        value: 'Y'
                    })
                } else {
                    this.setPremium({
                        field1: 'kinds#12',
                        field2: 'model',
                        value: 'N'
                    })
                }
            } else {
                    this.showConfirm('不计免赔不能单独投保，请先投对应险种')
            }
        },
        setValue () {
            if (this.duCarPremium.kinds[12]) {
                this.ziranValue = this.duCarPremium.kinds[12].amount === '' ? '投保' : '不投保'
				this.Ind = this.duCarPremium.kinds[12].model === 'Y' ? 0 : 1
				console.log(this.duCarPremium.kinds[12].amount)
				console.log('this.duCarPremium.kinds[12].amount')
            }
            this.setPremium({
                    field1: 'kinds#12',
                    field2: 'kindCode',
                    value: 'Z'
                })
            this.setPremium({
                    field1: 'kinds#12',
                    field2: 'kindName',
                    value: this.ziranName
               })
            this.setPremium({
                    field1: 'kinds#12',
                    field2: 'model',
                    value: 'N'
               })
        },
        setOption () {
            let value = this.ziranValue
            if (value === '投保') {
                this.setPremium({
                    field1: 'kinds#12',
                    field2: 'amount',
                    value: ''
                })
            } else {
                this.setPremium({
                    field1: 'kinds#12',
                    field2: 'amount',
                    value: value
                })
                this.Ind = 1
                this.setPremium({
                        field1: 'kinds#12',
                        field2: 'model',
                        value: 'N'
                    })
            }
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