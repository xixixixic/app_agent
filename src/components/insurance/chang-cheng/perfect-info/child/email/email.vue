<template>
    <div class="detail">
        <div class="info lastInfo">
            <p class="desTitle" ref='nameTitle'>邮箱</p>
            <p class="placeholders">
                <input type="text" placeholder="请填写邮箱" class="placeholdersInput" v-model="values" @blur='verValue'/>
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
import {RegEmail} from 'common/js/iscardID-util.js'
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
            this.values = this.Info.defaultEmail
        },
        verValue () {
            if (RegEmail(this.values) === false) {
                this.wrongTip = '邮箱'
                this.values = ''               
            } else {
                this.wrongTip = ''
                this.setChangChengBaseInfo({
                    field1: this.Info.type,
                    field2: 'email',
                    value: this.values
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