<template>
     <div class="detail">
            <div class="info">
                <p class="desTitle" ref='nameTitle'>生存金的银行名称</p>
                <p class="placeholders" @click="showSelectdrop()" :class="{'active': text === '请选择银行'}">
                    {{text}}<i class="icon-down_arrow ico"></i>
                </p>
            </div>
            <select-drop :selectArray="selectArray" :selectTitle="selectTitle"  v-show="showSelectdropWrap" 
            @sureSelectDrop="sureSelectDrop" @hideSelectDrop="hideSelectDrop" :default-value="this.selected"></select-drop>
        </div>
</template>
<script>
import SelectDrop from 'base/select-drops/select-drops'
import {mapGetters, mapMutations} from 'vuex'
export default {
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
            return '请选择银行'
        },
        ...mapGetters([
            'guangdaPolicy',
            'guangdaTrail'
		])
    },
    data () {
        return {
            selectTitle: '请选择银行',
            showSelectdropWrap: false,
            selected: '1'
        }
    },
    created () {
        this.setDefalut()
    },
    methods: {
        setDefalut () {
            this.selectArray.map((item, index, arr) =>{
                if (item.value === this.guangdaTrail.policy.policyInfo.sBankName){
                    this.selected = item.id
                }
            })
        },
        showSelectdrop () {
            this.showSelectdropWrap = true
		},
		sureSelectDrop (data) {
            this.showSelectdropWrap = false
            this.selected = data.id
            this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                    type: 4,
                    field1: 'policyInfo',
                    field2: 'sBankName',
                    value: data.value
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