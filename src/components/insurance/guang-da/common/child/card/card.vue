<template>
    <div class="detail">
        <div class="info">
            <p class="desTitle" ref='nameTitle' @click="showSelectdrop()">{{text}}<i class="icon-down_arrow ico"></i></p>
            <p v-if="edit" class="placeholders">
                <input type="text" :placeholder="placeholder" class="placeholdersInput" @focus="clearPlaceholder"  v-model="values" @blur='verValues'/>
            </p>
            <div v-if="!edit">{{values}}</div>
        </div>
        <div :class="this.wrongTip !== '' ? 'errTip' : 'hide'">
            <span class="errIco"></span>
            <span class="errText">{{wrongTip}}</span>
        </div>
        <select-drop :selectArray="selectArray" :selectTitle="selectTitle"  v-show="showSelectdropWrap" 
        @sureSelectDrop="sureSelectDrop" @hideSelectDrop="hideSelectDrop" :default-value="selected"></select-drop>
        <!-- 弹框 -->
        <confirm  ref="confirm" :text="confirmText"></confirm>
    </div>
</template>

<script>
import event from 'common/js/event.js'
import SelectDrop from 'base/select-drops/select-drops'
import {getBirth, getSexId, isCardID} from 'common/js/iscardID-util.js'
import {mapGetters, mapMutations} from 'vuex'
import Confirm from 'base/confirm/confirm'
import {confirm} from 'common/js/mixin.js'
export default {
    mixins: [confirm],
    props: {
        Info: {
            type: Object,
            default: function () {
                return {}
            }
        }
    },
    created() {
    },
    data () {
        return {
            showSelectdropWrap: false,
            selected: '',
            wrongTip: '',
            values: '',
            focus: false
            // edit : true
        }
    },
    computed: {
        selectArray () {
             return this.guangdaPolicy.DicList.idType
        },
        selectTitle () {
            return '请选择证件类型'
        },
        placeholder () {
            return this.focus ? '' : '请填写证件号码'
        },
        text () {
            for (let obj of this.selectArray) {
                if (obj.id === this.selected) {
                    return obj.value
                }
            }
            return '请选择证件类型'
        },
        edit () {
            if (this.Info.type === 'appnt' || this.Info.type === 'insurants' ) {
                return false
            } else if (this.Info.type === 'insured' &&  this.Info.defaultRelationId === '00') {
                return false
            } else {
                return true
            }
        },
        ...mapGetters([
            'guangdaPolicy',
            'guangdaPremiumRisk'
		])
    },
    created () {
        this.setDefault()
    },
     methods: {
        clearPlaceholder () {
            this.focus = true
        }, 
        setDefault () {
            if (this.Info.type === 'appnt' || this.Info.type === 'insurants') {
                //    this.edit = false
                    if (this.Info.type === 'appnt') {
                        this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                            type: 4,
                            field1: this.Info.type,
                            field2: 'idType',
                            value: this.guangdaPremiumRisk.applicant.idType
                        })
                        this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                            type: 4,
                            field1: this.Info.type,
                            field2: 'idNo',
                            value: this.guangdaPremiumRisk.applicant.idNo
                        })
                        this.selected = this.guangdaPremiumRisk.applicant.idType
                        this.values = this.guangdaPremiumRisk.applicant.idNo
                    } else if (this.Info.type === 'insurants') {
                        this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                            type: 4,
                            field1: this.Info.type,
                            field2: 'insurant#0',
                            field3: 'idType',
                            value: this.guangdaPremiumRisk.insured.idType
                        })
                        this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                            type: 4,
                            field1: this.Info.type,
                            field2: 'insurant#0',
                            field3: 'idNo',
                            value: this.guangdaPremiumRisk.insured.idNo
                        })
                        this.selected = this.guangdaPremiumRisk.insured.idType
                        this.values = this.guangdaPremiumRisk.insured.idNo
                    }
            } else {
                if (this.Info.type === 'insured' &&  this.Info.defaultRelationId === '00') {
                    // this.edit = false
                }
                this.selected = this.Info.defaultIdType
                this.values = this.Info.defaultIdNo
            }
        },
        verValues () {
            if ( this.selected === '11') { // 身份证
                this.wrongTip = isCardID(this.values)
                if (this.wrongTip === true) {
                    this.wrongTip = ''
                }
            }
            if (this.wrongTip === '') {
                // this.$emit('getCard',{card:this.values,type:this.Info.type})
                this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                    type: 1,
                    field1: this.Info.type,
                    field2: 'idNo',
                    value: this.values
                })
            } else {
                this.values = ''
            }
        },
        showSelectdrop () {
            if (this.edit) {
                this.showSelectdropWrap = true
            }
		},
		sureSelectDrop (data) {
            if (data.id === '17' || data.id === '23' || data.id === '24' || data.id === '26' || data.id === '20') {
                this.showConfirm('该证件暂时不支持,请选择其它证件类型')
                return false
            } else {
                this.selected = data.id
                this.showSelectdropWrap = false
                this.values = ''
                this.wrongTip = ''
                this.$emit('getCardType',{cardType:this.selected,type:this.Info.type})
                this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                    type: 1,
                    field1: this.Info.type,
                    field2: 'idType',
                    value: data.id
                })
                this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                    type: 1,
                    field1: this.Info.type,
                    field2: 'idNo',
                    value: ''
                })
            }
        },
		hideSelectDrop () {
			this.showSelectdropWrap = false
        },
        setSame () {
            this.selected = this.guangdaPremiumRisk.applicant.idType
            this.values = this.guangdaPremiumRisk.applicant.idNo
        },
        clearSame () {
            this.selected = '11'
            this.values = ''
        },
        ...mapMutations({
           SET_LONGLIFE_GUANGDA_POLICYINFO: 'SET_LONGLIFE_GUANGDA_POLICYINFO'
		})
    },
    components: {
        SelectDrop,
        Confirm
    }
}
</script>

<style lang='stylus' scoped>
@import '~components/insurance/guang-da/common/child/stylus/common.styl'
</style>