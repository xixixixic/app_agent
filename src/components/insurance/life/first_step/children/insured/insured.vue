<template>
    <div class="info">  
        <i-title title="被保人信息" :state="client.type_code" @clickInsured="toggleInsured" :showInsured="showInsured"></i-title>
        <div v-show="showInsured" v-for="(item,index) in lifeInsured">
            <!-- 选择关系 -->
            <choicePeople :choiceType="choiceType" :choiceTypeValue="choiceTypeValue" @choice="choice" :defaultSelected="item.relationId === '5' ? 1 : 0"></choicePeople>
            <!-- 姓名 -->
            <name v-if="insureFieldsName" :client="clientChoice(index)" :insure-fields-name="insureFieldsName" 
            :default-value="item.name" :editable="editable"  ref="name"></name>
            <!-- 与投保人关系 --> 
            <relationShip v-if="insureFieldsRelationShip" :client="clientChoice(index)" :relationId="item.relationId" :relationArray="relation" :editable="editable"  ref="relation"></relationShip>
            <!-- 身份证 -->
            <card v-if="insureFieldsIdInfo" :client="clientChoice(index)" :insure-fields-card="insureFieldsIdInfo" :cardArray="idInfo"
             :default-id-type-id="item.cardType" :default-id-num="item.cardNo" :editable="editable" ref="card"></card>
            <!-- 性别 -->
            <sex  v-if="insureFieldsSex" :client="clientChoice(index)" :sexArray="dictionary.sex" :default-sex-id="item.sex"  :sex-editable="item.cardType === '1' || !editable"></sex>
            <!-- 生日 -->
            <birthday v-if="insureFieldsBirthday"  :client="clientChoice(index)" :default-birthday="item.birthday"  :birthday-editable="item.cardType === '1' || !editable"></birthday>
            <!-- 证件有效期 -->
            <id-info-period v-if="insureFieldsIdInfoPeriod" :client="clientChoice(index)" :insure-fields-idinfo-period="insureFieldsIdInfoPeriod" 
            :default-value="item.idTypeValidate" :editable="editable" ref="idInfoPeriod" :flag="1"></id-info-period>
            <!-- 手机号 -->
            <phone  v-if="insureFieldsMobile" :client="clientChoice(index)"  :insure-fields-mobile="insureFieldsMobile" :default-value="item.phone" :editable="editable" ref="phone"></phone>
            <!-- 邮箱 -->
            <email  v-if="insureFieldsEmail" :client="clientChoice(index)"  :insure-fields-email="insureFieldsEmail" :default-value="item.email" :editable="editable"  ref="email"></email>
            <!-- 邮编 -->
            <postcode  v-if="insureFieldsPostCode" :client="clientChoice(index)"  :insure-fields-post-code="insureFieldsPostCode" :default-value="item.postCode" 
            :editable="editable" ref="postCode"></postcode>
            <!-- 职业类型 -->
            <occupation v-if="insureFieldsOccupation" :client="clientChoice(index)" :occupationArray="occupation"  :default-occupation-code="item.occupationCode" ref="occupation" :editable="editable"></occupation>
            <!-- 三级职业类型 -->
            <occupationOfDb v-if="insureFieldsOccupationOfDb" :client="clientChoice(index)" :default-value="item.occupationName" :insure-fields-occupation-of-db="insureFieldsOccupationOfDb"  :editable="editable"></occupationOfDb>
            <!-- 省市区 -->
            <pca v-if="insureFieldsPca" :client="clientChoice(index)" :default-value="item.pcaText"  :editable="editable" ref="pca"></pca>
            <!-- 街道地址 -->
            <street-info v-if="insureFieldsStreetInfo" :client="clientChoice(index)" :insure-fields-street-info="insureFieldsStreetInfo"  :default-value="item.address" :editable="editable" ref="address"></street-info>
            <!-- 身高 -->
            <height  v-if="insureFieldsHeight" :client="clientChoice(index)"  :insure-fields-height="insureFieldsHeight" :default-value="item.bodyHeight" :editable="editable"  ref="height"></height>
            <!-- 体重 -->
            <weight  v-if="insureFieldsWeight" :client="clientChoice(index)"  :insure-fields-weight="insureFieldsWeight"
            :editable="editable"  :default-weight="item.bodyWeight" :default-height="item.bodyHeight" ref="weight"></weight>
            <!-- 年固定收入 -->
            <annual-income  v-if="insureFieldsAnnualIncome" :client="clientChoice(index)"  :insure-fields-annual-income="insureFieldsAnnualIncome" :default-value="item.annualIncome"  :editable="editable"
             ref="annualIncome"></annual-income>
            <!-- 安心恋爱险 -->
            <!-- 心上人姓名 -->
            <lovetgt-name v-if="insureFieldsLoveTgtName" :client="clientChoice(index)" :insure-fields-lovetgt-name="insureFieldsLoveTgtName" :default-value="item.loveTgtName"  ref="loveTgtName"></lovetgt-name>
            <!-- 心上人性别 -->
            <lovetgt-sex v-if="insureFieldsLoveTgtSex" :client="clientChoice(index)" ::insure-fields-lovetgt-sex="insureFieldsLoveTgtSex"  ref="loveTgtSex" :sexArray="dictionary.sex" :default-sex-id="item.loveTgtSex"></lovetgt-sex>
        </div>
    </div>
</template>
<script>
    import ITitle from 'components/insurance/life/first_step/children/common/title/title'
    import ChoicePeople from 'components/insurance/life/first_step/children/common/choicePeople/choicePeople'
    import Name from 'components/insurance/life/first_step/children/common/name/name'
    import RelationShip from 'components/insurance/life/first_step/children/common/relationShip/relationShip'
    import Card from 'components/insurance/life/first_step/children/common/card/card'
    import Sex from 'components/insurance/life/first_step/children/common/sex/sex'
    import Birthday from 'components/insurance/life/first_step/children/common/birthday/birthday'
    import Phone from 'components/insurance/life/first_step/children/common/phone/phone'
    import Occupation from 'components/insurance/life/first_step/children/common/occupation/occupation'
    import Email from 'components/insurance/life/first_step/children/common/email/email'
    import IdInfoPeriod from 'components/insurance/life/first_step/children/common/idInfoPeriod/idInfoPeriod'
    import Postcode from 'components/insurance/life/first_step/children/common/postCode/postCode'
    import Height from 'components/insurance/life/first_step/children/common/height/height'
    import Weight from 'components/insurance/life/first_step/children/common/weight/weight'
    import AnnualIncome from 'components/insurance/life/first_step/children/common/annualIncome/annualIncome'
    import Pca from 'components/insurance/life/first_step/children/common/pca/pca'
    import StreetInfo from 'components/insurance/life/first_step/children/common/streetInfo/streetInfo'
    import OccupationOfDb from 'components/insurance/life/first_step/children/common/occupationOfDb/occupationOfDb'
    import LovetgtName from 'components/insurance/life/first_step/children/common/lovetgtName/lovetgtName'
    import LovetgtSex from 'components/insurance/life/first_step/children/common/lovetgtSex/lovetgtSex'
    import {lifeInfoInsureFields} from 'common/js/mixin.js'
    import {INSURED} from 'components/insurance/life/first_step/children/client-type.js'
    import {mapGetters, mapMutations} from 'vuex'
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
                client: INSURED,
                choiceType: '被保人(保险指定人)',
                choiceTypeValue: ['其他人', '仅本人'],
                showInsured: true
            }
        },
        created () {
        },
        computed: {
            ...mapGetters([
                'lifeApplicant',
                'lifeInsured'
            ]),
            /* ---------------------------------------校验规则------------------------------------ */
            insureFieldsRelationShip () {
                return this.insureFields.relation
            },
            insureFieldsLoveTgtName () {
                return this.insureFields.loveTgtName
            },
            insureFieldsLoveTgtSex () {
                return this.insureFields.loveTgtSex
            },
            /* ------------------------------------------------------  信息下拉渲染 --------------------------------------------- */
            relation () {
                return this.dictionary.relation
            },
            // ************************************* 是否可编辑 *****************************************************
            editable () {
                if (this.lifeInsured[0] === undefined) return true
                if (this.lifeInsured[0].relationId === undefined) return true
                if (this.lifeInsured[0].relationId === '5') return false
                else return true
            },
            /* sexBirthdayEditable () {
                if (this.lifeApplicant[0].cardType === '1' || !this.editable) {
                    return false
                } else {
                    return true
                }
            }, */
            // ************************************* 校验结果 *****************************************************
            validate () {
                for (let key in this.lifeInsured) {
                    if (this.insureFieldsName && !this.$refs.name[key].validate) return false
                    if (this.insureFieldsRelationShip && !this.$refs.relation[key].validate) return false
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
            toggleInsured () {
                this.showInsured = !this.showInsured
            },
            choice (index) {
                if (index === 1) {
                    this.SET_LIFE_POLICYINFO({
                        field1: 'insuredList' + '#0',
                        field2: 'relationId',
                        value: '5'
                    })
                    this.SET_LIFE_POLICYINFO({
                        field1: 'insuredList' + '#0',
                        field2: 'relationName',
                        value: '本人'
                    })
                    this.SET_LIFE_INSURED_BENREN()
                } else {
                    this.SET_LIFE_INSURED_OTHER()
                    setTimeout(() => {
                        this.SET_LIFE_POLICYINFO({
                            field1: 'insuredList' + '#0',
                            field2: 'relationId',
                            value: null
                        })
                    }, 100)
                }
            },
            clientChoice (pos) {
                return {
                    type_code: 2,
                    name: '被保人',
                    typeField: 'insuredList#' + pos
                }
            },
            ...mapMutations({
                SET_LIFE_POLICYINFO: 'SET_LIFE_POLICYINFO',
                SET_LIFE_INSURED_BENREN: 'SET_LIFE_INSURED_BENREN',
                SET_LIFE_INSURED_OTHER: 'SET_LIFE_INSURED_OTHER'
            })
        },
        components: {
            ITitle,
            ChoicePeople,
            Name,
            Card,
            Sex,
            Birthday,
            Occupation,
            RelationShip,
            Phone,
            Email,
            IdInfoPeriod,
            Postcode,
            Height,
            Weight,
            AnnualIncome,
            Pca,
            StreetInfo,
            OccupationOfDb,
            LovetgtName,
            LovetgtSex
        }
    }
</script>
<style scoped lang="stylus">  
    @import '~common/stylus/variable.styl'
    .info
        width: 100%
        background: #ffffff
</style>