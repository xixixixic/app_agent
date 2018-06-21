<template>
    <div class="applicant">
        <div class="detailTitle">
            <a class="titleLeft">投保人信息</a>
        </div>
        <name :Info='Info' ref='name'></name>
        <sex :Info='Info'></sex>
        <birthday :Info='Info'></birthday>
        <position :Info='Info'></position>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Name from 'components/insurance/chang-cheng/base-info/child/name/name.vue'
import Sex from 'components/insurance/chang-cheng/base-info/child/sex/sex.vue'
import Birthday from 'components/insurance/chang-cheng/base-info/child/birthday/birthday.vue'
import Position from 'components/insurance/chang-cheng/base-info/child/position/position.vue'
import RelationshipToInsured from 'components/insurance/chang-cheng/base-info/child/relationship-to-insured/relationship-to-insured.vue'
export default {
    data () {
        return {
        }
    },
    props: {
        defaultValue: {
            type: Object,
            default: function () {
                return {}
            }
        }
      },
    computed: {
        ...mapGetters([
			'changChengBaseInfo'
		]),
        Info () {
           return {
               type: 'applicant',
               defaultName: this.changChengBaseInfo.applicant.name,
               defaultBirthday: this.changChengBaseInfo.applicant.birthday !== '' ? this.changChengBaseInfo.applicant.birthday : '请选择出生日期',
               defaultSex: this.changChengBaseInfo.applicant.sex,
               defaultJob: this.changChengBaseInfo.applicantJob,
               defaultCode: this.changChengBaseInfo.applicant.jodCode,
               defaultRelaToInsureCode: this.changChengBaseInfo.applicant.relaToInsureCode,
               joblist: this.defaultValue.jobs,
               relationList: this.defaultValue.relaToAppntCode
           }
        }
    },
    methods: {
    },
    components: {
        Name,
        Sex,
        Birthday,
        Position,
        RelationshipToInsured
    }
}
</script>

<style lang='stylus' scoped>
@import '~components/insurance/chang-cheng/base-info/child/stylus/common.styl'
</style>