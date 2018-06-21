<template>
    <div>
        <div class="detail">
            <div class="info">
                <p class="desTitle" ref='nameTitle'>开户银行名</p>
                <p class="placeholders" @click="showSelectdrop()" :class="{'active': text === '请选择银行卡'}">
                    {{text}}<i class="icon-down_arrow ico"></i>
                </p>
            </div>
            <select-drop :selectArray="selectArray" :selectTitle="selectTitle"  v-show="showSelectdropWrap" 
            @sureSelectDrop="sureSelectDrop" @hideSelectDrop="hideSelectDrop" :default-value="this.selected"></select-drop>
        </div>
        <div class="detail">
            <div class="info">
                <p class="desTitle" ref='nameTitle'>银行卡账户</p>
                <p class="placeholders">
                    <input type="text" placeholder="请填写银行卡账户" class="placeholdersInput" v-model="bankNo"  @blur='verBankNo'/>
                </p>
            </div>
            <div :class="this.wrongTip !== '' ? 'errTip' : 'hide'">
                <span class="errIco"></span>
                <span class="errText">{{wrongTip}}</span>
            </div>
        </div>
    </div>
</template>
<script>
import SelectDrop from 'base/select-drops/select-drops'
import {checkBankNum} from 'common/js/validate-util.js'
import {mapGetters, mapMutations} from 'vuex'
export default {
    data () {
        return {
            selectTitle: '请选择银行卡',
            showSelectdropWrap: false,
            selected: '1',
            bankNo: '',
            wrongTip:''
        }
    },
    computed: {
        selectArray () {
            return this.guangdaPolicy.DicList.bank
        },
        text () {
           for (let obj of this.selectArray) {
                if (obj.id === this.selected) {
                    return obj.value
                }
            }
            return '请选择银行卡'
        },
        ...mapGetters([
            'guangdaPolicy',
            'guangdaTrail'
		])
    },
    created () {
        this.setDefault()
    },
     methods: {
        setDefault () {
            this.selected =  this.guangdaTrail.policy.productInfo.bankCode
            this.bankNo = this.guangdaTrail.policy.productInfo.bankAccNo
        },
        showSelectdrop () {
            this.showSelectdropWrap = true
		},
		sureSelectDrop (data) {
            this.showSelectdropWrap = false
            this.selected = data.id
            this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                type: 4,
                field1: 'productInfo',
                field2: 'bankCode',
                value: data.id
            })
		},
		hideSelectDrop () {
			this.showSelectdropWrap = false
        },
        verBankNo() {
          this.wrongTip = checkBankNum(this.bankNo)
          if (this.wrongTip !== '') {
               this.bankNo = ''
            } 
            this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                    type: 4,
                    field1: 'productInfo',
                    field2: 'bankAccNo',
                    value: this.bankNo
            })
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
@import '~components/insurance/chang-cheng/perfect-info/child/stylus/common.styl'
</style>