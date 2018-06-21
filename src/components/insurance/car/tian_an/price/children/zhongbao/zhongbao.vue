<template>
	<div class="info">
		<p class="desTitle">商业险终保日期</p>
		<p class="placeholders">
			 <a id="zbdate" class="text" :class="{'active': zbdate !== '请选择商业险终保日期'}"> {{zbdate}}</a>			 
		</p>
	</div>
</template>

<script>
import {mapMutations, mapGetters} from 'vuex'
export default {
    data () {
        return {
           zbdate: ''
        }
    },
    mounted () {
        this.getBirthday()
    },
    computed: {
         ...mapGetters([
             'duCalculationPremium'
            ])
    },
    created () {
        this.zbdate = this.duCalculationPremium.policy.endDateBi
        console.log(this.duCalculationPremium)
    },
    methods: {
       ...mapMutations({
           setPremium: 'SET_CAR_TIANAN_PREMIUM'
       }),
       getBirthday () {
            this.setPremium({
                field1: 'policy',
                field2: 'endDateBi',
                value: this.zbdate + ' 00'
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