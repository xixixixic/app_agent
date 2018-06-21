<template>
    <div class="item">
        <div class="inner border-1px" :class="{'active': errorActive}">
            <div class="left">
                <span class="text">{{client.name}}姓名</span>
            </div>
            <div class="right">
                <div v-show="hide">{{defaultValue}}</div>
                <input type="text" class="input-text" :placeholder="placeholder" v-model="nameValue" @focus="clearPlaceholder" @blur="regInfo">
            </div>
        </div>
        <div class="reg border-1px" v-if="errorActive">
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
            insureFieldsName: {
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
                nameValue: '',
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
            // this.firstIn = false
        },
        computed: {
            placeholder () {
                return this.focus ? '' : '请输入' + this.client.name + '的姓名'
            },
            mistakeTip () {
                return validate(this.insureFieldsName, this.nameValue)
            },
            validate () {
                return this.mistakeTip === true
            },
            errorActive () {
                return this.mistakeTip !== true && !(this.firstIn === true && this.nameValue === '')
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
                    field2: 'name',
                    value: this.nameValue
                })
                this.SET_LIFE_POLICYINFO({
                    field1: 'reAccName',
                    value: this.nameValue
                })
                this.setBenrenInfo()
            },
            setDefaultNameValue () {
                this.nameValue = this.defaultValue
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