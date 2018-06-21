<template>
<div>
    <div class="detail">
        <div class="info">
            <p class="desTitle" ref='nameTitle'>出生地址(省)</p>
            <p class="placeholders">
                <input type="text" placeholder="请填写省" class="placeholdersInput" v-model="provinceValues" @blur='verProvince'/>
            </p>
        </div>
        <div :class="this.shengWrongTip !== '' ? 'errTip' : 'hide'">
            <span class="errIco"></span>
            <span class="errText">{{shengWrongTip}}</span>
        </div>
    </div>
    <div class="detail">
        <div class="info">
            <p class="desTitle" ref='nameTitle'>出生地址(市)</p>
            <p class="placeholders">
                <input type="text" placeholder="请填写市" class="placeholdersInput" v-model="cityValues" @blur='verCity'/>
            </p>
        </div>
        <div :class="this.shiWrongTip !== '' ? 'errTip' : 'hide'">
            <span class="errIco"></span>
            <span class="errText">{{shiWrongTip}}</span>
        </div>
    </div>
    <div class="detail">
        <div class="info">
            <p class="desTitle" ref='nameTitle'>出生地址(县)</p>
            <p class="placeholders">
                <input type="text" placeholder="请填县" class="placeholdersInput" v-model="countyValues" @blur='verCounty'/>
            </p>
        </div>
        <div :class="this.xianWrongTip !== '' ? 'errTip' : 'hide'">
            <span class="errIco"></span>
            <span class="errText">{{xianWrongTip}}</span>
        </div>
    </div>
    <div class="detail">
        <div class="info">
            <p class="desTitle" ref='nameTitle'>出生地址(街道)</p>
            <p class="placeholders">
                <input type="text" placeholder="请填街道地址" class="placeholdersInput" v-model="streetValues" @blur='verStreet'/>
            </p>
        </div>
        <div :class="this.streetWrongTip !== '' ? 'errTip' : 'hide'">
            <span class="errIco"></span>
            <span class="errText">{{streetWrongTip}}</span>
        </div>
    </div>
</div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import {RegForeignersLastName, RegStreetAddressLength} from 'common/js/iscardID-util.js'
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
            provinceValues: '',
            cityValues: '',
            countyValues: '',
            streetValues: '',
            shengWrongTip: '',
            shiWrongTip: '',
            xianWrongTip: '',
            streetWrongTip: ''
        }
    },
    created () {
        this.setDefalut()
    },
    methods: {
        setDefalut () {
            this.provinceValues = this.Info.defaultBornAddressProvince,
            this.cityValues = this.Info.defaultBornAddressCity,
            this.countyValues = this.Info.defaultBornAddressCounty,
            this.streetValues = this.Info.defaultBornAddressStreet
        },
        verProvince () {
            if (RegForeignersLastName(this.provinceValues) === false) {
                this.shengWrongTip = RegForeignersLastName(this.provinceValues)
                this.provinceValues = ''               
            } else {
                this.shengWrongTip = ''
                this.setChangChengBaseInfo({
                    field1: this.Info.type,
                    field2: 'bornAddressProvince',
                    value: this.provinceValues
                })
            }
        },
        verCity () {
            if (RegForeignersLastName(this.cityValues) === false) {
                this.shiWrongTip = RegForeignersLastName(this.cityValues)
                this.cityValues = ''               
            } else {
                this.shiWrongTip = ''
                this.setChangChengBaseInfo({
                    field1: this.Info.type,
                    field2: 'bornAddressCity',
                    value: this.cityValues
                })
            }
        },
        verCounty () {
            if (RegForeignersLastName(this.countyValues) === false) {
                this.xianWrongTip = RegForeignersLastName(this.countyValues)
                this.countyValues = ''               
            } else {
                this.xianWrongTip = ''
                this.setChangChengBaseInfo({
                    field1: this.Info.type,
                    field2: 'bornAddressCounty',
                    value: this.countyValues
                })
            }
        },
        verStreet () {
            if (RegStreetAddressLength(this.streetValues) === '至少填入8个字') {
                this.streetWrongTip = RegStreetAddressLength(this.streetValues)
                this.streetValues = ''               
            } else {
                this.streetWrongTip = ''
                this.setChangChengBaseInfo({
                    field1: this.Info.type,
                    field2: 'bornAddressStreet',
                    value: this.streetValues
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
@import '~components/insurance/chang-cheng/base-info/child/stylus/common.styl'
</style>