<template>
    <div> 
        <div class="item">
            <div class="inner border-1px" :class="{'active': errorActive}">
                <div class="left" @click="showSelectdrop">
                    <span class="text">{{text}}</span>
                    <i class="icon-down_arrow"></i>
                </div>
                <div class="right">
                    <div v-show="hideText">{{defaultIdNum}}</div>
                    <input type="text" class="input-text" :placeholder="placeholder"  @focus="clearPlaceholder" @blur="regInfo" v-model="cardValue">
                </div>
            </div>
            <div class="reg" v-show="errorActive">
                <div class="warn"></div>
                <span class="text">{{mistakeTip}}</span>
            </div>
        </div>
        <select-Drop :selectArray="cardArray" :defaultValue="defaultIdTypeId" selectTitle="选择证件类型" :client="client" v-show="showSelectdropWrap" @sureSelectDrop="sureSelectDrop" @hideSelectDrop="hideSelectDrop"></select-Drop> 
    </div>
</template>
<script>
    import SelectDrop from 'components/insurance/life/first_step/children/common/selectDrop/selectDrop'
    import {validate} from 'components/insurance/life/first_step/children/common/validate/validate-util.js'
    import {getBirth, getSexId} from 'common/js/iscardID-util.js'
    import {setBenRen} from 'common/js/mixin.js'
    import {mapMutations, mapGetters} from 'vuex'
    export default {
        mixins: [setBenRen],
        props: {
            client: {
                type: Object,
                default: {}
            },
            insureFieldsCard: {
                type: Object,
                default: function () {
                    return {}
                }
            },
            cardArray: {
                type: Array,
                default: function () {
                    return []
                }
            },
            defaultIdTypeId: {
                type: String,
                default: ''
            },
            defaultIdNum: {
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
                cardValue: '',
                nativeCode: '',
                showSelectdropWrap: false,
                hideText: false,
                firstIn: true
            }
        },
        created () {
            this.setDefaultCardValue()
        },
        updated () {
            if (!this.editable) {
                this.setDefaultCardValue()
            }
            this.firstIn = true
        },
        computed: {
            ...mapGetters([
                'lifeInsured'
            ]),
            placeholder () {
                return this.focus ? '' : `请输入${this.client.name}证件号码`
            },
            text () {
                for (let obj of this.cardArray) {
                    if (obj.nativeCode === this.defaultIdTypeId) {
                        return obj.name
                    }
                }
                return '身份证'
            },
            mistakeTip () {
                if (this.nativeCode === '1') {
                    return validate(this.insureFieldsCard, this.cardValue) // 校验身份证
                } else {
                    return true
                }
            },
            validate () {
                return this.mistakeTip === true
            },
            errorActive () {
                return this.mistakeTip !== true && !(this.firstIn === true && this.cardValue === '')
            }
        },
        methods: {
            clearPlaceholder () {
                this.focus = true
            },
            regInfo () {
                this.focus = false
                if (this.nativeCode === '1') {
                    if (this.mistakeTip) {
                        this.SET_LIFE_POLICYINFO({
                            field1: this.client.typeField,
                            field2: 'sex',
                            value: getSexId(this.cardValue) === false ? '1' : getSexId(this.cardValue)
                        })
                        this.SET_LIFE_POLICYINFO({
                            field1: this.client.typeField,
                            field2: 'birthday',
                            value: getBirth(this.cardValue) === false ? '请选择出生日期' : getBirth(this.cardValue)
                        })
                    }
                }
                this.setBenrenInfo()
                this.SET_LIFE_POLICYINFO({
                    field1: this.client.typeField,
                    field2: 'cardNo',
                    value: this.cardValue
                })
            },
            showSelectdrop () {
                this.showSelectdropWrap = true
            },
            sureSelectDrop (data) {
                this.showSelectdropWrap = false
                this.nativeCode = data.nativeCode
                this.cardValue = ''
                this.SET_LIFE_POLICYINFO({
                    field1: this.client.typeField,
                    field2: 'cardType',
                    value: data.nativeCode
                })
                this.SET_LIFE_POLICYINFO({
                    field1: this.client.typeField,
                    field2: 'cardNo',
                    value: ''
                })
                this.setBenrenInfo()
            },
            hideSelectDrop () {
                this.showSelectdropWrap = false
            },
            setDefaultCardValue () {
                this.nativeCode = this.defaultIdTypeId
                this.cardValue = this.defaultIdNum
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
<style lang="stylus"  scoped >
    @import '~components/insurance/life/first_step/children/common/stylus/common.styl'
</style>