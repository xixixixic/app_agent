<template>
    <div class="detail">
        <div class="info">
            <p class="desTitle" ref='nameTitle'>请选择身故受益人类型</p>
            <p class="placeholders" @click="showSelectdrop()" :class="{'active': text === '请选择身故受益人类型'}">
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
            selectTitle: '选择身故受益人类型',
            showSelectdropWrap: false,
            selected: '',
            sgArray: []
        }
    },
    computed: {
        text () {
            for (let obj of this.sgArray) {
                if (obj.nativeCode === this.selected) {
                    return obj.name
                }
            }
            return '请选择身故受益人类型'
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
            console.log(this.changChengBaseInfo.relaToAppntCode)
            if (this.changChengBaseInfo.insured.relaToAppntCode === '00') {
                this.sgArray = [
                    {'name': '法定', 'nativeCode': '0'},
                    {'name': '其他', 'nativeCode': '2'}
                ]
            } else {
                this.sgArray = [
                    {'name': '法定', 'nativeCode': '0'},
                    {'name': '投保人', 'nativeCode': '1'},
                    {'name': '其他', 'nativeCode': '2'}
                ]
            }
            console.log(this.sgArray)
        },
        showSelectdrop () {
            this.showSelectdropWrap = true
		},
		sureSelectDrop (data) {
            this.selected = data.nativeCode
            this.setChangChengBaseInfo({
				field1: this.Info.type,
				field2: 'sgType',
				value: data.nativeCode
            })
            if (data.nativeCode === '0') { // 身故受益人法定
                console.log(this.Info.type)
                console.log('this.Info.type')
                console.log(this.Info.otherType)
                this.setChangChengBaseInfo({
                    field1: this.Info.type,
                    field2: 'sgBenifitStatus',
                    value: false
                })
                this.setChangChengBaseInfo({
                    field1: this.Info.type,
                    field2: 'addBenifitBtn',
                    value: false
                })
                this.setChangChengBaseInfo({
                    field1: this.Info.otherType,
                    value: []
                })
                this.addSgBenifit()
                this.setChangChengBaseInfo({
                    field1: this.Info.otherType + '#0',
                    field2: 'type',
                    value: '1'
                })
                this.setChangChengBaseInfo({
                    field1: this.Info.otherType + '#0',
                    field2: 'rapidType',
                    value: '2'
                })
                this.setChangChengBaseInfo({
                    field1: 'benificiary',
                    field2: 'sgIndexs',
                    value: -1
                })
                this.setChangChengBaseInfo({
                    field1: this.Info.otherType + '#0',
                    field2: 'oderList',
                    value: [{name: '第1顺序', nativeCode: '1'}]
                })
            } else if (data.nativeCode === '1') { // 身故受益人投保人
                this.setChangChengBaseInfo({
                    field1: this.Info.type,
                    field2: 'sgBenifitStatus',
                    value: false
                })
                this.setChangChengBaseInfo({
                    field1: this.Info.type,
                    field2: 'addBenifitBtn',
                    value: false
                })
                this.setChangChengBaseInfo({
                    field1: this.Info.otherType,
                    value: []
                })
                this.addSgBenifit()
                this.setChangChengBaseInfo({
                    field1: this.Info.otherType + '#0',
                    field2: 'type',
                    value: '1'
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
                })
                this.setChangChengBaseInfo({
                    field1: 'benificiary',
                    field2: 'sgIndexs',
                    value: -1
                })
                this.setChangChengBaseInfo({
                    field1: this.Info.otherType + '#0',
                    field2: 'oderList',
                    value: [{name: '第1顺序', nativeCode: '1'}]
                })
            } else if (data.nativeCode === '2') { // 身故受益人其他
                this.setChangChengBaseInfo({
                    field1: this.Info.otherType,
                    value: []
                })
                this.setChangChengBaseInfo({
                    field1: this.Info.type,
                    field2: 'addBenifitBtn',
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
            addSgBenifit: 'SET_ADD_CHANGCHENG_SGBENIFIT'
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