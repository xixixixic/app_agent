<template>
	<div class="insuranceDetail">
		<div class='warp'>
			<div class="detailTop borderBottom">
				<p class="insuranceTitleDes">{{xinzengshebeiName}}</p>
				<div class="insurancePrice">
					<p class="inPriceDropDown">
						<input type="text" class="priceInput" v-model="xinzengshebeiValue" @blur="setOption"/>元
					</p>
				</div>
				<p class="statusWarp">
					<a href="javascript:(void)" class="statusA">
						<span v-for='(item,index) in xinzengstatus' :class="Ind === index ? 'redStatus' : 'status'" @click="yesStatus(index)">{{item.value}}</span>
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
            xinzengshebei: [
                 {name: '不投保'},
                 {name: '投保'}
            ],
            xinzengstatus: [
                 {value: '是'},
                 {value: '否'}
            ],
            Ind: 1,
            xinzengshebeiValue: '',
            xinzengshebeiName: '新增设备损失险'
        }
    },
    created () {
            this.setValue()
            this.setOption()
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
            let value = this.xinzengshebeiValue
            if (value !== '' && Number(value) !== 0) {
                this.Ind = index
                let value = this.xinzengstatus[index].value
                if (value === '是') {
                    this.setPremium({
                        field1: 'ItemKindRequestDto#22',
                        field2: 'deductableFlag',
                        value: '1'
                    })
                    this.setPremium({
                        field1: 'ItemKindRequestDto#22',
                        field2: 'amount',
                        value: '0'
                    })
                } else {
                    console.log('333')
                    this.setPremium({
                        field1: 'ItemKindRequestDto#22',
                        field2: 'deductableFlag',
                        value: '0'
                    })
                    this.setPremium({
                        field1: 'ItemKindRequestDto#22',
                        field2: 'amount',
                        value: '不投保'
                    })
                }
            } else {
                this.showConfirm('不计免赔不能单独投保，请先投对应险种')
            }
           },
        setValue () {
            if (this.tianCarPremium.ItemKindRequestDto[12]) {
                    let res = this.tianCarPremium.ItemKindRequestDto[12].amount
                    this.xinzengshebeiValue = this.tianCarPremium.ItemKindRequestDto[12].amount === '不投保' ? '' : res
            }
            if (this.tianCarPremium.ItemKindRequestDto[22]) {
                    this.Ind = this.tianCarPremium.ItemKindRequestDto[22].deductableFlag === '1' ? 0 : 1
            }
            this.setPremium({
                    field1: 'ItemKindRequestDto#12',
                    field2: 'kindCode',
                    value: '11'
                })
            this.setPremium({
                    field1: 'ItemKindRequestDto#12',
                    field2: 'kindName',
                    value: this.xinzengshebeiName
               })
            this.setPremium({
                    field1: 'ItemKindRequestDto#12',
                    field2: 'deductableFlag',
                    value: '0'
               })
            this.setPremium({
                field1: 'ItemKindRequestDto#22',
                field2: 'kindCode',
                value: 'A11'
            })
            this.setPremium({
                field1: 'ItemKindRequestDto#22',
                field2: 'kindName',
                value: this.xinzengshebeiName + '不计免赔'
            })
        },
        setOption () {
                let value = this.xinzengshebeiValue
                if (value && Number(value) !== 0) {
                    this.setPremium({
                        field1: 'ItemKindRequestDto#12',
                        field2: 'amount',
                        value: this.xinzengshebeiValue
                    })
                } else {
                    this.setPremium({
                        field1: 'ItemKindRequestDto#12',
                        field2: 'amount',
                        value: '不投保'
                    })
                    this.Ind = 1
                    this.setPremium({
                        field1: 'ItemKindRequestDto#22',
                        field2: 'deductableFlag',
                        value: '0'
                    })
                    this.setPremium({
                        field1: 'ItemKindRequestDto#22',
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
					.priceInput
						width: (200/$scale)
						height: (60/$scale)
						border: solid 1px #dcdcdc
						padding-left: (20/$scale)
						color: #333
						margin-right: (20/$scale)
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