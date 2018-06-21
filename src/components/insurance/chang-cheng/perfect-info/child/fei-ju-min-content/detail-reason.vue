<template>
    <div class="detail">
        <div class="info">
            <p class="desTitle" ref='nameTitle'>具体原因</p>
            <p class="placeholders">
                <input type="text" placeholder="请填写具体原因" class="placeholdersInput" v-model="values" @blur='verValue'/>
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
import {RegForeignersLastName} from 'common/js/iscardID-util.js'
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
            this.values = this.Info.defaultReason
        },
        verValue () {
            if (RegForeignersLastName(this.values) === false) {
                this.wrongTip = RegForeignersLastName(this.values)
                this.values = ''               
            } else {
                this.wrongTip = ''
                this.setChangChengBaseInfo({
                    field1: this.Info.type,
                    field2: 'reasonInfo',
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