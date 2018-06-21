<template>
<div>
    <div class="detail">
        <div class="info">
            <p class="desTitle">学校/单位地址</p>
            <p class="placeholders">
                <span id='unitAddress' class="normal" :class="{'active': areaValue === '请选择所在地'}">{{areaValue}}</span>
                <i class="icon-right_arrow" v-if="areaValue === '请选择所在地'"></i>
            </p>
        </div>
    </div>
    <div class="detail">
        <div class="info">
            <p class="desTitle">学校/单位详细地址</p>
            <p class="placeholders">
                <input type="text" placeholder="请填写详细地址" class="placeholdersInput" v-model="values" @blur='verValues'/>
            </p>
        </div>
        <div :class="this.wrongTip !== '' ? 'errTip' : 'hide'">
            <span class="errIco"></span>
            <span class="errText">{{wrongTip}}填写有误</span>
        </div>
    </div>
    <div id="unitArea"></div>
</div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import {linkage} from 'common/js/linkage-util.js'
import {RegStreetAddressLength} from 'common/js/iscardID-util.js'
import {selectAllArea} from 'api/car/du-bang/insurance.js'
import {RET_OK, CODE_OK} from 'service/variable.js'
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
        ]),
        areaValue () {
            return this.Info.defaultUnitAddress === '' ? '请选择所在地' : this.Info.defaultUnitAddress
        }
    },
    data () {
        return {
            values: '',
            wrongTip: '',
            pcArray: []
        }
    },
    created () {
        this.setDefault()
        this.setAddress()
    },
    methods: {
        setDefault () {
            this.values = this.Info.defaultUnitAddressDetail
        },
        setAddress () {
            console.log('unit')
            selectAllArea().then(res => {
				if (res.ret === RET_OK) {
					if (res.data.code === CODE_OK) {
                        this.pcArray = res.data.pcs
                        this.choiceResidence()
					} else {
						this.showConfirm(res.data.remarkMsg)
					}
				}
			})
        },
        choiceResidence () {
			let vm = this
			linkage('unitAddress', 'unitArea', vm.pcArray, function (arr) {
                console.log(arr)
                console.log('unitAddress')
				let str = ''
				for (let obj of arr) {
					str += obj.value + ' '
                }
                vm.Info.defaultUnitAddress = str
                vm.setChangChengBaseInfo({
                    field1: vm.Info.type,
                    field2: 'provinceName2',
                    value: arr[0].value
                })
                vm.setChangChengBaseInfo({
                    field1: vm.Info.type,
                    field2: 'cityName2',
                    value: arr[1].value
                })
                vm.setChangChengBaseInfo({
                    field1: vm.Info.type,
                    field2: 'countyName2',
                    value: arr[2].value
                })
                vm.setChangChengBaseInfo({
                    field1: vm.Info.type,
                    field2: 'province2Id',
                    value: arr[0].id
                })
                vm.setChangChengBaseInfo({
                    field1: vm.Info.type,
                    field2: 'city2Id',
                    value: arr[1].id
                })
                vm.setChangChengBaseInfo({
                    field1: vm.Info.type,
                    field2: 'county2Id',
                    value: arr[2].id
                })
			})
        },
        verValues () {
            if (RegStreetAddressLength(this.values) === '至少填入8个字') {
                this.wrongTip = RegStreetAddressLength(this.values)
                this.values = ''               
            } else {
                this.wrongTip = ''
                this.setChangChengBaseInfo({
                    field1: this.Info.type,
                    field2: 'streetName2',
                    value: this.values
                })
                // 单位地址
                this.setChangChengBaseInfo({
                    field1: this.Info.type,
                    field2: 'postalAddress',
                    value: this.Info.defaultUnitAddress + this.values
                })
                // 通讯地址
                this.setChangChengBaseInfo({
                    field1: this.Info.type,
                    field2: 'address',
                    value: this.Info.defaultUnitAddress + this.values
                })
            }
        },
         ...mapMutations({
			setChangChengBaseInfo: 'SET_LONGLIFE_CHANGCHENG_BASEINFO'
		})
    }
}
</script>

<style lang='stylus' scoped>
@import '~components/insurance/chang-cheng/perfect-info/child/stylus/common.styl'
</style>