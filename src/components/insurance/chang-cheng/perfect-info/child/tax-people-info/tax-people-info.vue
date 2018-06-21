<template>
    <div class="detail">
        <div class="info">
            <p class="desTitle" ref='nameTitle'>本人确认{{Info.type === 'applicant' ? '投' : '被'}}保人为</p>
            <p class="placeholders" @click="showSelectdrop()" :class="{'active': text === '请选择纳税身份'}">
                {{text}}<i class="icon-down_arrow ico"></i>
            </p>
        </div>
        <select-drop :selectArray="nationArray" :selectTitle="selectTitle"  v-show="showSelectdropWrap" 
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
            selectTitle: '选择纳税身份',
            showSelectdropWrap: false,
            selected: '0'
        }
    },
    computed: {
        nationArray () {
            return this.changChengBaseInfo.init.taxResidents
        },
        text () {
            for (let obj of this.nationArray) {
                if (obj.nativeCode === this.selected) {
                    return obj.name
                }
            }
            return '请选择纳税身份'
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
            this.selected = this.Info.defaultTaxPeopleInfo
        },
        showSelectdrop () {
            this.showSelectdropWrap = true
		},
		sureSelectDrop (data) {
            this.selected = data.nativeCode
            if (data.nativeCode !== '1') {
                if (this.Info.type === 'applicant') {
                    this.setChangChengBaseInfo({
                        field1: 'ApplicantTaxBaseInfoShow',
                        value: true
                    })
                } else {
                    this.setChangChengBaseInfo({
                        field1: 'InsuredTaxBaseInfoShow',
                        value: true
                    })
                } 
            } else {
                if (this.Info.type === 'applicant') {
                    this.setChangChengBaseInfo({
                        field1: 'ApplicantTaxBaseInfoShow',
                        value: false
                    })
                    this.setChangChengBaseInfo({
                        field1: 'ApplicantTaxBaseInfo',
                        field2: 'lName',
                        value: ''
                    })
                    this.setChangChengBaseInfo({
                        field1: 'ApplicantTaxBaseInfo',
                        field2: 'tName',
                        value: ''
                    })
                    this.setChangChengBaseInfo({
                        field1: 'ApplicantTaxBaseInfo',
                        field2: 'identificationNum',
                        value: ''
                    })
                    this.setChangChengBaseInfo({
                        field1: 'ApplicantTaxBaseInfo',
                        field2: 'reason',
                        value: ''
                    })
                    this.setChangChengBaseInfo({
                        field1: 'ApplicantTaxBaseInfo',
                        field2: 'reasonInfo',
                        value: ''
                    })
                    this.setChangChengBaseInfo({
                        field1: 'ApplicantTaxBaseInfo',
                        field2: 'autograph',
                        value: ''
                    })
                    this.setChangChengBaseInfo({
                        field1: 'ApplicantTaxBaseInfo',
                        field2: 'inAddressProvince',
                        value: ''
                    })
                    this.setChangChengBaseInfo({
                        field1: 'ApplicantTaxBaseInfo',
                        field2: 'inAddressCity',
                        value: ''
                    })
                    this.setChangChengBaseInfo({
                        field1: 'ApplicantTaxBaseInfo',
                        field2: 'inAddressCity',
                        value: ''
                    })
                    this.setChangChengBaseInfo({
                        field1: 'ApplicantTaxBaseInfo',
                        field2: 'inAddressCounty',
                        value: ''
                    })
                    this.setChangChengBaseInfo({
                        field1: 'ApplicantTaxBaseInfo',
                        field2: 'inAddressStreet',
                        value: ''
                    })
                    this.setChangChengBaseInfo({
                        field1: 'ApplicantTaxBaseInfo',
                        field2: 'bornAddressProvince',
                        value: ''
                    })
                    this.setChangChengBaseInfo({
                        field1: 'ApplicantTaxBaseInfo',
                        field2: 'bornAddressCity',
                        value: ''
                    })
                    this.setChangChengBaseInfo({
                        field1: 'ApplicantTaxBaseInfo',
                        field2: 'bornAddressCounty',
                        value: ''
                    })
                    this.setChangChengBaseInfo({
                        field1: 'ApplicantTaxBaseInfo',
                        field2: 'bornAddressStreet',
                        value: ''
                    })
                } else {
                    this.setChangChengBaseInfo({
                        field1: 'InsuredTaxBaseInfoShow',
                        value: false
                    })
                    this.setChangChengBaseInfo({
                        field1: 'InsuredTaxBaseInfo',
                        field2: 'lName',
                        value: ''
                    })
                    this.setChangChengBaseInfo({
                        field1: 'InsuredTaxBaseInfo',
                        field2: 'tName',
                        value: ''
                    })
                    this.setChangChengBaseInfo({
                        field1: 'InsuredTaxBaseInfo',
                        field2: 'identificationNum',
                        value: ''
                    })
                    this.setChangChengBaseInfo({
                        field1: 'InsuredTaxBaseInfo',
                        field2: 'reason',
                        value: ''
                    })
                    this.setChangChengBaseInfo({
                        field1: 'InsuredTaxBaseInfo',
                        field2: 'reasonInfo',
                        value: ''
                    })
                    this.setChangChengBaseInfo({
                        field1: 'InsuredTaxBaseInfo',
                        field2: 'autograph',
                        value: ''
                    })
                    this.setChangChengBaseInfo({
                        field1: 'InsuredTaxBaseInfo',
                        field2: 'inAddressProvince',
                        value: ''
                    })
                    this.setChangChengBaseInfo({
                        field1: 'InsuredTaxBaseInfo',
                        field2: 'inAddressCity',
                        value: ''
                    })
                    this.setChangChengBaseInfo({
                        field1: 'InsuredTaxBaseInfo',
                        field2: 'inAddressCity',
                        value: ''
                    })
                    this.setChangChengBaseInfo({
                        field1: 'InsuredTaxBaseInfo',
                        field2: 'inAddressCounty',
                        value: ''
                    })
                    this.setChangChengBaseInfo({
                        field1: 'InsuredTaxBaseInfo',
                        field2: 'inAddressStreet',
                        value: ''
                    })
                    this.setChangChengBaseInfo({
                        field1: 'InsuredTaxBaseInfo',
                        field2: 'bornAddressProvince',
                        value: ''
                    })
                    this.setChangChengBaseInfo({
                        field1: 'InsuredTaxBaseInfo',
                        field2: 'bornAddressCity',
                        value: ''
                    })
                    this.setChangChengBaseInfo({
                        field1: 'InsuredTaxBaseInfo',
                        field2: 'bornAddressCounty',
                        value: ''
                    })
                    this.setChangChengBaseInfo({
                        field1: 'InsuredTaxBaseInfo',
                        field2: 'bornAddressStreet',
                        value: ''
                    })
                }
            }
            this.setChangChengBaseInfo({
				field1: this.Info.type,
				field2: 'taxResident',
				value: data.nativeCode
            })
            this.setChangChengBaseInfo({
				field1: this.Info.type,
				field2: 'taxResidentName',
				value: data.name
            })
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
        SelectDrop
    }
}
</script>

<style lang='stylus' scoped>
@import '~components/insurance/chang-cheng/perfect-info/child/stylus/common.styl'
</style>