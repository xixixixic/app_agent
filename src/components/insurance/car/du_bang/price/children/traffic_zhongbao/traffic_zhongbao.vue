<template>
	<div class="info">
		<p class="desTitle">交强险终保日期</p>
		<p class="placeholders">
			 <a id="zbdate" class="text" :class="{'active': this.duCarPremium.trafficEndShow !== '请选择交强险终保日期'}"> {{this.duCarPremium.trafficEndShow}}</a>			 
		</p>
	</div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    data () {
        return {
           zbdate: ''
        }
    },
    computed: {
         ...mapGetters([
             'duCarPremium'
            ])
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