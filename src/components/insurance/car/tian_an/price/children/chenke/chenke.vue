<template>
	<div class="boli">
		<div class="insuranceDetail">
			<div class="detailTop borderBottom">
				<p class="insuranceTitleDes">{{chenkeName}}</p>
				<div class="insurancePrice">
					<p class="inPriceDropDown">
						<select class='select' v-model='chenkeValue' v-on:change='setOption'>
							<option v-for='item in chenke'>{{item.name}}</option>
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
                chenkeValue: '不投保',
                chenke: [
                   {name: '不投保'},
                   {name: '1万'},
                   {name: '2万'},
                   {name: '3万'},
                   {name: '5万'},
                   {name: '10万'},
                   {name: '20万'}
                ],
                status: [
                  {value: '是'},
                  {value: '否'}
                ],
                Ind: 1,
                chenkeName: '乘客责任险'
               }
            },
        created () {
            this.setValue()
            console.log(this.tianCarPremium)
            console.log('this.tianCarPremium')
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
                let values = this.chenkeValue
                if (values !== '不投保') {
                    this.Ind = index
                    let value = this.status[index].value
                    if (value === '是') {
                        this.setPremium({
                            field1: 'ItemKindRequestDto#17',
                            field2: 'deductableFlag',
                            value: '1'
                        })
                        this.setPremium({
                            field1: 'ItemKindRequestDto#17',
                            field2: 'amount',
                            value: '0'
                        })
                    } else {
                        this.setPremium({
                            field1: 'ItemKindRequestDto#17',
                            field2: 'deductableFlag',
                            value: '0'
                        })
                        this.setPremium({
                            field1: 'ItemKindRequestDto#17',
                            field2: 'amount',
                            value: '不投保'
                        })
                    }
                } else {
                    this.showConfirm('不计免赔不能单独投保，请先投对应险种')
                }
            },
            setValue () {
                if (this.tianCarPremium.ItemKindRequestDto[4]) {
                    let res = (this.tianCarPremium.ItemKindRequestDto[4].unitAmount) / 10000 + '万'
                    this.chenkeValue = this.tianCarPremium.ItemKindRequestDto[4].amount === '不投保' ? '不投保' : res
                }
                if (this.tianCarPremium.ItemKindRequestDto[17]) {
                    this.Ind = this.tianCarPremium.ItemKindRequestDto[17].deductableFlag === '1' ? 0 : 1
                }
                let seat = this.tianCarPremium.seatCounts - 1
                this.setPremium({
                    field1: 'ItemKindRequestDto#4',
                    field2: 'kindCode',
                    value: '89'
                })
                this.setPremium({
                    field1: 'ItemKindRequestDto#4',
                    field2: 'kindName',
                    value: this.chenkeName
                })
                this.setPremium({
                    field1: 'ItemKindRequestDto#4',
                    field2: 'deductableFlag',
                    value: '0'
                })
                this.setPremium({
                    field1: 'ItemKindRequestDto#4',
                    field2: 'quantity',
                    value: seat
                })
                this.setPremium({
                    field1: 'ItemKindRequestDto#17',
                    field2: 'kindCode',
                    value: 'A89'
                })
                this.setPremium({
                    field1: 'ItemKindRequestDto#17',
                    field2: 'kindName',
                    value: this.chenkeName + '不计免赔'
                })
            },
            setOption () {
                let value = this.chenkeValue
                if (value === '不投保') {
                    this.setPremium({
                        field1: 'ItemKindRequestDto#4',
                        field2: 'amount',
                        value: '不投保'
                    })
                    this.Ind = 1
                    this.setPremium({
                        field1: 'ItemKindRequestDto#17',
                        field2: 'deductableFlag',
                        value: '0'
                    })
                    this.setPremium({
                        field1: 'ItemKindRequestDto#17',
                        field2: 'amount',
                        value: '不投保'
                    })
                } else {
                    let res = Number(value.split('万')[0] + '0000')
                    let num = Number(this.tianCarPremium.seatCounts) - 1
                    this.setPremium({
                        field1: 'ItemKindRequestDto#4',
                        field2: 'amount',
                        value: 0
                    })
                    this.setPremium({
                        field1: 'ItemKindRequestDto#4',
                        field2: 'unitAmount',
                        value: res
                    })
                    this.setPremium({
                        field1: 'ItemKindRequestDto#4',
                        field2: 'quantity',
                        value: num
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
    	background: #FFF
    	padding: 0 (30/$scale)
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