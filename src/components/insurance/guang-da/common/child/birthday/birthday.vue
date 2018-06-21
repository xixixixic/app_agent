<template>
    <div class="detail">
        <div class="info">
            <p class="desTitle">出生日期</p>
            <p class="placeholders">
                <span class="choice" :id="'birthDay' + Info.type" :class="{'active': birth === '请选择出生日期'}">{{birth}}</span>		 
            </p>
        </div>
        <div :id="'birthDayContainer' + Info.type"></div>
        <!-- 弹框 -->
        <confirm  ref="confirm" :text="confirmText"></confirm>
    </div>
</template>

<script>
import event from 'common/js/event.js'
import {calendar} from 'common/js/calendar-util.js'
import {mapGetters, mapMutations} from 'vuex'
import {getBirth} from 'common/js/iscardID-util.js'
import {getAge, getBeforeDate} from 'components/product/life/js/age-util.js'
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
            'guangdaPremiumRisk'
        ])
    },
    data () {
        return {
            birth: '请选择出生日期',
            edit: true,
            idNo:'',
            apptMax:60,
            apptMin:18,
            insuredMax:50,
            dateList: []
        }
    },
    watch: {
        edit () {
            this.birthdayCalendar()
        }
    },
    created () {
        this.setDefalut()
    },
    mounted () {
        if (this.edit) {
            this.birthdayCalendar()
        }
    },
    methods: {
        setDefalut () {
             if (this.Info.type === 'appnt' || this.Info.type === 'insurants') {
                    if (this.Info.type === 'appnt') {
                        this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                            type: 4,
                            field1: this.Info.type,
                            field2: 'appntBirthday',
                            value: this.guangdaPremiumRisk.applicant.birthday
                        })
                        this.birth = this.guangdaPremiumRisk.applicant.birthday
                    } else if (this.Info.type === 'insurants') {
                         this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                            type: 4,
                            field1: this.Info.type,
                            field2: 'insurant#0',
                            field3: 'birthday',
                            value: this.guangdaPremiumRisk.insured.birthday
                        })
                        this.birth = this.guangdaPremiumRisk.insured.birthday
                    }
                } else {
                    if (this.Info.defaultIdType === '11') {
                        this.edit = false
                    }
                    this.birth = this.Info.defaultBirthday
                }
        },
        birthdayCalendar () {
            let vm = this
            calendar('birthDay' + this.Info.type, 'birthDayContainer' + this.Info.type, this.birthdayStart, this.birthdayEnd, this.birthdayEnd, function (arr1, arr2) {
                    let type = vm.Info.type
                    let birth = arr2.join('-')
                    let age = getAge(birth)
                    let strBirthday = birth.replace(/-/g, ',')
                    let diffDay = -(getBeforeDate (strBirthday))
                    if (age === -1) {
                        return false
                    } else {
                        if (type === 'applicant') {
                        if (age < vm.apptMin || age > vm.apptMax) {
                                vm.showConfirm('投保人的年龄区间为' + vm.apptMin + '岁到' + vm.apptMax + '岁')
                                return false
                            } else {
                                vm.birth = birth
                                vm.SET_LONGLIFE_GUANGDA_POLICYINFO({
                                    type: 1,
                                    field1: vm.Info.type,
                                    field2: 'birthday',
                                    value: birth
                                })
                                vm.SET_LONGLIFE_GUANGDA_POLICYINFO({
                                    field1: 'apptAge',
                                    value: age
                                })
                            }
                        } else if (type === 'insured') {
                            if ((age > vm.insuredMax || age === -1) || diffDay < 30) {
                                vm.showConfirm('被保人的年龄区间为出生30天到' + vm.insuredMax + '岁')
                                return false
                            } else {
                                vm.birth = birth
                                vm.SET_LONGLIFE_GUANGDA_POLICYINFO({
                                    type: 1,
                                    field1: vm.Info.type,
                                    field2: 'birthday',
                                    value: birth
                                })
                            }
                        }
                    }    
			})   
        },
        setSame () {
            this.birth = this.guangdaPremiumRisk.applicant.birthday
        },
        clearSame () {
            this.birth = '请选择出生日期'
        },
        setCardType () {
            let idType, idNo, type
            type = this.Info.type
            if (type === 'applicant') {
                idType = this.guangdaPremiumRisk.applicant.idType
                idNo = this.guangdaPremiumRisk.applicant.idNo
            } else if (type === 'insured') {
                idType = this.guangdaPremiumRisk.insured.idType
                idNo = this.guangdaPremiumRisk.insured.idNo
            }
            if (idType === '11') {
                this.edit = false
                if (idNo !== '') {
                    this.birth = getBirth(idNo)?getBirth(idNo):'请选择出生日期'
                    let age = getAge(this.birth)
                    let strBirthday = this.birth.replace(/-/g, ',')
                    let diffDay = -(getBeforeDate (strBirthday))
                    if (type === 'applicant') {
                        if ( age < this.apptMin || age > this.apptMax) {
                                this.showConfirm('投保人的年龄区间为' + this.apptMin + '岁到' + this.apptMax + '岁')
                                return false
                            } else {
                                this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                                    type: 1,
                                    field1: type,
                                    field2: 'birthday',
                                    value: this.birth
                                })
                                this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                                    field1: 'apptAge',
                                    value: age
                                })
                            }
                    } else if (type === 'insured') {
                        if ( age > this.insuredMax || diffDay < 30) {
                                this.showConfirm('被保人的年龄区间为出生30天到' + this.insuredMax + '岁')
                                return false
                            } else {
                                this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                                    type: 1,
                                    field1: type,
                                    field2: 'birthday',
                                    value: this.birth
                                })
                            }
                    }
                }
            } else {
                this.edit = true
            }
            this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                type: 1,
                field1: this.Info.type,
                field2: 'birthday',
                value: this.birth
            })
        },
        ...mapMutations({
            SET_LONGLIFE_GUANGDA_POLICYINFO:'SET_LONGLIFE_GUANGDA_POLICYINFO'
		})
    },
    components: {
		Confirm
    }
}
</script>

<style lang='stylus' scoped>
@import '~components/insurance/guang-da/common/child/stylus/common.styl'
</style>