<template>
	<div class="boli">
		<div class="insuranceDetail">
			<div class="detailTop borderBottom">
				<p class="insuranceTitleDes">{{boliName}}</p>
				<div class="insurancePrice">
					<p class="inPriceDropDown">
						<select class='select' v-model='boliValue' v-on:change='boliShows()'>
							<option v-for='item in boli'>{{item.name}}</option>
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
		<div class="insuranceDetail boli" v-show='boliShow'>
			<div class="detailTop">
				<p class="insuranceTitleDes">玻璃类别</p>
				<div class="insurancePrice">
					<p class="inPriceDropDown">
						<select class='select' v-model='boliClassValue'  v-on:change='setOption'>
							<option v-for='item in boliClass'>{{item.name}}</option>
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
                    boliValue: '不投保',
                    boliClassValue: '国产玻璃',
                    boli: [
                        {name: '不投保'},
                        {name: '投保'}
                    ],
                    boliClass: [
                        {name: '国产玻璃'},
                        {name: '进口玻璃'}
                    ],
                    Ind: 1,
                    status: [
                     {value: '是'},
                     {value: '否'}
                    ],
                    boliShow: false,
                    boliName: '玻璃单独破碎险'
                }
            },
        created () {
            this.setValue()
            this.boliShows()
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
            boliShows () {
                let value = this.boliValue
                if (value === '投保') {
                    this.boliShow = true
                    this.setPremium({
                        field1: 'kinds#5',
                        field2: 'amount',
                        value: ''
                    })
                } else {
                    this.boliShow = false
                    this.setPremium({
                        field1: 'kinds#5',
                        field2: 'amount',
                        value: value
                    })
                }
            },
            setValue () {
                if (this.duCarPremium.kinds[5]) {
                    this.boliValue = this.duCarPremium.kinds[5].amount ? '不投保' : '投保'
                    this.Ind = this.duCarPremium.kinds[5].model === 'Y' ? 0 : 1
                }
                this.setPremium({
                    field1: 'kinds#5',
                    field2: 'kindCode',
                    value: 'F'
                })
                this.setPremium({
                    field1: 'kinds#5',
                    field2: 'kindName',
                    value: this.boliName
               })
                this.setPremium({
                    field1: 'kinds#5',
                    field2: 'model',
                    value: 'N'
                })
                this.setOption()
            },
            setOption () {
                let value = this.boliClassValue
                if (value === '国产玻璃') {
                   this.setPremium({
                        field1: 'kinds#5',
                        field2: 'modeCode',
                        value: '1'
                    })
                } else {
                    this.setPremium({
                        field1: 'kinds#5',
                        field2: 'modeCode',
                        value: '2'
                    })
                }
console.log(this.duCalculationPremium)
            },
            yesStatus (index) {
                this.Ind = index
                let value = this.status[index].value
                if (value === '是') {
                    this.setPremium({
                        field1: 'kinds#5',
                        field2: 'model',
                        value: 'Y'
                    })
                } else {
                    this.setPremium({
                        field1: 'kinds#5',
                        field2: 'model',
                        value: 'N'
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
    	background: #FFF
    .boli
    	background: #f0f0f0
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
</style>