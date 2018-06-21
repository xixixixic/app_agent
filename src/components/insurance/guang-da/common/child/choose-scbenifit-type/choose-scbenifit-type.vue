<template>
    <div class="detail">
        <div class="info">
            <p class="desTitle" ref='nameTitle'>请选择生存金给付方式</p>
            <p class="placeholders" @click="showSelectdrop()" :class="{'active': text === '请选择生存保证金给付方式'}">
                {{text}}<i class="icon-down_arrow ico"></i>
            </p>
        </div>
        <sAccountName></sAccountName>
        <sBankName></sBankName>
        <sBankNo></sBankNo>
        <select-drop :selectArray="sgArray" :selectTitle="selectTitle"  v-show="showSelectdropWrap" 
        @sureSelectDrop="sureSelectDrop" @hideSelectDrop="hideSelectDrop" :default-value="selected"></select-drop>
    </div>
</template>

<script>
import SelectDrop from 'base/select-drops/select-drops'
import sAccountName from 'components/insurance/guang-da/common/child/choose-scbenifit-type/child/sAccountName.vue'
import sBankName from 'components/insurance/guang-da/common/child/choose-scbenifit-type/child/sBankName.vue'
import sBankNo from 'components/insurance/guang-da/common/child/choose-scbenifit-type/child/sBankNo.vue'
import {mapGetters, mapMutations} from 'vuex'
import Confirm from 'base/confirm/confirm'
import {confirm} from 'common/js/mixin.js'
export default {
    mixins: [confirm],
    data () {
        return {
            selectTitle: '选择生存保证金给付方式',
            showSelectdropWrap: false,
            selected:'1'
        }
    },
    computed: {
        sgArray () {
            return this.guangdaPolicy.scbenifitList
        },
        text () {
            for (let obj of this.sgArray) {
                if (obj.id === this.selected) {
                    return obj.value
                }
            }
            return '请选择生存保证金给付方式'
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
            this.selected = this.guangdaTrail.policy.policyInfo.sPaySlt
        },
        showSelectdrop () {
            this.showSelectdropWrap = true
		},
		sureSelectDrop (data) {
            this.selected = data.id
            this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                type: 4,
                field1: 'policyInfo',
                field2: 'sPaySlt',
                value: data.id
            })
			this.showSelectdropWrap = false
		},
		hideSelectDrop () {
			this.showSelectdropWrap = false
        },
        ...mapMutations({
            SET_LONGLIFE_GUANGDA_POLICYINFO: 'SET_LONGLIFE_GUANGDA_POLICYINFO'
		})
    },
    components: {
        SelectDrop,
        sAccountName,
        sBankName,
        sBankNo
    }
}
</script>

<style lang='stylus' scoped>
@import '~components/insurance/guang-da/common/child/stylus/common.styl'
</style>