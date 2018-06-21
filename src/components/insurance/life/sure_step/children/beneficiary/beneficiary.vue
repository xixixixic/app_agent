<template>
    <div class="info">
        <div class="title">
            <div class="inner">
                <div class="text">受益人信息</div>
            </div>
        </div>
        <div class="list" v-if="benefitciaryFlag === '0'">
            <div class="item">
                <div class="inner">
                    <div class="left"><span class="text">受益人</span></div>
                    <div class="right"><span class="text">法定受益人（配偶，子女，父母或其他法定监护人）</span></div>
                </div>
            </div>
        </div>
        <div v-else  v-for="(item,index) in beneficiaryExtList" class="info">
            <split v-show="index !== 0"></split>
            <div class="list">
                <!-- 姓名 -->
                <name v-if="insureFieldsName" :content="item.name"></name>
                <!-- 与被保人关系 -->
                <relationShip v-if="insureFieldsRelationShip" :content="item.relationName"></relationShip>
                <!-- 证件号码及类型 -->
                <card v-if="insureFieldsIdInfo" :content="item.cardNo"  :idTypeId="item.idTypeId"></card>
                <!-- 性别 -->
                <sex v-if="insureFieldsSex" :content="item.sexId"></sex>
                <!-- 出生日期 -->
                <birthday v-if="insureFieldsBirthday" :content="item.birthday"></birthday>
                <!-- 证件有效期 -->
                <id-info-period v-if="insureFieldsIdInfoPeriod" :content="item.idTypeValidate"></id-info-period>
                <!-- 受益顺序 -->
                <bene-order v-if="insureFieldsBeneOrder" :content="item.benefOrder"></bene-order>
                <!-- 受益比例 -->
                <bene-scale v-if="insureFieldsBeneScale" :content="item.benefScale"></bene-scale>
            </div>
        </div>
    </div> 
</template>
<script>
    import Split from 'base/split/split'
    import Name from 'components/insurance/life/sure_step/children/common/name/name'
    import Card from 'components/insurance/life/sure_step/children/common/card/card'
    import RelationShip from 'components/insurance/life/sure_step/children/common/relationShip/relationShip'
    import IdInfoPeriod from 'components/insurance/life/sure_step/children/common/idInfoPeriod/idInfoPeriod'
    import Sex from 'components/insurance/life/sure_step/children/common/sex/sex'
    import Birthday from 'components/insurance/life/sure_step/children/common/birthday/birthday'
    import BeneOrder from 'components/insurance/life/sure_step/children/common/beneOrder/beneOrder'
    import BeneScale from 'components/insurance/life/sure_step/children/common/beneScale/beneScale'
    import {mapGetters} from 'vuex'
    import {lifeInfoInsureFields} from 'common/js/mixin.js'
    export default {
        mixins: [lifeInfoInsureFields],
        props: {
            beneficiaryExtList: {
                type: Array,
                default: []
            },
            insureFields: {
                type: Object,
                default: {}
            }
        },
        computed: {
            ...mapGetters([
                'lifePolicy',
                'lifeInsuranceRules'
            ]),
            beneficaryType () {
                return this.lifeInsuranceRules.beneficaryType
            },
            benefitciaryFlag () {
                return this.lifePolicy.benefitciaryFlag
            }
        },
        components: {
            Name,
            RelationShip,
            Card,
            IdInfoPeriod,
            Sex,
            Birthday,
            BeneOrder,
            BeneScale,
            Split
        }
    }
</script>
<style lang="stylus" scoped>
    @import '~components/insurance/life/sure_step/children/stylus/common.styl'
</style>