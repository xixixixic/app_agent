<template>
    <div class="detail">
        <div class="info">
            <p class="desTitle" ref='nameTitle'>身高</p>
            <p class="placeholders">
                <input type="text" placeholder="请填写身高" class="placeholdersInput" v-model="values" @blur='verValues'/>&nbsp;/cm
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
            this.values = this.Info.defaultHeight
        },
        verValues () {
            this.wrongTip = checkNum(this.values)
            if (this.wrongTip === '') {
                if (this.Info.type === 'appnt') {
                    if (this.values < 120 || this.values > 200) {
                        this.wrongTip = '请检查身高是否输入正确'
                        this.values = ''
                    } else {
                        this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                            type: 4,
                            field1: this.Info.type,
                            field2: 'appntStature',
                            value: this.values
                        })
                    }
                } else if (this.Info.type === 'insurants') {
                    if (this.values < 50 || this.values > 200) {
                        this.wrongTip = '请检查身高是否输入正确'
                        this.values = ''
                    } else {
                        this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                            type: 4,
                            field1: this.Info.type,
                            field2: 'insurant#0',
                            field3: 'stature',
                            value: this.values
                        })
                    }
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