<template>
    <div class="detail">
        <div class="info">
            <p class="desTitle">受益人账户号码</p>
            <p class="placeholders">
                <input type="text" placeholder="请填写受益人账户号码" class="placeholdersInput" v-model="values" @blur='verName'/>
            </p>
        </div>
        <div :class="this.wrongTip !== '' ? 'errTip' : 'hide'">
            <span class="errIco"></span>
            <span class="errText">{{wrongTip}}</span>
        </div>
    </div>
</template>

<script>
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
    computed: {
        ...mapGetters([
			'changChengBankDetail'
		])
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
            this.values = this.Info.defaultBenifitAccountNum
        },
        verName () {
            if(this.values.length < 16 || this.values.length > 19) {
                this.wrongTip = '银行卡号长度必须在16到19之间'
                this.setChangChengBankDetail({
                    field1: this.Info.type,
                    field2: 'beneBankAccNo',
                    value: ''
                })
            } else {
                this.setChangChengBankDetail({
                    field1: this.Info.type,
                    field2: 'beneBankAccNo',
                    value: this.values
                })
                this.wrongTip = ''
            }
        },
        ...mapMutations({
			setChangChengBankDetail: 'SET_LONGLIFE_CHANGCHENG_BANKDETAIL'
		})
    }
}
</script>

<style lang='stylus' scoped>
@import '~components/insurance/chang-cheng/base-info/child/stylus/common.styl'
</style>