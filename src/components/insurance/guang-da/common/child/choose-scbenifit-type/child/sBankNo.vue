<template>
    <div class="detail">
        <div class="info">
            <p class="desTitle" ref='nameTitle'>生存金的账号</p>
            <p class="placeholders">
                <input type="text" placeholder="请填写生存金的账号" class="placeholdersInput" v-model="BankNo" @blur='verBankNo'/>
            </p>
        </div>
        <div :class="this.BankNoTip !== '' ? 'errTip' : 'hide'">
            <span class="errIco"></span>
            <span class="errText">{{BankNoTip}}</span>
        </div>
    </div>
</template>

<script>
import {checkBankNum} from 'common/js/validate-util.js'
import {mapGetters, mapMutations} from 'vuex'
export default {
    data () {
        return {
            BankNo: '',
            BankNoTip: ''
        }
    },
    created () {
        this.setDefalut()
    },
    computed: {
       ...mapGetters([
            'guangdaTrail'
		])
    },
    methods: {
        setDefalut () {
            this.BankNo = this.guangdaTrail.policy.policyInfo.sBankNo
        },
        verBankNo () {
            this.BankNoTip = checkBankNum(this.BankNo)
            if (this.BankNoTip === '') {
                this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                    type: 4,
                    field1: 'policyInfo',
                    field2: 'sBankNo',
                    value: this.BankNo
                })
            } else {
                this.BankNo = ''
            }
        },
        ...mapMutations({
            SET_LONGLIFE_GUANGDA_POLICYINFO: 'SET_LONGLIFE_GUANGDA_POLICYINFO'
		})
    }
}
</script>

<style lang='stylus' scoped>
@import '~components/insurance/guang-da/common/child/stylus/common.styl'
</style>