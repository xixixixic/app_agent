<template>
	<div class="policyPriceWarp">
		<loading v-if='loadingShow'></loading>
		<div v-if='!loadingShow'>
			<div class="policyPrice">
				<p class="detailTitle">
					<a class="titleLeft">报价</a>
				</p>
				<div class="detail">
					<div class="info">
						<p class="desTitle">交强险</p>
						<p class="statusWarp">
							<select class='select' v-model='jiaoqiangxianValue' v-on:change='setJiaoqiang'>
								<option v-for='item in jiaoqiangxian'>{{item.value}}</option>
							</select>
						</p>
					</div>
					<div class="suggesstWarp" v-if='suggestStatus'>
						<p class="suggesst">为了方便理赔和维护权益，建议您同时购买商业险和交强险。交强险和车船税为国家规定统一价格。</p>
					</div>
					<div class="info">
						<p class="desTitle">商业险</p>
						<p class="statusWarp">
							<select class='select' v-model='shangyexianValue' v-on:change='setShangye'>
								<option v-for='item in shangyexian'>{{item.value}}</option>
							</select>
						</p>
					</div>
				</div>
				<!--<split></split>-->
				<p class="detailTitle">
					<a class="titleLeft" v-if='businessStatus'>险种信息</a>
				</p>
				<div class="insuraceInfo">
					<business-risk v-if='businessStatus' ref='businessRisk'></business-risk>
				</div>
				<div class="caculate" v-if='caculatStatus'>
					<div class="insuranceTitle">
						<div class="greyWarp">
							<a href="javascript:void(0)" class="insuranceTitleA">折扣前总保费</a>
							<a href="javascript:void(0)" class="insuranceTitleA">总保费</a>
							<a href="javascript:void(0)" class="insuranceTitleA">总折扣</a>
						</div>
					</div>
					<div class="insuranceTitle">
						<a href="javascript:void(0)" class="insuranceTitleA">{{beforeDiscount}}元</a>
						<a href="javascript:void(0)" class="insuranceTitleA">{{totalPrice}}元</a>
						<a href="javascript:void(0)" class="insuranceTitleA">{{totalDiscount}}%</a>
					</div>
					<div class="btnWarp">
						<button class="caculateBtn" @click="_caculate">计算保费</button>
					</div>
					<div class="insuranceTitle">
						<a href="javascript:void(0)" class="insuranceTitleA">商业险</a>
						<a href="javascript:void(0)" class="insuranceTitleA">交强险</a>
						<a href="javascript:void(0)" class="insuranceTitleA">车船税</a>
					</div>
					<div class="insuranceTitle">
						<a href="javascript:void(0)" class="insuranceTitleA">{{buniess}}元</a>
						<a href="javascript:void(0)" class="insuranceTitleA">{{traffic}}元</a>
						<a href="javascript:void(0)" class="insuranceTitleA">{{carAndShip}}元</a>
					</div>
					<div class="totalWarp">
                        <a href="javascript:void(0)" class="insuranceTitleA">共计：</a>
                        <a href="javascript:void(0)" class="insuranceTitleA">{{totalPay}}元</a>
				    </div>
	           </div>
	           <div class="checkCode" v-if='checkCodeStatus'>
	        	<div class="checkContent">
		            <div class="item">
		                <div class="warp">
		                    <div class="input-container">
		                        <input type="text" placeholder="请输入图形验证码" v-model="imageCode">
		                        <img class="image-code-btn" :src="imageCodeSrc"/>
		                    </div>
		                </div>
		            </div>
		            <div class="operate">
		                <div @click="sureBtn" class="operate-btn left">确定</div>
		                <div @click="" class="operate-btn right">取消</div>
		            </div>
	            </div>
        	</div>
			</div>			
			<info-footer text="下一步" @next='_next'></info-footer>
		</div>
        <confirm  ref="confirm" :text="confirmText" :clearFlag='clearFlag'></confirm>
	</div>
</template>

<script>
	import InfoFooter from 'base/footer/footer'
	import Split from 'base/split/split'
	import Loading from 'base/loading/loading'
	import BusinessRisk from 'components/insurance/car/tian_an/price/children/business_risks/business_risks'
	import {mapMutations, mapGetters} from 'vuex'
	import {calculationPremium} from 'api/car/tian-an/insurance.js'
	import {RET_OK, CODE_OK} from 'service/variable.js'
	import Confirm from 'base/confirm/confirm'
    import {confirm} from 'common/js/mixin.js'
	export default {
        mixins: [confirm],
        data () {
            return {
                businessStatus: false,
                suggestStatus: false,
                jiaoqiangxian: [
                   {value: '投保'},
                   {value: '不投保'}
                ],
                jiaoqiangxianValue: '不投保',
                shangyexian: [
                   {value: '投保'},
                   {value: '不投保'}
                ],
                shangyexianValue: '不投保',
                loadingShow: false,
                caculatStatus: false,
                nextStatus: false,
                beforeDiscount: '0',
                totalPrice: '0',
                totalDiscount: '0',
                buniess: '0',
                traffic: '0',
                carAndShip: '0',
                totalPay: '0',
                confirmText: '',
                checkCodeStatus: false,
                imageCodeSrc: '',
                imageCode: '',
                clearFlag: ''
            }
        },
        created () {
            this.setDefault()
        },
        computed: {
           ...mapGetters([
               'tianCarPremium', 'tianCarPremiumForm'
          ])
        },
        methods: {
            ...mapMutations({
                setTianCarPremium: 'SET_CAR_TIANAN_PREMIUM',
                setTianCarPremiumForm: 'SET_CAR_TIANAN_PREMIUMFORM'
            }),
            setDefault () {
                if (this.tianCarPremium.policy.quotationFlag) {
                   this.jiaoqiangxianValue = this.tianCarPremium.policy.quotationFlag === '0' ? '不投保' : '投保'
                    if (this.jiaoqiangxianValue === '投保') {
                        this.suggestStatus = true
                    } else {
                        this.suggestStatus = false
                    }
                }
                if (this.tianCarPremium.policy.bussinessFlag) {
                    this.shangyexianValue = this.tianCarPremium.policy.bussinessFlag === '0' ? '不投保' : '投保'
                    if (this.shangyexianValue === '投保') {
                        this.businessStatus = true
                    } else {
                        this.businessStatus = false
                    }
                }
                this.setCaculate()
                this.caculateDefault()
                this.jiaoqiang()
                this.shangye()
             },
            caculateDefault () {
                console.log('cde')
                console.log(this.tianCarPremiumForm)
                if (this.tianCarPremiumForm.sumBenchMarkPremium_sy) {
                    this.beforeDiscount = this.tianCarPremiumForm.sumBenchMarkPremium_sy
                } else {
                   this.beforeDiscount = 0
                }
                if (this.tianCarPremiumForm.sumPremium_sy) {
                    this.totalPrice = this.tianCarPremiumForm.sumPremium_sy
                } else {
                   this.totalPrice = 0
                }
                if (this.tianCarPremiumForm.sumDiscount_sy) {
                    this.totalDiscount = this.tianCarPremiumForm.sumDiscount_sy
                } else {
                   this.totalDiscount = 0
                }
                if (this.tianCarPremiumForm.sumPremium_sy) {
                    this.buniess = this.tianCarPremiumForm.sumPremium_sy
                } else {
                   this.buniess = 0
                }
                if (this.tianCarPremiumForm.sumPremium_jq) {
                    this.traffic = this.tianCarPremiumForm.sumPremium_jq
                } else {
                   this.traffic = 0
                }
                if (this.tianCarPremiumForm.sumTax_cq) {
                    this.carAndShip = this.tianCarPremiumForm.sumTax_cq
                } else {
                   this.carAndShip = 0
                }
                let arr = []
                if (this.buniess !== undefined) {
                    arr.push(this.buniess)
                } else {
                    this.buniess = 0
                }
                if (this.traffic !== undefined) {
                    arr.push(this.traffic)
                } else {
                    this.traffic = 0
                }
                if (this.carAndShip !== undefined) {
                    arr.push(this.carAndShip)
                } else {
                    this.carAndShip = 0
                }
                let arrTotal = 0
                for (let i = 0; i < arr.length; i++) {
                    arrTotal = Number(arr[i]) + arrTotal
                }
                this.totalPay = arrTotal.toFixed(2)
                // if (this.totalPay !== 0) {
                //     this.nextStatus = true
                // } else {
                //     this.nextStatus = false
                // }
            },
            reducer (sumSoFar, item) {
              if (item === '不投保' || item === '') {
                sumSoFar += 1
              } else {
                sumSoFar -= 1
              }
              return sumSoFar
            },
             _caculate () {
                 if (this.shangyexianValue === '投保') {
                     const item = [
                            this.$refs.businessRisk.$refs.jidongche.jidongcheValue,
                            this.$refs.businessRisk.$refs.chesunjuedui.chesunjueduiValue,
                            this.$refs.businessRisk.$refs.disanzhe.disanzheValue,
                            this.$refs.businessRisk.$refs.siji.sijiValue,
                            this.$refs.businessRisk.$refs.chenke.chenkeValue,
                            this.$refs.businessRisk.$refs.jidongchedaoqiang.jidongcheValue,
                            this.$refs.businessRisk.$refs.cheshenhuaheng.cheshenhuahengValue,
                            this.$refs.businessRisk.$refs.ziran.ziranValue,
                            this.$refs.businessRisk.$refs.boli.boliValue,
                            this.$refs.businessRisk.$refs.fadongji.fadongjiValue,
                            this.$refs.businessRisk.$refs.jidongche.jidongcheValue,
                            this.$refs.businessRisk.$refs.wufazhaodao.wufazhaodaoValue,
                            this.$refs.businessRisk.$refs.xiulichang.weixiuchangValue,
                            this.$refs.businessRisk.$refs.xinzengshebei.xinzengshebeiValue,
                            this.$refs.businessRisk.$refs.jingshensunhai.jingshensunhaiValue
                        ]
                        if (item.reduce(this.reducer, 0) === 13) {
                            this.confirmText = '请选择保费类型'
                            this.$refs.confirm.show()
                        } else {
                        this.loadingShow = true
                        let res = this.tianCarPremium
                        let other = res.ItemKindRequestDto
                        let kinds = []
                        for (let i = 0; i < other.length; i++) {
                            if (other[i].amount !== '不投保') {
                                    kinds.push(other[i])
                                }
                            }
                        let policy = this.tianCarPremium.policy
                        let bussinessFlag = policy.bussinessFlag
                        let checkCode = policy.checkCode
                        let discount = policy.discount
                        let quotationFlag = policy.quotationFlag
                        let data = {
                            ItemKindRequestDto: kinds,
                            bussinessFlag: bussinessFlag,
                            discount: discount,
                            checkCode: checkCode,
                            quotationFlag: quotationFlag
                        }
                        calculationPremium(data).then(res => {
                            console.log(res)
                            if (res.ret === RET_OK) {
                                if (res.data.code === CODE_OK) {
                                    this.loadingShow = false
                                    if (res.data.reinsurance === '1') {
                                        this.checkCodeStatus = true
                                        this.imageCodeSrc = 'data:image/png;base64,' + res.data.checkCode
                                    } else {
                                        if (res.data.sumBenchMarkPremium_sy) {
                                        this.setTianCarPremiumForm({
                                            field1: 'sumBenchMarkPremium_sy',
                                            value: res.data.sumBenchMarkPremium_sy
                                        })
                                        }
                                        if (res.data.sumDiscount_sy) {
                                            this.setTianCarPremiumForm({
                                                field1: 'sumDiscount_sy',
                                                value: res.data.sumDiscount_sy
                                            })
                                        }
                                        if (res.data.sumPremium_jq) {
                                            this.setTianCarPremiumForm({
                                                field1: 'sumPremium_jq',
                                                value: res.data.sumPremium_jq
                                            })
                                        }
                                        if (res.data.sumPremium_sy) {
                                            this.setTianCarPremiumForm({
                                                field1: 'sumPremium_sy',
                                                value: res.data.sumPremium_sy
                                            })
                                        }
                                        if (res.data.sumTax_cq) {
                                            this.setTianCarPremiumForm({
                                                field1: 'sumTax_cq',
                                                value: res.data.sumTax_cq
                                            })
                                        }
                                        this.nextStatus = true
                                        this.caculateDefault()
                                        this.setDefault()
                                    }
                                } else {
                                    this.nextStatus = false
                                    this.loadingShow = false
                                    this.clearFlag = '2'
                                    this.confirmText = res.msg
                                    this.$refs.confirm.show()
                                }
                            } else {
                                this.nextStatus = false
                                this.loadingShow = false
                                this.confirmText = res.msg
                                this.$refs.confirm.show()
                            }
                        })
                    }
                } else {
                        this.loadingShow = true
                        let res = this.tianCarPremium
                        let other = res.ItemKindRequestDto
                        let kinds = []
                        for (let i = 0; i < other.length; i++) {
                            if (other[i].amount !== '不投保') {
                                    kinds.push(other[i])
                                }
                            }
                        let policy = this.tianCarPremium.policy
                        let bussinessFlag = policy.bussinessFlag
                        let discount = policy.discount
                        let quotationFlag = policy.quotationFlag
                        let data = {
                            ItemKindRequestDto: kinds,
                            bussinessFlag: bussinessFlag,
                            discount: discount,
                            quotationFlag: quotationFlag
                        }
                        calculationPremium(data).then(res => {
                            console.log(res)
                            if (res.ret === RET_OK) {
                                if (res.data.code === CODE_OK) {
                                    this.loadingShow = false
                                    console.log(res.data.reinsurance)
                                    if (res.data.reinsurance === '1') {
                                        this.checkCodeStatus = true
                                        console.log('555')
                                    } else {
                                        if (res.data.sumBenchMarkPremium_sy) {
                                        this.setTianCarPremiumForm({
                                            field1: 'sumBenchMarkPremium_sy',
                                            value: res.data.sumBenchMarkPremium_sy
                                        })
                                        }
                                        if (res.data.sumDiscount_sy) {
                                            this.setTianCarPremiumForm({
                                                field1: 'sumDiscount_sy',
                                                value: res.data.sumDiscount_sy
                                            })
                                        }
                                        if (res.data.sumPremium_jq) {
                                            this.setTianCarPremiumForm({
                                                field1: 'sumPremium_jq',
                                                value: res.data.sumPremium_jq
                                            })
                                        }
                                        if (res.data.sumPremium_sy) {
                                            this.setTianCarPremiumForm({
                                                field1: 'sumPremium_sy',
                                                value: res.data.sumPremium_sy
                                            })
                                        }
                                        if (res.data.sumTax_cq) {
                                            this.setTianCarPremiumForm({
                                                field1: 'sumTax_cq',
                                                value: res.data.sumTax_cq
                                            })
                                        }
                                        this.nextStatus = true
                                        this.caculateDefault()
                                        this.setDefault()
                                    }
                                } else {
                                    this.loadingShow = false
                                    this.confirmText = res.msg
                                    this.clearFlag = '2'
                                    this.$refs.confirm.show()
                                }
                            } else {
                                this.clearFlag = '22'
                                this.loadingShow = false
                                this.confirmText = res.msg
                                this.$refs.confirm.show()
                            }
                        })
                 }
            },
            sureBtn () {
                this.checkCodeStatus = false
                this.setTianCarPremium({
                        field1: 'policy',
                        field2: 'checkCode',
                        value: this.imageCode
                    })
                    console.log(this.checkCodeStatus)
            },
            setCaculate () {
                let jiaoqiang = this.jiaoqiangxianValue
                let shangye = this.shangyexianValue
                if (shangye === '投保' || jiaoqiang === '投保') {
                    this.caculatStatus = true
                } else if (jiaoqiang === '不投保' && shangye === '不投保') {
                    this.caculatStatus = false
                }
            },
            setJiaoqiang () {
                this.nextStatus = false
                this.jiaoqiang()
            },
            jiaoqiang () {
                let value = this.jiaoqiangxianValue
               if (value === '投保') {
                   this.suggestStatus = true
                   this.setTianCarPremium({
                        field1: 'policy',
                        field2: 'quotationFlag',
                        value: '1'
                    })
                    this.setCaculate()
                   console.log('sdfsdf')
               } else if (value === '不投保') {
                   this.suggestStatus = false
                   this.setTianCarPremium({
                        field1: 'policy',
                        field2: 'quotationFlag',
                        value: '0'
                    })
                    this.setCaculate()
                    this.setTianCarPremiumForm({
                        field1: 'sumPremium_jq',
                        value: '0'
                    })
                    if (this.tianCarPremiumForm.sumPremium_sy) {
                        this.setTianCarPremiumForm({
                            field1: 'sumPremium_sy',
                            value: this.tianCarPremiumForm.sumPremium_sy
                        })
                    } else {
                        this.setTianCarPremiumForm({
                            field1: 'sumPremium_sy',
                            value: '0'
                        })
                    }
                    this.setTianCarPremiumForm({
                        field1: 'sumTax_cq',
                        value: '0'
                    })
                    this.caculateDefault()
               }
            },
            setShangye () {
                this.nextStatus = false
                console.log(this.nextStatus)
                console.log('adadad')
                this.shangye()
            },
            shangye () {
                let value = this.shangyexianValue
                if (value === '投保') {
                    this.businessStatus = true
                    this.setTianCarPremium({
                        field1: 'policy',
                        field2: 'bussinessFlag',
                        value: '1'
                    })
                    this.caculatStatus = true
                    console.log('???')
                } else if (value === '不投保') {
                    this.businessStatus = false
                    this.setTianCarPremium({
                        field1: 'ItemKindRequestDto',
                        value: []
                    })
                    this.setTianCarPremium({
                        field1: 'ItemKindRequestDto#0',
                        field2: 'kindCode',
                        value: ''
                    })
                    this.setTianCarPremium({
                        field1: 'ItemKindRequestDto#0',
                        field2: 'kindName',
                        value: ''
                    })
                    this.setTianCarPremium({
                        field1: 'ItemKindRequestDto#0',
                        field2: 'quantity',
                        value: ''
                    })
                    this.setTianCarPremium({
                        field1: 'ItemKindRequestDto#0',
                        field2: 'unitAmount',
                        value: '不投保'
                    })
                    this.setTianCarPremium({
                        field1: 'ItemKindRequestDto#0',
                        field2: 'deductableFlag',
                        value: ''
                    })
                    this.setTianCarPremium({
                        field1: 'ItemKindRequestDto#0',
                        field2: 'valueType',
                        value: ''
                    })
                    this.setTianCarPremium({
                        field1: 'policy',
                        field2: 'bussinessFlag',
                        value: '0'
                    })
                    this.setTianCarPremiumForm({
                        field1: 'sumPremium_sy',
                        value: '0'
                    })
                    this.setTianCarPremiumForm({
                        field1: 'sumDiscount_sy',
                        value: '0'
                    })
                    this.setTianCarPremiumForm({
                        field1: 'sumBenchMarkPremium_sy',
                        value: '0'
                    })
                    this.caculateDefault()
                    let jiaoqiang = this.jiaoqiangxianValue
                    if (jiaoqiang === '不投保') {
                        this.caculatStatus = false
                    }
                }
            },
            _next () {
                let value = this.nextStatus
                console.log(this.nextStatus)
                console.log('orange')
                if (value === true) {
                     console.log('apple')
                    this.$router.push({
                         name: 'insured_and_applicant'
                    })
                } else {
                    console.log(this.nextStatus)
                    console.log(this.nextStatus === true)
                    this.confirmText = '请先计算保费'
                    this.$refs.confirm.show()
                }
            }
        },
        components: {
            Split,
            InfoFooter,
            BusinessRisk,
            Loading,
            Confirm
        }
	}
</script>

<style lang="stylus" scoped>
	@import '~common/stylus/variable.styl'
	@import '~common/stylus/mixin.styl'
	.policyPriceWarp
		padding-bottom: (100/$scale)
		.policyPrice
			.detailTitle
					font-size: (32/$scale)
					line-height: (100/$scale)
					color: #333
					border-bottom: 1px solid #FF4456
					padding-left: (30/$scale)
					background: #fff
					.titleLeft
						color: #FF4456
				.detail
					width: 100%
					background: #fff
					.info
						font-size: (28/$scale)
						display: flex
						justify-content: space-between
						line-height: (100/$scale)
					.suggesstWarp
						background-color: #ffc
						.suggesst
							font-size: (28/$scale)
							line-height: (40/$scale)
							color: #555555
							padding: (20/$scale) (10/$scale)
					.classInfo
						width: 100%
						.classInfoP
							font-size: (28/$scale)
							height: (100/$scale)
							line-height: (100/$scale)
							text-align: left
							background: #fff
							border-bottom: 1px solid #e5e5e5
					.desTitle
						color: #444
						padding: 0 (30/$scale)
					.statusWarp
						margin-right: (30/$scale)
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
				.caculate
					/*padding: 0 (30/$scale)*/
					.insuranceTitle
						height: (100/$scale)
						line-height: (100/$scale)
						font-size: (28/$scale)
						display: flex
						border-bottom: 1px solid #dcdcdc
						padding-left: (30/$scale)
						background: #fff
						&:nth-child(1)
							background: #f0f0f0
							border-bottom: none
						&:nth-child(2)
							padding-left: (50/$scale)
						&:nth-child(4)
							padding-left: (60/$scale)
						&:nth-child(5)
							padding-left: (60/$scale)
							border-bottom: none
						.insuranceTitleA
							font-size: (28/$scale)
							height: 100%
							color: #222
							display: inline-block
							text-decoration: none
							&:nth-child(1)
								width: (280/$scale)
							&:nth-child(2)
								width: (240/$scale)
							&:nth-child(3)
								width: (120/$scale)
					.btnWarp
						text-align: center
						.caculateBtn
							width: (200/$scale)
							height: (80/$scale)
							border: 1px solid #FF4455
							background: #fff
							color: #FF4455
							border-radius: 5px
							margin-bottom: (40/$scale)
					.totalWarp
						text-align: right
						height: (100/$scale)
						line-height: (100/$scale)
						font-size: 0
						.insuranceTitleA
							font-size: (32/$scale)
							line-height: (100/$scale)
							display: inline-block
							&:nth-child(1)
								width: (100/$scale)
							&:nth-child(2)
								width: (160/$scale)
								text-align: left
				.checkCode
					position: fixed
					left: 0
					right: 0
					top: 0
					bottom: 0
					z-index: 998
					background-color: rgba(0,0,0, 0.5)
					display: flex
					align-items: center
					justify-content: center
					.checkContent
						background: #fff
						width: (638/$scale)
						border-radius: (20/$scale)
						.item
							font-size: (28/$scale)
							padding: 0 (30/$scale)  
							.warp
								.input-container
									width: 100%
									height: (100/$scale)
									border-bottom: 1px solid #e6e6e6
									display: flex
									align-items: center
									>input
										height: 100%
										line-height: (66/$scale)
									.image-code-btn
										width: (180/$scale)
										height: (66/$scale)
										font-size: (28/$scale)
							.wrong
									font-size: (28/$scale)
									color: #ff4455
									width: 100%
									height: (60/$scale)
									line-height: (60/$scale)
									text-align: right
						.operate
							font-size: (28/$scale)
							height: (80/$scale)
							display: flex
							padding: 0 (30/$scale)
							.operate-btn
								flex-grow: 1 
								text-align: center
								line-height: (80/$scale)
							.left
								border-right: 1px solid #e6e6e6
</style>