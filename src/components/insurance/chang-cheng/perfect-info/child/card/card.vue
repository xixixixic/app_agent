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
            <span class="errText">{{wrongTip}}</span>
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
        }
    },
    data () {
        return {
            selectTitle: '选择证件类型',
            showSelectdropWrap: false,
            // selected: '0',
            wrongTip: '',
            values: '',
            confirmText: '',
            nations: '',
            sexx: ''
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
        sex () {
            return this.Info.defaultSex
        },
        selected () {
            return this.Info.defaultCardType
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
            // this.selected = this.Info.defaultCardType
            this.values = this.Info.defaultCardNum
        },
        verValues () {
            console.log(this.selected)
            let num = this.selected
            if (num === '0' || num === '4') { // 身份证和户口本验证
                if (isHukou(this.values) === true) {
                    let bb = getBirth(this.values)
                    let sexCard = Number(getSexId(this.values)) - 1
                    console.log(sexCard + 'sexCard')
                    console.log(this.sex + ':this.sex')
                    if (bb !== this.Info.defaultBirthday) {
                        this.showConfirm('证件日期与出生日期不一致，请重新填写')
                        this.values = ''
                        this.setChangChengBaseInfo({
                            field1: this.Info.type,
                            field2: 'cardNo',
                            value: ''
                        })
                    } else if (sexCard !== Number(this.sex)) {
                        this.showConfirm('证件日期性别与录入不一致，请重新填写')
                        this.values = ''
                        this.setChangChengBaseInfo({
                            field1: this.Info.type,
                            field2: 'cardNo',
                            value: ''
                        })
                    } else {
                        this.wrongTip = ''
                        this.setChangChengBaseInfo({
                            field1: this.Info.type,
                            field2: 'cardNo',
                            value: this.values
                        })   
                    }           
                } else {
                    this.wrongTip = isHukou(this.values)
                    this.values = '' 
                }
            } else if (num === '1') { // 护照验证
                if (RegHuZhao(this.values) === true) {
                    this.wrongTip = ''
                    this.setChangChengBaseInfo({
                        field1: this.Info.type,
                        field2: 'cardNo',
                        value: this.values
                    })          
                } else {
                    this.wrongTip = RegHuZhao(this.values)
                    this.values = '' 
                }
            } else if (num === '2') { // 军官证
                if (RegJunguanZheng(this.values) === true) {
                        this.wrongTip = ''
                        this.setChangChengBaseInfo({
                            field1: this.Info.type,
                            field2: 'cardNo',
                            value: this.values
                        })               
                } else {
                    this.wrongTip = RegJunguanZheng(this.values)
                    this.values = '' 
                }
            } else if (num === '3') { // 异常身份证
                if (this.values !== '') {
                    this.wrongTip = ''
                    this.setChangChengBaseInfo({
                        field1: this.Info.type,
                        field2: 'cardNo',
                        value: this.values
                    })          
                } else {
                    this.wrongTip = '此项不能为空'
                    this.values = '' 
                }
            } else if (num === '7') { // 出生证
                if (this.values !== '') {
                    this.wrongTip = ''
                    this.setChangChengBaseInfo({
                        field1: this.Info.type,
                        field2: 'cardNo',
                        value: this.values
                    })          
                } else {
                    this.wrongTip = '此项不能为空'
                    this.values = '' 
                } 
            } else if (num === '5') { // 外国人永久居留证
                if (RegWaiGuoRen(this.values) === true) {
                    this.wrongTip = ''
                    this.setChangChengBaseInfo({
                        field1: this.Info.type,
                        field2: 'cardNo',
                        value: this.values
                    })          
                } else {
                    this.wrongTip = RegWaiGuoRen(this.values)
                    this.values = '' 
                }
            } else if (num === '6') { // 警官证
                if (RegJingGuan(this.values) === true) {
                    this.wrongTip = ''
                    this.setChangChengBaseInfo({
                        field1: this.Info.type,
                        field2: 'cardNo',
                        value: this.values
                    })          
                } else {
                    this.wrongTip = RegJingGuan(this.values)
                    this.values = '' 
                }
            } else if (num === '8') { // 其他
                if (this.values !== '') {
                    this.wrongTip = ''
                    this.setChangChengBaseInfo({
                        field1: this.Info.type,
                        field2: 'cardNo',
                        value: this.values
                    })          
                } else {
                    this.wrongTip = '此项不能为空'
                    this.values = '' 
                }
            }
        },
        showSelectdrop () {
            this.showSelectdropWrap = true
		},
		sureSelectDrop (data) {
            // this.selected = data.nativeCode
            this.Info.defaultCardType = data.nativeCode
            this.setChangChengBaseInfo({
                field1: this.Info.type,
                field2: 'cardNo',
                value: ''
            })
            this.values = ''
            if (this.Info.type === 'applicant') {
                if (data.nativeCode === '4' || data.nativeCode === '7') {
                    this.showConfirm('请选择别的证件类型')
                    this.setChangChengBaseInfo({
                        field1: this.Info.type,
                        field2: 'cardType',
                        value: ''
                    })
                    this.setChangChengBaseInfo({
                        field1: this.Info.type,
                        field2: 'cardTypeName',
                        value: ''
                    })
                    // this.selected = this.Info.defaultCardType
                } else if (data.nativeCode === '1') { // 护照验证
                    if (this.changChengBaseInfo.applicant.nation === 'CHN') {
                            this.showConfirm('证件类型与国籍冲突，请重新选择')
                            this.setChangChengBaseInfo({
                                field1: this.Info.type,
                                field2: 'cardTypeName',
                                value: ''
                            })
                            this.setChangChengBaseInfo({
                                field1: this.Info.type,
                                field2: 'cardType',
                                value: ''
                            })
                            // this.selected = this.Info.defaultCardType
                    } else {
                        this.setChangChengBaseInfo({
                            field1: this.Info.type,
                            field2: 'cardType',
                            value: data.nativeCode
                        })
                        this.setChangChengBaseInfo({
                            field1: this.Info.type,
                            field2: 'cardTypeName',
                            value: data.name
                        })
                        // this.selected = this.Info.defaultCardType
                    }
                } else {
                    console.log('000')
                    this.setChangChengBaseInfo({
                        field1: this.Info.type,
                        field2: 'cardType',
                        value: data.nativeCode
                    })
                    this.setChangChengBaseInfo({
                        field1: this.Info.type,
                        field2: 'cardTypeName',
                        value: data.name
                    })
                }
            } else {
                if (data.nativeCode === '1') { // 护照验证
                    if (this.changChengBaseInfo.insured.nation === 'CHN') {
                            this.showConfirm('证件类型与国籍冲突，请重新选择')
                            this.setChangChengBaseInfo({
                                field1: this.Info.type,
                                field2: 'cardTypeName',
                                value: ''
                            })
                            this.setChangChengBaseInfo({
                                field1: this.Info.type,
                                field2: 'cardType',
                                value: ''
                            })
                            // this.selected = this.Info.defaultCardType
                    } else {
                        this.setChangChengBaseInfo({
                            field1: this.Info.type,
                            field2: 'cardType',
                            value: data.nativeCode
                        })
                        this.setChangChengBaseInfo({
                            field1: this.Info.type,
                            field2: 'cardTypeName',
                            value: data.name
                        })
                        // this.selected = this.Info.defaultCardType
                    }
                } else {
                    this.setChangChengBaseInfo({
                        field1: this.Info.type,
                        field2: 'cardType',
                        value: data.nativeCode
                    })
                    this.setChangChengBaseInfo({
                        field1: this.Info.type,
                        field2: 'cardTypeName',
                        value: data.name
                    })
                    // this.selected = this.Info.defaultCardType
                }
            }
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