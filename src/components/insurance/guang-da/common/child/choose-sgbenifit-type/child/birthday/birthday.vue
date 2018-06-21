<template>
    <div class="detail">
        <div class="info">
            <p class="desTitle">出生日期</p>
            <p class="placeholders">
                <span class="choice" :id="'birthDay' + Info.type" :class="{'active': birth === '请选择出生日期'}">{{birth}}</span>		 
            </p>
        </div>
        <div :id="'birthDayContainer' + Info.type"></div>
    </div>
</template>

<script>
import {calendar} from 'common/js/calendar-util.js'
import {mapGetters, mapMutations} from 'vuex'
import {getBirth} from 'common/js/iscardID-util.js'
import {getAge} from 'components/product/life/js/age-util.js'
export default {
    props: {
        Info: {
            type: Object,
            default: function () {
                return {}
            }
        }
    },
    computed: {
    },
    data () {
        return {
            birth: '请选择出生日期'
            // edit: true
        }
    },
    // watch: {
    //     edit () {
    //         this.birthdayCalendar()
    //     }
    // },
    created () {
        this.setDefalut()
    },
    mounted () {
        // if (this.edit) {
            this.birthdayCalendar()
        // }
    },
    methods: {
        setDefalut () {
            if (this.Info.defaultIdType === '11'){
                if (this.Info.defaultIdNo !== '') {
                    this.birth = getBirth(this.Info.defaultIdNo)?getBirth(this.Info.defaultIdNo):'请选择出生日期'
                    // this.edit = false
                }
            } else {
                 this.birth = this.Info.defaultBirthday
                //  this.edit = true
            }
        },
        birthdayCalendar () {
            let vm = this
            calendar('birthDay' + this.Info.type, 'birthDayContainer' + this.Info.type, this.birthdayStart, this.birthdayEnd, this.birthdayEnd, function (arr1, arr2) {
                    let age = getAge(arr2.join('-'))
                    if (vm.Info.defaultIdType !== '11') {
                        if (age !== -1) {
                            vm.birth = arr2.join('-')
                        }
                    } else {
                        if (vm.Info.defaultIdNo !== '') {
                            vm.birth = getBirth(vm.Info.defaultIdNo)?getBirth(vm.Info.defaultIdNo):'请选择出生日期'
                        }
                    }
                    vm.SET_LONGLIFE_GUANGDA_POLICYINFO({
                        type: 4,
                        field1: vm.Info.type,
                        field2: 'bfcyBirthday',
                        index: vm.Info.index,
                        value: vm.birth
                    })
			})   
        },
        ...mapMutations({
            SET_LONGLIFE_GUANGDA_POLICYINFO:'SET_LONGLIFE_GUANGDA_POLICYINFO'
		})
    }
}
</script>

<style lang='stylus' scoped>
@import '~components/insurance/guang-da/common/child/stylus/common.styl'
</style>