<template>
	<div class="info">
		<p class="desTitle">车辆过户日期</p>
		<p class="placeholders">
			 <a id="guohuDate"class="text" :class="{'active': transferDate !== '请选择过户日期'}">{{transferDate}}</a>			 
		</p>  
		<div id="guohuCalendar"></div>
	</div>
</template>

<script>
import {calendar} from 'common/js/calendar-util.js'
import {mapMutations, mapGetters} from 'vuex'
export default {
    data () {
        return {
           transferDate: '请选择过户日期'
        }
    },
    computed: {
        ...mapGetters([
                 'tianCarInsuranceInfo'
            ])
    },
    created () {
        console.log(this.tianCarInsuranceInfo)
        console.log(this.transferDate)
    },
    mounted () {
        this.getGuoHuday()
    },
    methods: {
       ...mapMutations({
           setCarInsuranceInfo: 'SET_CAR_TIANAN_INSURANCEINFO'
       }),
       getGuoHuday () {
            let vm = this
            let d = new Date()
            let str = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
            calendar('guohuDate', 'guohuCalendar', '1990-01-01', str, '2010-01-01', function (arr1, arr2) {
                vm.transferDate = arr2.join('-')
                vm.setCarInsuranceInfo({
                    field1: 'baseMessage',
                    field2: 'transferDate',
                    value: vm.transferDate
                })
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
	.info
		font-size: (28/$scale)
		line-height: (100/$scale)
		position: relative
		display: flex
		.desTitle
			color: #444
		.placeholders
			color: #BBB
			position:absolute
			right: 0
			width: (200/$scale)
			height: (100/$scale)
			.text
				display: inline-block
				width: 100%
				height: 100%
				color: #bbb
				&.active
					color $color-main
</style>