<template>
    <div>
         <div class="detail">
            <div class="info">
                <p class="desTitle">总资产</p>
                <p class="placeholders">
                    <input type="text" placeholder="请填写个人总资产" class="placeholdersInput" v-model="totalAssetsvalues" @blur='verTotalAssetsValues'/>元
                </p>
           </div>
            <div :class="this.incomeTip !== '' ? 'errTip' : 'hide'">
                <span class="errIco"></span>
                <span class="errText">{{incomeTip}}</span>
            </div>
        </div>
        <div class="detail">
             <div class="info">
                <p class="desTitle" ref='nameTitle'>家庭年收入</p>
                <p class="placeholders">
                    <input type="text" placeholder="请填写家庭年收入" class="placeholdersInput" v-model="income" @blur='verIncome'/>元
                </p>
            </div>
             <div :class="this.wrongTip !== '' ? 'errTip' : 'hide'">
                <span class="errIco"></span>
                <span class="errText">{{wrongTip}}</span>
            </div>
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
    data () {
        return {
            income: '',
            totalAssetsvalues:'',
            incomeTip: '',
            wrongTip:''
        }
    },
    created () {
        this.setDefalut()
    },
    methods: {
        setDefalut () {
            this.totalAssetsvalues = this.Info.defaultTotalAssets
            this.income = this.Info.defaultFamilyIncome
        },
        verTotalAssetsValues() {
        this.incomeTip = checkNum(this.totalAssetsvalues)
            if (this.incomeTip === '') {
                this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                    type: 4,
                    field1: 'policyInfo',
                    field2: 'totalAssets',
                    value: this.totalAssetsvalues
                })
            } else {
                this.totalAssetsvalues = ''
            }
        },
        verIncome () {
         this.wrongTip = checkNum(this.income)
            if (this.wrongTip === '') {
                    this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                        type: 4,
                        field1: this.Info.type,
                        field2: 'familySalay',
                        value: this.income
                    })
            } else {
                this.income = ''
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