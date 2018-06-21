<template>
    <div class="detail">
        <div class="info">
            <p class="desTitle" ref='nameTitle'>请选择生存受益人类型</p>
            <p class="placeholders" @click="showSelectdrop()" :class="{'active': text === '请选择生存受益人类型'}">
                {{text}}<i class="icon-down_arrow ico"></i>
            </p>
        </div>
        <select-drop :selectArray="sgArray" :selectTitle="selectTitle"  v-show="showSelectdropWrap" 
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
            selectTitle: '选择生存受益人类型',
            showSelectdropWrap: false,
            selected: '',
            sgArray: [
                {'name': '被保人', 'nativeCode': '0'},
                {'name': '投保人', 'nativeCode': '1'},
                {'name': '其他', 'nativeCode': '2'}
            ]
        }
    },
    computed: {
        text () {
            for (let obj of this.sgArray) {
                if (obj.nativeCode === this.selected) {
                    return obj.name
                }
            }
            return '请选择生存受益人类型'
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
            this.selected = this.Info.defaultSgType
        },
        showSelectdrop () {
            this.showSelectdropWrap = true
		},
		sureSelectDrop (data) {
            this.selected = data.nativeCode
            this.setChangChengBaseInfo({
				field1: this.Info.type,
				field2: 'scType',
				value: data.nativeCode
            })
            if (data.nativeCode === '0') {  // 被保人
                this.setChangChengBaseInfo({
                    field1: this.Info.type,
                    field2: 'scBenifitStatus',
                    value: false
                })
                this.setChangChengBaseInfo({
                    field1: this.Info.type,
                    field2: 'addScBenifitBtn',
                    value: false
                })
                this.setChangChengBaseInfo({
                    field1: this.Info.otherType,
                    value: []
                })
                this.addScBenifit()
                this.setChangChengBaseInfo({
                    field1: this.Info.otherType + '#0',
                    field2: 'type',
                    value: '0'
                })
                this.setChangChengBaseInfo({
                    field1: this.Info.otherType + '#0',
                    field2: 'name',
                    value: this.changChengBaseInfo.insured.name
                })
                this.setChangChengBaseInfo({
                    field1: this.Info.otherType + '#0',
                    field2: 'grade',
                    value: '1'
                })
                this.setChangChengBaseInfo({
                    field1: this.Info.otherType + '#0',
                    field2: 'rapidType',
                    value: '1'
                })
                this.setChangChengBaseInfo({
                    field1: this.Info.otherType + '#0',
                    field2: 'lot',
                    value: '1.00'
                })
                this.setChangChengBaseInfo({
                    field1: this.Info.otherType + '#0',
                    field2: 'sex',
                    value: this.changChengBaseInfo.insured.sex
                })
                this.setChangChengBaseInfo({
                    field1: this.Info.otherType + '#0',
                    field2: 'birthday',
                    value: this.changChengBaseInfo.insured.birthday
                })
                this.setChangChengBaseInfo({
                    field1: this.Info.otherType + '#0',
                    field2: 'cardType',
                    value: this.changChengBaseInfo.insured.cardType
                })
                this.setChangChengBaseInfo({
                    field1: this.Info.otherType + '#0',
                    field2: 'cardNo',
                    value: this.changChengBaseInfo.insured.cardNo
                })
                this.setChangChengBaseInfo({
                    field1: this.Info.otherType + '#0',
                    field2: 'relaToInsuredCode',
                    value: '00'
                })
                this.setChangChengBaseInfo({
                    field1: this.Info.otherType + '#0',
                    field2: 'jobCode',
                    value: this.changChengBaseInfo.insured.jobCode
                })
                this.setChangChengBaseInfo({
                    field1: this.Info.otherType + '#0',
                    field2: 'nation',
                    value: this.changChengBaseInfo.insured.nation
                })
                this.setChangChengBaseInfo({
                    field1: this.Info.otherType + '#0',
                    field2: 'cardValidationType',
                    value: this.changChengBaseInfo.insured.iDValiDateType
                })
                this.setChangChengBaseInfo({
                    field1: this.Info.otherType + '#0',
                    field2: 'oderList',
                    value: [{name: '第1顺序', nativeCode: '1'}]
                })
                this.setChangChengBaseInfo({
                    field1: 'benificiary',
                    field2: 'scIndexs',
                    value: -1
                })
            } else if (data.nativeCode === '1') { // 投保人
                this.setChangChengBaseInfo({
                    field1: this.Info.type,
                    field2: 'addScBenifitBtn',
                    value: false
                })
                this.setChangChengBaseInfo({
                    field1: this.Info.type,
                    field2: 'scBenifitStatus',
                    value: false
                })
                this.setChangChengBaseInfo({
                    field1: this.Info.otherType,
                    value: []
                })
                this.addScBenifit()
                this.setChangChengBaseInfo({
                    field1: this.Info.otherType + '#0',
                    field2: 'type',
                    value: '0'
                })
                this.setChangChengBaseInfo({
                    field1: this.Info.otherType + '#0',
                    field2: 'name',
                    value: this.changChengBaseInfo.applicant.name
                })
                this.setChangChengBaseInfo({
                    field1: this.Info.otherType + '#0',
                    field2: 'grade',
                    value: '1'
                })
                this.setChangChengBaseInfo({
                    field1: this.Info.otherType + '#0',
                    field2: 'rapidType',
                    value: '0'
                })
                this.setChangChengBaseInfo({
                    field1: this.Info.otherType + '#0',
                    field2: 'lot',
                    value: '1.00'
                })
                this.setChangChengBaseInfo({
                    field1: this.Info.otherType + '#0',
                    field2: 'sex',
                    value: this.changChengBaseInfo.applicant.sex
                })
                this.setChangChengBaseInfo({
                    field1: this.Info.otherType + '#0',
                    field2: 'birthday',
                    value: this.changChengBaseInfo.applicant.birthday
                })
                this.setChangChengBaseInfo({
                    field1: this.Info.otherType + '#0',
                    field2: 'cardType',
                    value: this.changChengBaseInfo.applicant.cardType
                })
                this.setChangChengBaseInfo({
                    field1: this.Info.otherType + '#0',
                    field2: 'cardNo',
                    value: this.changChengBaseInfo.applicant.cardNo
                })
                this.setChangChengBaseInfo({
                    field1: this.Info.otherType + '#0',
                    field2: 'relaToInsuredCode',
                    value: this.changChengBaseInfo.applicant.relaToInsureCode
                })
                this.setChangChengBaseInfo({
                    field1: this.Info.otherType + '#0',
                    field2: 'jobCode',
                    value: this.changChengBaseInfo.applicant.jobCode
                })
                this.setChangChengBaseInfo({
                    field1: this.Info.otherType + '#0',
                    field2: 'nation',
                    value: this.changChengBaseInfo.applicant.nation
                })
                this.setChangChengBaseInfo({
                    field1: this.Info.otherType + '#0',
                    field2: 'cardValidationType',
                    value: this.changChengBaseInfo.applicant.iDValiDateType
                     // value: this.changChengBaseInfo.applicant.cardValidationType
                })
                this.setChangChengBaseInfo({
                    field1: this.Info.otherType + '#0',
                    field2: 'oderList',
                    value: [{name: '第1顺序', nativeCode: '1'}]
                })
                this.setChangChengBaseInfo({
                    field1: 'benificiary',
                    field2: 'scIndexs',
                    value: -1
                })
            } else if (data.nativeCode === '2') {
                this.setChangChengBaseInfo({
                    field1: this.Info.otherType,
                    value: []
                })
                this.setChangChengBaseInfo({
                    field1: this.Info.type,
                    field2: 'addScBenifitBtn',
                    value: true
                })
            }
			this.showSelectdropWrap = false
		},
		hideSelectDrop () {
			this.showSelectdropWrap = false
        },
        ...mapMutations({
            setChangChengBaseInfo: 'SET_LONGLIFE_CHANGCHENG_BASEINFO',
            addScBenifit: 'SET_ADD_CHANGCHENG_SCBENIFIT'
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