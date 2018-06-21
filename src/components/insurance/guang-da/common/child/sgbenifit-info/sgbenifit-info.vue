<template>
    <div class="sgBenifitInfo">
        <div class="detailTitle">
            <a class="titleLeft">身故受益人信息</a>
        </div>
        <choose-sg-benifit></choose-sg-benifit>
    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import ChooseSgBenifit from 'components/insurance/guang-da/common/child/choose-sgbenifit-type/choose-sgbenifit-type.vue'
export default {
    data () {
        return {
           
        }
    },
    computed: {
        ...mapGetters([
		])
    },
    methods: {
        ...mapMutations({
		})
    },
    components: {
        ChooseSgBenifit
    }
}
</script>

<style lang='stylus' scoped>
@import '~components/insurance/chang-cheng/base-info/child/stylus/common.styl'
</style>