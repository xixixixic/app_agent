<template>
    <div class="detail">
        <div class="info">
            <p class="desTitle" ref='nameTitle'>证件有效期类型</p>
            <p class="placeholders" @click="showSelectdrop()" :class="{'active': text === '请选择证件有效期类型'}">
                {{text}}<i class="icon-down_arrow ico"></i>
            </p>
        </div>
        <div class="info" v-if='showEffectiveDate'>
            <p class="desTitle" ref='nameTitle'>证件有效期起期</p>
            <p class="placeholders active">
                <span class="choice" :id="'benefitEffectivDateStart' + Info.type" :class="{'active': benefitEffectivDateStart === '请选择证件有效期起期'}">{{benefitEffectivDateStart}}</span>
            </p>
        </div>
        <div class="info" v-if='showEffectiveDate'>
            <p class="desTitle" ref='nameTitle'>证件有效期止期</p>
            <p class="placeholders active">
                <span class="choice" :id="'benefitEffectivDateEnd' + Info.type" :class="{'active': benefitEffectivDateEnd === '请选择证件有效期止期'}">{{benefitEffectivDateEnd}}</span>
            </p>
        </div>
        <div :id="'benefitEffectivDateContainerStart' + Info.type"></div>
        <div :id="'benefitEffectivDateContainerEnd' + Info.type"></div>
        <select-drop :selectArray="nationArray" :selectTitle="selectTitle"  v-show="showSelectdropWrap" 
        @sureSelectDrop="sureSelectDrop" @hideSelectDrop="hideSelectDrop" :default-value="this.selected"></select-drop>
        <confirm  ref="confirm" :text="confirmText"></confirm>
    </div>
</template>

<script>
import SelectDrop from 'base/select-drop/select-drop'
import {mapGetters, mapMutations} from 'vuex'
import {calendar, compareTwoDate} from 'common/js/calendar-util.js'
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
            selectTitle: '选择证件有效期类型',
            showSelectdropWrap: false,
            selected: '',
            benefitEffectivDateStart: '请选择证件有效期起期',
            benefitEffectivDateEnd: '请选择证件有效期止期',
            confirmText: ''
        }
    },
    computed: {
        nationArray () {
            return this.changChengBaseInfo.init.cardValidationType
        },
        text () {
            for (let obj of this.nationArray) {
                if (obj.nativeCode === this.selected) {
                    return obj.name
                }
            }
            return '请选择证件有效期类型'
        },
        showEffectiveDate () {
            if (this.client.types === 'sgbenificiary') {
                return this.changChengBaseInfo.sgbenificiary[this.client.num].showEffectiveDate
            } else {
                return this.changChengBaseInfo.scbenificiary[this.client.num].showEffectiveDate
            }
        },
        ...mapGetters([
			'changChengBaseInfo'
		])
    },
    created () {
        this.setDefault()
    },
    mounted () {
        this.effectiveDayCalendarStart()
        this.effectiveDayCalendarEnd()
    },
     methods: {
        setDefault () {
            this.benefitEffectivDateStart = this.client.defaultIDStartDate === '' ? '请选择证件有效期起期' : this.client.defaultIDStartDate
            this.benefitEffectivDateEnd = this.client.defaultIDEndDate === '' ? '请选择证件有效期止期' : this.client.defaultIDEndDate
            if (this.Info.type === 'sgbenificiary') {
                this.selected = this.changChengBaseInfo.sgbenificiary[this.client.num].cardValidationType
                // this.benefitEffectivDate = this.changChengBaseInfo.scbenificiary[this.client.num].iDStartDate === '' ? '请选择证件有效期日期' : this.changChengBaseInfo.scbenificiary[this.client.num].iDStartDate
            } else {
                this.selected = this.changChengBaseInfo.scbenificiary[this.client.num].cardValidationType
            }
        },
        showSelectdrop () {
            this.showSelectdropWrap = true
		},
		sureSelectDrop (data) {
            this.selected = data.nativeCode
            if (data.nativeCode === '1') {
                this.setChangChengBaseInfo({
                    field1: this.client.typeField,
                    field2: 'showEffectiveDate',
                    value: true
                })
            } else {
                this.setChangChengBaseInfo({
                    field1: this.client.typeField,
                    field2: 'showEffectiveDate',
                    value: false
                })
                this.setChangChengBaseInfo({
                    field1: this.client.typeField,
                    field2: 'iDStartDate',
                    value: ''
                })
                this.setChangChengBaseInfo({
                    field1: this.client.typeField,
                    field2: 'iDEndDate',
                    value: ''
                })
            }
            this.setChangChengBaseInfo({
				field1: this.client.typeField,
				field2: 'cardValidationType',
				value: data.nativeCode
            })
			this.showSelectdropWrap = false
		},
		hideSelectDrop () {
			this.showSelectdropWrap = false
        },
        effectiveDayCalendarStart () {
            let vm = this
            let d = new Date()
            let str = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
            console.log(str)
            let endDate = (d.getFullYear() + 20) + '-' + (d.getMonth() + 1) + '-' + d.getDate()
			calendar('benefitEffectivDateStart' + this.Info.type, 'benefitEffectivDateContainerStart' + this.Info.type, str, endDate, str, function (arr1, arr2) {
                vm.benefitEffectivDateStart = arr2.join('-')
                vm.setChangChengBaseInfo({
                    field1: vm.client.typeField,
                    field2: 'iDStartDate',
                    value: vm.benefitEffectivDateStart
                })
			})
        },
        effectiveDayCalendarEnd () {
            let vm = this
            let d = new Date()
            let str = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
            console.log(str)
            let endDate = (d.getFullYear() + 20) + '-' + (d.getMonth() + 1) + '-' + d.getDate()
			calendar('benefitEffectivDateEnd' + this.Info.type, 'benefitEffectivDateContainerEnd' + this.Info.type, str, endDate, str, function (arr1, arr2) {
                if (vm.benefitEffectivDateStart === '') {
                    vm.showConfirm('请先选择证件有效期起期')
                    return false
                } else {
                    let endArr = Number(arr2[0] + arr2[1] + arr2[2])
                    let arrSplit = (vm.benefitEffectivDateStart).split('-')
                    let startArr = Number(arrSplit[0] + arrSplit[1] + arrSplit[2])
                    if (startArr > endArr) {
                        vm.showConfirm('请重新选择证件有效期止期')
                        vm.setChangChengBaseInfo({
                            field1: vm.client.typeField,
                            field2: 'iDEndDate',
                            value: ''
                        })
                        vm.benefitEffectivDateEnd = '请选择证件有效期止期'
                    } else {
                        vm.benefitEffectivDateEnd = arr2.join('-')
                        vm.setChangChengBaseInfo({
                            field1: vm.client.typeField,
                            field2: 'iDEndDate',
                            value: arr2.join('-')
                        })
                    }
                }
			})
        },
        smallIf (arr2) {
            let sArr = this.client.defaultIDStartDate
            let eArr = this.client.defaultIDEndDate
            let dateRes = compareTwoDate(sArr, eArr)
            if (dateRes === '大于') {
                this.benefitEffectivDateEnd = '请选择证件有效期止期'
                this.setChangChengBaseInfo({
                    field1: this.client.typeField,
                    field2: 'iDEndDate',
                    value: ''
                })
            } else {
                this.benefitEffectivDateEnd = arr2.join('-')
                this.setChangChengBaseInfo({
                    field1: this.client.typeField,
                    field2: 'iDEndDate',
                    value: this.benefitEffectivDateEnd
                })
            }
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