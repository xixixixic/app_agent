<template>
    <div>  
        <div class='item'>
            <div class='inner'>
                <div class='left'><span class='text'>省市区</span></div>
                <div class='right'>
                    <div v-show="hide">{{defaultValue}}</div>
                    <span class='text' :id="'choicePca'+ client.type_code" :class="{'special-text': defaultValue === '请选择地区'}">{{defaultValue}}</span><i class='icon-right_arrow'></i>
                </div>
            </div>
        </div>
        <div :id="'alertPca'+ client.type_code"></div>
    </div>
</template>
<script>
    import {pca} from 'api/life/insurance.js'
    import {linkage} from 'common/js/linkage-util.js'
    import {setBenRen} from 'common/js/mixin.js'
    import {mapMutations, mapGetters} from 'vuex'
    import {CODE_OK} from 'service/variable.js'
    export default {
        mixins: [setBenRen],
        props: {
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
                area: [],
                hide: false
            }
        },
        created () {
            this._getArea()
        },
        updated () {
            if (!this.editable) {
                this.setDefaultAreaNameValue()
            }
        },
        mounted () {
            this.setDefaultAreaNameValue()
        },
        computed: {
            ...mapGetters([
                'lifeInsuranceRules'
            ]),
            validate () {
               if (this.defaultValue === '请选择地区') return false
               else return true
            }
        },
        methods: {
            _getArea () {
                pca(this.lifeInsuranceRules.productId).then(res => {
                    if (res.data.code === CODE_OK) {
                        this.area = res.data.pca
                        this.pcaLinkAge()
                    }
                })
            },
            pcaLinkAge () {
                this.sureAreaName('choicePca' + this.client.type_code, 'alertPca' + this.client.type_code)
            },
            sureAreaName (textId, alertId) {
                let vm = this
                linkage(textId, alertId, vm.area, function (arr) {
                    let str = ''
                    for (let key in arr) {
                        str += arr[key].value + ' '
                    }
                    document.getElementById('choicePca' + vm.client.type_code).innerText = str
                    vm.SET_LIFE_POLICYINFO({
                        field1: vm.client.typeField,
                        field2: 'pcaText',
                        value: str
                    })
                    vm.SET_LIFE_POLICYINFO({
                        field1: vm.client.typeField,
                        field2: 'provinceId',
                        value: arr[0].id
                    })
                    vm.SET_LIFE_POLICYINFO({
                        field1: vm.client.typeField,
                        field2: 'cityId',
                        value: arr[1].id
                    })
                    vm.SET_LIFE_POLICYINFO({
                        field1: vm.client.typeField,
                        field2: 'areaId',
                        value: arr[2].id
                    })
                    vm.SET_LIFE_POLICYINFO({
                        field1: 'reAreaId',
                        value: arr[2].id
                    })
                    vm.SET_LIFE_POLICYINFO({
                        field1: 'reAreaName',
                        value: str
                    })
                    vm.setBenrenInfo()
                })
            },
            setDefaultAreaNameValue () {
                document.getElementById('choicePca' + this.client.type_code).innerText = this.defaultValue
            },
            ...mapMutations({
                SET_LIFE_POLICYINFO: 'SET_LIFE_POLICYINFO'
            })
        }
    }
</script>
<style scoped lang='stylus'>
    @import '~components/insurance/life/first_step/children/common/stylus/common.styl'
</style>