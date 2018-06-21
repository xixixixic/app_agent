<template>
    <div class="info">
        <!-- 标题 -->
        <a-title title="代扣费银行信息" @clickBank="toggleBank" :showBank="showBank"></a-title>
        <div v-if="showBank">
            <!-- 开户银行 -->
            <bank-name v-if="insureFieldsBankName" :insure-fields-bank-name="insureFieldsBankName" :bankListArray="bankList"
             :default-value="defaultReBankCode" ref="bankNameValidate"></bank-name>
            <!-- 持卡人姓名 -->
            <holder-name v-if="insureFieldsHolderName" :insure-fields-holder-name="insureFieldsHolderName" :default-value="defaultHolderName" ref="holderNameValidate"></holder-name>
            <!-- 银行账号 -->
            <bank-num v-if="insureFieldsBankNum" :insure-fields-bank-num="insureFieldsBankNum" :default-value="defaultReAccNo" ref="bankNumValidate"></bank-num>
            <!-- 银行地址 -->
            <bank-address v-if="insureFieldsBankAddress" :insure-fields-bank-address="insureFieldsBankAddress" :default-value="defaultReAreaName" ref="banAddressValidate"></bank-address>
        </div>
    </div>
</template>
<script>
    import ATitle from 'components/insurance/life/first_step/children/common/title/title'
    import BankName from 'components/insurance/life/first_step/children/common/bankName/bankName'
    import HolderName from 'components/insurance/life/first_step/children/common/holderName/holderName'
    import BankNum from 'components/insurance/life/first_step/children/common/bankNum/bankNum'
    import BankAddress from 'components/insurance/life/first_step/children/common/bankAddress/bankAddress'
    import {mapGetters} from 'vuex'
    import {lifeInfoInsureFields} from 'common/js/mixin.js'
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
                showBank: true
            }
        },
        created () {
        },
        computed: {
            ...mapGetters([
                'lifePolicy',
                'lifeApplicant'
            ]),
            /* 开户银行列表信息 */
            bankList () {
                return this.dictionary.bank
            },
            validate () {
                if (this.insureFieldsBankName) {
                    return this.$refs.bankNameValidate.validate &&
                    this.$refs.bankNumValidate.validate &&
                    this.$refs.banAddressValidate.validate
                } else {
                    return true
                }
            }
        },
        methods: {
            toggleBank () {
                this.showBank = !this.showBank
            }
        },
        components: {
            ATitle,
            BankName,
            HolderName,
            BankNum,
            BankAddress
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
