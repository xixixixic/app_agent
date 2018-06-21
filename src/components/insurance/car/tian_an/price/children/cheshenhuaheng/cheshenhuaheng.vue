<template>
	<div class="insuranceDetail">
		<div class='warp'>
			<div class="detailTop borderBottom">
				<p class="insuranceTitleDes">{{cheshenhuahengName}}</p>
				<div class="insurancePrice">
					<p class="inPriceDropDown">
						<select class='select' v-model='cheshenhuahengValue' v-on:change='setOption'>
							<option v-for='item in cheshenhuaheng'>{{item.name}}</option>
						</select>
					</p>
				</div>
				<p class="statusWarp">
					<a href="javascript:(void)" class="statusA">
						<span v-for='(item,index) in status' :class="Ind === index ? 'redStatus' : 'status'" @click="yesStatus(index)">{{item.value}}</span>
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
            cheshenhuaheng: [
                 {name: '不投保'},
                 {name: '2000'},
                 {name: '5000'},
                 {name: '10000'},
                 {name: '20000'}
            ],
            cheshenhuahengValue: '不投保',
            status: [
                 {value: '是'},
                 {value: '否'}
                ],
            Ind: 1,
            cheshenhuahengName: '车身划痕损失险'
        }
    },
    created () {
        this.setValue()
        console.log(this.tianCarPremium)
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
        yesStatus (index) {
            let value = this.cheshenhuahengValue
            if (value !== '不投保') {
                this.Ind = index
                let value = this.status[index].value
                if (value === '是') {
                    this.setPremium({
                        field1: 'ItemKindRequestDto#19',
                        field2: 'deductableFlag',
                        value: '1'
                    })
                    this.setPremium({
                        field1: 'ItemKindRequestDto#19',
                        field2: 'amount',
                        value: '0'
                    })
                } else {
                    this.setPremium({
                        field1: 'ItemKindRequestDto#19',
                        field2: 'deductableFlag',
                        value: '0'
                    })
                    this.setPremium({
                        field1: 'ItemKindRequestDto#19',
                        field2: 'amount',
                        value: '不投保'
                    })
                }
            } else {
                this.showConfirm('不计免赔不能单独投保，请先投对应险种')
            }
            },
        setValue () {
            if (this.tianCarPremium.ItemKindRequestDto[6]) {
                    let res = this.tianCarPremium.ItemKindRequestDto[6].amount
                    this.cheshenhuahengValue = this.tianCarPremium.ItemKindRequestDto[6].amount === '不投保' ? '不投保' : res
            }
            if (this.tianCarPremium.ItemKindRequestDto[19]) {
                    this.Ind = this.tianCarPremium.ItemKindRequestDto[19].deductableFlag === '1' ? 0 : 1
            }
            this.setPremium({
                    field1: 'ItemKindRequestDto#6',
                    field2: 'kindCode',
                    value: '75'
                })
            this.setPremium({
                    field1: 'ItemKindRequestDto#6',
                    field2: 'kindName',
                    value: this.cheshenhuahengName
               })
            this.setPremium({
                    field1: 'ItemKindRequestDto#6',
                    field2: 'deductableFlag',
                    value: '0'
               })
            this.setPremium({
                    field1: 'ItemKindRequestDto#19',
                    field2: 'kindCode',
                    value: 'A75'
                })
            this.setPremium({
                    field1: 'ItemKindRequestDto#19',
                    field2: 'kindName',
                    value: this.cheshenhuahengName + '不计免赔'
                })
        },
        setOption () {
            let value = this.cheshenhuahengValue
            if (value === '投保') {
                this.setPremium({
                    field1: 'ItemKindRequestDto#6',
                    field2: 'amount',
                    value: ''
                })
            } else {
                this.setPremium({
                    field1: 'ItemKindRequestDto#6',
                    field2: 'amount',
                    value: value
                })
                this.Ind = 1
                this.setPremium({
                    field1: 'ItemKindRequestDto#19',
                    field2: 'deductableFlag',
                    value: '0'
                })
                this.setPremium({
                    field1: 'ItemKindRequestDto#19',
                    field2: 'amount',
                    value: '不投保'
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