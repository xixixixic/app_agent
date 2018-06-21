<template>
    <div class="detail">
        <div class="mainInfoLi"><span class="spanLeft">缴费期间</span><span class="spanRight" @click="showSelectdrop()">{{text}}<i class="icon-down_arrow ico"></i></span></div>
        <select-drop :selectArray="payTimeArray" :selectTitle="selectTitle"  v-show="showSelectdropWrap" 
        @sureSelectDrop="sureSelectDrop" @hideSelectDrop="hideSelectDrop" :default-value="this.mainDetaiPayTimeCode"></select-drop>
    </div>
</template>

<script>
import SelectDrop from 'base/select-drop/select-drop'
import {mapGetters, mapMutations} from 'vuex'
export default {
    props: {
        mainDetailPayTime: { // 接收保险期间
            type: Array,
            default: function () {
                return []
            }
        },
        mainDetaiPayTimeCode: { // 接收保险期间code
            type: String,
            default: function () {
                return ''
            }
        },
        mainDetailPilicyType: { // 主险附险类型
            type: String,
            default: function () {
                return ''
            }
        }
    },
    data () {
        return {
            selectTitle: '选择关系',
            showSelectdropWrap: false
        }
    },
    computed: {
        payTimeArray () {
            return this.mainDetailPayTime
        },
        text () {
            for (let obj of this.payTimeArray) {
                if (obj.nativeCode.toString() === this.mainDetaiPayTimeCode) {
                    return obj.name
                }
            }
            return '请选择'
        },
        ...mapGetters([
			'changChengPolicyInfo'
		])
    },
    created () {
        this.setDefault()
    },
     methods: {
        setDefault () {
            this.nativeCode = this.mainDetaiPayTimeCode
        },
        showSelectdrop () {
            this.showSelectdropWrap = true
		},
		sureSelectDrop (data) {
            this.setChangChengPolicyInfo({
				field1: this.mainDetailPilicyType,
				field2: 'renewPeriodCode',
				value: data.nativeCode
            })
            this.setChangChengPolicyInfo({
				field1: this.mainDetailPilicyType,
				field2: 'renewPeriod',
				value: data.name
            })
			this.showSelectdropWrap = false
		},
		hideSelectDrop () {
			this.showSelectdropWrap = false
        },
        ...mapMutations({
			setChangChengPolicyInfo: 'SET_LONGLIFE_CHANGCHENG_POLICYINFO'
		})
    },
    components: {
        SelectDrop
    }
}
</script>

<style lang='stylus' scoped>
@import '~components/insurance/chang-cheng/choose-policy/child/stylus/common.styl'
</style>