<template>
    <div class="item">
        <div class="inner border-1px">
            <div class="left"><span class="text">银行账号</span></div>
            <div class="right">
                <div v-show="hide">{{defaultValue}}</div>
                <input type="text" class="input-text" :placeholder="placeholder" v-model="bankNumValue" @focus="clearPlaceholder" 
                @blur="regInfo" @keyup="formatBankNum(bankNumValue)" @keydown="formatBankNum(bankNumValue)" >
            </div>
        </div>
    </div>
</template>
<script>
    import {mapMutations} from 'vuex'
    export default {
        props: {
            insureFieldsBankNum: {
                type: Object,
                default: function () {
                    return {}
                }
            },
            defaultValue: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                focus: false,
                bankNumValue: '',
                hide: false
            }
        },
        created () {
            this.setDefaultBankNumValue()
        },
        updated () {
            this.firstIn = false
        },
        computed: {
            placeholder () {
                return this.focus ? '' : '请输入银行账号'
            },
            validate () {
                if (this.bankNumValue === '') return false
                else return true
            }
        },
        methods: {
            clearPlaceholder () {
                this.focus = true
            },
            regInfo () {
                this.focus = false
                this.SET_LIFE_POLICYINFO({
                    field1: 'reAccNo',
                    value: this.bankNumValue
                })
            },
            formatBankNum (obj) {
                if (obj === '') return
                let account = String(obj)
                account = account.substring(0, 22) /* 帐号的总数, 包括空格在内 */
                if (account.match('.[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}') === null) {
                    /* 对照格式 */
                    if (account.match('.[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}|' + '.[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}|' +
                    '.[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}|' + '.[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}') === null) {
                        let accountNumeric = ''
                        let accountChar = ''
                        let i
                        for (i = 0; i < account.length; i++) {
                            accountChar = account.substr(i, 1)
                            if (!isNaN(accountChar) && (accountChar !== ' ')) {
                                accountNumeric = accountNumeric + accountChar
                            }
                        }
                        account = ''
                        for (i = 0; i < accountNumeric.length; i++) {   /* 可将以下空格改为-,效果也不错 */
                            if (i === 4) account = account + ' '  /* 帐号第四位数后加空格 */
                            if (i === 8) account = account + ' '  /* 帐号第八位数后加空格 */
                            if (i === 12) account = account + ' ' /* 帐号第十二位后数后加空格 */
                            account = account + accountNumeric.substr(i, 1)
                        }
                    }
                } else {
                    account = ' ' + account.substring(1, 5) + ' ' + account.substring(6, 10) + ' ' + account.substring(14, 18) + '-' + account.substring(18, 25)
                }
                if (account !== obj) this.bankNumValue = account
            },
            setDefaultBankNumValue () {
                this.bankNumValue = this.defaultValue
            },
            ...mapMutations({
                SET_LIFE_POLICYINFO: 'SET_LIFE_POLICYINFO'
            })
        }
    }
</script>
<style scoped lang="stylus">
    @import '~components/insurance/life/first_step/children/common/stylus/common.styl'
</style>