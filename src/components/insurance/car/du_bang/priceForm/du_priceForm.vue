<template>
	<div class="priceForm">
		<loading v-if='loadingShow'></loading>
		<div v-if='!loadingShow'>
			<div class="content">
				<div class="insurance">
					<div class="insuranceTitle">
						<a href="javascript:void(0)" class="insuranceTitleA">险种</a>
						<a href="javascript:void(0)" class="insuranceTitleA">保额(元)</a>
						<a href="javascript:void(0)" class="insuranceTitleA">保费(元)</a>
					</div>
					<div class="insuranceDetailWarp">
						<div class="insuranceDetail" v-for='item in list'>
							<a href="javascript:void(0)" class="insuranceDetailA">{{item.kindName}}</a>
							<a href="javascript:void(0)" class="insuranceDetailA">{{item.amount}}</a>
							<a href="javascript:void(0)" class="insuranceDetailA">{{item.benchMarkPremium}}</a>
						</div>
					</div>
					<split></split>
					<div class="insuranceTitle">
						<a href="javascript:void(0)" class="insuranceTitleA">折扣前总保费(元)</a>
						<a href="javascript:void(0)" class="insuranceTitleA">总保费(元)</a>
						<a href="javascript:void(0)" class="insuranceTitleA">总折扣</a>
					</div>
					<div class="insuranceDetailWarp">
						<div class="insuranceDetail" v-if="">
							<a href="javascript:void(0)" class="insuranceDetailA">{{zheqianPrice}}</a>
							<a href="javascript:void(0)" class="insuranceDetailA">{{totalPrice}}</a>
							<a href="javascript:void(0)" class="insuranceDetailA">{{discount}}%</a>
						</div>
					</div>
					<split></split>
					<div class="insuranceTitle">
						<a href="javascript:void(0)" class="insuranceTitleA">商业险(元)</a>
						<a href="javascript:void(0)" class="insuranceTitleA">交强险(元)</a>
						<a href="javascript:void(0)" class="insuranceTitleA">车船税(元)</a>
					</div>
					<div class="insuranceDetailWarp">
						<div class="insuranceDetail">
							<a href="javascript:void(0)" class="insuranceDetailA">{{shangyePrice}}</a>
							<a href="javascript:void(0)" class="insuranceDetailA">{{jiaoqiangPrice}}</a>
							<a href="javascript:void(0)" class="insuranceDetailA">{{chechuanPrice}}</a>
						</div>
					</div>
					<div class="totalPayPrice">
						<a href="javascript:void(0)" class="insuranceTitleA">总计：</a>
						<a href="javascript:void(0)" class="insuranceTitleA"><span class='redTotal'>{{totalPayPrice}}</span>元</a>
					</div>
					<split></split>
				</div>
			</div>
			<info-footer text="下一步" @next='_next'></info-footer>
		</div>
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
	                <div @click="confirmBtn" class="operate-btn left">确定</div>
	                <div @click="cancel" class="operate-btn right">取消</div>
	            </div>
            </div>
        </div>
        <confirm  ref="confirm" :text="confirmText" :urlparam='urlparam'></confirm>
	</div>
</template>

<script>
	import Split from 'base/split/split'
	import InfoFooter from 'base/footer/footer'
	import {mapGetters, mapMutations} from 'vuex'
	import {calculationPremium, checkPremium, order} from 'api/car/du-bang/insurance.js'
	import {RET_OK, CODE_OK} from 'service/variable.js'
	import Loading from 'base/loading/loading'
	import Confirm from 'base/confirm/confirm'
	import {confirm} from 'common/js/mixin.js'
	export default {
        mixins: [confirm],
        data () {
            return {
                zheqianPrice: '',
                totalPrice: '',
                discount: '',
                shangyePrice: '',
                jiaoqiangPrice: '',
                chechuanPrice: '',
                totalPayPrice: '',
                list: [],
                loadingShow: false,
                des: '',
                imageCodeSrcSy: '',
                imageCodeSrcJq: '',
                imageCodeSy: '',
                imageCodeJq: '',
                checkCodeStatus: false,
                SyExit: false,
                JqExit: false,
                syTip: false,
                jqTip: false,
                urlparam: ''
            }
        },
        computed: {
           ...mapGetters([
               'duCarPremiumForm', 'duCarTouBeiBaoRen', 'duCarPremium'
          ])
        },
        created () {
            this._caculatePrime()
        },
        methods: {
            ...mapMutations({
               setOrderPass: 'SET_CAR_DUBANG_ORDERPASS',
               setDuCarPremiumForm: 'SET_CAR_DUBANG_PREMIUMFORM'
            }),
            defaultValue (res) {
                this.list = res.data.riskKinds
                if (res.data.sumBenchMarkPremium) {
                    this.zheqianPrice = res.data.sumBenchMarkPremium
                } else {
                   this.zheqianPrice = 0
                }
                if (res.data.disCount) {
                    this.discount = (res.data.disCount) * 100
                } else {
                   this.discount = 0
                }
                if (res.data.sumPremium) {
                    this.shangyePrice = res.data.sumPremium
                } else {
                   this.shangyePrice = 0
                }
                if (res.data.sumPremium) {
                    this.totalPrice = res.data.sumPremium
                } else {
                   this.totalPrice = 0
                }
                if (res.data.standardPremium) {
                    this.jiaoqiangPrice = res.data.standardPremium
                } else {
                   this.jiaoqiangPrice = 0
                }
                if (res.data.sumTax) {
                    this.chechuanPrice = res.data.sumTax
                } else {
                   this.chechuanPrice = 0
                }
                let arr = []
                if (this.shangyePrice !== undefined) {
                    arr.push(this.shangyePrice)
                }
                if (this.jiaoqiangPrice !== undefined) {
                    arr.push(this.jiaoqiangPrice)
                }
                if (this.chechuanPrice !== undefined) {
                    arr.push(this.chechuanPrice)
                }
                let arrTotal = 0
                for (let i = 0; i < arr.length; i++) {
                    arrTotal = Number(arr[i]) + arrTotal
                }
                this.totalPayPrice = arrTotal.toFixed(2)
                console.log(arrTotal)
                if (res.data.preUndwrtResult === '3') {
                    this.des = ''
                } else {
                    this.des = res.data.preUndwrtDesc
                }
            },
            _caculatePrime () {
                    this.loadingShow = true
                    let params = this.duCarPremium
                    let other = params.kinds
                    let kinds = []
                    for (let i = 0; i < other.length; i++) {
                        if (other[i].amount !== '不投保') {
                           kinds.push(other[i])
                        }
                    }
                    let policys = params.policy
                    let kindss = kinds
                    let carShipTax = params.carShipTax
                    let data = {
                        kinds: kindss,
                        policy: policys,
                        carShipTax: carShipTax
                    }
                    console.log(data)
                    calculationPremium(data).then(res => {
                        if (res.ret === RET_OK) {
                            this.loadingShow = false
                            if (res.data.code === CODE_OK) {
                                this.defaultValue(res)
                            } else if (res.data.code === '100002') {
                                // this.loadingShow = false
                                this.showConfirm(res.msg)
                            } else if (res.data.code === '100001') {
                                this.checkCodeStatus = true
                                if (res.data.checkCodeBi) {
                                    this.SyExit = true
                                    this.imageCodeSrcSy = 'data:image/png;base64,' + res.data.checkCodeBi
                                } else {
                                    this.SyExit = false
                                }
                                if (res.data.checkCodeCi) {
                                    this.JqExit = true
                                    this.imageCodeSrcJq = 'data:image/png;base64,' + res.data.checkCodeCi
                                } else {
                                    this.JqExit = false
                                }
                            }
                        } else {
                            this.loadingShow = false
                            this.showConfirm(res.msg)
                        }
                    })
            },
            setPolicyForm (res) {
                this.setDuCarPremiumForm({
                    field1: 'sumBenchMarkPremium',
                    value: res.data.sumBenchMarkPremium
                })
                this.setDuCarPremiumForm({
                    field1: 'sumPremium',
                    value: res.data.sumPremium
                })
                this.setDuCarPremiumForm({
                    field1: 'disCount',
                    value: res.data.disCount
                })
                this.setDuCarPremiumForm({
                    field1: 'standardPremium',
                    value: res.data.standardPremium
                })
                this.setDuCarPremiumForm({
                    field1: 'sumTax',
                    value: res.data.sumTax
                })
                if (res.data.preUndwrtResult === '3') {
                    this.des = ''
                } else {
                    this.des = res.data.preUndwrtDesc
                }
            },
            confirmBtn () {
                let checkCodeBi = this.imageCodeSy
                let checkCodeCi = this.imageCodeJq
                checkPremium(checkCodeBi, checkCodeCi).then(res => {
                    console.log(res)
                    if (res.ret === RET_OK) {
                        if (res.data.code === CODE_OK) {
                            this.defaultValue(res)
                        } else if (res.data.code === '100002') {
                            this.checkCodeStatus = false
                            this.showConfirm(res.msg)
                        }
                    }
                })
            },
            cancel () {
                this.checkCodeStatus = false
            },
            _next () {
                if (this.des === '') {
                   this.loadingShow = true
                    let params = {
                        insured: this.duCarTouBeiBaoRen.insured,
                        applicant: this.duCarTouBeiBaoRen.applicant,
                        payPhone: this.duCarTouBeiBaoRen.payPhone
                    }
                    order(params).then(res => {
                    console.log(res)
                        if (res.ret === RET_OK) {
                            if (res.data.code === CODE_OK) {
                                this.loadingShow = false
                                this.setOrderPass({
                                    field1: 'carPolicyId',
                                    value: res.data.carPolicyId
                                })
                                this.setOrderPass({
                                    field1: 'proposalNoCi',
                                    value: res.data.proposalNoCi
                                })
                                this.setOrderPass({
                                    field1: 'proposalNoBi',
                                    value: res.data.proposalNoBi
                                })
                                this.$router.push({
                                    name: 'dusuccess_pay'
                                })
                            } else {
                                this.loadingShow = false
                                this.urlparam = '100003'
                                this.showConfirm(res.msg)
                            }
                        }
                    })
                } else {
                   this.showConfirm(this.des)
                }
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
    .priceForm
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
    	.content
    		padding: 0 (30/$scale)
    		font-size: (30/$scale)
    		.insurance
    			.insuranceTitle
    				background: #FFEFEF
    				height: (100/$scale)
    				line-height: (100/$scale)
    				margin: 0 (-30/$scale)
    				padding: 0 (30/$scale)
    				.insuranceTitleA
    					float: left
    					display: inline-block
    					height: 100%
    					&:nth-child(1)
    						width: (265/$scale)
    					&:nth-child(2)
    						width: (285/$scale)
    			.insuranceDetailWarp
	    			.insuranceDetail
	    				height: (100/$scale)
	    				line-height: (100/$scale)
	    				overflow: hidden
	    				font-size: (28/$scale)
	    				.insuranceDetailA
	    					float: left
	    					display: inline-block
	    					height: 100%
	    					&:nth-child(1)
	    						width: (265/$scale)
	    					&:nth-child(2)
	    						width: (285/$scale)
				.totalPayPrice
					text-align: right
					margin-bottom: (120/$scale)
					.insuranceTitleA
						color: red
</style>