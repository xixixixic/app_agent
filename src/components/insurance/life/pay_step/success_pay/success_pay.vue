<template>
	<div class="successPay">
		<div class="resultPic">
			<span class="pic"></span>
			<p class="picDes">{{text}}</p>
		</div>
		<split></split>
		<div class="orderInfo" v-show='orderStatus'>
			<p class="infoDetail">投保人： {{name}}</p>
			<p class="infoDetail">产品名称：{{productName}} </p>
			<p class="infoDetail">保单号码： {{policyNum}}</p>
			<p class="infoDetail">生效时间： {{effectDate}}</p>
		</div>
		<div class="download" @click="watchMyPolicy" v-show='this.webStatus'>
			<input type="button" value="返回首页" class="downloadBtn"/>
		</div>
		<div class="download" @click="closeMyPolicy" v-show='!this.webStatus'>
			<input type="button" value="关闭页面" class="downloadBtn"/>
		</div>
	</div>	
</template>

<script>
import Split from 'base/split/split'
import {underWrite} from 'api/life/insurance.js'
import {CODE_OK} from 'service/variable.js'
import {mapGetters, mapMutations} from 'vuex'
export default {
    data () {
        return {
            id: '',
            name: '',
            productName: '',
            policyNum: '',
            effectDate: '',
			policyId: '',
			text: '',
			orderStatus: false,
			tokenA: this.token
        }
	},
	computed: {
		...mapGetters([
                'webStatus', 'lifeInsuranceRules', 'token'
            ])
	},
    created () {
        this._policyUnderWrite()
	},
	mounted () {
		// 添加返回事件监听
		if (this.webStatus === false) {
			console.log('客户支付成功返回监听')
			console.log(this.lifeInsuranceRules)
			window.addEventListener('popstate', function (e) {
			let host = window.location.host
			if (host === 'www.jimuwang.com.cn') {
				location.href = 'http://www.jimuwang.com.cn/wx_agent/#/client-success'
			} else if (host === 'test.kakabx.com') {
				location.href = 'http://test.kakabx.com/agent_insurance/#/client-success'
			} else {
				location.href = 'http://localhost:8019/#/client-success'
			}
			}, false)
		} else {
			console.log('代理人支付成功返回监听')
			return false
		}
	},
	watch: {
		isShowTestDiv: function (newVal, oldVal) {
			if (newVal === true) {
				this.pushHistory()
			}
		}
	},
    methods: {
        _policyUnderWrite () {
            let value = ''
            let href = window.location.href
            let wenhao = href.indexOf('?')
            href = href.substr(wenhao + 1)
            let arr = href.split('&')
            for (let i = 0; i < arr.length; i++) {
                wenhao = arr[0].indexOf('=')
                value = arr[0].substr(wenhao + 1)
            }
            underWrite(value).then(res => {
                if (res.data.code === CODE_OK) {
					this.text = '恭喜您投保成功！'
					this.orderStatus = true
                    let result = res.data.result
                    this.name = result.appNme
                    this.productName = result.productName
                    this.policyNum = result.policyNum
                    this.effectDate = result.effectDate
                } else {
					this.orderStatus = false
					this.text = '投保失败'
				}
            })
		},
		watchMyPolicy () {
			let host = window.location.host
			if (host === 'www.jimuwang.com.cn') {
				location.href = 'http://agent.jimuwang.com.cn/wx_agent/#/index'
			} else if (host === 'test.kakabx.com') {
				location.href = 'http://test.kakabx.com/wx_agent/#/index'
			} else {
				location.href = 'http://localhost:8077/#/index'
			}
		},
		closeMyPolicy () {
			// WeixinJSBridge.call('closeWindow')
		},
		pushHistory () { // 修改history
			var state = {
				title: '',
				url: '/' // 这个url可以随便填，只是为了不让浏览器显示的url地址发生变化，对页面其实无影响
			}
		window.history.pushState(state, state.title, state.url)
		},
		...mapMutations({
                SET_WEBSTATUS: 'SET_WEBSTATUS'
            })
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
		.download
			width: 100%
			text-align: center
			.downloadBtn
				font-size: (34/$scale)
				width: (640/$scale)
				height: (80/$scale)
				margin-top: (58/$scale)
				color: #fff
				background: linear-gradient(to right, #ff7049, #ff4456)
				border-radius: (20/$scale)
</style>