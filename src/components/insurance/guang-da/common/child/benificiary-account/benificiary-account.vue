<template>
    <div class="detail">
        <div class="info">
            <p class="desTitle" ref='nameTitle'>受益人授权账号</p>
            <p class="placeholders">
                <input type="text" placeholder="请填写受益人授权账号" class="placeholdersInput" v-model="values" @blur='verValues'/>
            </p>
        </div>
        <div :class="this.wrongTip !== '' ? 'errTip' : 'hide'">
            <span class="errIco"></span>
            <span class="errText">{{wrongTip}}填写有误</span>
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
			'changChengBaseInfo'
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
            this.values = this.Info.defaultBenificiaryAccount
        },
        verValues () {
            this.setChangChengBaseInfo({
				field1: this.Info.type,
				field2: 'beneBankAccNo',
				value: this.values
			})
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