<template>
    <div class="detail">
        <div class="info">
            <p class="desTitle">与被保人关系</p>
            <p class='placeholders' @click="showSelectdrop()" :class="this.text === '请选择' ? 'active' : ''">
				{{text}}
				<i class='icon-right_arrow'></i>
			</p>
        </div>
        <select-drop :selectArray="relationArray" :selectTitle="selectTitle"  v-show="showSelectdropWrap" 
        @sureSelectDrop="sureSelectDrop" @hideSelectDrop="hideSelectDrop" :default-value="this.selecteds"></select-drop>
        <confirm  ref="confirm" :text="confirmText"></confirm>
    </div>
</template>

<script>
import SelectDrop from 'base/select-drop/select-drop'
import {mapGetters, mapMutations} from 'vuex'
import Confirm from 'base/confirm/confirm'
import {confirm} from 'common/js/mixin.js'
import {compareTwoDate} from 'common/js/calendar-util.js'
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
            selectTitle: '选择关系',
            showSelectdropWrap: false,
            selecteds: '',
            confirmText: ''
        }
    },
    computed: {
        relationArray () {
            return this.changChengBaseInfo.relationList
        },
        text () {
            for (let obj of this.relationArray) {
                if (obj.nativeCode === this.selecteds) {
                    return obj.name
                }
            }
            return '请选择'
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
                this.selecteds = this.changChengBaseInfo.sgbenificiary[this.client.num].relaToInsuredCode
            } else {
                this.selecteds = this.changChengBaseInfo.scbenificiary[this.client.num].relaToInsuredCode
            }
         },
        showSelectdrop () {
            this.showSelectdropWrap = true
		},
		sureSelectDrop (data) {
            if (this.client.types === 'sgbenificiary') {
                let birth = this.changChengBaseInfo.sgbenificiary[this.client.num].birthday
                if (birth === '') {
                    this.showConfirm('请先选择出生日期')
                } else {
                    this.setChangChengBaseInfo({
                        field1: this.client.typeField,
                        field2: 'relaToInsuredCode',
                        value: data.nativeCode
                    })
                    this.selecteds = data.nativeCode
                    let rela = this.changChengBaseInfo.sgbenificiary[this.client.num].relaToInsuredCode
                    let sArr = this.changChengBaseInfo.sgbenificiary[this.client.num].birthday
                    this.judeRelation(rela, data, sArr)
                }
            } else {
                let birth = this.changChengBaseInfo.scbenificiary[this.client.num].birthday
                if (birth === '') {
                    this.showConfirm('请先选择出生日期')
                } else {
                    this.setChangChengBaseInfo({
                        field1: this.client.typeField,
                        field2: 'relaToInsuredCode',
                        value: data.nativeCode
                    })
                    this.selecteds = data.nativeCode
                    let rela = this.changChengBaseInfo.scbenificiary[this.client.num].relaToInsuredCode
                    let sArr = this.changChengBaseInfo.scbenificiary[this.client.num].birthday
                    this.judeRelation(rela, data, sArr)
                }
            }
			this.showSelectdropWrap = false
        },
        judeRelation (rela, data, sArr) {
            if (rela === '00') {
                this.showConfirm('请选择其他关系')
                this.setChangChengBaseInfo({
                    field1: this.client.typeField,
                    field2: 'relaToInsuredCode',
                    value: ''
                })
                this.selecteds = ''
            } else if (rela === '03') { // 儿女
                this.smallIf(data, sArr)
            } else if (rela === '04') { // 父母
                this.bigIf(data, sArr)
            } else if (rela === '19') { // 爷爷
                this.bigIf(data, sArr)
            } else if (rela === '20') { // 奶奶
                this.bigIf(data, sArr)
            } else if (rela === '22') { // 外公
                this.bigIf(data, sArr)
            } else if (rela === '23') { // 外婆
                this.bigIf(data, sArr)
            } else if (rela === '21') { // 孙子/女
                this.smallIf(data, sArr)
            } else if (rela === '24') { // 外孙子/女
                this.smallIf(data, sArr)
            }
        },
        smallIf (data, sArr) { // 被保人年龄小于投保人年龄
            let eArr = this.changChengBaseInfo.insured.birthday
            let dateRes = compareTwoDate(eArr, sArr)
            if (dateRes === '小于') {
                this.setChangChengBaseInfo({
                    field1: this.client.typeField,
                    field2: 'relaToInsuredCode',
                    value: data.nativeCode
                })
                this.selecteds = data.nativeCode
            } else {
                this.setChangChengBaseInfo({
                    field1: this.client.typeField,
                    field2: 'relaToInsuredCode',
                    value: ''
                })
                this.selecteds = ''
                this.showConfirm('受益人年龄大于投保人年龄，请检查与投保人关系')
            }
        },
        bigIf (data, sArr) { // 被保人年龄大于投保人年龄
            let eArr = this.changChengBaseInfo.insured.birthday
            let dateRes = compareTwoDate(eArr, sArr)
            console.log(dateRes)
            console.log('dateRes')
            if (dateRes === '大于') {
                this.setChangChengBaseInfo({
                    field1: this.client.typeField,
                    field2: 'relaToInsuredCode',
                    value: data.nativeCode
                })
                this.selecteds = data.nativeCode
                console.log('one')
                console.log(this.selecteds)
            } else {
                this.setChangChengBaseInfo({
                    field1: this.client.typeField,
                    field2: 'relaToInsuredCode',
                    value: ''
                })
                this.selecteds = ''
                this.showConfirm('受益人年龄小于投保人年龄，请检查与投保人关系')
                console.log('two')
                console.log(this.selecteds)
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
        SelectDrop,
        Confirm
    }
}
</script>

<style lang='stylus' scoped>
@import '~components/insurance/chang-cheng/base-info/child/stylus/common.styl'
</style>