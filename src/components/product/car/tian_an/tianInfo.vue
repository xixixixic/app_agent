<template>
	<div class="info">
		<div class="main-info">
			<div class="img-box">
				<img class="img" src="./tiananBig.png"/>
			</div>
			<div class="information">
				<div class="box">
					<div class="name">天安机动车辆保险</div>
					<div class="logo"><img src="./tianan.jpg" class="img" /></div>
				</div>
			</div>
			<div class="service">
	            <div class="item"><i class="icon-check"></i>保监会认证</div>
	            <div class="item"><i class="icon-check"></i>保险公司授权</div>
	            <div class="item"><i class="icon-check"></i>专业服务团队</div>
       		</div>
			<split></split>
		</div>
		<div class="tab">
			<li :class="Ind === index ? 'active' : 'tabItem'" v-for='(item, index) in list' @click="changeTab(index)">{{item.name}}</li>
		</div>
		<div class="warp">
			<insurance-info v-if='InsuranceInfoStatus'></insurance-info>
			<ducase v-if='ducaseStatus'></ducase>
			<claims-guide v-if='ClaimsGuideStatus'></claims-guide>
		</div>
		<info-footer text="下一步" @next='next'></info-footer>
	</div>
</template>

<script>
	import InfoFooter from 'base/footer/footer'
	import InsuranceInfo from 'components/product/car/tian_an/children/insurance_info/insurance_info'
	import ducase from 'components/product/car/tian_an/children/case/case'
	import ClaimsGuide from 'components/product/car/tian_an/children/claims_guide/claims_guide'
	import {mapMutations} from 'vuex'
	import Split from 'base/split/split'
	export default {
        data () {
            return {
                list: [
                    {name: '投保须知'},
                    {name: '案例演示'},
                    {name: '理赔指南'}
                ],
                Ind: 0,
                InsuranceInfoStatus: true,
                ducaseStatus: false,
                ClaimsGuideStatus: false
            }
        },
        created () {
			this.setToken(this.$route.params.token)
			console.log(this.$route.params.token)
			console.log('9988')
		},
		// mounted () {
        //     function onBridgeReady () {
        //         WeixinJSBridge.call('hideOptionMenu')
        //     }
        //     if (typeof WeixinJSBridge === 'undefined') {
        //         if (document.addEventListener) {
        //             document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
        //         } else if (document.attachEvent) {
        //             document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
        //             document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
        //         }
        //     } else {
        //         onBridgeReady()
        //     }
        // },
        methods: {
            changeTab (index) {
                this.Ind = index
                if (index === 0) {
                    this.InsuranceInfoStatus = true
                    this.ducaseStatus = false
                    this.ClaimsGuideStatus = false
                } else if (index === 1) {
                    this.InsuranceInfoStatus = false
                    this.ducaseStatus = true
                    this.ClaimsGuideStatus = false
                } else if (index === 2) {
                    this.InsuranceInfoStatus = false
                    this.ducaseStatus = false
                    this.ClaimsGuideStatus = true
                }
            },
            next () {
                this.$router.push({
                    name: 'tianCar_info'
                })
            },
            ...mapMutations({
                 setToken: 'SET_TOKEN'
            })
        },
        components: {
            InfoFooter,
            InsuranceInfo,
            ducase,
			ClaimsGuide,
			Split
        }
	}
</script>

<style lang="stylus" scoped>
    @import '~common/stylus/variable.styl'
    @import '~common/stylus/mixin.styl'
    .info
        background: #fff
        .main-info
        	.img-box
        		width: 100%
        		height: (350/$scale)
        		background: #cccccc
        		.img
        			width: 100%
        			height: 100%
        	.information
        		padding : (30/$scale)
        		width : 100%
        		box-sizing : border-box
        		background : $color-background-main
        		.box
        			display : flex
        			align-items: center;
        			.name
        				flex: 1
        				margin-right : (102/$scale)
        				font-size: (32/$scale)
        				color : $color-main
        			.logo
        				width : (220/$scale)
        				height : (70/$scale)
        				line-height : 0
        				.img
        					display : block
        					width : 100%
        					height : 100%
        	.service
        		display : flex
        		justify-content: space-around
        		width : 100%
        		height : (74/$scale)
        		line-height : (74/$scale)
        		font-size : (28/$scale)
        		color : #555555
        		background: #FAFAFA
        		.item
        			.icon-check
        				color: red
    				    margin-right: 0.1rem
    				    font-weight: bold
        .tab
        	margin: 0 0.3rem
        	display: flex
        	height: 0.9rem
        	position: relative
        	border-bottom: 1px solid #E6E6E6
        	.tabItem
        		flex: 1
        		margin: 0.29rem 0
        		font-size: 0.3rem
        		text-align: center
        		border-right: 0.02rem solid #999
        		color: #222
        	.tabItem:nth-child(3)
        		border-right: none!important
        	.active
        		color: red
        		font-size: 0.3rem
        		flex: 1
        		margin: 0.29rem 0
        		text-align: center
        		border-right: 0.02rem solid #999
        	.active:nth-child(3)
        		border-right: none!important
		.warp
			padding: 0 (30/$scale) (110/$scale) (30/$scale)	
</style>