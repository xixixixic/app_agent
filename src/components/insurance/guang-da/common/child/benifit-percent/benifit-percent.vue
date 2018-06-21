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
            wrongTip: ''
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
            this.setChangChengBaseInfo({
				field1: this.client.typeField,
				field2: 'lot',
				value: (this.values / 100).toFixed(2)
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