<template>
	<div class="successPay">
		<div class="resultWarp">
			<div class="resultPic">
				<span class="pic"></span>
				<p class="picDes">恭喜您投保单已审核通过</p>
			</div>
			<div class="orderInfo">
				<p class="infoDetail" v-if='this.mainInsurance'>主投保单号： {{mainInsurance}}</p>
				<p class="infoDetail" v-if='this.jiaoqiang'>交强单投保单号： {{jiaoqiang}}</p>
				<p class="infoDetail" v-if='this.shangye'>商业险投保单号：{{shangye}} </p>
			</div>
		</div>
		<div class="pay">
			<input type="button" value="网银支付" class="payBtn" @click="_tianCarPay"/>
		</div>
	</div>	
</template>

<script>
	import Split from 'base/split/split'
	import {tianAn} from 'api/car/tian-an/pay.js'
	import {mapGetters, mapMutations} from 'vuex'
	export default {
        data () {
            return {
               jiaoqiang: '',
               shangye: '',
               mainInsurance: '',
               id: ''
            }
		},
		mounted () {
			// 添加返回事件监听
			window.addEventListener('popstate', function (e) {
			console.log('uuuu')
			let host = window.location.host
			if (host === 'www.jimuwang.com.cn') {
				window.location.href = 'http://www.jimuwang.com.cn/wx_agent/#/index'
			} else if (host === 'test.kakabx.com') {
			window.location.href = 'http://test.kakabx.com/wx_agent/#/index'
			} else {
				window.location.href = 'http://localhost:8077/#/index'
			}
			}, false)
		},
		watch: {
			isShowTestDiv: function (newVal, oldVal) {
			if (newVal === true) {
				this.pushHistory()
			}
			}
		},
        created () {
            this.order()
            console.log(this.tianCarOrder)
            console.log('ggg')
        },
        computed: {
            ...mapGetters([
                'tianCarOrder'
            ])
        },
        methods: {
            ...mapMutations({
                setTianOrder: 'SET_CAR_TIANAN_ORDERPASS'
            }),
            _tianCarPay () {
               tianAn(this.tianCarOrder.carPolicyId)
            },
            order () {
                this.jiaoqiang = this.tianCarOrder.busProposalNo
                this.shangye = this.tianCarOrder.bzProposalNo
                this.mainInsurance = this.tianCarOrder.proposalNo
			},
			pushHistory () { // 修改history
				var state = {
					title: '',
					url: '/' // 这个url可以随便填，只是为了不让浏览器显示的url地址发生变化，对页面其实无影响
				}
			window.history.pushState(state, state.title, state.url)
			}
        },
        components: {
            Split
        }
	}
</script>

<style lang="stylus" scoped>
	@import '~common/stylus/variable.styl'
	@import '~common/stylus/mixin.styl'
	.successPay
		.resultWarp
			width: (710/$scale)
			background: #fff
			margin: (20/$scale) auto 0 auto
			.resultPic
				line-height: (100/$scale)
				height: (100/$scale)
				display: flex
				align-items: center
				border-bottom: 1px solid #e5e5e5
				margin: 0 (30/$scale)
			    .pic
					width: (28/$scale)
					height: (28/$scale)
					background-size: @width @height
					background-repeat: no-repeat
					background-position: center center
					bg-image('yes')
					margin-left: (20/$scale)
				.picDes
					font-size: (30/$scale)
					color: #222
					margin-left: (10/$scale)
					font-family: '微软雅黑'
					font-weight: 500
			.orderInfo
				padding-left: (30/$scale)
				.infoDetail
					font-size: (30/$scale)
					color: #333
					margin-top: (26/$scale)
					&:nth-child(3)
						padding-bottom: (36/$scale)
		.pay
			width: 100%
			text-align: center
			.payBtn
				font-size: (34/$scale)
				width: (640/$scale)
				height: (80/$scale)
				margin-top: (58/$scale)
				color: #fff
				background: linear-gradient(to right, #ff7049, #ff4456)
				border-radius: (20/$scale)
</style>