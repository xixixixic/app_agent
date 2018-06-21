<template>
    <div class="detail">
        <div class="info lastInfo">
            <p class="desTitle">出生日期</p>
            <p class="placeholders active">
                <span v-if="Info.type === 'benificiary'" class="choice" :id="'birthDay' + Info.type" :class="{'active': birth === '请选择出生日期'}">{{birth}}</span>		 
                <span v-if="Info.type !== 'benificiary'">{{birth}}</span>
            </p>
        </div>
        <div :id="'birthDayContainer' + Info.type"></div>
    </div>
</template>

<script>
import {calendar} from 'common/js/calendar-util.js'
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
    computed: {
        ...mapGetters([
			'changChengBaseInfo'
		])
    },
    data () {
        return {
            birth: '请选择出生日期'
        }
    },
    created () {
        this.setDefalut()
    },
    mounted () {
        this.birthdayCalendar()
    },
    methods: {
        setDefalut () {
            this.birth = this.Info.defaultBirthday === '' ? '请选择出生日期' : this.Info.defaultBirthday
        },
        birthdayCalendar () {
			let vm = this
			calendar('birthDay' + this.Info.type, 'birthDayContainer' + this.Info.type, this.birthdayStart, this.birthdayEnd, this.birthdayEnd, function (arr1, arr2) {
                vm.birth = arr2.join('-')
                vm.setChangChengBaseInfo({
                    field1: vm.Info.type,
                    field2: 'birthday',
                    value: vm.birth
                })
			})
		},
        ...mapMutations({
			setChangChengBaseInfo: 'SET_LONGLIFE_CHANGCHENG_BASEINFO'
		})
    }
}
</script>

<style lang='stylus' scoped>
@import '~components/insurance/chang-cheng/base-info/child/stylus/common.styl'
</style>