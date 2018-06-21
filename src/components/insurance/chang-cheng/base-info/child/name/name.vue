<template>
    <div class="detail">
        <div class="info">
            <p class="desTitle" ref='nameTitle'>姓名</p>
            <p class="placeholders" v-show='!this.changChengBaseInfo.backStatus'>
                <input type="text" placeholder="请填写姓名" class="placeholdersInput" v-model="name" @blur='verName'/>
            </p>
            <p class="placeholders" v-show='this.changChengBaseInfo.backStatus'>
                <span class='active'>{{name}}</span>
            </p>
        </div>
        <div :class="this.nameTip !== '' ? 'errTip' : 'hide'">
            <span class="errIco"></span>
            <span class="errText">{{nameTip}}填写有误</span>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import {RegName} from 'common/js/iscardID-util.js'
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
        nameStatus () {
            return this.valueStatus
        },
        ...mapGetters([
			'changChengBaseInfo'
		])
    },
    data () {
        return {
            name: '',
            nameTip: ''
        }
    },
    created () {
        this.setDefalut()
    },
    methods: {
        setDefalut () {
            this.name = this.Info.defaultName
        },
        setSame () {
            this.name = this.changChengBaseInfo.applicant.name
        },
        clearSame () {
            this.name = this.changChengBaseInfo.insured.name
        },
        verName () {
            if (RegName(this.name) === false) {
                this.nameTip = '姓名'
                this.name = ''               
            } else {
                this.nameTip = ''
                this.setChangChengBaseInfo({
                    field1: this.Info.type,
                    field2: 'name',
                    value: this.name
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
.placeholders
    .active
        color: #bbb
</style>