<template>
    <div class="detail">
        <div class="info">
            <p class="desTitle" ref='nameTitle'>教育不能提供居民国（地区）纳税人识别号原因程度</p>
        </div>
        <div class="getNum">
            <p class="placeholders" @click="showSelectdrop()" :class="{'active': text === '请选择原因'}">
                {{text}}<i class="icon-down_arrow ico"></i>
            </p>
        </div>
        <div class="detailReason">
            <input type="text" placeholder="请填写具体原因" class="detailReasonInput" v-model='detailReason' @blur='setValue'/>
        </div>
        <select-drop :selectArray="resonArray" :selectTitle="selectTitle"  v-show="showSelectdropWrap" 
        @sureSelectDrop="sureSelectDrop" @hideSelectDrop="hideSelectDrop" :default-value="this.selected"></select-drop>
    </div>
</template>

<script>
import SelectDrop from 'base/select-drop/select-drop'
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
            selectTitle: '选择原因',
            showSelectdropWrap: false,
            selected: '0',
            resonArray: [
                {name: '居民国（地区）不发放纳税人识别号', nativeCode: '1'},
                {name: '账户持有人未能取得纳税人识别号', nativeCode: '2'}
            ],
            detailReason: ''
        }
    },
    computed: {
        text () {
            for (let obj of this.resonArray) {
                if (obj.nativeCode === this.selected) {
                    return obj.name
                }
            }
            return '请选择原因'
        },
        ...mapGetters([
			'changChengBaseInfo'
		])
    },
    created () {
        this.setDefault()
    },
     methods: {
        setDefault () {
            this.selected = this.Info.defaultWhyNoTaxNum
            this.detailReason = this.changChengBaseInfo.reasonInfo
            if (this.Info.type === 'ApplicantTaxBaseInfo') {
                this.detailReason = this.changChengBaseInfo.ApplicantTaxBaseInfo.reasonInfo
            } else {
                this.detailReason = this.changChengBaseInfo.InsuredTaxBaseInfo.reasonInfo
            }
        },
        showSelectdrop () {
            this.showSelectdropWrap = true
		},
		sureSelectDrop (data) {
            this.selected = data.nativeCode
            this.setChangChengBaseInfo({
				field1: this.Info.type,
				field2: 'reason',
				value: data.nativeCode
            })
			this.showSelectdropWrap = false
        },
        setValue () {
            if (this.detailReason !== '') {
                this.setChangChengBaseInfo({
                    field1: this.Info.type,
                    field2: 'reasonInfo',
                    value: this.detailReason
                })
            } else {
                this.setChangChengBaseInfo({
                    field1: this.Info.type,
                    field2: 'reasonInfo',
                    value: ''
                })
            }
		},
		hideSelectDrop () {
			this.showSelectdropWrap = false
        },
        ...mapMutations({
			setChangChengBaseInfo: 'SET_LONGLIFE_CHANGCHENG_BASEINFO'
		})
    },
    components: {
        SelectDrop
    }
}
</script>

<style lang='stylus' scoped>
@import '~components/insurance/chang-cheng/perfect-info/child/stylus/common.styl'
.getNum
    height: (90/$scale)
    line-height: (90/$scale)
    font-size: (28/$scale)
.detailReason
    height: (90/$scale)
    line-height: (90/$scale)
    font-size: (28/$scale)
    .detailReasonInput
        width: 100%
        height: 100%
</style>