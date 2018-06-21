<template>
	<div class="appointment">
		<split></split>
		<div class="carInfo">
			<p class="detailTitle">车辆信息</p>
			<div class="detail">
				<div class="info">
					<p class="desTitle">车辆所在地</p>
					<p class="placeholders">
						<span class="choose">请选择<i class="arr">></i></span>
					</p>
				</div>
				<div class="errTip"></div>
			</div>
			<div class="detail">
				<div class="info">
					<p class="desTitle">品牌型号</p>
					<p class="placeholders">
						<input type="text" placeholder="请填写品牌型号" class="placeholdersInput"/>
					</p>
				</div>
				<div class="errTip"></div>
			</div>
			<div class="detail">
				<div class="info">
					<p class="desTitle">车架号</p>
					<p class="placeholders">
						<input type="text" placeholder="请填写车架号" class="placeholdersInput"/>
					</p>
				</div>
				<div class="errTip"></div>
			</div>
			<div class="detail">
				<div class="info">
					<p class="desTitle">发动机号</p>
					<p class="placeholders">
						<input type="text" placeholder="请填写发动机号" class="placeholdersInput"/>
					</p>
				</div>
				<div class="errTip"></div>
			</div>
			<div class="detail">
				<div class="info">
					<p class="desTitle">购置日期</p>
					<p class="placeholders">
						<span class="choose">请选择购置日期<i class="arr">></i></span>
					</p>
				</div>
				<div class="errTip"></div>
			</div>
			<div class="detail">
				<div class="info">
					<p class="desTitle">注册日期</p>
					<p class="placeholders">
						<span class="choose">请选择注册日期<i class="arr">></i></span>
					</p>
				</div>
				<div class="errTip"></div>
			</div>
			<div class="detail">
				<div class="info">
					<p class="desTitle">车险起保日期</p>
					<p class="placeholders">
						<span class="choose">请选择车险起保日期<i class="arr">></i></span>
					</p>
				</div>
				<div class="errTip"></div>
			</div>
		</div>
		<p class="detailTitle">车主信息</p>
		<div class="detail">
			<div class="info">
				<p class="desTitle">车主姓名</p>
				<p class="placeholders">
					<input type="text" placeholder="请填写车主姓名" class="placeholdersInput"/>
				</p>
			</div>
			<div class="errTip"></div>
		</div>
		<div class="detail">
			<div class="info">
				<p class="desTitle">手机号码</p>
				<p class="placeholders">
					<input type="text" placeholder="请填写手机号码" class="placeholdersInput"/>
				</p>
			</div>
			<div class="errTip"></div>
		</div>
		<split></split>
		<info-footer text="立即预约" ></info-footer>
	</div>
</template>

<script>
	import InfoFooter from 'base/footer/footer'
	import Split from 'base/split/split'
	export default {
        data () {
            return {}
        },
        components: {
            Split,
            InfoFooter
        }
	}
</script>

<style lang="stylus" scoped>
	@import '~common/stylus/variable.styl'
	.appointment
		padding: 0 (30/$scale)
		.detailTitle
			font-size: (32/$scale)
			line-height: (100/$scale)
			color: #FF4456
			border-bottom: 1px solid #FF4456
			margin: 0 (-30/$scale)
			padding: 0 (30/$scale)
		.detail
			width: 100%
			.info
				font-size: (28/$scale)
				display: flex
				justify-content: space-between
				line-height: (100/$scale)
				border-bottom: 1px solid #E6E6E6
				.desTitle
					color: #444
				.placeholders
					color: #BBB
					.placeholdersInput
						text-align: right
</style>