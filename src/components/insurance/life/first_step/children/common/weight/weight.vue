<template>
    <div class="item">
        <div class="inner" :class="{'active': mistakeTip !== true && !(firstIn === true && weightValue === '')}">
            <div class="left"><span class="text">体重(kg)</span></div>
            <div class="right">
                <div v-show="hide">{{defaultWeight}}</div>
                <input type="text" :placeholder="placeholder" @focus="clearPlaceholder" @blur="regInfo" v-model="weightValue" class="input-text">
            </div>
        </div>
        <div class="reg border-1px" v-show="mistakeTip !== true && !(firstIn === true && weightValue === '')">
            <div class="warn"></div>
            <span class="text">{{mistakeTip}}</span>
        </div>
        <confirm ref="confirm" :text="confirmText"></confirm>
    </div>
</template>
<script>
    import Confirm from 'base/confirm/confirm'
    import {validate} from 'components/insurance/life/first_step/children/common/validate/validate-util.js'
    import {setBenRen} from 'common/js/mixin.js'
    import {mapMutations} from 'vuex'
    export default {
        mixins: [setBenRen],
        props: {
            insureFieldsWeight: {
                type: Object,
                default: function () {
                    return {}
                }
            },
            client: {
                type: Object,
                default: {}
            },
            editable: {
                type: Boolean,
                default: true
            },
            defaultWeight: {
                type: String,
                default: ''
            },
            defaultHeight: {
                type: String,
                default: ''
            },
            defaultBirthday: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                focus: false,
                weightValue: '',
                hide: false,
                firstIn: true,
                confirmText: ''
            }
        },
        created () {
            this.setDefaultWeightValue()
        },
        updated () {
            if (!this.editable) {
                this.setDefaultWeightValue()
            }
            this.firstIn = true
        },
        computed: {
            placeholder () {
                return this.focus ? '' : '请输入您的体重'
            },
            mistakeTip () {
                return validate(this.insureFieldsWeight, this.weightValue, 1)
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
                    field2: 'bodyWeight',
                    value: this.weightValue
                })
                this.setBenrenInfo()
                this.confirmText = this.checkBMI()
                this.$refs.confirm.show()
            },
            setDefaultWeightValue () {
                this.weightValue = this.defaultWeight
            },
            checkBMI () {
                console.log(this.defaultBirthday)
                let nowDay = new Date()
                let nowYear = nowDay.getFullYear()
                let birthYear = Number(this.defaultBirthday.split('-')[0])
                if ((nowYear - birthYear) >= 18) {
                    let bmi = this.calculateBMI(this.defaultWeight, this.defaultHeight)
                    if (bmi < 16 || bmi > 29) {
                        return '拒保[BMI超标]'
                    }
                }
                return '正确'
            },
            calculateBMI (a, b) {
                b = b / 100
                let BMI = a / (b * b)
                return BMI
            },
            ...mapMutations({
                SET_LIFE_POLICYINFO: 'SET_LIFE_POLICYINFO'
            })
        },
        components: {
            Confirm
        }
    }
</script>
<style scoped lang="stylus">
    @import '~components/insurance/life/first_step/children/common/stylus/common.styl'
</style>