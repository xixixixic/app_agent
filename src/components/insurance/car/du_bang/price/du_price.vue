<template>
	<div class="policyPriceWarp">
        <loading v-if='loadingShow'></loading>
		<div v-if='!loadingShow'>
			<split></split>
			<div class="policyPrice">
				<p class="detailTitle">
					<a class="titleLeft">基本信息</a>
				</p>
				<div class="detail">
					<div class="info">
						<p class="desTitle">车险类别</p>
						<p class="placeholders" @click="insuranceClassify">
							<span class="choose">{{classifyName}}<i class="arr"></i></span>
						</p>
					</div>
					<div class="classInfo" v-show='isShow'>
						<p class="classInfoP" v-for='(item,index) in classify' @click="classifyItem(index)">
							<span class="choose">{{item.className}}</span>
						</p>
					</div>
					<traffic-qibaoqi v-if='trafficStatus' ref='trafficStartDate'></traffic-qibaoqi>
					<traffic-zhongbao v-if='trafficStatus' ref='trafficEndDate'></traffic-zhongbao>
					<business-qibaoqi v-if='businessStatus' ref='businessStartDate'></business-qibaoqi>
					<business-zhongbao v-if='businessStatus' ref='businessEndDate'></business-zhongbao>
				</div>
				<split></split>
				<p class="detailTitle">
					<a class="titleLeft">险种信息</a>
				</p>
				<div class="insuraceInfo">
					<business-risk v-if='businessStatus' ref='businessRisk'></business-risk>
					<traffic-risk v-if='trafficStatus' ref='trfficRisk'></traffic-risk>
				</div>
			</div>
			<info-footer text="下一步" @next='_next'></info-footer>
		</div>
        <confirm ref="confirm" :text="confirmText"></confirm>
        <div class="checkCode" v-show='checkCodeStatus'>
        	<div class="checkContent">
	            <div class="item" v-if="this.SyExit">
	                <div class="warp">
	                    <div class="input-container">
	                        <input type="text" placeholder="请输入图形验证码" v-model="imageCodeSy">
	                        <img class="image-code-btn" :src="imageCodeSrcSy"/>
	                    </div>
	                </div>
	                <div class='wrong' v-show='syTip'>商业险验证码输入有误</div>
	            </div>
	            <div class="item" v-if="this.JqExit">
	                <div class="warp">
	                    <div class="input-container">
	                        <input type="text" placeholder="请输入图形验证码" v-model="imageCodeJq">
	                        <img class="image-code-btn" :src="imageCodeSrcJq"/>
	                    </div>
	                </div> 
	                <div class='wrong' v-show='jqTip'>交强险验证码输入有误</div>
	            </div>
	            <div class="operate">
	                <div @click="" class="operate-btn left">确定</div>
	                <div @click="cancel" class="operate-btn right">取消</div>
	            </div>
            </div>
        </div>
	</div>
</template>

<script>
	import InfoFooter from 'base/footer/footer'
    import Split from 'base/split/split'
    import Loading from 'base/loading/loading'
	import Confirm from 'base/confirm/confirm'
    import {confirm} from 'common/js/mixin.js'
	import BusinessRisk from 'components/insurance/car/du_bang/price/children/business_risks/business_risks'
	import TrafficRisk from 'components/insurance/car/du_bang/price/children/traffic_risk/traffic_risk'
	import BusinessQibaoqi from 'components/insurance/car/du_bang/price/children/qibaoqi/qibaoqi'
	import BusinessZhongbao from 'components/insurance/car/du_bang/price/children/zhongbao/zhongbao'
	import TrafficQibaoqi from 'components/insurance/car/du_bang/price/children/traffic_qibaoqi/traffic_qibaoqi'
	import TrafficZhongbao from 'components/insurance/car/du_bang/price/children/traffic_zhongbao/traffic_zhongbao'
    import {mapMutations, mapGetters} from 'vuex'
    // import {calculationPremium} from 'api/car/du-bang/insurance.js'
    // import {RET_OK, CODE_OK} from 'service/variable.js'
	export default {
        mixins: [confirm],
        data () {
            return {
                classify: [
                 {className: '单商业险'},
                 {className: '单交强险'},
                 {className: '双险关联出单'}
                ],
                isShow: false,
                classifyName: '单商业险',
                businessStatus: true,
                trafficStatus: false,
                loadingShow: false,
                errShow: false,
                imageCodeSrcSy: '',
                imageCodeSrcJq: '',
                imageCodeSy: '',
                imageCodeJq: '',
                checkCodeStatus: false,
                SyExit: false,
                JqExit: false,
                syTip: false,
                jqTip: false
            }
        },
        computed: {
           ...mapGetters([
               'duCarPremium'
          ])
        },
        created () {
            this.setDefault()
        },
        methods: {
            ...mapMutations({
               setClassify: 'SET_CAR_DUBANG_PREMIUM',
               setDuCarPremiumForm: 'SET_CAR_DUBANG_PREMIUMFORM'
            }),
            setDefault () {
                this.setClassify({
                      field1: 'policy',
                      field2: 'riskType',
                      value: '0'
                    })
            },
            reducer (sumSoFar, item) {
              if (item === '不投保') {
                sumSoFar += 1
              } else {
                sumSoFar -= 1
              }
              return sumSoFar
            },
            _next () {
                let insuranceClassify = this.classifyName
                console.log('???')
                   if (insuranceClassify === '单商业险') {
                        this.checkBussiness()
                    } else if (insuranceClassify === '单交强险') {
                        this.checkTraffic()
                    } else if (insuranceClassify === '双险关联出单') {
                        const item = [
                            this.$refs.businessRisk.$refs.baoxianbiao.baoxianbiaoValue,
                            this.$refs.businessRisk.$refs.jiashiyuan.jiashiyuanValue,
                            this.$refs.businessRisk.$refs.disanzhe.disanzheValue,
                            this.$refs.businessRisk.$refs.cheshangchenke.cheshangchenkeValue,
                            this.$refs.businessRisk.$refs.quanchedaoqiang.quanchedaoqiangValue,
                            this.$refs.businessRisk.$refs.boli.boliValue,
                            this.$refs.businessRisk.$refs.cheshenhuaheng.cheshenhuahengValue,
                            this.$refs.businessRisk.$refs.xiulichang.xiulichangValue,
                            this.$refs.businessRisk.$refs.jingshensunhai.jingshensunhaiValue,
                            this.$refs.businessRisk.$refs.jidongche.jidongcheValue,
                            this.$refs.businessRisk.$refs.xiuliqijian.xiuliqijianValue,
                            this.$refs.businessRisk.$refs.fadongji.fadongjiValue,
                            this.$refs.businessRisk.$refs.ziran.ziranValue
                        ]
                        if (this.$refs.businessStartDate.startDate === '请选择商业险起保日期') {
                            this.showConfirm('请选择商业险起保日期')
                        } else if (this.duCarPremium.businessEndShow === '请选择商业险终保日期') {
                           this.showConfirm('请选择商业险终保日期')
                        } else if (item.reduce(this.reducer, 0) === 13) {
                            this.showConfirm('请选择保险类型')
                        } else if (this.$refs.trafficStartDate.date === '请选择交强险起保日期') {
                            this.showConfirm('请选择交强险起保日期')
                        } else if (this.duCarPremium.trafficEndShow === '请选择交强险终保日期') {
                            this.showConfirm('请选择交强险终保日期')
                        } else {
                            // console.log('1100')
                            // this._nextStep()
                            this.$router.push({
                                name: 'du_priceForm'
                            })
                        }
                    }
            },
            checkBussiness () {
                const item = [
                            this.$refs.businessRisk.$refs.baoxianbiao.baoxianbiaoValue,
                            this.$refs.businessRisk.$refs.jiashiyuan.jiashiyuanValue,
                            this.$refs.businessRisk.$refs.disanzhe.disanzheValue,
                            this.$refs.businessRisk.$refs.cheshangchenke.cheshangchenkeValue,
                            this.$refs.businessRisk.$refs.quanchedaoqiang.quanchedaoqiangValue,
                            this.$refs.businessRisk.$refs.boli.boliValue,
                            this.$refs.businessRisk.$refs.cheshenhuaheng.cheshenhuahengValue,
                            this.$refs.businessRisk.$refs.xiulichang.xiulichangValue,
                            this.$refs.businessRisk.$refs.jingshensunhai.jingshensunhaiValue,
                            this.$refs.businessRisk.$refs.jidongche.jidongcheValue,
                            this.$refs.businessRisk.$refs.xiuliqijian.xiuliqijianValue,
                            this.$refs.businessRisk.$refs.fadongji.fadongjiValue,
                            this.$refs.businessRisk.$refs.ziran.ziranValue
                        ]
                        if (this.$refs.businessStartDate.startDate === '请选择商业险起保日期') {
                            this.showConfirm('请选择商业险起保日期')
                        } else if (this.duCarPremium.businessEndShow === '请选择商业险终保日期') {
                           this.showConfirm('请选择商业险终保日期')
                        } else if (item.reduce(this.reducer, 0) === 13) {
                            this.showConfirm('请选择保险类型')
                        } else {
                            // console.log('6677')
                            this.$router.push({
                                name: 'du_priceForm'
                            })
                        }
            },
            checkTraffic () {
                if (this.$refs.trafficStartDate.date === '请选择交强险起保日期') {
                    this.showConfirm('请选择交强险起保日期')
                } else if (this.duCarPremium.trafficEndShow === '请选择交强险终保日期') {
                    this.showConfirm('请选择交强险终保日期')
                } else {
                    // console.log('8899')
                    this.$router.push({
                        name: 'du_priceForm'
                    })
                }
            },
            insuranceClassify () {
                this.isShow = !this.isShow
            },
            classifyItem (index) {
                this.isShow = false
                this.classifyName = this.classify[index].className
                let classify = this.classify[index].className
                if (classify === '单商业险') {
                    this.setClassify({
                      field1: 'policy',
                      field2: 'riskType',
                      value: '0'
                    })
                    this.clearTraffic()
                    this.businessStatus = true
                    this.trafficStatus = false
                } else if (classify === '单交强险') {
                   this.setClassify({
                      field1: 'policy',
                      field2: 'riskType',
                      value: '1'
                    })
                    this.clearBussiness()
                    this.businessStatus = false
                    this.trafficStatus = true
                } else {
                    console.log(this.duCarPremium)
            console.log('this.????')
                   this.setClassify({
                      field1: 'policy',
                      field2: 'riskType',
                      value: '2'
                    })
                   this.businessStatus = true
                   this.trafficStatus = true
                }
            },
            clearTraffic () {
                    this.setClassify({
                      field1: 'trafficStartShow',
                      value: '请选择交强险起保日期'
                    })
                    this.setClassify({
                      field1: 'trafficEndShow',
                      value: '请选择交强险终保日期'
                    })
                    this.setClassify({
                      field1: 'policy',
                      field2: 'startDateCi',
                      value: ''
                    })
                    this.setClassify({
                      field1: 'policy',
                      field2: 'endDateCi',
                      value: ''
                    })
                    this.setClassify({
                      field1: 'carShipTax',
                      field2: 'taxRelif',
                      value: ''
                    })
                    this.setClassify({
                      field1: 'carShipTax',
                      field2: 'taxStartDate',
                      value: ''
                    })
                    this.setClassify({
                      field1: 'carShipTax',
                      field2: 'taxEndDate',
                      value: ''
                    })
                    this.setClassify({
                      field1: 'carShipTax',
                      field2: 'taxDepartment',
                      value: ''
                    })
                    this.setClassify({
                      field1: 'carShipTax',
                      field2: 'taxDocumentNumber',
                      value: ''
                    })
                    this.setClassify({
                      field1: 'carShipTax',
                      field2: 'deDucationdueCode',
                      value: ''
                    })
                    this.setClassify({
                      field1: 'carShipTax',
                      field2: 'deDucationdueType',
                      value: ''
                    })
                    this.setClassify({
                      field1: 'carShipTax',
                      field2: 'deDucationduePropotion',
                      value: ''
                    })
                    this.setClassify({
                      field1: 'carShipTax',
                      field2: 'deDucation',
                      value: ''
                    })
                    this.setClassify({
                      field1: 'carShipTax',
                      field2: 'deDucationDocumentNumber',
                      value: ''
                    })
                    this.setClassify({
                      field1: 'carShipTax',
                      field2: 'deTaxDepartment',
                      value: ''
                    })
            },
            clearBussiness () {
                    this.setClassify({
                      field1: 'businessStartShow',
                      value: '请选择商业险起保日期'
                    })
                    this.setClassify({
                      field1: 'businessEndShow',
                      value: '请选择商业险终保日期'
                    })
                    this.setClassify({
                      field1: 'policy',
                      field2: 'startDateBi',
                      value: ''
                    })
                    this.setClassify({
                      field1: 'policy',
                      field2: 'endDateBi',
                      value: ''
                    })
                    this.setClassify({
                      field1: 'kinds#0',
                      field2: 'kindCode',
                      value: ''
                    })
                    this.setClassify({
                      field1: 'kinds#0',
                      field2: 'kindName',
                      value: ''
                    })
                    this.setClassify({
                      field1: 'kinds#0',
                      field2: 'modeCode',
                      value: ''
                    })
                    this.setClassify({
                      field1: 'kinds#0',
                      field2: 'quantity',
                      value: ''
                    })
                    this.setClassify({
                      field1: 'kinds#0',
                      field2: 'model',
                      value: 'N'
                    })
                    this.setClassify({
                      field1: 'kinds#0',
                      field2: 'value',
                      value: ''
                    })
                    this.setClassify({
                      field1: 'kinds#0',
                      field2: 'unitAmount',
                      value: ''
                    })
                    this.setClassify({
                      field1: 'kinds#0',
                      field2: 'amount',
                      value: '不投保'
                    })
                    this.setClassify({
                      field1: 'kinds#0',
                      field2: 'rate',
                      value: ''
                    })
            },
            cancel () {
                this.checkCodeStatus = false
            }
        },
        components: {
            Split,
            InfoFooter,
            BusinessRisk,
            TrafficRisk,
            BusinessQibaoqi,
            BusinessZhongbao,
            TrafficQibaoqi,
            TrafficZhongbao,
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
						/*border-top: 1px solid #e6e6e6*/
					.left
						border-right: 1px solid #e6e6e6
		.policyPrice
			.detailTitle
					font-size: (32/$scale)
					line-height: (100/$scale)
					color: #333
					border-bottom: 1px solid #FF4456
					text-indent: (30/$scale)
					background: #fff
					.titleLeft
						color: #FF4456
				.detail
					width: 100%
					.info
						font-size: (28/$scale)
						display: flex
						justify-content: space-between
						line-height: (100/$scale)
						background: #fff
						padding-left: (30/$scale)
						border-bottom: 1px solid #dcdcdc
					&:last-child
						border-bottom: none
					.classInfo
						width: 100%
						.classInfoP
							font-size: (28/$scale)
							height: (100/$scale)
							line-height: (100/$scale)
							text-align: left
							background: #fff
							border-bottom: 1px solid #e5e5e5
							padding-left: (30/$scale)
					.desTitle
						color: #444
					.placeholders
						color: #BBB
						margin-right: (30/$scale)
						.placeholdersInput
							text-align: right
						.choose
							margin-left: (20/$scale)
							display: inline-block
							width: 100%
							height: 100%
							color: #333
							.arr
								bg-image('rightArr')
								width: (20/$scale)
								height: (30/$scale)
								display: inline-block
								background-size: contain
								background-repeat: no-repeat
								float: right
								margin-top: (36/$scale)
</style>