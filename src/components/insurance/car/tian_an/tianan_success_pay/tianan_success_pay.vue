<template>
	<div class="successPay">
		<loading v-if='loadingShow'></loading>
		<div v-if='!loadingShow'>
			<div class="resultPic">
				<span class="pic"></span>
				<p class="picDes">恭喜您投保成功！</p>
			</div>
			<split></split>
			<div class="orderInfo">
				<p class="infoDetail" v-if='this.policy_no !== null'>保单号：{{policy_no}}</p>
				<p class="infoDetail" v-if='this.order_no !== null'>订单号：{{order_no}} </p>
				<p class="infoDetail" v-if="this.policy_no_ci !== null || this.policy_no_ci !== ''">交强险保单号：{{policy_no_ci}}</p>
				<p class="infoDetail" v-if="this.policy_no_bi !== null || this.policy_no_bi !== ''">商业险保单号：{{policy_no_bi}}</p>
			</div>
			<div class="download">
				<input type="button" value="返回首页" class="downloadBtn" @click='backToIndex'/>
			</div>
		</div>
	</div>	
</template>

<script>
import Split from 'base/split/split'
import {successPay} from 'api/car/tian-an/insurance.js'
import {RET_OK} from 'service/variable.js'
import {indexUrl} from 'service/index.js'
import Loading from 'base/loading/loading'
export default {
    data () {
        return {
            policy_no: '', // 保单号
            policy_no_ci: '', // 交强险保单号
            order_no: '', // 订单号
            policy_no_bi: '', // 商业险保单号
			orderNoValue: '',
			loadingShow: false
        }
    },
    created () {
        console.log(this.$route.params.orderNo)
        console.log('this.$route.params.orderNo')
        this.orderNo()
        this._policyUnderWrite()
    },
    methods: {
        orderNo () {
            this.orderNoValue = this.$route.params.orderNo
        },
        _policyUnderWrite () {
			let orderNos = this.orderNoValue
			this.loadingShow = true
            successPay(orderNos).then(res => {
                console.log(res)
                console.log(res.data)
                console.log(res.data.policy_no_ci)
                if (res.ret === RET_OK) {
					this.loadingShow = false
                    this.policy_no = res.data.policy_no
                    this.policy_no_ci = res.data.policy_no_ci
                    this.order_no = res.data.order_no
                    this.policy_no_bi = res.data.policy_no_bi
                }
            })
        },
        backToIndex () {
            location.href = indexUrl
        }
    },
    components: {
		Split,
		Loading
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