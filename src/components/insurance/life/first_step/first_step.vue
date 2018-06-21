<template>
    <div>
        <loading v-if="showLoading"></loading>
        <div v-else>
            <div class="container">
                <!-- 投保人信息 -->
                <applicant-info :insure-fields="applicantInsureFields" :dictionary="dictionary" ref="applicant"></applicant-info>
                <!-- 分隔条 -->
                <split></split>
                <!-- 被保人信息 -->
                <insured-info :insure-fields="insuredInsureFields" :dictionary="dictionary" ref="insured"></insured-info>
                <!-- 分隔条 -->
                <split></split>
                <!-- 受益人信息 -->
                <beneficiary-info :insure-fields="beneficiaryInsureFields" :dictionary="dictionary" ref="beneficiary"></beneficiary-info>
                <!-- 分隔条 -->
                <split></split>
                <!-- 银行卡信息 -->
                <bank-info v-if="bankInsureFields" :insure-fields="bankInsureFields" :dictionary="dictionary" ref="bank"></bank-info>
            </div>
            <!-- 页脚 -->
            <insurance-footer text="下一步" @next="next"></insurance-footer>
            <!-- 弹框 -->
            <confirm  ref="confirm" :text="confirmText"></confirm>
        </div>
    </div>
</template>
<script>
    import ApplicantInfo from 'components/insurance/life/first_step/children/applicant/applicant'
    import InsuredInfo from 'components/insurance/life/first_step/children/insured/insured'
    import BeneficiaryInfo from 'components/insurance/life/first_step/children/beneficiary/beneficiary'
    import BankInfo from 'components/insurance/life/first_step/children/bank/bank'
    import InsuranceFooter from 'base/footer/footer'
    import Confirm from 'base/confirm/confirm'
    import Loading from 'base/loading/loading'
    import Split from 'base/split/split'
    import {dictionary} from 'api/life/insurance.js'
    import {CODE_OK} from 'service/variable.js'
    import {lifeModularInsureFields, confirm} from 'common/js/mixin.js'
    // import {getBirth} from 'common/js/iscardID-util.js'
    import {mapMutations, mapGetters} from 'vuex'
    export default {
        mixins: [lifeModularInsureFields, confirm],
        data () {
            return {
                showLoading: true,
                dictionary: {},
                defaultSelected: 0
            }
        },
        computed: {
            ...mapGetters([
                'lifeApplicant',
                'lifeInsured'
            ])
        },
        created () {
            this._queryDictionary()
            console.log(this.lifeApplicant)
            console.log('firstStep')
        },
        methods: {
            // 查询字典信息
            _queryDictionary () {
                dictionary(this.lifeInsuranceRules.dictionaryGroupId).then(res => {
                    if (res.data.code === CODE_OK) {
                        this.showLoading = false
                        this.dictionary = res.data.result
                        console.log(this.lifeApplicant)
                        console.log('dictionary')
                    }
                })
            },
            // 校验
            next () {
                if (!this.$refs.applicant.validate) {
                    this.showConfirm('请查看投保人信息是否填写正确!')
                    return false
                } else if (this.lifeApplicant[0].birthday > this.$route.query.appBirthdayStart) {
                    this.showConfirm('投保人出生日期有误，应为' + this.$route.query.appBirthdayStart + '之前')
                    return false
                } else if (!this.$refs.insured.validate) {
                    this.showConfirm('请查看被保人信息是否填写正确!')
                    return false
                } else if (this.lifeInsured[0].relationId !== '5' && (this.lifeInsured[0].birthday < this.$route.query.insuredBirthdayStart || this.lifeInsured[0].birthday > this.$route.query.insuredBirthdayEnd)) {
                    this.showConfirm('被保人出生日期有误，应在' + this.$route.query.insuredBirthdayStart + '~' + this.$route.query.insuredBirthdayEnd + '之间')
                    return false
                } else if (this.lifeInsured[0].relationId === '5' && (this.lifeApplicant[0].birthday < this.$route.query.insuredBirthdayStart || this.lifeApplicant[0].birthday > this.$route.query.insuredBirthdayEnd)) {
                    this.showConfirm('被保人出生日期有误，应在' + this.$route.query.insuredBirthdayStart + '~' + this.$route.query.insuredBirthdayEnd + '之间, 但是由于您选择的被保人关系是仅本人，请您修改投保人的出生日期，如果您的投保人的证件类型是身份证类型，您不在本产品的保障期限内，抱歉！如果您选择的不是身份证类型，请您重新选择出生日期！')
                    return false
                } else if (this.lifePolicy.benefitciaryFlag === '1' && !this.$refs.beneficiary.validate) {
                    this.showConfirm('请查看受益人信息是否填写正确')
                    return false
                } else if (this.lifePolicy.benefitciaryFlag === '1' && this.$refs.beneficiary.validateBeneScale !== 100) {
                    this.showConfirm('请查看受益人比例是否均匀')
                    return false
                } else {
                    console.log(this.lifeApplicant)
                        console.log('jumpto sure_step')
                    // console.log('21331')
                    this.$router.push({
                        path: '/sure_step'
                    })
                }
            },
            ...mapMutations({
                SET_LIFE_POLICYINFO: 'SET_LIFE_POLICYINFO',
                SET_LIFE_INSURED_BENREN: 'SET_LIFE_INSURED_BENREN'
            })
        },
        components: {
            ApplicantInfo,
            InsuredInfo,
            BeneficiaryInfo,
            BankInfo,
            InsuranceFooter,
            Split,
            Confirm,
            Loading
        }
    }
</script>
<style scoped lang="stylus">
    @import '~common/stylus/variable.styl'
    .errmsg
        padding: (10/$scale) (20/$scale)
        line-height: (40/$scale)
        font-size: (28/$scale)
        color: $color-theme
    .container
        margin-bottom: (100/$scale)
</style>