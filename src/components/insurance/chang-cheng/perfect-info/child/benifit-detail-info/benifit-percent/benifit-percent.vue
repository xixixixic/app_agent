<template>
    <div class="detail">
        <div class="info">
            <p class="desTitle" ref='nameTitle'>受益比例</p>
            <p class="placeholders">
                <input type="text" placeholder="请填写受益比例" class="placeholdersInput" v-model="values" @blur='verValues'/>%
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
            if (this.client.types === 'sgbenificiary') {
                this.values = this.changChengBaseInfo.sgbenificiary[this.client.num].lot === '' ? '' : (this.changChengBaseInfo.sgbenificiary[this.client.num].lot) * 100
            } else {
                this.values = this.changChengBaseInfo.scbenificiary[this.client.num].lot === '' ? '' : (this.changChengBaseInfo.scbenificiary[this.client.num].lot) * 100
            }
        },
        verValues () {
            if (/^(0|[1-9]\d|100)$/.test(this.values) === true) {
                this.setChangChengBaseInfo({
                    field1: this.client.typeField,
                    field2: 'lot',
                    value: (this.values / 100).toFixed(2)
                })
                // this.setChangChengBaseInfo({
                //     field1: 'benificiary',
                //     field2: 'sgAddListFlag',
                //     value: true
                // })
                // this.setChangChengBaseInfo({
                //     field1: 'benificiary',
                //     field2: 'sgAddIndexFlag',
                //     value: true
                // })
            } else {
                this.values = ''
                this.setChangChengBaseInfo({
                    field1: this.client.typeField,
                    field2: 'lot',
                    value: ''
                })
                // this.setChangChengBaseInfo({
                //     field1: 'benificiary',
                //     field2: 'sgAddListFlag',
                //     value: false
                // })
                // this.setChangChengBaseInfo({
                //     field1: 'benificiary',
                //     field2: 'sgAddIndexFlag',
                //     value: false
                // })
                this.showConfirm('请填入大于0小于100的整数')
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