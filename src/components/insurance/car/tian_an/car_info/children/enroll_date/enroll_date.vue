<template>
	<div class="info">
		<p class="desTitle">注册日期</p>
		<p class="placeholders">
			 <a id="enrolldate"class="text" :class="{'active': enrolldate !== '请选择日期'}"> {{enrolldate}}</a>			 
		</p>
		<div id="enrollCalendar"></div>
	</div>
</template>

<script>
import {calendar} from 'common/js/calendar-util.js'
import {mapMutations, mapGetters} from 'vuex'
export default {
    data () {
        return {
           enrolldate: ''
        }
    },
    computed: {
         ...mapGetters([
             'tianCarInfo'
            ])
    },
    created () {
        this.enrolldate = this.tianCarInfo.carInfo.enrollDate
    },
    mounted () {
        this.getDay()
    },
    methods: {
       ...mapMutations({
           setTianCarInfo: 'SET_CAR_TIANAN_CARINFO'
       }),
       getDay () {
        let d = new Date()
           let str = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
            let vm = this
            calendar('enrolldate', 'enrollCalendar', '1999-1-1', new Date() + 1, str, function (arr1, arr2) {
                vm.enrolldate = arr2.join('-')
                vm.setTianCarInfo({
                    field1: 'carInfo',
                    field2: 'enrollDate',
                    value: vm.enrolldate
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
			border-bottom: 1px solid #e6e6e6
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