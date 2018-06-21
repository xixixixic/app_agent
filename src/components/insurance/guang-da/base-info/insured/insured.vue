<template>
    <div class="insured">
        <div class="detailTitle">
            <a class="titleLeft">被保人信息</a>
        </div>
        <relationship :Info='Info' @setGDBenRen='setGDBenRen' @getCardType='getCardType'></relationship>
        <name :Info='Info' ref='name'></name>
        <card :Info='Info' ref='card'></card>
        <sex :Info='Info' ref='sex'></sex>
        <birthday :Info='Info' ref='birthday'></birthday>
        <position :Info='Info' ref='position'></position>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Name from 'components/insurance/guang-da/common/child/name/name.vue'
import Sex from 'components/insurance/guang-da/common/child/sex/sex.vue'
import Birthday from 'components/insurance/guang-da/common/child/birthday/birthday.vue'
import Position from 'components/insurance/guang-da/common/child/position/position.vue'
import Card from 'components/insurance/guang-da/common/child/card/card.vue'
import Relationship from 'components/insurance/guang-da/common/child/relationship/relationship.vue'
export default {
    data () {
        return {
        }
    },
    computed: {
        ...mapGetters([
            'guangdaPremiumRisk',
            'guangdaPolicy'
		]),
        Info () {
           return {
               type: 'insured',
               defaultName: this.guangdaPremiumRisk.insured.name,
               defaultBirthday: this.guangdaPremiumRisk.insured.birthday !== '请选择出生日期' ? this.guangdaPremiumRisk.insured.birthday : '请选择出生日期',
               defaultSex: this.guangdaPremiumRisk.insured.sex,
               defaultIdType: this.guangdaPremiumRisk.insured.idType,
               defaultIdNo: this.guangdaPremiumRisk.insured.idNo,
               defaultoccupationCode: this.guangdaPremiumRisk.insured.occupationCode,
               defaultRelationId: this.guangdaPremiumRisk.insured.relationId,
               defaultoccupationName: this.guangdaPolicy.insuredJob
           }
        }
    },
    watch: {
        Info () {
            this.getCardType()
        }
    },
    methods: {
        getCardType(data) {
            this.$refs.birthday.setCardType()
            this.$refs.sex.setCardType()
        },
        setGDBenRen (data) {
            if (data === true) {
                this.$refs.name.setSame()
                this.$refs.sex.setSame()
                this.$refs.card.setSame()
                this.$refs.birthday.setSame()
                this.$refs.position.setSame()
            } else {
                this.$refs.name.clearSame()
                this.$refs.sex.clearSame()
                this.$refs.card.clearSame()
                this.$refs.birthday.clearSame()
                this.$refs.position.clearSame()
            }
        }
    },
    components: {
        Name,
        Sex,
        Birthday,
        Position,
        Card,
        Relationship
    }
}
</script>

<style lang='stylus' scoped>
@import '~components/insurance/guang-da/common/child/stylus/common.styl'
.insured
    margin-bottom 1.4rem
</style>