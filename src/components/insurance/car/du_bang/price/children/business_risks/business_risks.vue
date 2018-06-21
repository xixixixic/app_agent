<template>
	<div class="insuranceWarp">
		<div class="insuranceTitle">
			<a href="javascript:void(0)" class="insuranceTitleA">险种名称</a>
			<a href="javascript:void(0)" class="insuranceTitleA">保额(元)</a>
			<a href="javascript:void(0)" class="insuranceTitleA">是否投保不计免赔</a>
		</div>
		<baoxianbiao ref='baoxianbiao' :bxbStatus='bxbStatus' @changebxbStatus='changebxbStatus($event)'></baoxianbiao>
		<disanzhe ref='disanzhe'></disanzhe>
		<jiashiyuan ref='jiashiyuan'></jiashiyuan>
		<cheshangchenke ref='cheshangchenke'></cheshangchenke>
		<quanchedaoqiang ref='quanchedaoqiang'></quanchedaoqiang>
		<boli ref='boli'></boli>
		<cheshenhuaheng ref='cheshenhuaheng'></cheshenhuaheng>
		<xiulichang ref='xiulichang'></xiulichang>
		<jingshensunhai ref='jingshensunhai'></jingshensunhai>
		<jidongche ref='jidongche'></jidongche>
		<xiuliqijian ref='xiuliqijian'></xiuliqijian>
		<fadongji ref='fadongji'></fadongji>
		<ziran ref='ziran'></ziran>
	</div>
</template>

<script>
    import baoxianbiao from 'components/insurance/car/du_bang/price/children/baoxianbiao/baoxianbiao'
    import disanzhe from 'components/insurance/car/du_bang/price/children/disanzhe/disanzhe'
    import jiashiyuan from 'components/insurance/car/du_bang/price/children/jiashiyuan/jiashiyuan'
    import cheshangchenke from 'components/insurance/car/du_bang/price/children/cheshangchenke/cheshangchenke'
    import quanchedaoqiang from 'components/insurance/car/du_bang/price/children/quanchedaoqiang/quanchedaoqiang'
    import boli from 'components/insurance/car/du_bang/price/children/boli/boli'
    import cheshenhuaheng from 'components/insurance/car/du_bang/price/children/cheshenhuaheng/cheshenhuaheng'
    import xiulichang from 'components/insurance/car/du_bang/price/children/xiulichang/xiulichang'
    import jingshensunhai from 'components/insurance/car/du_bang/price/children/jingshensunhai/jingshensunhai'
    import jidongche from 'components/insurance/car/du_bang/price/children/jidongche/jidongche'
    import xiuliqijian from 'components/insurance/car/du_bang/price/children/xiuliqijian/xiuliqijian'
    import fadongji from 'components/insurance/car/du_bang/price/children/fadongji/fadongji'
    import ziran from 'components/insurance/car/du_bang/price/children/ziran/ziran'
    export default {
        data () {
            return {
                nextStatus: false,
                bxbStatus: false,
                dszStatus: false
            }
        },
        mounted () {
            // this.checkStatus()
        },
        computed: {
        },
        methods: {
            changebxbStatus (msg) {
                this.bxbStatus = msg
                console.log(this.bxbStatus)
                console.log('this.bxbStatus')
            },
            checkStatus () {
                console.log(this.$refs)
                console.log('this.$refs.baoxianbiao')
                console.log(this.$refs.baoxianbiao.baoxianbiaoValue)
                if (this.$refs.baoxianbiao.baoxianbiaoValue === '不投保' && this.$refs.disanzhe.disanzheValue === '不投保' && this.$refs.jiashiyuan.jiashiyuanValue === '不投保' && this.$refs.cheshangchenke.cheshangchenkeValue === '不投保' && this.$refs.quanchedaoqiang.quanchedaoqiangValue === '不投保' && this.$refs.boli.boliValue === '不投保' && this.$refs.cheshenhuaheng.cheshenhuahengValue === '不投保' && this.$refs.xiulichang.xiulichangValue === '不投保' && this.$refs.jingshensunhai.jingshensunhaiValue === '不投保' && this.$refs.jidongche.jidongcheValue === '不投保' && this.$refs.xiuliqijian.xiuliqijianValue === '不投保' && this.$refs.fadongji.fadongjiValue === '不投保' && this.$refs.ziran.ziranValue === '不投保') {
                    this.nextStatus = false
                } else {
                    this.nextStatus = true
                }
            }
        },
         components: {
            baoxianbiao,
            disanzhe,
            jiashiyuan,
            cheshangchenke,
            quanchedaoqiang,
            boli,
            cheshenhuaheng,
            xiulichang,
            jingshensunhai,
            jidongche,
            xiuliqijian,
            fadongji,
            ziran
        }
    }
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
.insuranceTitle
	height: (100/$scale)
	line-height: (100/$scale)
	background: #F0F0F0
	font-size: (28/$scale)
	/*padding: 0 (30/$scale)*/
	display: flex
	.insuranceTitleA
		font-size: (28/$scale)
		height: 100%
		color: #222
		display: inline-block
		text-decoration: none
		&:nth-child(1)
			width: (240/$scale)
			margin-left: (30/$scale)
		&:nth-child(2)
			width: (280/$scale)
		&:nth-child(3)
			width: (120/$scale)
			line-height: (40/$scale)
			padding-top: (8/$scale)
</style>