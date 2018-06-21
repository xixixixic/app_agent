<template>
    <div class="item">
        <div class="inner border-1px" :class="{'active': mistakeTip !== true && !(firstIn === true && lovetgtNameValue === '')}">
            <div class="left">
                <span class="text">心上人的姓名</span>
            </div>
            <div class="right">
                <div v-show="hide">{{defaultValue}}</div>
                <input type="text" class="input-text" :placeholder="placeholder" v-model="lovetgtNameValue" @focus="clearPlaceholder" 
                @blur="regInfo">
            </div>
        </div>
        <div class="reg border-1px" v-show="mistakeTip !== true && !(firstIn === true && lovetgtNameValue === '')">
            <div class="warn"></div>
            <span class="text">{{mistakeTip}}</span>
        </div>
    </div>
</template>
<script>
    import {validate} from 'components/insurance/life/first_step/children/common/validate/validate-util.js'
    import {mapMutations} from 'vuex'
    export default {
        props: {
            client: {
                type: Object,
                default: {}
            },
            insureFieldsLovetgtName: {
                type: Object,
                default: function () {
                    return {}
                }
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
                lovetgtNameValue: '',
                hide: false,
                firstIn: true
            }
        },
        created () {
            this.setDefaultNameValue()
        },
        updated () {
            if (!this.editable) {
                this.setDefaultNameValue()
            }
            this.firstIn = false
        },
        computed: {
            placeholder () {
                return this.focus ? '' : '请输入心上人的姓名'
            },
            mistakeTip () {
                return validate(this.insureFieldsLovetgtName, this.lovetgtNameValue)
            },
            validate () {
                return this.mistakeTip === true
            }
        },
        methods: {
            show () {
                this.focus = true
            },
            clearPlaceholder () {
                this.focus = true
            },
            regInfo () {
                this.focus = false
                this.SET_LIFE_POLICYINFO({
                    field1: this.client.typeField,
                    field2: 'loveTgtName',
                    value: this.lovetgtNameValue
                })
            },
            setDefaultNameValue () {
                this.lovetgtNameValue = this.defaultValue
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