<template>
    <div class="info">
        <div class="title">
            <div class="inner">
                <div class="text">投保人信息</div>
            </div>
        </div>
        <div class="list" v-for="(item,index) in applicant">
            <name v-if="insureFieldsName" :client="client" :content="item.name"></name>
            <card v-if="insureFieldsIdInfo" :idTypeId="item.cardType" :content="item.cardNo"></card>
            <sex v-if="insureFieldsSex" :content="item.sex"></sex>
            <birthday v-if="insureFieldsBirthday" :content="item.birthday"></birthday>
            <mobile v-if="insureFieldsMobile" :content="item.phone"></mobile>
            <email v-if="insureFieldsEmail" :content="item.email"></email>
            <occupation v-if="insureFieldsOccupation" :content="item.occupationName"></occupation>
            <occupationOfDb v-if="insureFieldsOccupationOfDb" :content="item.occupationName"></occupationOfDb>
            <pca v-if="insureFieldsPca" :content="item.pcaText"></pca>
            <address-info v-if="insureFieldsStreetInfo" :content="item.address"></address-info>
            <height v-if="insureFieldsHeight" :content="item.bodyHeight"></height>
            <weight v-if="insureFieldsWeight" :content="item.bodyWeight"></weight>
            <annual-income v-if="insureFieldsAnnualIncome" :content="item.annualIncome"></annual-income>
        </div>
    </div>
</template>
<script>
    import Name from 'components/insurance/life/sure_step/children/common/name/name'
    import Card from 'components/insurance/life/sure_step/children/common/card/card'
    import Sex from 'components/insurance/life/sure_step/children/common/sex/sex'
    import Birthday from 'components/insurance/life/sure_step/children/common/birthday/birthday'
    import Mobile from 'components/insurance/life/sure_step/children/common/mobile/mobile'
    import Email from 'components/insurance/life/sure_step/children/common/email/email'
    import Occupation from 'components/insurance/life/sure_step/children/common/occupation/occupation'
    import Pca from 'components/insurance/life/sure_step/children/common/pca/pca'
    import AddressInfo from 'components/insurance/life/sure_step/children/common/address/address'
    import Height from 'components/insurance/life/sure_step/children/common/height/height'
    import Weight from 'components/insurance/life/sure_step/children/common/weight/weight'
    import AnnualIncome from 'components/insurance/life/sure_step/children/common/annualIncome/annualIncome'
    import OccupationOfDb from 'components/insurance/life/sure_step/children/common/occupationOfDb/occupationOfDb'
    import {lifeInfoInsureFields} from 'common/js/mixin.js'
    export default {
        mixins: [lifeInfoInsureFields],
        props: {
            applicant: {
                type: Array,
                default: function () {
                   return []
                }
            },
            insureFields: {
                type: Object,
                default: function () {
                    return {}
                }
            }
        },
        data () {
            return {
                client: '投保人'
            }
        },
        components: {
            Name,
            Card,
            Sex,
            Birthday,
            Mobile,
            Email,
            Occupation,
            Pca,
            AddressInfo,
            Height,
            Weight,
            AnnualIncome,
            OccupationOfDb
        }
    }
</script>
<style lang="stylus" scoped>
    @import '~components/insurance/life/sure_step/children/stylus/common.styl'
</style>