<template>
	<div class="warpTab">
		<div class="case">
			<p class="carInfotitle">案例演示</p>
			<p class="caseDetail">
				王先生今年为家里购买了一辆价值40万元奥迪A6新车，并投保了天安车险，在保险期间内的一天，为了避让前方横穿马路的车辆，撞在了路边的电线杆上，造成前保险杠、右前灯损坏和一定程度的划痕，幸好车上人员无大碍。发生事故后，王先生赶紧拨打天安客服电话95505进行报案，天安的客服人员安排到最近的修理厂进行维修，最终修车费用为3万元。由于王先生为新车购买了车损险及车损不计免赔，因此可以免除修车费用的负担。
			</p>
		</div>
	</div>
</template>

<script>
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
.warpTab
	.case
		line-height: (40/$scale)
		.carInfotitle
			margin: (30/$scale) 0
			color: #222
			font-size: (28/$scale)
		.caseDetail
			color: #666
			text-indent: (32/$scale)
			font-size: (14/$scale)
</style>