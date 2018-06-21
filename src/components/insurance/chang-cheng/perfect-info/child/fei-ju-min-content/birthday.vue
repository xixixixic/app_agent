<template>
    <div class="detail">
        <div class="info lastInfo">
            <p class="desTitle">出生日期</p>
            <p class="placeholders active">
                <span class="choice" :id="'birthDay' + Info.type" :class="{'active': birth === '请选择出生日期'}">{{birth}}</span>
            </p>
        </div>
        <div :id="'birthDayContainer' + Info.type"></div>
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
    created () {
        this.setDefault()
    },
    computed: {
        birth () {
            console.log(this.Info)
            console.log('this.Info.type')
            if (this.Info.typeApp === 'applicant') {
                return this.changChengBaseInfo.applicant.birthday
            } else if (this.Info.typeApp === 'insured') {
                return this.changChengBaseInfo.insured.birthday
            }
        },
        ...mapGetters([
			'changChengBaseInfo'
		])
    },
    methods: {
        setDefault () {
            this.setChangChengBaseInfo({
                field1: this.Info.type,
                field2: 'birthDate',
                value: this.birth
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