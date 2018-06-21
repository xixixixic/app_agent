<template>
    <div class="detail">
        <div class="info">
            <p class="desTitle" ref='nameTitle'>年收入</p>
            <div v-if="!edit">{{income}}元</div>
            <p v-if="edit" class="placeholders">
                <input type="text" placeholder="请填写年收入" class="placeholdersInput" v-model="income" @blur='verIncome'/>元
            </p>
        </div>
        <div :class="this.incomeTip !== '' ? 'errTip' : 'hide'">
            <span class="errIco"></span>
            <span class="errText">{{incomeTip}}</span>
        </div>
    </div>
</template>

<script>
import {checkNum} from 'common/js/validate-util.js'
import {mapGetters, mapMutations} from 'vuex'
export default {
    props: {
        Info: {
            type: Object,
            default: function () {
                return {}
            }
        }
    },
    computed: {
        ...mapGetters([
            'guangdaPremiumRisk'
		])
    },
    data () {
        return {
            income: '',
            incomeTip: '',
            edit: true
        }
    },
    created () {
        this.setDefalut()
    },
    methods: {
        setDefalut () {
            if (this.Info.type === 'appnt') {
               this.edit = false
               this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                    type: 4,
                    field1: this.Info.type,
                    field2: 'salary',
                    value: this.guangdaPremiumRisk.applicant.annualIncome
                })
                this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                    type: 4,
                    field1: 'policyInfo',
                    field2: 'annualIncome',
                    value: this.guangdaPremiumRisk.applicant.annualIncome
                })
                this.income = this.guangdaPremiumRisk.applicant.annualIncome
            } else {
                this.income = this.Info.defaultIncome
            }
        },
        verIncome () {
          if (this.edit) {
            this.incomeTip = checkNum(this.income)
            if (this.incomeTip === '') {
                if (this.Info.type === 'insurants') {
                    this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                        type: 4,
                        field1: this.Info.type,
                        field2: 'insurant#0',
                        field3: 'salary',
                        value: Number(this.income).toFixed(1).toString()
                    })
                } else {
                    this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                        field1: this.Info.type,
                        type: 1,
                        field2: 'annualIncome',
                        value: Number(this.income).toFixed(1)
                    })
                }
            }
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