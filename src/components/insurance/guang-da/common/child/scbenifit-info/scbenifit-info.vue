<template>
    <div class="sgBenifitInfo">
        <div class="detailTitle">
            <a class="titleLeft">生存受益人信息</a>
        </div>
        <choose-sc-benifit></choose-sc-benifit>
    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import ChooseScBenifit from 'components/insurance/guang-da/common/child/choose-scbenifit-type/choose-scbenifit-type.vue'
export default {
    computed: {
        ...mapGetters([
		])
    },
    methods: {
        ...mapMutations({
        })
    },
    components: {
        ChooseScBenifit
    }
}
</script>

<style lang='stylus' scoped>
@import '~components/insurance/chang-cheng/base-info/child/stylus/common.styl'
.addFupolicy
    width: (710/$scale)
    margin: 0 auto
    .addFuBtn
        width: 100%
        height: (100/$scale)
        border: none
        background: #fff
        font-size: (34/$scale)
        color: $color-theme
        outline: none
        margin-bottom: (20/$scale)
</style>