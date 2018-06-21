<template>
    <div class="info">
        <!-- 标题 -->
        <a-title title="投保人信息" :state='client.type_code' @clickApplicant="toggleApplicant" :showApplicant="showApplicant"></a-title>
        <div v-show="showApplicant" v-for="(item,index) in lifeApplicant">   
            <!-- 姓名 -->
            <name v-if="insureFieldsName" :client="clientChoice(index)" :insure-fields-name="insureFieldsName" :default-value="item.name" ref="name"></name>
            <!-- 证件号码及类型 -->
            <card v-if="insureFieldsIdInfo" :client="clientChoice(index)" :insure-fields-card="insureFieldsIdInfo" :cardArray="idInfo" :default-id-type-id="item.cardType" :default-id-num="item.cardNo"  ref="card"></card>
            <!-- 性别 -->
            <sex v-if="insureFieldsSex"  :client="clientChoice(index)" :sexArray="dictionary.sex" :default-sex-id="item.sex"  :sex-editable="item.cardType === '1'"></sex>
            <!-- 出生日期 -->
            <birthday v-if="insureFieldsBirthday"   :client="clientChoice(index)" :default-birthday="item.birthday"  :birthday-editable="item.cardType === '1'"></birthday>
            <!-- 证件有效期 -->
            <id-info-period v-if="insureFieldsIdInfoPeriod" :client="clientChoice(index)" :insure-fields-idinfo-period="insureFieldsIdInfoPeriod" :default-value="item.idTypeValidate" 
            ref="idInfoPeriod"></id-info-period>
            <!-- 手机号 -->
            <phone  v-if="insureFieldsMobile" :client="clientChoice(index)"  :insure-fields-mobile="insureFieldsMobile" :default-value="item.phone"  ref="phone"></phone>
            <!-- 邮箱 -->
            <email  v-if="insureFieldsEmail" :client="clientChoice(index)"  :insure-fields-email="insureFieldsEmail" :default-value="item.email"  ref="email"></email>
            <!-- 邮编 -->
            <postcode v-if="insureFieldsPostCode" :client="clientChoice(index)"  :insure-fields-post-code="insureFieldsPostCode" :default-value="item.postCode" 
             ref="postCode"></postcode>
            <!-- 职业类型 -->
            <occupation v-if="insureFieldsOccupation" :client="clientChoice(index)" :occupationArray="occupation" :default-occupation-code="item.occupationCode" ref="occupation"></occupation>
            <!-- 三级职业类型 -->
            <occupationOfDb v-if="insureFieldsOccupationOfDb" :client="clientChoice(index)" :insure-fields-occupation-of-db="insureFieldsOccupationOfDb" :default-value="item.occupationName"></occupationOfDb>
            <!-- 省市区 -->
            <pca v-if="insureFieldsPca" :client="clientChoice(index)" :default-value="item.pcaText" ref="pca"></pca>
            <!-- 街道地址 -->
            <street-info v-if="insureFieldsStreetInfo" :client="clientChoice(index)" :insure-fields-street-info="insureFieldsStreetInfo"  :default-value="item.address" ref="address"></street-info>
            <!-- 身高 -->
            <height  v-if="insureFieldsHeight" :client="clientChoice(index)"  :insure-fields-height="insureFieldsHeight" :default-value="item.bodyHeight" ref="height"></height>
            <!-- 体重 -->
            <weight  v-if="insureFieldsWeight" :client="clientChoice(index)"  :insure-fields-weight="insureFieldsWeight" :default-weight="item.bodyWeight" :default-height="item.bodyHeight" :default-birthday="item.birthday" ref="weight"></weight>
            <!-- 年固定收入 -->
            <annual-income  v-if="insureFieldsAnnualIncome" :client="clientChoice(index)"  :insure-fields-annual-income="insureFieldsAnnualIncome" :default-value="item.annualIncome" ref="annualIncome"></annual-income>
        </div>
    </div>
</template>
<script>
    import ATitle from 'components/insurance/life/first_step/children/common/title/title'
    import Name from 'components/insurance/life/first_step/children/common/name/name'
    import Card from 'components/insurance/life/first_step/children/common/card/card'
    import IdInfoPeriod from 'components/insurance/life/first_step/children/common/idInfoPeriod/idInfoPeriod'
    import Sex from 'components/insurance/life/first_step/children/common/sex/sex'
    import Birthday from 'components/insurance/life/first_step/children/common/birthday/birthday'
    import Phone from 'components/insurance/life/first_step/children/common/phone/phone'
    import Email from 'components/insurance/life/first_step/children/common/email/email'
    import Occupation from 'components/insurance/life/first_step/children/common/occupation/occupation'
    import Postcode from 'components/insurance/life/first_step/children/common/postCode/postCode'
    import Height from 'components/insurance/life/first_step/children/common/height/height'
    import Weight from 'components/insurance/life/first_step/children/common/weight/weight'
    import AnnualIncome from 'components/insurance/life/first_step/children/common/annualIncome/annualIncome'
    import Pca from 'components/insurance/life/first_step/children/common/pca/pca'
    import StreetInfo from 'components/insurance/life/first_step/children/common/streetInfo/streetInfo'
    import OccupationOfDb from 'components/insurance/life/first_step/children/common/occupationOfDb/occupationOfDb'
    import {lifeInfoInsureFields} from 'common/js/mixin.js'
    import {APPLICANT} from 'components/insurance/life/first_step/children/client-type.js'
    import {mapGetters} from 'vuex'
    export default {
        mixins: [lifeInfoInsureFields],
        props: {
            insureFields: {
                type: Object,
                default: function () {
                    return {}
                }
            },
            dictionary: {
                type: Object,
                default: {}
            }
        },
        data () {
            return {
                showApplicant: true,
                client: APPLICANT
            }
        },
        created () {
        },
        computed: {
            ...mapGetters([
                'lifePolicy',
                'lifeApplicant'
            ]),
            // *********************************** ************************************************************
            idInfo () {
                return this.dictionary.idInfo
            },
            occupation () {
                return this.dictionary.occupation
            },
            // ************************************* 校验结果 *****************************************************
            validate () {
                for (let key in this.lifeApplicant) {
                    if (this.insureFieldsName && !this.$refs.name[key].validate) return false
                    if (this.insureFieldsIdInfo && !this.$refs.card[key].validate) return false
                    if (this.insureFieldsIdInfoPeriod && !this.$refs.idInfoPeriod[key].validate) return false
                    if (this.insureFieldsMobile && !this.$refs.phone[key].validate) return false
                    if (this.insureFieldsEmail && !this.$refs.email[key].validate) return false
                    if (this.insureFieldsOccupation && !this.$refs.occupation[key].validate) return false
                    if (this.insureFieldsPca && !this.$refs.pca[key].validate) return false
                    if (this.insureFieldsPostCode && !this.$refs.postCode[key].validate) return false
                    if (this.insureFieldsStreetInfo && !this.$refs.address[key].validate) return false
                    if (this.insureFieldsHeight && !this.$refs.height[key].validate) return false
                    if (this.insureFieldsWeight && !this.$refs.weight[key].validate) return false
                    if (this.insureFieldsAnnualIncome && !this.$refs.annualIncome[key].validate) return false
                    return true
                }
            }
        },
        methods: {
            toggleApplicant () {
                this.showApplicant = !this.showApplicant
            },
            clientChoice (pos) {
                return {
                    type_code: 1,
                    name: '投保人',
                    typeField: 'applicantList#' + pos
                }
            }
        },
        components: {
            ATitle,
            Name,
            Card,
            Sex,
            Birthday,
            Phone,
            Email,
            Occupation,
            Postcode,
            Height,
            Weight,
            AnnualIncome,
            IdInfoPeriod,
            Pca,
            StreetInfo,
            OccupationOfDb
        }
    }
</script>
<style scoped lang="stylus">  
    @import '~common/stylus/variable.styl'
    .info
        width: 100%
        background: #ffffff
        box-sizing: border-box
</style>