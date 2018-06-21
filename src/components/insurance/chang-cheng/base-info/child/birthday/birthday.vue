<template>
    <div class="detail">
        <div class="info">
            <p class="desTitle">出生日期</p>
            <p class="placeholders" v-show='!this.changChengBaseInfo.backStatus'>
                <span class="choice" :id="'birthDay' + Info.type" :class="{'active': birth === '请选择出生日期'}">{{birth}}</span>	 
            </p>
            <p class="placeholders" v-show='this.changChengBaseInfo.backStatus'>
                <span class="choice active">{{birth}}</span>		 
            </p>
        </div>
        <div :id="'birthDayContainer' + Info.type"></div>
        <confirm  ref="confirm" :text="confirmText"></confirm>
    </div>
</template>

<script>
import {calendar, compareTwoDate} from 'common/js/calendar-util.js'
import {mapGetters, mapMutations} from 'vuex'
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
    computed: {
        ...mapGetters([
			'changChengBaseInfo'
		])
    },
    created () {
        this.setDefault()
    },
    data () {
        return {
            birth: '请选择出生日期',
            confirmText: ''
        }
    },
    mounted () {
        this.birthdayCalendar()
    },
    methods: {
        setDefault () {
            this.birth = this.Info.defaultBirthday
        },
        setSame () {
            console.log(this.changChengBaseInfo.applicant.birthday)
            console.log('this.changChengBaseInfo.applicant.birthday')
            this.birth = this.changChengBaseInfo.applicant.birthday
        },
        clearSame () { 
            this.birth = this.changChengBaseInfo.insured.birthday === '' ? '请选择出生日期' : this.changChengBaseInfo.insured.birthday
        },
        birthdayCalendar () {
            let vm = this
            let d = new Date()
            let str = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
            let endDate = (d.getFullYear() - 16) + '-' + (d.getMonth() + 1) + '-' + d.getDate()
            if (this.Info.type === 'applicant') { // 投保人年龄至少16岁
                calendar('birthDay' + this.Info.type, 'birthDayContainer' + this.Info.type, '1958-01-01', endDate, '1980-01-01', function (arr1, arr2) {
                    vm.birth = arr2.join('-')
                    vm.setChangChengBaseInfo({
                        field1: vm.Info.type,
                        field2: 'birthday',
                        value: vm.birth
                    })
                })
            } else { // 被保人0岁开始
                calendar('birthDay' + this.Info.type, 'birthDayContainer' + this.Info.type, '1958-01-01', str, '2000-01-01', function (arr1, arr2) {
                    if (vm.changChengBaseInfo.applicant.birthday === '') {
                        vm.showConfirm('请先选择投保人出生日期')
                    } else if (vm.changChengBaseInfo.insured.relaToAppntCode === '') {
                        vm.showConfirm('请先选择与投保人关系')
                    } else {
                        vm.setChangChengBaseInfo({
                            field1: vm.Info.type,
                            field2: 'birthday',
                            value: arr2.join('-')
                        })
                        vm.birth = arr2.join('-')
                        vm.judgeDate(arr2)
                    }
                })
            }
        },
        judgeDate (arr2) {
            console.log(arr2)
            console.log('judgeDatearr2')
            let rela = this.changChengBaseInfo.insured.relaToAppntCode
            if (rela === '03') { // 儿女
                this.smallIf(arr2)
            } else if (rela === '04') { // 父母
                this.bigIf(arr2)
            } else if (rela === '19') { // 爷爷
                this.bigIf(arr2)
            } else if (rela === '20') { // 奶奶
                this.bigIf(arr2)
            } else if (rela === '22') { // 外公
                this.bigIf(arr2)
            } else if (rela === '23') { // 外婆
                this.bigIf(arr2)
            } else if (rela === '21') { // 孙子/女
                this.smallIf(arr2)
            } else if (rela === '24') { // 外孙子/女
                this.smallIf(arr2)
            }
        },
        smallIf (arr2) { // 被保人年龄小于投保人年龄
            let sArr = this.changChengBaseInfo.applicant.birthday
            let eArr = this.changChengBaseInfo.insured.birthday
            let dateRes = compareTwoDate(sArr, eArr)
            if (dateRes === '小于') {
                this.birth = arr2.join('-')
            } else {
                this.setChangChengBaseInfo({
                    field1: this.Info.type,
                    field2: 'birthday',
                    value: ''
                })
                this.birth = '请选择出生日期'
                this.showConfirm('被保人年龄大于投保人年龄，请检查与投保人关系或者被保人出生日期')
            }
        },
        bigIf (arr2) { // 被保人年龄大于投保人年龄
            let sArr = this.changChengBaseInfo.applicant.birthday
            let eArr = this.changChengBaseInfo.insured.birthday
            let dateRes = compareTwoDate(sArr, eArr)
            if (dateRes === '大于') {
                this.birth = arr2.join('-')
            } else {
                this.setChangChengBaseInfo({
                    field1: this.Info.type,
                    field2: 'birthday',
                    value: ''
                })
                this.birth = '请选择出生日期'
                this.showConfirm('被保人年龄小于投保人年龄，请检查与投保人关系或者被保人出生日期')
            }
        },
        ...mapMutations({
			setChangChengBaseInfo: 'SET_LONGLIFE_CHANGCHENG_BASEINFO'
		})
    },
    components: {
        Confirm
    }
}
</script>

<style lang='stylus' scoped>
@import '~components/insurance/chang-cheng/base-info/child/stylus/common.styl'
</style>