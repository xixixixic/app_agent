<template>
    <div class="detail">
        <div class="info">
            <p class="desTitle" ref='nameTitle' @click="showSelectdrop()">{{text}}<i class="icon-down_arrow ico"></i></p>
            <p class="placeholders">
                <input type="text" placeholder="请填写证件号码" class="placeholdersInput" v-model="values" @blur='verValues'/>
            </p>
        </div>
        <div :class="this.wrongTip !== '' ? 'errTip' : 'hide'">
            <span class="errIco"></span>
            <span class="errText">{{wrongTip}}填写有误</span>
        </div>
        <select-drop :selectArray="nationArray" :selectTitle="selectTitle"  v-show="showSelectdropWrap" 
        @sureSelectDrop="sureSelectDrop" @hideSelectDrop="hideSelectDrop" :default-value="this.selected"></select-drop>
        <confirm  ref="confirm" :text="confirmText"></confirm>
    </div>
</template>

<script>
import SelectDrop from 'base/select-drop/select-drop'
import {mapGetters, mapMutations} from 'vuex'
import {isHukou, RegHuZhao, RegJunguanZheng, RegWaiGuoRen, RegJingGuan, getBirth, getSexId} from 'common/js/iscardID-util.js'
import Confirm from 'base/confirm/confirm'
import {confirm} from 'common/js/mixin.js'
export default {
    mixins: [confirm],
    props: {
        Info: {
            type: Object,
            default: function () {
                return {}
            }
        },
        client: {
            type: Object,
            default: function () {
                return {}
            }
        }
    },
    data () {
        return {
            selectTitle: '选择国籍',
            showSelectdropWrap: false,
            selected: '0',
            wrongTip: '',
            values: '',
            sex: '',
            confirmText: ''
        }
    },
    computed: {
        nationArray () {
            return this.changChengBaseInfo.init.cardTypes
        },
        text () {
            for (let obj of this.nationArray) {
                if (obj.nativeCode === this.selected) {
                    return obj.name
                }
            }
            return '请选择证件类型'
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
            if (this.client.types === 'sgbenificiary') {
                this.selected = this.changChengBaseInfo.sgbenificiary[this.client.num].cardType
                this.values = this.changChengBaseInfo.sgbenificiary[this.client.num].cardNo
            } else {
                this.selected = this.changChengBaseInfo.scbenificiary[this.client.num].cardType
                this.values = this.changChengBaseInfo.scbenificiary[this.client.num].cardNo
            }
        },
        verValues () {
            if (getSexId(this.values) === '1') {
                this.sex = '男'
                this.setChangChengBaseInfo({
                    field1: this.client.typeField,
                    field2: 'sex',
                    value: '0'
                })
            } else { // 2
                this.sex = '女'
                this.setChangChengBaseInfo({
                    field1: this.client.typeField,
                    field2: 'sex',
                    value: '1'
                })
            }
            let num = this.selected
            if (num === '0' || num === '4') { // 身份证验证
                if (isHukou(this.values) === true) {
                    let bb = getBirth(this.values)
                    this.setChangChengBaseInfo({
                        field1: this.client.typeField,
                        field2: 'cardNo',
                        value: this.values
                    })
                    this.setChangChengBaseInfo({
                        field1: this.client.typeField,
                        field2: 'birthday',
                        value: bb
                    })
                } else {
                    this.showConfirm(isHukou(this.values))
                    this.values = '' 
                }
            } else if (num === '1') { // 护照验证
                if (RegHuZhao(this.values) === true) {
                    this.setChangChengBaseInfo({
                        field1: this.client.typeField,
                        field2: 'cardNo',
                        value: this.values
                    })       
                } else {
                    this.showConfirm(RegHuZhao(this.values))
                    this.values = '' 
                }
            } else if (num === '2') { // 军官证
                if (RegJunguanZheng(this.values) === true) {
                    this.setChangChengBaseInfo({
                        field1: this.client.typeField,
                        field2: 'cardNo',
                        value: this.values
                    })              
                } else {
                    this.showConfirm(RegJunguanZheng(this.values))
                    this.values = '' 
                }
            } else if (num === '3') { // 异常身份证
                if (this.values !== '') {
                    this.setChangChengBaseInfo({
                        field1: this.client.typeField,
                        field2: 'cardNo',
                        value: this.values
                    })          
                } else {
                    this.showConfirm('证件号码不能为空')
                    this.values = '' 
                }
            } else if (num === '7') { // 户口本和出生证
                if (this.values !== '') {
                    this.setChangChengBaseInfo({
                        field1: this.client.typeField,
                        field2: 'cardNo',
                        value: this.values
                    })          
                } else {
                    this.showConfirm('证件号码不能为空')
                    this.values = '' 
                } 
            } else if (num === '5') { // 外国人永久居留证
                if (RegWaiGuoRen(this.values) === true) {
                    this.setChangChengBaseInfo({
                        field1: this.client.typeField,
                        field2: 'cardNo',
                        value: this.values
                    })          
                } else {
                    this.showConfirm(RegWaiGuoRen(this.values))
                    this.values = '' 
                }
            } else if (num === '6') { // 警官证
                if (RegJingGuan(this.values) === true) {
                    this.setChangChengBaseInfo({
                        field1: this.client.typeField,
                        field2: 'cardNo',
                        value: this.values
                    })          
                } else {
                    this.showConfirm(RegJingGuan(this.values))
                    this.values = '' 
                }
            } else if (num === '8') { // 其他
                if (this.values !== '') {
                    this.setChangChengBaseInfo({
                        field1: this.client.typeField,
                        field2: 'cardNo',
                        value: this.values
                    })          
                } else {
                    this.showConfirm('证件号码不能为空')
                    this.values = '' 
                }
            }
        },
        showSelectdrop () {
            this.showSelectdropWrap = true
		},
		sureSelectDrop (data) {
            this.selected = data.nativeCode
            this.setChangChengBaseInfo({
				field1: this.client.typeField,
				field2: 'cardType',
				value: data.nativeCode
            })
            this.setChangChengBaseInfo({
                field1: this.client.typeField,
                field2: 'cardNo',
                value: ''
            })
            this.setChangChengBaseInfo({
                field1: this.client.typeField,
                field2: 'sex',
                value: '0'
            })
            this.setChangChengBaseInfo({
                field1: this.client.typeField,
                field2: 'birthday',
                value: ''
            })
            this.values = ''
			this.showSelectdropWrap = false
		},
		hideSelectDrop () {
			this.showSelectdropWrap = false
        },
        ...mapMutations({
			setChangChengBaseInfo: 'SET_LONGLIFE_CHANGCHENG_BASEINFO'
		})
    },
    components: {
        SelectDrop,
        Confirm
    }
}
</script>

<style lang='stylus' scoped>
@import '~components/insurance/chang-cheng/perfect-info/child/stylus/common.styl'
</style>