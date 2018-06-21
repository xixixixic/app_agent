<template>
    <div class="item">
        <div class="inner" :class="{'active': mistakeTip !== true && !(firstIn === true && streetInfoValue === '')}">
            <div class="left"><span class="text">街道地址</span></div>
            <div class="right">
                <div v-show="hide">{{defaultValue}}</div>
                <input type="text" :placeholder="placeholder" @focus="clearPlaceholder" @blur="regInfo" v-model="streetInfoValue" class="input-text">
            </div>
        </div>
        <div class="reg border-1px" v-show="mistakeTip !== true && !(firstIn === true && streetInfoValue === '')">
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
            insureFieldsStreetInfo: {
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
                streetInfoValue: '',
                hide: false,
                firstIn: true
            }
        },
        created () {
            this.setDefaultStreetInfoValue()
        },
        updated () {
            if (!this.editable) {
                this.setDefaultStreetInfoValue()
            }
            this.firstIn = true
        },
        computed: {
            placeholder () {
                return this.focus ? '' : '请输入您的街道地址'
            },
            mistakeTip () {
                return validate(this.insureFieldsStreetInfo, this.streetInfoValue, 1)
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
                    field2: 'address',
                    value: this.streetInfoValue
                })
                this.setBenrenInfo()
            },
            setDefaultStreetInfoValue () {
                this.streetInfoValue = this.defaultValue
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