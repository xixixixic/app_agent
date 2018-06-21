<template>
    <div class="detail">
        <div class="mainInfoLi"><span class="spanLeft">缴费期间</span><span class="spanRight" @click="showSelectdrop()">{{text}}<i class="icon-down_arrow ico"></i></span></div>
        <select-drop :selectArray="payTimeArray" :selectTitle="selectTitle"  v-show="showSelectdropWrap" 
        @sureSelectDrop="sureSelectDrop" @hideSelectDrop="hideSelectDrop" :default-value="this.mainDetaiPayTimeCode"></select-drop>
        <confirm  ref="confirm" :text="confirmText"></confirm>
    </div>
</template>

<script>
import SelectDrop from 'base/select-drop/select-drop'
import {mapGetters, mapMutations} from 'vuex'
import {Zhushoujin} from 'api/long-life/chang-cheng/insurance.js'
import {RET_OK, CODE_OK} from 'service/variable.js'
import Confirm from 'base/confirm/confirm'
import {confirm} from 'common/js/mixin.js'
export default {
    mixins: [confirm],
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
            selectTitle: '选择缴费期间',
            showSelectdropWrap: false,
            confirmText: ''
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
			'changChengPolicyInfo', 'changChengBaseInfo'
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
            if (this.changChengPolicyInfo.mainPolicy.ensurePeriod === '') {
                this.showConfirm('请先选择保险期间')
            } else {
                this.showSelectdropWrap = true
            }
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
            let params = {
                productInfo: {
                    productId: this.changChengBaseInfo.productId.toString()
                },
                insuredBaseInfo: this.changChengBaseInfo.insured,
                premiumPeriod: data.nativeCode
            }
            Zhushoujin(params).then(res => {
                console.log(res)
                if (res.ret === RET_OK) {
                    if (res.data.code === CODE_OK) {
                        console.log(res)
                        this.setChangChengPolicyInfo({
                            field1: 'zhushoujin',
                            value: res.data.getMoneyYears
                        })
                        this.showSelectdropWrap = false
                    } else {
                        this.showConfirm(res.data.remarkMsg)
                    }
                }
            })
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