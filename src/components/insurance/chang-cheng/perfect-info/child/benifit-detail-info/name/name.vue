<template>
    <div class="detail">
        <div class="info">
            <p class="desTitle" ref='nameTitle'>姓名</p>
            <p class="placeholders active">
                <input type="text" placeholder="请填写姓名" class="placeholdersInput" v-model="values" @blur='verValues'/>
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
                this.values = this.changChengBaseInfo.sgbenificiary[this.client.num].name
            } else {
                this.values = this.changChengBaseInfo.scbenificiary[this.client.num].name
            }
        },
        verValues () {
            this.setChangChengBaseInfo({
				field1: this.client.typeField,
				field2: 'name',
				value: this.values
            })
            if (this.client.types === 'sgbenificiary') {
                this.setChangChengBaseInfo({
                    field1: this.client.typeField,
                    field2: 'type',
                    value: '1'
                })
                this.setChangChengBaseInfo({
                    field1: this.client.typeField,
                    field2: 'rapidType',
                    value: '99'
                })
            } else {
                this.setChangChengBaseInfo({
                    field1: this.client.typeField,
                    field2: 'type',
                    value: '0'
                })
                this.setChangChengBaseInfo({
                    field1: this.client.typeField,
                    field2: 'rapidType',
                    value: '99'
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