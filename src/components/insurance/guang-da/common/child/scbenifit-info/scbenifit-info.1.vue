<template>
    <div class="sgBenifitInfo">
        <div class="detailTitle">
            <a class="titleLeft">生存受益人信息</a>
        </div>
        <choose-sc-benifit :Info='Info'></choose-sc-benifit>
        <div v-if='listShowStatus' v-for='(item, index) in sgBenifitList' :key="index">
            <div class="detailTitle">
                <a class="titleLeft">受益人{{index + 1}}</a>
            </div>
            <name></name>
            <sex></sex>
            <birthday></birthday>
            <card></card>
            <nation></nation>
            <position></position>
            <relationship></relationship>
            <card-effective-day></card-effective-day>
            <benifit-percent></benifit-percent>
            <benifit-order></benifit-order>
        </div>
        <div class="addFupolicy" v-if='btnShowStatus'>
            <button class='addFuBtn' @click='addBenifit'>+ 添加受益人</button>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import ChooseScBenifit from 'components/insurance/chang-cheng/perfect-info/child/choose-scbenifit-type/choose-scbenifit-type.vue'
import Name from 'components/insurance/chang-cheng/perfect-info/child/benifit-detail-info/name/name.vue'
import Sex from 'components/insurance/chang-cheng/perfect-info/child/benifit-detail-info/sex/sex.vue'
import Card from 'components/insurance/chang-cheng/perfect-info/child/benifit-detail-info/card/card.vue'
import Birthday from 'components/insurance/chang-cheng/perfect-info/child/benifit-detail-info/birthday/birthday.vue'
import Nation from 'components/insurance/chang-cheng/perfect-info/child/benifit-detail-info/nation/nation.vue'
import Position from 'components/insurance/chang-cheng/perfect-info/child/benifit-detail-info/position/position.vue'
import Relationship from 'components/insurance/chang-cheng/perfect-info/child/benifit-detail-info/relationship/relationship.vue'
import CardEffectiveDay from 'components/insurance/chang-cheng/perfect-info/child/benifit-detail-info/card-effective-day/card-effective-day.vue'
import BenifitPercent from 'components/insurance/chang-cheng/perfect-info/child/benifit-detail-info/benifit-percent/benifit-percent.vue'
import BenifitOrder from 'components/insurance/chang-cheng/perfect-info/child/benifit-detail-info/benifit-order/benifit-order.vue'
export default {
    computed: {
		Info () {
			return {
				type: 'benificiary',
                defaultSgType: this.changChengBaseInfo.benificiary.sgType
            }
        },
        sgInfo () {
            return {
                type: 'scbenificiary'
            }
        },
        sgCardDayInfo () {
            return {
                type: 'scbenificiaryCardDay'
            }
        },
        btnShowStatus () {
            return this.changChengBaseInfo.benificiary.addScBenifitBtn
        },
        listShowStatus () {
            return this.changChengBaseInfo.benificiary.scBenifitStatus
        },
        sgBenifitList () {
            return this.changChengBaseInfo.scbenificiary
        },
        ...mapGetters([
			'changChengBaseInfo'
		])
    },
    methods: {
        addBenifit () {
            this.addScBenifit()
            this.setChangChengBaseInfo({
                field1: this.Info.type,
                field2: 'scBenifitStatus',
                value: true
            })
        },
        clientChoice (pos) {
            return {
                typeField: 'scbenificiary#' + pos,
                num: pos,
                types: 'scbenificiary'
            }
        },
        ...mapMutations({
            setChangChengBaseInfo: 'SET_LONGLIFE_CHANGCHENG_BASEINFO',
            addScBenifit: 'SET_ADD_CHANGCHENG_SCBENIFIT'
		})
    },
    components: {
		Name,
		Sex,
		Card,
		Birthday,
        Nation,
        ChooseScBenifit,
        Position,
        Relationship,
        CardEffectiveDay,
        BenifitPercent,
        BenifitOrder
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