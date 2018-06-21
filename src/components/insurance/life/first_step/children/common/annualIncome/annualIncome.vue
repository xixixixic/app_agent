<template>
    <div class="item">
        <div class="inner" :class="{'active': errorActive}">
            <div class="left"><span class="text">年固定收入(万元)</span></div>
            <div class="right">
                <div v-show="hide">{{defaultValue}}</div>
                <input type="text" :placeholder="placeholder" @focus="clearPlaceholder" @blur="regInfo" v-model="annualIncomeValue" class="input-text">
            </div>
        </div>
        <div class="reg border-1px" v-show="errorActive">
            <div class="warn"></div>
            <span class="text">{{mistakeTip}}</span>
        </div>
    </div>
</template>
<script>
    import {validate} from 'components/insurance/life/first_step/children/common/validate/validate-util.js'
    import {setBenRen} from 'common/js/mixin.js'
    import {mapMutations} from 'vuex'
    export default {
        mixins: [setBenRen],
        props: {
            insureFieldsAnnualIncome: {
                type: Object,
                default: function () {
                    return {}
                }
            },
            client: {
                type: Object,
                default: {}
            },
            defaultValue: {
                type: String,
                default: ''
            },
            editable: {
                type: Boolean,
                default: true
            }
        },
        data () {
            return {
                hide: false,
                firstIn: true,
                focus: false,
                annualIncomeValue: ''
            }
        },
        created () {
            this.setDefaultAnnualIncomeValue()
        },
        updated () {
            if (!this.editable) {
                this.setDefaultAnnualIncomeValue()
            }
            this.firstIn = true
        },
        computed: {
            placeholder () {
                return this.focus ? '' : '请输入您的收入'
            },
            mistakeTip () {
                return validate(this.insureFieldsAnnualIncome, this.annualIncomeValue, 1)
            },
            validate () {
                return this.mistakeTip === true
            },
            errorActive () {
                return this.mistakeTip !== true && !(this.firstIn === true && this.annualIncomeValue === '')
            }
        },
        methods: {
            clearPlaceholder () {
                this.focus = true
            },
            regInfo () {
                this.focus = false
                this.SET_LIFE_POLICYINFO({
                    field1: this.client.typeField,
                    field2: 'annualIncome',
                    value: this.annualIncomeValue
                })
                this.setBenrenInfo()
            },
            setDefaultAnnualIncomeValue () {
                this.annualIncomeValue = this.defaultValue
            },
            ...mapMutations({
                SET_LIFE_POLICYINFO: 'SET_LIFE_POLICYINFO',
                SET_LIFE_INSURED_BENREN: 'SET_LIFE_INSURED_BENREN'
            })
        }
    }
</script>
<style scoped lang="stylus">
    @import '~components/insurance/life/first_step/children/common/stylus/common.styl'
</style>