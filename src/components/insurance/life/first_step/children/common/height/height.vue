<template>
    <div class="item">
        <div class="inner" :class="{'active': mistakeTip !== true && !(firstIn === true && heightValue === '')}">
            <div class="left"><span class="text">身高(cm)</span></div>
            <div class="right">
                <div v-show="hide">{{defaultValue}}</div>
                <input type="text" :placeholder="placeholder" @focus="clearPlaceholder" @blur="regInfo" v-model="heightValue" class="input-text">
            </div>
        </div>
        <div class="reg border-1px" v-show="mistakeTip !== true && !(firstIn === true && heightValue === '')">
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
            insureFieldsHeight: {
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
                heightValue: '',
                hide: false,
                firstIn: true
            }
        },
        created () {
            this.setDefaultHeightValue()
        },
        updated () {
            if (!this.editable) {
                this.setDefaultHeightValue()
            }
            this.firstIn = true
        },
        computed: {
            placeholder () {
                return this.focus ? '' : '请输入您的身高'
            },
            mistakeTip () {
                return validate(this.insureFieldsHeight, this.heightValue, 1)
            },
            validate () {
                return this.mistakeTip === true
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
                    field2: 'bodyHeight',
                    value: this.heightValue
                })
                this.setBenrenInfo()
            },
            setDefaultHeightValue () {
                this.heightValue = this.defaultValue
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