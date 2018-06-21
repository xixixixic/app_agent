<template>
	<div class="warpTab">
		<div class="claimsGuide">
			<p class="carInfotitle">理赔指南</p>
			<div class="guideDetail">
				<p class="guideP">
					<span class="guideIco"></span>
					<a href="javascript:void(0)" class="guideA">1、设立365天无休日，24小时报案、咨询受理电话95586</a>
				</p>
				<p class="guideP">
					<span class="guideIco"></span>
					<a href="javascript:void(0)" class="guideA">2、享有专属绿色理赔通道，专人一站式负责制</a>
				</p>
				<p class="guideP">
					<span class="guideIco"></span>
					<a href="javascript:void(0)" class="guideA">3 、单方事故或双方事故无人伤案件，经我司第一现场查勘确认，总损失金额3000元以下，可免事故证明、修理发票。因特殊原因客户急需离开或已经离开事故现场，可自行用相机或拍照手机对现场及车辆损失部位拍照，回到承保公司后核定车辆损失，凭被保险人单位事故证明索赔，我司将于24小时内结案。</a>
				</p>
				<p class="guideP">
					<span class="guideIco"></span>
					<a href="javascript:void(0)" class="guideA">4、异地出险，可在查勘员指导下由驾驶员自行拍照（可通过都邦车险移动视频查勘平台）或委托4S店、修理厂代查勘。</a>
				</p>
				<p class="guideP">
					<span class="guideIco"></span>
					<a href="javascript:void(0)" class="guideA">5、全国通赔，可异地支付</a>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
@import '~common/stylus/mixin.styl'
.warpTab
	.claimsGuide
		line-height: (40/$scale)
		.carInfotitle
			margin: (30/$scale) 0
			color: #222
			font-size: (28/$scale)
		.guideDetail
			.guideP
				display: flex
				align-items: center
				margin-top: (30/$scale)
				.guideIco
					display: inline-block
					width: (100/$scale)
					height: (60/$scale)
					background-size: contain
					background-repeat: no-repeat
					bg-image('check')
				.guideA
					font-size: (24/$scale)
					color: #666
					display: inline-block
					width: (600/$scale)
</style>