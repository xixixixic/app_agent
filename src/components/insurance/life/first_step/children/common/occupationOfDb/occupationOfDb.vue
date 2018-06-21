<template>
    <div>
        <div class="item">
            <div class="inner">
                <div class="left">
                    <span class="text">职业类型</span>
                </div>
                <div class="right">
                    <div v-show="hide">{{defaultValue}}</div>
                    <span class="text"  :id="'occupationOfDb'+ client.type_code" :class="{'special-text': defaultValue==='请选择职业类型'}">请选择职业类型</span><i class="icon-right_arrow"></i>
                </div>
            </div>
        </div>
        <div :id="'alertOccupationOfDb'+ client.type_code"></div>
    </div>
</template>
<script>
    import {occupation} from 'api/life/insurance.js'
    import {CODE_OK} from 'service/variable.js'
    import {linkage} from 'common/js/linkage-util.js'
    import {setBenRen} from 'common/js/mixin.js'
    import {mapMutations} from 'vuex'
    export default {
        mixins: [setBenRen],
        props: {
            insureFieldsOccupationOfDb: {
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
                occupationOfDb: []
            }
        },
        mounted () {
            this._queryOccupation()
        },
        created () {
        },
        updated () {
            if (!this.editable) {
                this.setDefaultOccupationOfDbValue()
            }
        },
        computed: {
            validate () {
               if (this.defaultValue === '请选择职业类型') return false
               else return true
            }
        },
        methods: {
            _queryOccupation () {
                occupation('29').then(res => {
                    if (res.data.code === CODE_OK) {
                        this.occupationOfDb = res.data.OCC
                        this.getOccupationOfDb()
                    }
                })
            },
            getOccupationOfDb () {
                if (this.client.type_code === 1) {
                    this.sureOccupation('occupationOfDb1', 'alertOccupationOfDb1')
                } else if (this.client.type_code === 2) {
                    this.sureOccupation('occupationOfDb2', 'alertOccupationOfDb2')
                }
                this.setDefaultOccupationOfDbValue()
            },
            sureOccupation (textId, alertId) {
                let vm = this
                linkage(textId, alertId, vm.occupationOfDb, function (arr) {
                    document.getElementById(textId).innerText = arr[2].value
                    vm.SET_LIFE_POLICYINFO({
                        field1: vm.client.typeField,
                        field2: 'occupationCode',
                        value: arr[2].id
                    })
                    vm.SET_LIFE_POLICYINFO({
                        field1: vm.client.typeField,
                        field2: 'occupationName',
                        value: arr[2].value
                    })
                    vm.setBenrenInfo()
                })
            },
            setDefaultOccupationOfDbValue () {
                document.getElementById('occupationOfDb' + this.client.type_code).innerText = this.defaultValue
            },
            ...mapMutations({
                SET_LIFE_POLICYINFO: 'SET_LIFE_POLICYINFO'
            })
        }
    }
</script>
<style scoped lang="stylus">
    @import '~components/insurance/life/first_step/children/common/stylus/common.styl'
</style>