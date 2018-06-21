<template>
    <div class="item">
        <div class="inner border-1px">
            <div class="left"><span class="text">持卡人姓名</span></div>
            <div class="right">
                <div v-show="hide">{{defaultValue}}</div>
                <input type="text" class="input-text" v-model="holderNameValue" readonly="readonly" :placeholder="placeholder">
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            defaultValue: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                hide: false,
                holderNameValue: '',
                placeholder: '请输入持卡人姓名'
            }
        },
        created () {
            this.setDefaultHolderNameValue()
        },
        updated () {
            this.setDefaultHolderNameValue()
        },
        methods: {
            setDefaultHolderNameValue () {
                this.holderNameValue = this.defaultValue
            }
        }
    }
</script>
<style scoped lang="stylus">
    @import '~components/insurance/life/first_step/children/common/stylus/common.styl'
</style>