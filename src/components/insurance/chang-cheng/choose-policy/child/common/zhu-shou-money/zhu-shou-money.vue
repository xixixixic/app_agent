<template>
    <div class="detail">
        <div class="mainInfoLi"><span class="spanLeft">祝寿金领取年龄</span><span class="spanRight" @click="showSelectdrop()">{{text}}<i class="icon-down_arrow ico"></i></span></div>
        <select-drop :selectArray="ZhuShouMoneyArray" :selectTitle="selectTitle"  v-show="showSelectdropWrap" 
        @sureSelectDrop="sureSelectDrop" @hideSelectDrop="hideSelectDrop" :default-value="this.mainDetaiZhuShouMoneyCode"></select-drop>
        <confirm  ref="confirm" :text="confirmText"></confirm>
    </div>
</template>

<script>
import SelectDrop from 'base/select-drop/select-drop'
import {mapGetters, mapMutations} from 'vuex'
import Confirm from 'base/confirm/confirm'
import {confirm} from 'common/js/mixin.js'
export default {
    mixins: [confirm],
    props: {
        mainDetailPilicyType: { // 主险附险类型
            type: String,
            default: function () {
                return ''
            }
        }
    },
    data () {
        return {
            selectTitle: '选择祝寿金领取年龄',
            showSelectdropWrap: false,
            confirmText: ''
        }
    },
    computed: {
        ZhuShouMoneyArray () {
            return this.changChengPolicyInfo.zhushoujin
        },
        mainDetaiZhuShouMoneyCode () {
            return this.changChengPolicyInfo.mainPolicy.getMoneyYearCode
        },
        text () {
            for (let obj of this.ZhuShouMoneyArray) {
                if (obj.nativeCode.toString() === this.mainDetaiZhuShouMoneyCode) {
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
            this.nativeCode = this.mainDetaiZhuShouMoneyCode
        },
        showSelectdrop () {
            if (this.changChengPolicyInfo.mainPolicy.ensurePeriod === '') {
                this.showConfirm('请先选择保险期间')
            } else if (this.changChengPolicyInfo.mainPolicy.renewPeriod === '') {
                this.showConfirm('请先选择缴费期间')
            } else {
                this.showSelectdropWrap = true
            }
		},
		sureSelectDrop (data) {
            this.setChangChengPolicyInfo({
                field1: this.mainDetailPilicyType,
                field2: 'getMoneyYearCode',
                value: data.nativeCode.toString()
            })
            this.setChangChengPolicyInfo({
                field1: this.mainDetailPilicyType,
                field2: 'getMoneyYear',
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
        SelectDrop,
        Confirm
    }
}
</script>

<style lang='stylus' scoped>
@import '~components/insurance/chang-cheng/choose-policy/child/stylus/common.styl'
</style>