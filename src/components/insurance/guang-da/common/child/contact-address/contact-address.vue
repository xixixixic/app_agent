<template>
<div>
    <div class="detail">
        <div class="info">
            <p class="desTitle">常住地区</p>
            <p class="placeholders">
                <span id='contactAddress' class="normal" :class="{'active': areaValue === '请选择常住地区'}">{{areaValue}}</span>
                <i class="icon-right_arrow" v-if="areaValue === '请选择常住地区'"></i>
            </p>
        </div>
    </div>
    <div class="detail">
        <div class="info">
            <p class="desTitle">街道</p>
            <p class="placeholders">
                <input type="text" placeholder="请填写街道详细地址" class="placeholdersInput" v-model="streetvalues" @blur='verStreetValues'/>
            </p>
        </div>
        <div class="info">
            <p class="desTitle">社区</p>
            <p class="placeholders">
                <input type="text" placeholder="请填写社区详细名称" class="placeholdersInput" v-model="communityvalues" @blur='verCommunityValues'/>
            </p>
        </div>
        <div :class="this.wrongTip !== '' ? 'errTip' : 'hide'">
            <span class="errIco"></span>
            <span class="errText">{{wrongTip}}</span>
        </div>
    </div>
    <div id="contactArea"></div>
</div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import {linkage} from 'common/js/linkage-util.js'
import {checkStreet, checkCommunity} from 'common/js/validate-util.js'
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
			'guangdaPolicy'
        ]),
        pcArray () {
             return this.guangdaPolicy.DicList.PCA
        },
        areaValue () {
            return this.Info.defaultPostalAddress === '' ? '请选择常住地区' : this.Info.defaultPostalAddress
        }
    },
    mounted () {
        this.choiceResidence()
    },
    data () {
        return {
            streetvalues: '',
            communityvalues: '',
            wrongTip: '',
            Alldress:''
        }
    },
    created () {
        this.setDefault()
    },
    methods: {
        setDefault () {
            this.streetvalues = this.Info.defaultStreet
            this.communityvalues = this.Info.defaultCommunity
        },
        choiceResidence () {
			let vm = this
			linkage('contactAddress', 'contactArea', vm.pcArray, function (arr) {
                let str = ''
				for (let obj of arr) {
					str += obj.value + ' '
                }
                vm.Info.defaultPostalAddress = str
                let result = str.split(" ")
                let str1 = ''
                for(let i = 0; i < result.length; i++) {
                    if (result[i] !== '') {
                        str1 += result[i]
                    }
                }
                vm.Alldress = str1
                if (vm.Info.type === 'appnt') {
                    vm.SET_LONGLIFE_GUANGDA_POLICYINFO({
                        field1: 'appntAlladress',
                        value: str
                    })
                    // 省代码及描述
                    vm.SET_LONGLIFE_GUANGDA_POLICYINFO({
                        type: 4,
                        field1: vm.Info.type,
                        field2: 'province',
                        value: arr[0].id.toString()
                    })
                    vm.SET_LONGLIFE_GUANGDA_POLICYINFO({ // 税收居民身份出生省
                        type: 4,
                        field1: vm.Info.type,
                        field2: 'appntTaxInfo',
                        field3:'birthProvince',
                        value: arr[0].id.toString()
                    })
                    // 市代码及描述
                    vm.SET_LONGLIFE_GUANGDA_POLICYINFO({
                        type: 4,
                        field1: vm.Info.type,
                        field2: 'city',
                        value: arr[1].id.toString()
                    })
                    vm.SET_LONGLIFE_GUANGDA_POLICYINFO({ // 税收居民身份出生市
                        type: 4,
                        field1: vm.Info.type,
                        field2: 'appntTaxInfo',
                        field3:'birthCity',
                        value: arr[1].id.toString()
                    })
                    // 县区代码及描述
                    vm.SET_LONGLIFE_GUANGDA_POLICYINFO({
                        type: 4,
                        field1: vm.Info.type,
                        field2: 'county',
                        value: arr[2].id.toString()
                    })
                } else if (vm.Info.type === 'insurants') {
                    vm.SET_LONGLIFE_GUANGDA_POLICYINFO({
                        field1: 'insuredAlladress',
                        value: str
                    })
                    // 省代码及描述
                     vm.SET_LONGLIFE_GUANGDA_POLICYINFO({
                        type: 4,
                        field1: vm.Info.type,
                        field2: 'insurant#0',
                        field3: 'province',
                        value: arr[0].id.toString()
                    })
                    vm.SET_LONGLIFE_GUANGDA_POLICYINFO({ // 税收居民身份出生省
                        type: 4,
                        field1: vm.Info.type,
                        field2: 'insurant#0',
                        field3: 'insurantTaxInfo',
                        field4: 'birthProvince',
                        value: arr[0].id.toString()
                    })
                    // 市代码及描述
                    vm.SET_LONGLIFE_GUANGDA_POLICYINFO({
                        type: 4,
                        field1: vm.Info.type,
                        field2: 'insurant#0',
                        field3: 'city',
                        value: arr[1].id.toString()
                    })
                    vm.SET_LONGLIFE_GUANGDA_POLICYINFO({ // 税收居民身份出生市
                        type: 4,
                        field1: vm.Info.type,
                        field2: 'insurant#0',
                        field3: 'insurantTaxInfo',
                        field4: 'birthCity',
                        value: arr[0].id.toString()
                    })
                    // 县区代码及描述
                    vm.SET_LONGLIFE_GUANGDA_POLICYINFO({
                        type: 4,
                        field1: vm.Info.type,
                        field2: 'insurant#0',
                        field3: 'county',
                        value: arr[2].id.toString()
                    })
                }
			})
        },
        verStreetValues () {
            if (this.areaValue === '请选择常住地区') {
                this.wrongTip = '请先选择常住地区'
                this.streetvalues = ''
            } else {
                this.wrongTip = checkStreet(this.streetvalues)
                if (this.wrongTip === '') {
                    if (this.Info.type === 'appnt') {
                        this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                            field1: 'appntStree',
                            value: this.streetvalues
                        })
                        
                    } else if (this.Info.type === 'insurants') {
                        this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                            field1: 'insuredStree',
                            value: this.streetvalues
                        })
                    }
                } else {
                    this.streetvalues = ''
                }
            }
        },
        verCommunityValues () {
            if (this.streetvalues === '') {
                this.wrongTip = '请先填写街道'
                this.communityvalues = ''
            } else {
                this.wrongTip = checkCommunity(this.communityvalues)
                if (this.wrongTip === '') {
                    if (this.Info.type === 'appnt') {
                        this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                            field1: 'appntCommunity',
                            value: this.communityvalues
                        })
                        this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                            type: 4,
                            field1: this.Info.type,
                            field2: 'community',
                            value: (this.Alldress + this.streetvalues + this.communityvalues).trim()
                        })
                        this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                            type: 4,
                            field1: this.Info.type,
                            field2: 'street',
                            value:(this.Alldress + this.streetvalues + this.communityvalues).trim()
                        })
                        this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                            type: 4,
                            field1: this.Info.type,
                            field2: 'postalAddress',
                            value:(this.Alldress + this.streetvalues + this.communityvalues).trim()
                        })
                    } else if (this.Info.type === 'insurants') {
                        this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                            field1: 'insuredCommunity',
                            value: this.communityvalues
                        })
                        this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                            type: 4,
                            field1: this.Info.type,
                            field2: 'insurant#0',
                            field3: 'community',
                            value: (this.Alldress + this.streetvalues + this.communityvalues).trim()
                        })
                        this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                            type: 4,
                            field1: this.Info.type,
                            field2: 'insurant#0',
                            field3: 'street',
                            value: (this.Alldress + this.streetvalues + this.communityvalues).trim()
                        })
                        // 完整地址
                        this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                            type: 4,
                            field1: this.Info.type,
                            field2: 'insurant#0',
                            field3: 'postalAddress',
                            value: (this.Alldress + this.streetvalues + this.communityvalues).trim()
                        })
                    }
                } else {
                    this.communityvalues = ''
                }
            }
        },
         ...mapMutations({
			SET_LONGLIFE_GUANGDA_POLICYINFO:'SET_LONGLIFE_GUANGDA_POLICYINFO'
		})
    }
}
</script>

<style lang='stylus' scoped>
@import '~components/insurance/chang-cheng/perfect-info/child/stylus/common.styl'
</style>