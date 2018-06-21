<template>
    <div class="detail">
        <div class="info lastInfo">
            <p class="desTitle" ref='nameTitle'>手机号码</p>
            <p class="placeholders">
                <input type="text" placeholder="请填写手机号码" class="placeholdersInput" v-model="values" @blur='verValue'/>
            </p>
        </div>
        <div :class="this.wrongTip !== '' ? 'errTip' : 'hide'">
            <span class="errIco"></span>
            <span class="errText">{{wrongTip}}填写有误</span>
        </div>
        <confirm  ref="confirm" :text="confirmText"></confirm>
    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import {RegPhone} from 'common/js/iscardID-util.js'
import Confirm from 'base/confirm/confirm'
import {confirm} from 'common/js/mixin.js'
export default {
    mixins: [confirm],
    props: {
        Info: {
            type: Object,
            default: function () {
                return {}
            }
        },
        client: {
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
            wrongTip: '',
            confirmText: ''
        }
    },
    created () {
        this.setDefalut()
    },
    methods: {
        setDefalut () {
            this.values = this.client.defaultPhone
        },
        verValue () {
            if (RegPhone(this.values) === false) {
                this.showConfirm('手机号码填写有误，请重新输入')
                this.values = ''
                this.setChangChengBaseInfo({
                    field1: this.client.typeField,
                    field2: 'phone',
                    value: ''
                })           
            } else {
                this.wrongTip = ''
                this.setChangChengBaseInfo({
                    field1: this.client.typeField,
                    field2: 'phone',
                    value: this.values
                })
            }
        },
        ...mapMutations({
			setChangChengBaseInfo: 'SET_LONGLIFE_CHANGCHENG_BASEINFO'
		})
    },
    components: {
        Confirm
    }
}
</script>

<style lang='stylus' scoped>
@import '~components/insurance/chang-cheng/base-info/child/stylus/common.styl'
</style>