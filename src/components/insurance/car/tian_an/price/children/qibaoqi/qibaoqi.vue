<template>
	<div class="info">
		<p class="desTitle">商业险起保日期</p>
		<p class="placeholders">
			 <a id="date"class="text" :class="{'active': date !== '请选择商业险起保日期'}"> {{date}}</a>			 
		</p>
		<div id="qibaoCalendar"></div>
	</div>
</template>

<script>
import {calendar} from 'common/js/calendar-util.js'
import {mapMutations, mapGetters} from 'vuex'
export default {
    data () {
        return {
           date: ''
        }
    },
    computed: {
         ...mapGetters([
             'duCalculationPremium'
            ])
    },
    created () {
console.log(this.duCalculationPremium.policy.startDateBi)
        this.date = this.duCalculationPremium.policy.startDateBi
    },
    mounted () {
        this.getBirthday()
    },
    methods: {
       ...mapMutations({
           setPremium: 'SET_CAR_TIANAN_PREMIUM'
       }),
       getBirthday () {
            let vm = this
            let d = new Date()
            let str = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + (d.getDate() + 1)
            calendar('date', 'qibaoCalendar', str, new Date() + 1, str, function (arr1, arr2) {
                vm.date = arr2.join('-')
                let endDate = (Number(arr2[0]) + 1) + (arr2[1]) + (Number(arr2[2]) - 1)
                vm.setPremium({
                    field1: 'policy',
                    field2: 'startDateBi',
                    value: vm.date + ' 00'
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
			.text
				color: #bbb
				&.active
					color $color-main
</style>