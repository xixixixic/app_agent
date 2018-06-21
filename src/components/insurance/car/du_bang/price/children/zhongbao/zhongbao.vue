<template>
	<div class="info">
		<p class="desTitle">商业险终保日期</p>
		<p class="placeholders">
			 <a id="zbdate" class="text" :class="{'active': this.duCarPremium.businessEndShow === '请选择商业险终保日期'}"> {{this.duCarPremium.businessEndShow}}</a>			 
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
    },
    created () {
        this.zbdate = this.duCarPremium.businessEndShow
    }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
	.info
		font-size: (28/$scale)
		line-height: (100/$scale)
		position: relative
		border-bottom: none!important
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