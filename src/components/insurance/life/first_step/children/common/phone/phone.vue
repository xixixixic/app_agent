<template>
    <div class="item">
        <div class="inner" :class="{'active': mistakeTip !== true && !(firstIn === true && phoneValue === '')}">
            <div class="left"><span class="text">手机号</span></div>
            <div class="right">
                <div v-show="hide">{{defaultValue}}</div>
                <input type="text" :placeholder="placeholder" @focus="clearPlaceholder" @blur="regInfo" v-model="phoneValue" class="input-text">
            </div>
        </div>
        <div class="reg border-1px" v-show="mistakeTip !== true && !(firstIn === true && phoneValue === '')">
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
            insureFieldsMobile: {
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
                focus: false,
                phoneValue: '',
                hide: false,
                firstIn: true
            }
        },
        created () {
            this.setDefaultPhoneValue()
        },
        mounted () {
        },
        updated () {
            if (!this.editable) {
                this.setDefaultPhoneValue()
            }
            this.firstIn = false
        },
        computed: {
            placeholder () {
                return this.focus ? '' : '用来接收保单生效通知'
            },
            mistakeTip () {
                return validate(this.insureFieldsMobile, this.phoneValue)
            },
            validate () {
                return this.mistakeTip === true
            },
            errorActive () {
                return this.mistakeTip !== true && !(this.firstIn === true && this.phoneValue === '')
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
                    field2: 'phone',
                    value: this.phoneValue
                })
                this.setBenrenInfo()
            },
            setDefaultPhoneValue () {
                this.phoneValue = this.defaultValue
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