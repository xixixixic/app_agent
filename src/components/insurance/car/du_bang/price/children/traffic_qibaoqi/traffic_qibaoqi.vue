<template>
	<div class="info">
		<p class="desTitle">交强险起保日期</p>
		<p class="placeholders">
			 <a id="trafficDate"class="text" :class="{'active': date !== '请选择交强险起保日期'}"> {{date}}</a>			 
		</p>
		<div id="trafficCalendar"></div>
	</div>
</template>

<script>
import {calendar} from 'common/js/calendar-util.js'
import {mapMutations, mapGetters} from 'vuex'
import {formatDate, DateAdd} from 'common/js/date-add-util.js'
export default {
    data () {
        return {
           date: ''
        }
    },
    computed: {
         ...mapGetters([
             'duCarPremium'
            ])
    },
    created () {
        this.date = this.duCarPremium.trafficStartShow
    },
    mounted () {
        this.getBirthday()
    },
    methods: {
       ...mapMutations({
           setPremium: 'SET_CAR_DUBANG_PREMIUM'
       }),
       getBirthday () {
            let d = new Date()
            d.setDate(d.getDate() + 1)
            let resDate = formatDate(d, 'yyyy-MM-dd')
            let endDate = DateAdd('day', 90, d)
            // let str = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + (d.getDate() + 1)
            let vm = this
            calendar('trafficDate', 'trafficCalendar', resDate, endDate, resDate, function (arr1, arr2) {
                vm.date = arr2.join('-')
                let trfficEndDate = []
                trfficEndDate.push((Number(arr2[0]) + 1))
                trfficEndDate.push((arr2[1]))
                console.log((Number(arr2[2]) - 1))
                console.log((Number(arr2[2]) - 1).toString().length)
                console.log((Number(arr2[2]) - 1).toString().length === 1)
                if ((Number(arr2[2]) - 1).toString().length === 1) {
                    trfficEndDate.push('0' + (Number(arr2[2]) - 1))
                    console.log('aaa')
                } else {
                    trfficEndDate.push((Number(arr2[2]) - 1))
                    console.log('bbb')
                }
                console.log(trfficEndDate)
                let trafficEndateRes = trfficEndDate.join('-')
                console.log(trafficEndateRes)
                console.log('oosss')
                let nashuiStart = []
                nashuiStart.push(arr2[0])
                nashuiStart.push('01')
                nashuiStart.push('01')
                let nashuiStartRes = nashuiStart.join('-')
                let nashuiEnd = []
                nashuiEnd.push(arr2[0])
                nashuiEnd.push('12')
                nashuiEnd.push('12')
                let nashuiEndRes = nashuiEnd.join('-')
                // 起保期
                vm.setPremium({
                    field1: 'policy',
                    field2: 'startDateCi',
                    value: vm.date
                })
                vm.setPremium({
                    field1: 'trafficStartShow',
                    value: vm.date
                })
                // 终保期
                vm.setPremium({
                    field1: 'policy',
                    field2: 'endDateCi',
                    value: trafficEndateRes
                })
                vm.setPremium({
                    field1: 'trafficEndShow',
                    value: trafficEndateRes
                })
                // 纳税起期
                vm.setPremium({
                    field1: 'carShipTax',
                    field2: 'taxStartDate',
                    value: nashuiStartRes
                })
                // 纳税止期
                vm.setPremium({
                    field1: 'carShipTax',
                    field2: 'taxEndDate',
                    value: nashuiEndRes
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
			right: (30/$scale)
			.text
				color: #bbb
				&.active
					color $color-main
</style>