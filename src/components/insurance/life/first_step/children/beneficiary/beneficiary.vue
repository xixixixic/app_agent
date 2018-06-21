<template>
    <div class="info">
        <b-title title="受益人信息" :state='client.type_code' @clickBeneficiary="toggleBeneficiary" :showBeneficiary="showBeneficiary"></b-title>
        <div v-show="showBeneficiary" class="info">
             <choice-people v-if="beneficaryType === '0'" :choiceType="choiceType" :choiceTypeValue="selectedChoiceText" :defaultSelected="beneficaryType === '1' ? 1 : 0"></choice-people>
             <choice-people v-else　:choiceType="choiceType" :choiceTypeValue="choiceText"  @choice="choice"  :defaultSelected="benefitciaryFlag === '1' ? 0 : 1"></choice-people>
            <div v-if="benefitciaryFlag === '1'" v-for="(item,index) in lifeBeneficiaryList">
                <split v-if="index !== 0"></split>
                <!-- 姓名 -->
                <name v-if="insureFieldsName" :client="clientChoice(index)" :insure-fields-name="insureFieldsName" :default-value="item.name" ref="nameValidate"></name>
                <!-- 与被保人关系 -->
                <relationShip v-if="insureFieldsRelationShip"  :client="clientChoice(index)" :relationId="item.relationId" :relationArray="relation" ref="relationValidate"></relationShip>
                <!-- 证件号码及类型 -->
                <card v-if="insureFieldsIdInfo" :client="clientChoice(index)" :insure-fields-card="insureFieldsIdInfo" :cardArray="idInfo" :default-id-type-id="item.cardType" :default-id-num="item.cardNo"  ref="cardValidate"></card>
                <!-- 性别 -->
                <sex v-if="insureFieldsSex" :client="clientChoice(index)" :sexArray="dictionary.sex" :default-sex-id="item.sex"  :sex-editable="item.cardType === '1'"></sex>
                <!-- 出生日期 -->
                <birthday v-if="insureFieldsBirthday"  :client="clientChoice(index)" :default-birthday="item.birthday"  :birthday-editable="item.cardType === '1'"></birthday>
                <!-- 证件有效期 -->
                <id-info-period v-if="insureFieldsIdInfoPeriod" :client="clientChoice(index)" :insure-fields-idinfo-period="insureFieldsIdInfoPeriod" 
                :default-value="item.idTypeValidate" ref="idInfoPeriodValidate"></id-info-period>
                <!-- 受益顺序 -->
                <bene-order v-if="insureFieldsBeneOrder" :client="clientChoice(index)" :insure-fields-bene-order="insureFieldsBeneOrder" 
                :default-value="index" ref="beneOrderValidate"></bene-order>
                <!-- <bene-order v-if="insureFieldsBeneOrder && index===1" :client="clientChoice(index)" :insure-fields-bene-order="insureFieldsBeneOrder" 
                default-value="第二受益人" ref="beneOrderValidate"></bene-order>
                <bene-order v-if="insureFieldsBeneOrder && index===2" :client="clientChoice(index)" :insure-fields-bene-order="insureFieldsBeneOrder" 
                default-value="第三受益人" ref="beneOrderValidate"></bene-order> -->
                <!-- 受益比例 -->
                <bene-scale v-if="insureFieldsBeneScale" :client="clientChoice(index)" :insure-fields-bene-scale="insureFieldsBeneScale" :default-value="item.benefScale" ref="beneScaleValidate"></bene-scale>          
                <div v-if="beneficaryType === '1'" class="add-container">
                    <div class="add-btn" @click="deleteItem(item)">
                        <span class="text">删除受益人</span>
                    </div>     
                </div>
            </div>
            <split v-if="lifeBeneficiaryList.length !== 0"></split>
            <div v-if="benefitciaryFlag === '1'" class="add-container">
                <div class="add-btn" @click="addBenefitciary">
                    <span class="text">+添加受益人</span>
                </div>     
            </div>
        </div>
    </div>
</template>
<script>
    import Split from 'base/split/split'
    import Title from 'components/insurance/life/first_step/children/common/title/title'
    import ChoicePeople from 'components/insurance/life/first_step/children/common/choicePeople/choicePeople'
    import Name from 'components/insurance/life/first_step/children/common/name/name'
    import Card from 'components/insurance/life/first_step/children/common/card/card'
    import RelationShip from 'components/insurance/life/first_step/children/common/relationShip/relationShip'
    import IdInfoPeriod from 'components/insurance/life/first_step/children/common/idInfoPeriod/idInfoPeriod'
    import Sex from 'components/insurance/life/first_step/children/common/sex/sex'
    import Birthday from 'components/insurance/life/first_step/children/common/birthday/birthday'
    import BeneOrder from 'components/insurance/life/first_step/children/common/beneOrder/beneOrder'
    import BeneScale from 'components/insurance/life/first_step/children/common/beneScale/beneScale'
    import {lifeInfoInsureFields} from 'common/js/mixin.js'
    import {BENEFICIARY} from 'components/insurance/life/first_step/children/client-type.js'
    import {mapGetters, mapMutations} from 'vuex'
    export default {
        mixins: [lifeInfoInsureFields],
        props: {
            insureFields: {
                type: Object,
                default: {}
            },
            dictionary: {
                type: Object,
                default: {}
            }
        },
        data () {
            return {
                choiceType: '受益人',
                showBeneficiary: true,
                client: BENEFICIARY,
                choiceText: ['指定受益人', '法定受益人'],
                selectedChoiceText: ['法定受益人']
            }
        },
        created () {
        },
        computed: {
            ...mapGetters([
                'lifePolicy',
                'lifeInsuranceRules',
                'lifeBeneficiaryList'
            ]),
            beneficaryType () {
                return this.lifeInsuranceRules.beneficaryType
            },
            benefitciaryFlag () {
                return this.lifePolicy.benefitciaryFlag
            },
            /* ------------------------------------- 设置关系-------------------------------------- */
            choiceTypeValue () {
                if (this.benefitciaryFlag === '1') {
                    return this.choiceText
                } else {
                    return this.selectedChoiceText
                }
            },
            /* ----------------------------------- 获取下拉值 ------------------------------------ */
            idInfo () {
                return this.dictionary.idInfo
            },
            relation () {
                return this.dictionary.relation
            },
            // ************************************* 校验结果 *****************************************************
            validate () {
                if (this.benefitciaryFlag === '1') {
                    for (let i = 0; i < this.lifeBeneficiaryList.length; i++) {
                        if (this.insureFieldsName && !this.$refs.nameValidate[i].validate) return false
                        if (this.insureFieldsRelationShip && this.$refs.relationValidate[i].defaultRelationId === '请选择关系') return false
                        if (this.insureFieldsIdInfo && !this.$refs.cardValidate[i].defaultValue === '') return false
                        if (this.insureFieldsIdInfoPeriod && this.$refs.idInfoPeriodValidate[i].defaultValue === '请选择证件有效期') return false
                        if (this.insureFieldsBeneOrder && this.$refs.beneOrderValidate[i].defaultValue === '请选择受益顺序') return false
                        if (this.insureFieldsBeneScale && !this.$refs.beneScaleValidate[i].validate) return false
                    }
                    return true
                } else {
                    console.log('2323')
                    return true
                }
            },
            validateBeneScale () {
                if (this.benefitciaryFlag === '1') {
                    let benefScale = 0
                    for (let key in this.lifeBeneficiaryList) {
                        if (this.lifeBeneficiaryList[key].benefScale !== '') {
                            benefScale += parseInt(this.lifeBeneficiaryList[key].benefScale)
                        }
                    }
                    return benefScale
                } else {
                    return true
                }
            }
        },
        methods: {
            toggleBeneficiary () {
                this.showBeneficiary = !this.showBeneficiary
            },
            choice (index) {
                if (index === 1) {
                    this.SET_LIFE_POLICYINFO({
                        field1: 'benefitciaryFlag',
                        value: '0'
                    })
                } else {
                    setTimeout(() => {
                        this.SET_LIFE_POLICYINFO({
                            field1: 'benefitciaryFlag',
                            value: '1'
                        })
                    }, 100)
                }
            },
            addBenefitciary () {
                this.SET_ADD_LIFE_BENEFITCIARY()
            },
            deleteItem (item) {
                this.SET_DELETE_LIFE_BENEFITCIARY(item)
            },
            clientChoice (pos) {
                return {
                    type_code: 3,
                    name: '受益人',
                    typeField: 'beneficiaryList#' + pos
                }
            },
            ...mapMutations({
                SET_LIFE_POLICYINFO: 'SET_LIFE_POLICYINFO',
                SET_ADD_LIFE_BENEFITCIARY: 'SET_ADD_LIFE_BENEFITCIARY',
                SET_DELETE_LIFE_BENEFITCIARY: 'SET_DELETE_LIFE_BENEFITCIARY'
            })
        },
        components: {
            'b-title': Title,
            ChoicePeople,
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
<style scoped lang="stylus">  
    @import '~common/stylus/mixin.styl'
    .info
        width: 100%
        background: #ffffff
    .add-container
        padding: (40/$scale)
        .add-btn
            margin 0 auto
            width: (320/$scale)
            height: (70/$scale)
            line-height @height
            color $color-theme
            font-size (30/$scale)
            text-align center
            border (2/$scale) solid $color-theme
            border-radius: (35/$scale)            
</style>