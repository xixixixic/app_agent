<template>
	<div class="info">
		<p class="desTitle">商业险起保日期</p>
		<p class="placeholders">
			 <a id="busStartdate"class="text" :class="{'active': startDate === '请选择商业险起保日期'}"> {{startDate}}</a>			 
		</p>  
		<div id="busStartCalendar"></div>
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
                 'duCarPremium'
            ])
    },
    created () {
        this.startDate = this.duCarPremium.businessStartShow
    },
    mounted () {
        this.getBirthday()
    },
    methods: {
       ...mapMutations({
           setPremium: 'SET_CAR_DUBANG_PREMIUM'
       }),
       getBirthday () {
            let vm = this
            let d = new Date()
            d.setDate(d.getDate() + 1)
            let resDate = formatDate(d, 'yyyy-MM-dd')
            let endDate = DateAdd('day', 90, d)
            let formatEnd = formatDate(endDate, 'yyyy-MM-dd')
            console.log(formatEnd)
            console.log('5522')
            calendar('busStartdate', 'busStartCalendar', resDate, endDate, resDate, function (arr1, arr2) {
                vm.startDate = arr2.join('-')
                let endDate = []
                endDate.push((Number(arr2[0]) + 1))
                endDate.push((arr2[1]))
                if ((Number(arr2[2]) - 1).toString().length === 1) {
                    endDate.push('0' + (Number(arr2[2]) - 1))
                } else {
                    endDate.push((Number(arr2[2]) - 1))
                }
                let endateRes = endDate.join('-')
                console.log(endateRes)
                console.log('222')
                vm.setPremium({
                    field1: 'policy',
                    field2: 'startDateBi',
                    value: vm.startDate
                })
                vm.setPremium({
                    field1: 'businessEndShow',
                    value: endateRes
                })
                vm.setPremium({
                    field1: 'businessStartShow',
                    value: vm.startDate
                })
                vm.setPremium({
                    field1: 'policy',
                    field2: 'endDateBi',
                    value: endateRes
                })
                console.log(vm.duCarPremium)
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
			right: (30/$scale)
			.text
				color: #333
				&.active
					color #bbb
</style>