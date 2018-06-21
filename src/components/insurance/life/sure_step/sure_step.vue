<template>
    <div>
        <div class="container">
            <!-- 险种信息 -->
            <risk :policyViceExtList="policyViceExtList" ref="risk"></risk>
            <!-- 分隔条 -->
            <split></split>
            <!-- 生效日期 -->
            <effectDate :effectDate="effectDate"></effectDate>
            <!-- 分隔条 -->
            <split></split>
            <!-- 投保人信息 -->
            <applicant :applicant="applicant"  :insure-fields="applicantInsureFields"></applicant>
            <!-- 分隔条 -->
            <split></split>
            <!-- 被保人信息 -->
            <insured :insuredExt="insuredExt"  :insure-fields="insuredInsureFields" :dictionary="dictionary"></insured>
            <!-- 分隔条 -->
            <split></split>
            <!-- 受益人信息 -->
            <beneficiary v-if="beneficiaryInsureFields" :beneficiaryExtList="beneficiaryExtList" :insure-fields="beneficiaryInsureFields"></beneficiary>
            <!-- 分隔条 -->
            <split></split>
            <!-- 代扣费信息银行卡信息 -->
            <bank-info v-if="bankInsureFields" :insure-fields="bankInsureFields" :dictionary="dictionary"></bank-info>
            <!-- 分隔条 -->
            <split></split>
            <!-- 注意事项 -->
            <needAttention></needAttention>
            <!-- 分隔条 -->
            <split></split>
            <!-- 投保声明 -->
            <insurance-declaration></insurance-declaration>
            <!-- 我已阅读并接受投保声明全部内容 -->
            <agree ref="agree"></agree>
            <!-- 分隔条 -->
            <split></split>
        </div>
        <insurance-footer @next="next"></insurance-footer>
        <confirm  ref="confirm" :text="confirmText"></confirm>
    </div>
</template>
<script>
    import Split from 'base/split/split'
    import Footer from 'base/footer/footer'
    import Risk from 'components/insurance/life/sure_step/children/risk/risk'
    import EffectDate from 'components/insurance/life/sure_step/children/EffectDate/EffectDate'
    import Applicant from 'components/insurance/life/sure_step/children/applicant/applicant'
    import Insured from 'components/insurance/life/sure_step/children/insured/insured'
    import Beneficiary from 'components/insurance/life/sure_step/children/Beneficiary/Beneficiary'
    import BankInfo from 'components/insurance/life/sure_step/children/bank/bank'
    import NeedAttention from 'components/insurance/life/sure_step/children/needAttention/needAttention'
    import InsuranceDeclaration from 'components/insurance/life/sure_step/children/declaration/declaration'
    import Agree from 'components/insurance/life/sure_step/children/agree/agree'
    import Confirm from 'base/confirm/confirm'
    import {lifeModularInsureFields} from 'common/js/mixin.js'
    import {trial} from 'api/life/insurance.js'
    import {CODE_OK} from 'service/variable.js'
    export default {
        mixins: [lifeModularInsureFields],
        data () {
            return {
                content: {},
                confirmText: '',
                dictionary: {},
                policyId: '', // 保单id
                payCallData: {}

            }
        },
        computed: {
            applicant () {
                return this.lifePolicy.applicantList
            },
            effectDate () {
                return this.lifePolicy.effectDate
            },
            insuredExt () {
                return this.lifePolicy.insuredList
            },
            beneficiaryExtList () {
                return this.lifePolicy.beneficiaryList
            },
            policyViceExtList () {
                return this.lifePolicy.policyViceExtList
            },
            // 支付类型 '0' 是自己支付
            payType () {
                return this.lifeInsuranceRules.payType
            }
        },
        methods: {
            next () {
                if (this.$refs.agree.selected === false) {
                    this.confirmText = '请选择我已阅读并接受投保声明全部内容'
                    this.$refs.confirm.show()
                    return false
                } else {
                    this.postTrial()
                }
            },
            postTrial () {
                trial(this.lifePolicy).then(res => {
                    if (res.data.code === CODE_OK) {
                        if (res.data.result.resultCode === 1) {
                            this.policyId = res.data.result.policyId
                            this.$router.push({
                                path: '/pay_step',
                                query: {
                                    policyId: this.policyId,
                                    totalPrice: this.$refs.risk.totalPrice
                                }
                            })
                        } else {
                            this.confirmText = res.data.result.resultMsg
                            this.$refs.confirm.show()
                        }
                    }
                })
            }
        },
        components: {
            Risk,
            Split,
            EffectDate,
            Applicant,
            Insured,
            Beneficiary,
            NeedAttention,
            InsuranceDeclaration,
            Agree,
            'insurance-footer': Footer,
            Confirm,
            BankInfo
        }
    }
</script>
<style lang="stylus" scoped>
    @import '~common/stylus/mixin.styl'
    .container
        margin-bottom: (80/$scale)
</style>    