<template>
    <div class="detail">
        <div class="info">
            <p class="desTitle" ref='nameTitle'>证件有效期类型</p>
            <p class="placeholders" @click="showSelectdrop()" :class="{'active': text === '请选择证件有效期类型'}">
                {{text}}<i class="icon-down_arrow ico"></i>
            </p>
        </div>
        <div class="info" v-if='showEffectiveDate'>
            <p class="desTitle" ref='nameTitle'>证件有效期日期</p>
            <p class="placeholders active">
                <span class="choice" :id="'effectivDate' + Info.type" :class="{'active': effectivDate === '请选择证件有效期日期'}">{{effectivDate}}</span>
            </p>
        </div>
        <div :id="'effectivDateContainer' + Info.type"></div>
        <select-drop :selectArray="nationArray" :selectTitle="selectTitle"  v-show="showSelectdropWrap" 
        @sureSelectDrop="sureSelectDrop" @hideSelectDrop="hideSelectDrop" :default-value="this.selected"></select-drop>
    </div>
</template>

<script>
import SelectDrop from 'base/select-drop/select-drop'
import {mapGetters, mapMutations} from 'vuex'
import {calendar} from 'common/js/calendar-util.js'
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
            selectTitle: '选择证件有效期类型',
            showSelectdropWrap: false,
            selected: '0',
            effectivDate: '请选择证件有效期日期'
        }
    },
    computed: {
        nationArray () {
            return this.changChengBaseInfo.init.cardValidationType
        },
        showEffectiveDate () {
            if (this.Info.type === 'applicant') {
                return this.changChengBaseInfo.applicant.showEffectiveDate
            } else {
                return this.changChengBaseInfo.insured.showEffectiveDate
            }
        },
        text () {
            for (let obj of this.nationArray) {
                if (obj.nativeCode === this.selected) {
                    return obj.name
                }
            }
            return '请选择证件有效期类型'
        },
        ...mapGetters([
			'changChengBaseInfo'
		])
    },
    created () {
        this.setDefault()
    },
    mounted () {
        this.effectiveDayCalendar()
    },
     methods: {
        setDefault () {
            this.selected = this.Info.defaultCardValidationType
            this.effectivDate = this.Info.defaultCardeEffectivDate === '' ? '请选择证件有效期日期' : this.Info.defaultCardeEffectivDate
        },
        showSelectdrop () {
            this.showSelectdropWrap = true
		},
		sureSelectDrop (data) {
            this.selected = data.nativeCode
            if (data.nativeCode === '1') {
                this.setChangChengBaseInfo({
                    field1: this.Info.type,
                    field2: 'showEffectiveDate',
                    value: true
                })
            } else {
                this.setChangChengBaseInfo({
                    field1: this.Info.type,
                    field2: 'showEffectiveDate',
                    value: false
                })
                this.setChangChengBaseInfo({
                    field1: this.Info.type,
                    field2: 'iDValiDate',
                    value: ''
                })
            }
            this.setChangChengBaseInfo({
				field1: this.Info.type,
				field2: 'iDValiDateType',
				value: data.nativeCode
            })
            this.setChangChengBaseInfo({
				field1: this.Info.type,
				field2: 'iDValiDateTypeName',
				value: data.name
            })
			this.showSelectdropWrap = false
		},
		hideSelectDrop () {
			this.showSelectdropWrap = false
        },
        effectiveDayCalendar () {
            let vm = this
            let d = new Date()
            let str = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
            console.log(str)
            let endDate = (d.getFullYear() + 20) + '-' + (d.getMonth() + 1) + '-' + d.getDate()
			calendar('effectivDate' + this.Info.type, 'effectivDateContainer' + this.Info.type, str, endDate, str, function (arr1, arr2) {     
                let stdt = new Date(arr2.join('-').replace('-', '/'))
                let starttimeHaoMiao = (new Date(stdt)).getTime()
                let daa = new Date()
                let strA = daa.getFullYear() + '-' + (daa.getMonth() + 1) + '-' + daa.getDate()
                let etdt = new Date(strA.replace('-', '/'))
                let endttimeHaoMiao = (new Date(etdt)).getTime()
                if (starttimeHaoMiao < endttimeHaoMiao) {
                    vm.effectivDate = strA
                    vm.setChangChengBaseInfo({
                        field1: vm.Info.type,
                        field2: 'iDValiDate',
                        value: strA
                    })
                    return false
                } else {
                    vm.effectivDate = arr2.join('-')
                    vm.setChangChengBaseInfo({
                        field1: vm.Info.type,
                        field2: 'iDValiDate',
                        value: vm.effectivDate
                    })
                }
			})
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
</style>