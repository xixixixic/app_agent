<template>
    <div class="detail">
        <div class="info">
            <p class="desTitle" ref='nameTitle'>纳税人编号</p>
            <p class="placeholders">
                <input type="text" placeholder="请填写纳税人编号" class="placeholdersInput" v-model="values" @blur='verName'/>
            </p>
        </div>
        <div :class="this.wrongTip !== '' ? 'errTip' : 'hide'">
            <span class="errIco"></span>
            <span class="errText">{{wrongTip}}</span>
        </div>
    </div>
</template>

<script>
import {checkNum} from 'common/js/validate-util.js'
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
    data () {
        return {
            values: '',
            wrongTip: ''
        }
    },
    created () {
        this.setDefalut()
    },
    methods: {
        setDefalut () {
            this.values = this.Info.defalutTin
        },
        verName () {
        this.wrongTip = checkNum(this.values)
            if (this.wrongTip === '') {
                if (this.Info.type === 'appnt') {
                    let tax = {
                        'taxInfo': [{
                                'reasonCheck': '',
                                'reasonMessage': '',
                                'taxArea': this.Info.defaultNation,
                                'tin': this.values
                            }]
                    }
                    this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                        type: 4,
                        field1: this.Info.type,
                        field2: 'appntTaxInfo',
                        field3:'taxInfoList',
                        value: tax
                    })
                } else if (this.Info.type === 'insurants') {
                    let tax = {
                        'taxInfo': [{
                                'reasonCheck': '',
                                'reasonMessage': '',
                                'taxArea': this.Info.defaultNation,
                                'tin': this.values
                            }]
                    }
                    this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                        type: 4,
                        field1: this.Info.type,
                        field2: 'insurant#0',
                        field3: 'insurantTaxInfo',
                        field4: 'taxInfoList',
                        value: tax
                    })
                }
            } else {
                this.values = ''
            }
        },
        ...mapMutations({
		   SET_LONGLIFE_GUANGDA_POLICYINFO: 'SET_LONGLIFE_GUANGDA_POLICYINFO'
		})
    }
}
</script>

<style lang='stylus' scoped>
@import '~components/insurance/chang-cheng/base-info/child/stylus/common.styl'
</style>