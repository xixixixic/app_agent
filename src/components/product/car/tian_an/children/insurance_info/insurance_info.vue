<template>
	<div class="warpTab" style="display: block;">
		<div class="feature">
			<div class="item">
				<p class="carInfotitle">产品特点</p>
				<div class="desc-box">
					<p class="descP"><span>1、</span><span>范围广：2至85周岁。</span></p>
					<p class="descP"><span>2、</span><span>保障全：境内旅行途中、意外身故、残疾/公共交通工具意外、意外医疗、疾病医疗、旅行取消、旅行延误、个人财产损失等等一系列。</span></p>
					<p class="descP"><span>3、</span><span>投保便：网络投保，方便快捷。</span></p>
				</div>
			</div>
		</div>
		<div class="buyProcess">
			<p class="carInfotitle">购买流程</p>
			<div class="processWarp">
				<div class="process">
					<p class="processP info"></p>
					<a href="" class="processA">填写信息</a>
				</div>
				<div class="process">
					<p class="processP price"></p>
					<a href="" class="processA">精准报价</a>
				</div>
				<div class="process">
					<p class="processP pay"></p>
					<a href="" class="processA">保单支付</a>
				</div>
				<div class="process">
					<p class="processP check"></p>
					<a href="" class="processA">查收保单</a>
				</div>
			</div>
		</div>
		<div class="commomProblem">
		<p class="carInfotitle">常见问题</p>
		<div class="problem">
			<p class="question">
				1.投保完成后如何拿到车险保单？送单是免费的吗？
			</p>
			<p class="answer">
				您在网上投保成功后，我们的客服人员将在48小时内与您联系，由当地的分公司免费送单上门
			</p>
		</div>
		<div class="problem">
			<p class="question">
				2.网上可以提前多长时间购买车险？
			</p>
			<p class="answer">
				具体提前购买的时间和投保地区相关，全国大部分地区支持提前90天购买
			</p>
		</div>
		<div class="problem">
			<p class="question">
				3.哪些车辆可在网上投保？
			</p>
			<p class="answer">
				目前网上支持9座以下的（含9座）个人非营业客车（即家庭自用车）报价及投保
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
.warp
	padding: 0 (30/$scale) (110/$scale) (30/$scale)
	.warpTab
		.feature
			.item
				.carInfotitle
					font-size: (28/$scale)
					margin: (30/$scale) 0
					color: #222
				.desc-box
					margin-top: (10/$scale)
					line-height: (40/$scale)
					font-size: (24/$scale)
					color: #666
					.descP
						display: flex
		.buyProcess
			width: 100%
			font-size: (28/$scale)
			.carInfotitle
				font-size: (28/$scale)
				margin: (30/$scale) 0
				color: #222
			.processWarp
				display:flex
				justify-content: space-around
				.process
					.processA
						font-size: (28/$scale)
						color: #666
					.processP
						width: (102/$scale)
						height: (106/$scale)
						background-size: @width @height
						background-repeat: no-repeat
						background-position: center center
						padding: 0
						margin-bottom: (22/$scale)
						&.info
							bg-image('info')
						&.price
							bg-image('price')
						&.check
							bg-image('check')
						&.pay
							bg-image('pay')
		.commomProblem
			.carInfotitle
				font-size: (28/$scale)
				margin: (30/$scale) 0
			.problem
				font-size: (28/$scale)
				line-height: (40/$scale)
				.question
					color: #333
				.answer
					color: #666
					padding: 0 (20/$scale)
					margin-bottom: (30/$scale)
</style>