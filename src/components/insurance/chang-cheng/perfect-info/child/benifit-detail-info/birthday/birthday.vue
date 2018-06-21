<template>
    <div class="detail">
        <div class="info">
            <p class="desTitle">出生日期</p>
            <p class="placeholders active">
                <span class="choice" :id="'birthDay' + client.typeField" :class="{'active': birth === '请选择出生日期'}">{{birth}}</span>
            </p>
        </div>
        <div :id="'birthDayContainer' + client.typeField"></div>
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
        },
        client: {
            type: Object,
            default: function () {
                return {}
            }
        }
    },
    computed: {
        birth () {
            if (this.client.types === 'sgbenificiary') {
                return this.changChengBaseInfo.sgbenificiary[this.client.num].birthday === '' ? '请选择出生日期' : this.changChengBaseInfo.sgbenificiary[this.client.num].birthday
            } else {
                return this.changChengBaseInfo.scbenificiary[this.client.num].birthday === '' ? '请选择出生日期' : this.changChengBaseInfo.scbenificiary[this.client.num].birthday
            }
        },
        ...mapGetters([
			'changChengBaseInfo'
		])
    },
    data () {
        return {
            // birth: '请选择出生日期'
        }
    },
    created () {
        // this.setDefalut()
    },
    mounted () {
        this.birthdayCalendar()
    },
    methods: {
        setDefalut () {
            console.log('thissssssssssssss')
            if (this.client.types === 'sgbenificiary') {
                this.birth = this.changChengBaseInfo.sgbenificiary[this.client.num].birthday === '' ? '请选择出生日期' : this.changChengBaseInfo.sgbenificiary[this.client.num].birthday
            } else {
                this.birth = this.changChengBaseInfo.scbenificiary[this.client.num].birthday === '' ? '请选择出生日期' : this.changChengBaseInfo.scbenificiary[this.client.num].birthday
            }
        },
        birthdayCalendar () {
            console.log('???')
			let vm = this
			calendar('birthDay' + vm.client.typeField, 'birthDayContainer' + vm.client.typeField, this.birthdayStart, this.birthdayEnd, this.birthdayEnd, function (arr1, arr2) {
                vm.setChangChengBaseInfo({
                    field1: vm.client.typeField,
                    field2: 'birthday',
                    value: arr2.join('-')
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