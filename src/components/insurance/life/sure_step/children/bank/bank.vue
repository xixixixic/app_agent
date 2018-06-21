<template>
    <div class="info">
        <!-- 标题 -->
        <div class="title">
            <div class="inner">
                <div class="text">代扣费银行信息</div>
            </div>
        </div>
        <div class="list">
            <!-- 开户银行 -->
            <bank-name v-if="insureFieldsBankName" :content="defaultReBankName"></bank-name>
            <!-- 持卡人姓名 -->
            <holder-name v-if="insureFieldsHolderName" :content="defaultHolderName"></holder-name>
            <!-- 银行账号 -->
            <bank-num v-if="insureFieldsBankNum" :content="defaultReAccNo"></bank-num>
            <!-- 银行地址 -->
            <bank-address v-if="insureFieldsBankAddress" :content="defaultReAreaName"></bank-address>
        </div>
    </div>
</template>
<script>
    import BankName from 'components/insurance/life/sure_step/children/common/bankName/bankName'
    import HolderName from 'components/insurance/life/sure_step/children/common/holderName/holderName'
    import BankNum from 'components/insurance/life/sure_step/children/common/bankNum/bankNum'
    import BankAddress from 'components/insurance/life/sure_step/children/common/bankAddress/bankAddress'
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
        components: {
            BankName,
            HolderName,
            BankNum,
            BankAddress
        }
    }
</script>
<style scoped lang="stylus">  
    @import '~components/insurance/life/sure_step/children/stylus/common.styl'
</style>
