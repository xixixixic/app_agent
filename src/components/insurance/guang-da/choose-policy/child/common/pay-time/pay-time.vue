<template>
    <div class="detail">
        <div class="mainInfoLi"><span class="spanLeft">缴费期间</span><span class="spanRight" @click="showSelectdrop()">{{text}}<i class="icon-down_arrow ico"></i></span></div>
        <select-drop :selectArray="payTimeArray" :selectTitle="selectTitle"  v-show="showSelectdropWrap" 
        @sureSelectDrop="sureSelectDrop" @hideSelectDrop="hideSelectDrop" :default-value="selected"></select-drop>
    </div>
</template>

<script>
import SelectDrop from 'base/select-drops/select-drops'
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
    data () {
        return {
            selectTitle: '缴费期间',
            showSelectdropWrap: false,
            selected: ''
        }
    },
    computed: {
        payTimeArray () {
            return this.guangdaPolicy.premiumPeriodList
        },
        text () {
            for (let obj of this.payTimeArray) {
                if (obj.id === this.selected) {
                    return obj.value
                }
            }
            return '请选择'
        },
        ...mapGetters([
            'guangdaPolicy',
            'guangdaMainRisk'
		])
    },
    created () {
        this.setDefault()
    },
     methods: {
        setDefault () {
            this.selected = this.guangdaMainRisk.premiumPeriod.toString()
        },
        showSelectdrop () {
            this.showSelectdropWrap = true
		},
		sureSelectDrop (data) {
            this.selected = data.id.toString()
            this.SET_LONGLIFE_GUANGDA_POLICYINFO({
				field1: 'temPay',
				value: Number(data.id)
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
        SelectDrop
    }
}
</script>
<style lang='stylus' scoped>
@import '~components/insurance/guang-da/choose-policy/child/stylus/common.styl'
</style>