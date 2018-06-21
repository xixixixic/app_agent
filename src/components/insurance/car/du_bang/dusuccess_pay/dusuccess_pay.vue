<template>
	<div class="successPay">
		<loading v-if='loadingShow'></loading>
		<div v-if='!loadingShow'>
			<div class="resultPic">
				<span class="pic"></span>
				<p class="picDes">恭喜您投保单已审核通过！</p>
			</div>
			<split></split>
			<div class="orderInfo">
				<p class="infoDetail" v-if="this.jiaoqiang !== ''">交强单投保单号： {{jiaoqiang}}</p>
				<p class="infoDetail" v-if="this.shangye !== ''">商业险投保单号：{{shangye}} </p>
			</div>
			<div class="pay">
				<input type="button" value="网银支付" class="payBtn" @click="_duCarPay" v-if='!unbtn'/>
				<input type="button" value="网银支付" class="unpayBtn" :disabled='disabled' v-if='unbtn'/>
			</div>
		</div>
		<confirm  ref="confirm" :text="confirmText"></confirm>
	</div>	
</template>

<script>
	import Split from 'base/split/split'
	import {dubang} from 'api/car/du-bang/pay.js'
	import {mapGetters} from 'vuex'
	// import {order} from 'api/car/du-bang/insurance.js'
	// import {RET_OK, CODE_OK} from 'service/variable.js'
	import Loading from 'base/loading/loading'
	import Confirm from 'base/confirm/confirm'
    import {confirm} from 'common/js/mixin.js'
	export default {
		mixins: [confirm],
        data () {
            return {
				jiaoqiang: '',
				shangye: '',
				id: '',
				loadingShow: false,
				successWord: '',
				picShow: false,
				unbtn: false
            }
		},
		mounted () {
			// 添加返回事件监听
			window.addEventListener('popstate', function (e) {
			let host = window.location.host
			if (host === 'www.jimuwang.com.cn') {
				location.href = 'http://www.jimuwang.com.cn/wx_agent/#/index'
			} else if (host === 'test.kakabx.com') {
				location.href = 'http://test.kakabx.com/wx_agent/#/index'
			} else {
				location.href = 'http://localhost:8077/#/index'
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
			this.queryDownload()
		},
        computed: {
           ...mapGetters([
               'duCarOrder', 'duCarTouBeiBaoRen'
          ])
        },
        methods: {
            _duCarPay () {
               dubang(this.id)
            },
			queryDownload () {
                this.jiaoqiang = this.duCarOrder.proposalNoCi
                this.shangye = this.duCarOrder.proposalNoBi
                this.id = this.duCarOrder.carPolicyId
            },
			pushTo () {
				this.$router.push({
					name: 'du_price'
				})
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
			Split,
			Loading,
			Confirm
        }
	}
</script>

<style lang="stylus" scoped>
	@import '~common/stylus/variable.styl'
	@import '~common/stylus/mixin.styl'
	.successPay
		.resultPic
			line-height: (260/$scale)
			display: flex
			align-items: center
			justify-content: center
		    .pic
				display: inline-block
				width: (115/$scale)
				height: (116/$scale)
				background-size: @width @height
				background-repeat: no-repeat
				background-position: center center
				bg-image('success')
			.picDes
				font-size: (36/$scale)
				color: #04B95D
				margin-left: (30/$scale)
				font-family: '微软雅黑'
				font-weight: 500
		.orderInfo
			padding: 0 (60/$scale)
			.infoDetail
				font-size: (30/$scale)
				color: #333
				margin-top: (26/$scale)
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
			.unpayBtn
				font-size: (34/$scale)
				width: (640/$scale)
				height: (80/$scale)
				margin-top: (58/$scale)
				color: #fff
				background: #bbb
				border-radius: (20/$scale)
</style>