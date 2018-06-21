<template>
    <div class="detail">
        <div class="mainInfoLi"><span class="spanLeft">保险期间</span><span class="spanRight" @click="showSelectdrop()">{{text}}</span></div>
        <!-- <select-drop :selectArray="policyTimeArray" :selectTitle="selectTitle"  v-show="showSelectdropWrap" 
        @sureSelectDrop="sureSelectDrop" @hideSelectDrop="hideSelectDrop" :default-value="this.mainDetaiPolicyTimeCode"></select-drop> -->
    </div>
</template>

<script>
import SelectDrop from 'base/select-drop/select-drop'
import {mapGetters, mapMutations} from 'vuex'
export default {
    props: {
        mainDetailPolicyTime: { // 接收保险期间
            type: Array,
            default: function () {
                return []
            }
        },
        mainDetaiPolicyTimeCode: { // 接收保险期间code
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
            selectTitle: '选择保险期间',
            showSelectdropWrap: false
        }
    },
    computed: {
        policyTimeArray () {
            if (this.mainDetailPolicyTime.length === 1) {
                this.setChangChengPolicyInfo({
                    field1: this.mainDetailPilicyType,
                    field2: 'ensurePeriodCode',
                    value: '0'
                })
                this.setChangChengPolicyInfo({
                    field1: this.mainDetailPilicyType,
                    field2: 'ensurePeriod',
                    value: '终身'
                })
            }
            return this.mainDetailPolicyTime
        },
        text () {
            for (let obj of this.policyTimeArray) {
                if (obj.nativeCode === this.mainDetaiPolicyTimeCode) {
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
            this.nativeCode = this.mainDetaiPolicyTimeCode
        },
        showSelectdrop () {
            this.showSelectdropWrap = true
		},
		sureSelectDrop (data) {
            this.setChangChengPolicyInfo({
				field1: this.mainDetailPilicyType,
				field2: 'ensurePeriodCode',
				value: data.nativeCode
            })
            this.setChangChengPolicyInfo({
				field1: this.mainDetailPilicyType,
				field2: 'ensurePeriod',
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