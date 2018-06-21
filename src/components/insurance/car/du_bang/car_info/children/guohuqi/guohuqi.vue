<template>
	<div class="info">
		<p class="desTitle">车辆过户日期</p>
		<p class="placeholders">
			 <a id="guhudate"class="text" :class="{'active': guhudate !== '请选择车辆过户日期'}"> {{guhudate}}</a>			 
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
           guhudate: '请选择车辆过户日期'
        }
    },
    computed: {
         ...mapGetters([
             'duCarInfoOwner'
            ])
    },
    created () {
        this.guhudate = this.duCarInfoOwner.carInfo.transferDate
        console.log(this.duCarInfoOwner)
        console.log('this.duCarInfoOwner')
    },
    mounted () {
        this.getBirthday()
    },
    methods: {
       ...mapMutations({
           setduCarInfoOwner: 'SET_CAR_DUBANG_CARINFO_OWNER'
       }),
       getBirthday () {
           let d = new Date()
           let str = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
            let vm = this
            calendar('guhudate', 'guohuCalendar', '1990-1-1', str, '2010-01-01', function (arr1, arr2) {
                vm.date = arr2.join('-')
                vm.setduCarInfoOwner({
                    field1: 'carInfo',
                    field2: 'transferDate',
                    value: vm.date
                })
                vm.guhudate = vm.date
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
		padding: 0 (30/$scale)
		background: #fff
		.desTitle
			color: #444
		.placeholders
			color: #BBB
			position:absolute
			right: (30/$scale)
			.text
				color: #bbb
				&.active
					color $color-main
</style>