<template>
    <div>
        <div class="item">
            <div class="inner border-1px">
                <div class="left">
                    <span class="text">开户银行</span>
                </div>
                <div class="right" @click="showSelectdrop">
                    <div v-show="hide">{{defaultValue}}</div>
                    <span class="text" :class="{'special-text': openingBankValue === '请选择银行'}">{{openingBankValue}}</span><i class="icon-right_arrow"></i>
                </div>
            </div>
        </div>
        <select-Drop :selectArray="bankListArray" :defaultValue="defaultValue" selectTitle="请选择银行" v-show="showSelectdropWrap" @sureSelectDrop="sureSelectDrop" @hideSelectDrop="hideSelectDrop">
        </select-Drop> 
    </div>
</template>
<script>
    import SelectDrop from 'components/insurance/life/first_step/children/common/selectDrop/selectDrop'
    import {mapMutations} from 'vuex'
    export default {
        props: {
            bankListArray: {
                type: Array,
                default: function () {
                    return []
                }
            },
            defaultValue: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                hide: false,
                showSelectdropWrap: false,
                nativeCode: ''
            }
        },
        created () {
            console.log(this.defaultValue)
        },
        computed: {
            openingBankValue () {
                for (let obj of this.bankListArray) {
                    if (obj.nativeCode === this.defaultValue) {
                        return obj.name
                    }
                }
                return '请选择银行'
            },
            validate () {
                if (this.openingBankValue === '请选择银行') return false
                return true
            }
        },
        methods: {
            showSelectdrop () {
                this.showSelectdropWrap = true
            },
            sureSelectDrop (data) {
                this.showSelectdropWrap = false
                this.nativeCode = data.nativeCode
                this.SET_LIFE_POLICYINFO({
                    field1: 'reBankCode',
                    value: data.nativeCode
                })
                this.SET_LIFE_POLICYINFO({
                    field1: 'reBankName',
                    value: data.name
                })
            },
            hideSelectDrop () {
                this.showSelectdropWrap = false
            },
            ...mapMutations({
                SET_LIFE_POLICYINFO: 'SET_LIFE_POLICYINFO'
            })
        },
        components: {
            SelectDrop
        }
    }
</script>
<style scoped lang="stylus">
    @import '~components/insurance/life/first_step/children/common/stylus/common.styl'
</style>