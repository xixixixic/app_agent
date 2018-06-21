<template>
	<div class="carConfig">
		<loading v-if='loadingShow'></loading>
		<div v-else>
			<split></split>
			<div class="bar">
				<p class="listTip">
					根据您录入的品牌型号，为您查询出如下车列表，请选择
				</p>
			</div>
			<split></split>
			<div class="content">
				<h2>车型配置</h2>
				<div class="detail" v-for="(item, index) in carArray">
					<p class="redFang"></p>
					<div class="carDetailWarp">
						<p class="carDetail"><span class="carName">车型名称：</span><span class="detailInfo">{{item.vehicleName}}</span>
							<span :class="index === Ind ? 'redGou' : 'redCircle'" @click="changeCircle(index)"></span>
						</p>
						<p class="carDetail">车款：<span class="detailInfo">{{item.carYear}}</span></p>
						<p class="carDetail">新车购置价：<span class="detailInfo">¥ {{item.purChasePrice}}</span></p>
						<p class="carDetail">新车购置价（含税）：<span class="detailInfo">¥ {{item.purChasePriceTax}}</span></p>
						<p class="carDetail">车型信息：<span class="detailInfo">{{item.platModelCode}}</span></p>
					</div>
				</div>
			</div>
		</div>
		<info-footer text="下一步" @next='_next'></info-footer>
		<confirm  ref="confirm" :text="confirmText"></confirm>
	</div>
</template>

<script>
	import Split from 'base/split/split'
	import InfoFooter from 'base/footer/footer'
	import {mapGetters, mapMutations} from 'vuex'
	import {confirmCarModel, queryCarModel} from 'api/car/du-bang/insurance.js'
	import {RET_OK, CODE_OK} from 'service/variable.js'
	import Loading from 'base/loading/loading'
	import Confirm from 'base/confirm/confirm'
	import {confirm} from 'common/js/mixin.js'
	export default {
		mixins: [confirm],
        data () {
            return {
                icoFlag: false,
                carArray: [],
                Ind: 0,
                num: 0,
                loadingShow: false,
                nextStatus: true
            }
        },
        computed: {
            ...mapGetters([
                'duCarConfig', 'duCarInfoOwner', 'duCarPremium'
            ])
        },
        created () {
            this._queryCar()
        },
        methods: {
            ...mapMutations({
                setDuCarConfig: 'SET_CAR_DUBANG_CONFIG',
                setPremium: 'SET_CAR_DUBANG_PREMIUM'
            }),
            _queryCar () {
				this.loadingShow = true
                let carInfo = this.duCarInfoOwner.carInfo
                let carOwner = this.duCarInfoOwner.carOwner
                let data = {
                    carInfo: carInfo,
                    carOwner: carOwner
                }
                queryCarModel(data).then(res => {
                    console.log(res)
                    if (res.ret === RET_OK) {
                        if (res.data.code === CODE_OK) {
							this.loadingShow = false
                            let car = res.data.cars
                            if (car.length !== 0) {
                                this.carArray = car
                                console.log('111')
                            } else {
                                this.showConfirm('暂无该车型数据')
                                this.nextStatus = false
                                console.log('222')
                            }
                        } else {
							this.loadingShow = false
							this.nextStatus = false
							this.showConfirm(res.data.msg)
						}
                    }
                })
            },
            _next () {
                if (this.nextStatus === true) {
                    this.loadingShow = true
                    console.log('333')
                    let Num = this.num
                    let vehicleCode = this.carArray[Num].vehicleCode
                    let hfCode = this.carArray[Num].hfCode
                    let seatCount = Number(this.carArray[Num].seatCount) - 1
                    this.setPremium({
                        field1: 'hfCode',
                        value: hfCode
                    })
                    this.setPremium({
                        field1: 'seatCounts',
                        value: seatCount
                    })
                    confirmCarModel(vehicleCode).then(res => {
                        console.log(res)
                        if (res.ret === RET_OK) {
                            if (res.data.code === CODE_OK) {
                                this.loadingShow = false
                                this.$router.push({
                                    name: 'du_price'
                                })
                            } else {
                                this.showConfirm(res.msg)
                            }
                        }
                    })
                } else {
                    console.log('444')
                    return false
                }
            },
            changeCircle (index) {
                this.Ind = index
                this.num = index
            }
        },
        components: {
            Split,
            InfoFooter,
            Loading,
			Confirm
        }
	}
</script>

<style lang="stylus" scoped>
    @import '~common/stylus/variable.styl'
    @import '~common/stylus/mixin.styl'
	.carConfig
		.bar
			width: 100%
			line-height: (60/$scale)
			background: #FFE5E5
			.listTip
				font-size: (26/$scale)
				color: #FF4456
				padding-left: (30/$scale)
		.content
			h2
				font-size: (32/$scale)
				color: #FF4456
				padding: (34/$scale) 0 (34/$scale) (30/$scale)
				background: #fff
			.detail
				display: flex
				font-size: (28/$scale)
				color: #333
				padding: (4/$scale) 0
				background: #fff
				padding-left: (30/$scale)
				margin-top: (20/$scale)
				&:last-child
					margin-bottom: (160/$scale)
				.redFang
					width: (10/$scale)
					height: (10/$scale)
					background: #FF4456
					margin-top: (33/$scale)
				.carDetailWarp
					padding-left: (18/$scale)
					width: 100%
					.carDetail
						margin: (26/$scale) 0
						.redCircle
							bg-image('redCircle')
							display: inline-block
							width: (32/$scale)
							height: (32/$scale)
							background-size: cover
							float: right
							margin-right: (30/$scale)
						.redGou
							bg-image('redIco')
							display: inline-block
							width: (32/$scale)
							height: (32/$scale)
							background-size: cover
							float: right
							margin-right: (30/$scale)				
</style>