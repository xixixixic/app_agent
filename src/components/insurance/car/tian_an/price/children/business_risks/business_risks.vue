<template>
	<div class="insuranceWarp">
		<div class="insuranceTitle">
			<a href="javascript:void(0)" class="insuranceTitleA">险种名称</a>
			<a href="javascript:void(0)" class="insuranceTitleA">保额(元)</a>
			<a href="javascript:void(0)" class="insuranceTitleA">是否投保不计免赔</a>
		</div>
		<jidongche ref='jidongche'></jidongche>
		<chesunjuedui ref='chesunjuedui'></chesunjuedui>
		<disanzhe ref='disanzhe'></disanzhe>
		<siji ref='siji'></siji>
		<chenke ref='chenke'></chenke>
		<jidongchedaoqiang ref='jidongchedaoqiang'></jidongchedaoqiang>
		<cheshenhuaheng ref='cheshenhuaheng'></cheshenhuaheng>
		<ziran ref='ziran'></ziran>
		<boli ref='boli'></boli>
		<fadongji ref='fadongji'></fadongji>
		<wufazhaodao ref='wufazhaodao'></wufazhaodao>
		<xiulichang ref='xiulichang'></xiulichang>
		<xinzengshebei ref='xinzengshebei'></xinzengshebei>
		<jingshensunhai ref='jingshensunhai'></jingshensunhai>
		<discount></discount>
		<!-- <caculate-premium ref='caculate' @loading="loading"></caculate-premium> -->
	</div>
</template>

<script>
    import chesunjuedui from 'components/insurance/car/tian_an/price/children/chesunjuedui/chesunjuedui'
    import disanzhe from 'components/insurance/car/tian_an/price/children/disanzhe/disanzhe'
    import siji from 'components/insurance/car/tian_an/price/children/siji/siji'
    import chenke from 'components/insurance/car/tian_an/price/children/chenke/chenke'
    import jidongchedaoqiang from 'components/insurance/car/tian_an/price/children/jidongchedaoqiang/jidongchedaoqiang'
    import boli from 'components/insurance/car/tian_an/price/children/boli/boli'
    import cheshenhuaheng from 'components/insurance/car/tian_an/price/children/cheshenhuaheng/cheshenhuaheng'
    import xiulichang from 'components/insurance/car/tian_an/price/children/xiulichang/xiulichang'
    import jidongche from 'components/insurance/car/tian_an/price/children/jidongche/jidongche'
    import fadongji from 'components/insurance/car/tian_an/price/children/fadongji/fadongji'
    import ziran from 'components/insurance/car/tian_an/price/children/ziran/ziran'
    import wufazhaodao from 'components/insurance/car/tian_an/price/children/wufazhaodao/wufazhaodao'
    import xinzengshebei from 'components/insurance/car/tian_an/price/children/xinzengshebei/xinzengshebei'
    import jingshensunhai from 'components/insurance/car/tian_an/price/children/jingshensunhai/jingshensunhai'
    import discount from 'components/insurance/car/tian_an/price/children/discount/discount'
    export default {
        data () {
            return {
                loadingShow: ''
            }
        },
        components: {
            chesunjuedui,
            disanzhe,
            siji,
            chenke,
            jidongchedaoqiang,
            boli,
            cheshenhuaheng,
            xiulichang,
            jidongche,
            fadongji,
            ziran,
            wufazhaodao,
            xinzengshebei,
            jingshensunhai,
            discount
        }
    }
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
.insuranceWarp
	/*padding: 0 (30/$scale)*/
	.insuranceTitle
		height: (100/$scale)
		line-height: (100/$scale)
		background: #F0F0F0
		font-size: (28/$scale)
		padding: 0 (30/$scale)
		display: flex
		.insuranceTitleA
			font-size: (28/$scale)
			height: 100%
			color: #222
			display: inline-block
			text-decoration: none
			&:nth-child(1)
				width: (240/$scale)
			&:nth-child(2)
				width: (280/$scale)
			&:nth-child(3)
				width: (120/$scale)
				line-height: (40/$scale)
				padding-top: (8/$scale)
</style>