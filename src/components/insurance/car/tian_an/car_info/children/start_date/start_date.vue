<template>
	<div class="info">
		<p class="desTitle">起保日期</p>
		<p class="placeholders">
			 <a id="startDate"class="text" :class="{'active': startDate !== '请选择日期'}"> {{startDate}}</a>			 
		</p>
		<div id="startCalendar"></div>
	</div>
</template>

<script>
import {calendar} from 'common/js/calendar-util.js'
import {mapMutations, mapGetters} from 'vuex'
import {formatDate, DateAdd} from 'common/js/date-add-util.js'
export default {
    data () {
        return {
           startDate: ''
        }
    },
    computed: {
         ...mapGetters([
             'tianCarInfo'
            ])
    },
    created () {
        this.startDate = this.tianCarInfo.carInfo.startDate
    },
    mounted () {
        this.getDay()
    },
    methods: {
       ...mapMutations({
           setTianCarInfo: 'SET_CAR_TIANAN_CARINFO'
       }),
       getDay () {
            let vm = this
            let d = new Date()
            d.setDate(d.getDate() + 1)
            let resDate = formatDate(d, 'yyyy-MM-dd')
            let endDate = DateAdd('d', 90, d)
            let aaa = formatDate(endDate, 'yyyy-MM-dd')
            console.log(aaa)
            console.log(resDate)
            calendar('startDate', 'startCalendar', resDate, aaa, resDate, function (arr1, arr2) {
                vm.startDate = arr2.join('-')
                vm.setTianCarInfo({
                    field1: 'carInfo',
                    field2: 'startDate',
                    value: vm.startDate
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
		.desTitle
			color: #444
		.placeholders
			color: #BBB
			position:absolute
			right: 0
			top: 0
			.text
				color: #bbb
				&.active
					color $color-main
</style>