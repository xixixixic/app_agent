<template>
    <div class="item">
        <div class="inner">
            <div class="left"><span class="text">证件有效期(至)</span></div>
            <div class="right">
                <div v-show="hide">{{defaultValue}}</div>
                <span  v-if="client.type_code === 1 || client.type_code === 2" class="text" :id="'periodDate'+ client.type_code" :class="{'special-text': defaultValue === '请选择证件有效期'}">请选择证件有效期</span><span  :id="'periodDate'+ client.typeField" class="text" :class="{'special-text': defaultValue === '请选择证件有效期'}" v-else>请选择证件有效期</span><i class='icon-right_arrow'></i><span class="pos-text" v-show="!editable"></span>
            </div>
        </div>
        <div v-if="client.type_code === 1 || client.type_code === 2" :id="'periodDateCalendar'+ client.type_code"></div>
        <div v-else :id="'periodDateCalendar'+ client.typeField"></div>       
    </div>
</template>
<script>
    import {calendar} from 'common/js/calendar-util.js'
    import {isDate} from 'common/js/date-util.js'
    import {setBenRen} from 'common/js/mixin.js'
    import {mapMutations} from 'vuex'
    export default {
        mixins: [setBenRen],
        props: {
            insureFieldsIdinfoPeriod: {
                type: Object,
                default: function () {
                    return {}
                }
            },
            client: {
                type: Object,
                default: {}
            },
            defaultValue: {
                type: String,
                default: ''
            },
            editable: {
                type: Boolean,
                default: true
            }
        },
        data () {
            return {
                hide: false,
                flag: 0
            }
        },
        created () {
        },
        updated () {
            if (!this.editable) {
                this.setDefaultIdInfoPeriodValue()
            }
        },
        mounted () {
            this.idInfoPeriodCalendar()
            this.setDefaultIdInfoPeriodValue()
        },
        computed: {
            validate () {
                if (this.defaultValue === '请选择证件有效期') return true
                else return isDate(this.defaultValue)
            }
        },
        methods: {
            idInfoPeriodCalendar () {
                let vm = this
                let date = new Date()
                let year = date.getFullYear()
                let month = date.getMonth() + 1
                let day = date.getDate()
                let newDate = year + '-' + month + '-' + day
                if (this.client.type_code === 1 || this.client.type_code === 2) {
                    if (this.editable) {
                        calendar('periodDate' + this.client.type_code, 'periodDateCalendar' + this.client.type_code, newDate, '2700-1-1', null, function (arr1, arr2) {
                            document.getElementById('periodDate' + vm.client.type_code).innerText = arr2.join('-')
                            vm.SET_LIFE_POLICYINFO({
                                field1: vm.client.typeField,
                                field2: 'idTypeValidate',
                                value: document.getElementById('periodDate' + vm.client.type_code).innerText
                            })
                            vm.flag = 1
                            vm.setBenrenInfo()
                        })
                    }
                } else if (this.client.type_code === 3) {
                    calendar('periodDate' + vm.client.typeField, 'periodDateCalendar' + vm.client.typeField, newDate, '2700-1-1', null, function (arr1, arr2) {
                        document.getElementById('periodDate' + vm.client.typeField).innerText = arr2.join('-')
                        vm.SET_LIFE_POLICYINFO({
                            field1: vm.client.typeField,
                            field2: 'idTypeValidate',
                            value: document.getElementById('periodDate' + vm.client.typeField).innerText
                        })
                        vm.flag = 1
                        vm.setBenrenInfo()
                    })
                }
            },
            setDefaultIdInfoPeriodValue () {
                if (this.client.type_code === 1 || this.client.type_code === 2) {
                    document.getElementById('periodDate' + this.client.type_code).innerText = this.defaultValue
                } else {
                    document.getElementById('periodDate' + this.client.typeField).innerText = this.defaultValue
                }
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