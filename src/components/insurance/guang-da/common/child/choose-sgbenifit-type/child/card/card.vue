<template>
    <div class="detail">
        <div class="info">
            <p class="desTitle" ref='nameTitle' @click="showSelectdrop()">{{text}}<i class="icon-down_arrow ico"></i></p>
            <p class="placeholders">
                <input type="text" :placeholder="placeholder" class="placeholdersInput" @focus="clearPlaceholder"  v-model="values" @blur='verValues'/>
            </p>
        </div>
        <div :class="this.wrongTip !== '' ? 'errTip' : 'hide'">
            <span class="errIco"></span>
            <span class="errText">{{wrongTip}}</span>
        </div>
        <select-drop :selectArray="selectArray" :selectTitle="selectTitle"  v-show="showSelectdropWrap" 
        @sureSelectDrop="sureSelectDrop" @hideSelectDrop="hideSelectDrop" :default-value="selected"></select-drop>
    </div>
</template>

<script>
import event from 'common/js/event.js'
import SelectDrop from 'base/select-drops/select-drops'
import {isCardID} from 'common/js/iscardID-util.js'
import {checkNum} from 'common/js/validate-util.js'
import {mapGetters, mapMutations} from 'vuex'
export default {
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
            selected: '11',
            wrongTip: '',
            values: '',
            focus: false
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
            this.selected = this.Info.defaultIdType
            this.values = this.Info.defaultIdNo
        },
        verValues () {
            if ( this.selected === '11') { // 身份证
                this.wrongTip = isCardID(this.values)
                if (this.wrongTip === true) {
                    this.wrongTip = ''
                }
            } else {
                this.wrongTip = checkNum(this.values)
            }
            if (this.wrongTip !== '') {
                this.values = ''
            } 
            this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                type: 4,
                field1: this.Info.type,
                field2: 'bfcyIdCode',
                index:  this.Info.index,
                value: this.values
            })
        },
        showSelectdrop () {
            this.showSelectdropWrap = true
		},
		sureSelectDrop (data) {
            this.selected = data.id
            this.showSelectdropWrap = false
            this.values = ''
            this.wrongTip = ''
            // this.$emit('getCardType1',{cardType:this.selected,type:this.Info.index})
            this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                type: 4,
                field1: this.Info.type,
                field2: 'bfcyIdType',
                index:this.Info.index,
                value: data.id
            })
        },
		hideSelectDrop () {
			this.showSelectdropWrap = false
        },
        ...mapMutations({
           SET_LONGLIFE_GUANGDA_POLICYINFO: 'SET_LONGLIFE_GUANGDA_POLICYINFO'
		})
    },
    components: {
        SelectDrop
    }
}
</script>

<style lang='stylus' scoped>
@import '~components/insurance/guang-da/common/child/stylus/common.styl'
</style>