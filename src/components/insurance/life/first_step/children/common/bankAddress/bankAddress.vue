<template>
    <div>
        <div class="item">
            <div class="inner border-1px">
                <div class="left"><span class="text">银行地址</span></div>
                <div class="right">
                    <div v-show="hide">{{defaultValue}}</div>
                    <span class='text' id="choiceBankAddress"  :class="{'special-text': defaultValue === '请选择地区'}">{{defaultValue}}</span><i class='icon-right_arrow'></i>
                </div>
            </div>
        </div>
        <div id="alertAddress"></div>
    </div>
</template>
<script>
    export default {
        props: {
            insureFieldsBankAddress: {
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
                hide: false,
                area: []
            }
        },
        mounted () {
            this.setDefaultBankValue()
        },
        computed: {
            validate () {
                if (this.defaultValue === '请选择地区') return false
                return true
            }
        },
        methods: {
            setDefaultBankValue () {
                 document.getElementById('choiceBankAddress').innerText = this.defaultValue
            }
        }
    }
</script>
<style scoped lang="stylus">
    @import '~components/insurance/life/first_step/children/common/stylus/common.styl'
</style>