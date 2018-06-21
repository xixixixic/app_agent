<template>
	<div class="info">
		<p class="desTitle">车辆注册日期</p>
		<p class="placeholders">
			 <a id="registerdate"class="text" :class="{'active': registerdate === '请选择车辆注册日期'}"> {{registerdate}}</a>			 
		</p>
		<div id="registerCalendar"></div>
	</div>
</template>

<script>
import {calendar} from 'common/js/calendar-util.js'
import {mapMutations, mapGetters} from 'vuex'
export default {
    data () {
        return {
           registerdate: '请选择车辆注册日期'
        }
    },
    computed: {
         ...mapGetters([
             'duCarInfoOwner'
            ])
    },
    created () {
        this.registerdate = this.duCarInfoOwner.carInfo.registDate
        console.log(this.duCarInfoOwner)
        console.log('duCarInfoOwner')
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
            calendar('registerdate', 'registerCalendar', '1990-1-1', str, '2010-01-01', function (arr1, arr2) {
                vm.date = arr2.join('-')
                vm.setduCarInfoOwner({
                    field1: 'carInfo',
                    field2: 'registDate',
                    value: vm.date
                })
                vm.registerdate = vm.date
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
		border-bottom: 1px solid #E6E6E6
		.desTitle
			color: #444
		.placeholders
			color: #BBB
			position:absolute
			right: (30/$scale)
			.text
				color: #333
			.active
				color #bbb
</style>