<template>
    <div class="item">
        <div class="inner">
            <div class="left">
                <span class="text">出生日期</span>
            </div>
            <div class="right">
                <div v-show="hideBirthday">{{defaultBirthday}}</div>
                <span :id="'birthdayDate'+ client.typeField" class="text" :class="{'special-text': defaultBirthday === '请选择出生日期'}" >{{defaultBirthday}}</span><i class="icon-right_arrow"></i><span class="pos-text" v-show="birthdayEditable"></span>
            </div>
        </div>
        <div :id="'calendarContainer'+ client.typeField"></div>       
    </div>
</template>
<script>
    import {calendar} from 'common/js/calendar-util.js'
    import {nowDateStr} from 'common/js/format-newDate.js'
    import {setBenRen} from 'common/js/mixin.js'
    import {mapMutations} from 'vuex'
    export default {
        mixins: [setBenRen],
        props: {
            client: {
                type: Object,
                default: {}
            },
            birthdayEditable: {
                type: Boolean,
                default: true
            },
            defaultBirthday: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                birthdayVal: '',
                hideBirthday: false,
                birthdayStart: '',
                birthdayEnd: ''
            }
        },
        updated () {
            if (!this.birthdayEditable) {
                this.setDefaultBirthdayValue()
            }
        },
        mounted () {
            this.birthdayDateRange()
            this.setDefaultBirthdayValue()
        },
        methods: {
            birthdayDateRange () {
                this.birthdayStart = '1920-1-1'
                this.birthdayEnd = nowDateStr
                this.birthdayCalendar()
            },
            birthdayCalendar () {
                let vm = this
                calendar('birthdayDate' + this.client.typeField + '', 'calendarContainer' + this.client.typeField + '', this.birthdayStart, this.birthdayEnd, this.birthdayEnd, function (arr1, arr2) {
                    document.getElementById('birthdayDate' + vm.client.typeField + '').innerText = arr2.join('-')
                    vm.SET_LIFE_POLICYINFO({
                        field1: vm.client.typeField,
                        field2: 'birthday',
                        value: document.getElementById('birthdayDate' + vm.client.typeField + '').innerText
                    })
                    vm.setBenrenInfo()
                })
            },
            setDefaultBirthdayValue () {
                document.getElementById('birthdayDate' + this.client.typeField + '').innerText = this.defaultBirthday
            },
            ...mapMutations({
                SET_LIFE_POLICYINFO: 'SET_LIFE_POLICYINFO'
            })
        }
    }
</script>
<style scoped lang="stylus">
    @import '~components/insurance/life/first_step/children/common/stylus/common.styl'
    .pos-text
        position: absolute
        right: 0
        top: 0
        width: 100%
        height: 100%
</style>