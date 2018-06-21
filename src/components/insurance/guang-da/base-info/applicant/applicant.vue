<template>
    <div class="applicant">
        <div class="detailTitle">
            <a class="titleLeft">投保人信息</a>
        </div>
        <name :Info='Info' ></name>
        <card :Info='Info'  @getCardType='getCardType'></card>
        <sex :Info='Info' ref="sex"></sex>
        <birthday :Info='Info' ref="birthday"></birthday>
        <income :Info='Info'></income>
        <position :Info='Info'></position>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Name from 'components/insurance/guang-da/common/child/name/name.vue'
import Sex from 'components/insurance/guang-da/common/child/sex/sex.vue'
import Birthday from 'components/insurance/guang-da/common/child/birthday/birthday.vue'
import Position from 'components/insurance/guang-da/common/child/position/position.vue'
import Card from 'components/insurance/guang-da/common/child/card/card.vue'
import Income from 'components/insurance/guang-da/common/child/income/income.vue'
export default {
    data () {
        return {
            setCard:{
                type: 'applicant',
                card: ''
            },
            setCardType:{
                type: 'applicant',
                cardType: '11'
            }
        }
    },
    created(){
    },
    computed: {
        ...mapGetters([
            'guangdaPremiumRisk',
            'guangdaPolicy'
		]),
        Info () {
           return {
               type: 'applicant',
               defaultName: this.guangdaPremiumRisk.applicant.name,
               defaultBirthday: this.guangdaPremiumRisk.applicant.birthday !== '请选择出生日期' ? this.guangdaPremiumRisk.applicant.birthday : '请选择出生日期',
               defaultSex: this.guangdaPremiumRisk.applicant.sex,
               defaultIncome: this.guangdaPremiumRisk.applicant.annualIncome,
               defaultIdType: this.guangdaPremiumRisk.applicant.idType,
               defaultIdNo: this.guangdaPremiumRisk.applicant.idNo,
               defaultoccupationCode: this.guangdaPremiumRisk.applicant.occupationCode,
               defaultoccupationName: this.guangdaPolicy.applicantJob,
               defaultRelationId: this.guangdaPremiumRisk.insured.relationId
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
            console.log('获取消息胜利大街放声大哭了发')
            console.log(data)
            this.$refs.birthday.setCardType()
            this.$refs.sex.setCardType()
        }
    },
    components: {
        Name,
        Sex,
        Birthday,
        Position,
        Card,
        Income
    }
}
</script>

<style lang='stylus' scoped>
@import '~components/insurance/guang-da/common/child/stylus/common.styl'
</style>