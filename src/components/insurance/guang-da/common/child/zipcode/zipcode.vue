<template>
    <div class="detail">
        <div class="info">
            <p class="desTitle" ref='nameTitle'>邮政编码</p>
            <p class="placeholders">
                <input type="text" placeholder="请填写邮政编码" class="placeholdersInput" v-model="values" @blur='verName'/>
            </p>
        </div>
        <div :class="this.wrongTip !== '' ? 'errTip' : 'hide'">
            <span class="errIco"></span>
            <span class="errText">{{wrongTip}}</span>
        </div>
    </div>
</template>

<script>
import {checkZipCode} from 'common/js/validate-util.js'
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
            this.values = this.Info.defaultZipCode
        },
        verName () {
            this.wrongTip = checkZipCode(this.values)
            if (this.wrongTip === '') {
                if (this.Info.type === 'appnt') {
                    this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                        type: 4,
                        field1: this.Info.type,
                        field2: 'zipCode',
                        value: this.values
                    })
                } else if (this.Info.type === 'insurants') {
                    this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                        type: 4,
                        field1: this.Info.type,
                        field2: 'insurant#0',
                        field3: 'zipCode',
                        value: this.values
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