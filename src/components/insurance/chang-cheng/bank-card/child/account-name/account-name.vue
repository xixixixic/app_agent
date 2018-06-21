<template>
    <div class="detail">
        <div class="info">
            <p class="desTitle">账户名</p>
            <p class="placeholders">
                <!-- <input type="text" placeholder="请填写账户名" class="placeholdersInput" v-model="values" @blur='verName'/> -->
                <span>{{name}}</span>
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
        name () {
            return this.changChengBaseInfo.applicant.name
        },
        ...mapGetters([
			'changChengBankDetail', 'changChengBaseInfo'
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
            this.setChangChengBankDetail({
				field1: this.Info.type,
				field2: 'bankAccName',
				value: this.name
			})
        },
        verName () {
            this.setChangChengBankDetail({
				field1: this.Info.type,
				field2: 'bankAccName',
				value: this.values
			})
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