<template>
    <div class="insured">
        <div class="detailTitle">
            <a class="titleLeft">被保人信息</a>
        </div>
        <relationship :Info='Info' @changeTheSame='theSame'></relationship>
        <name :Info='Info' ref='name'></name>
        <sex :Info='Info' ref='sex'></sex>
        <birthday :Info='Info' ref='birthday'></birthday>
        <position :Info='Info' ref='position'></position>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Name from 'components/insurance/chang-cheng/base-info/child/name/name.vue'
import Sex from 'components/insurance/chang-cheng/base-info/child/sex/sex.vue'
import Birthday from 'components/insurance/chang-cheng/base-info/child/birthday/birthday.vue'
import Position from 'components/insurance/chang-cheng/base-info/child/position/position.vue'
import Relationship from 'components/insurance/chang-cheng/base-info/child/relationship/relationship.vue'
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
               type: 'insured',
               defaultName: this.changChengBaseInfo.insured.name,
               defaultBirthday: this.changChengBaseInfo.insured.birthday !== '' ? this.changChengBaseInfo.insured.birthday : '请选择出生日期',
               defaultSex: this.changChengBaseInfo.insured.sex,
               defaultJob: this.changChengBaseInfo.insured.jobName,
               defaultCode: this.changChengBaseInfo.insured.jodCode,
               joblist: this.defaultValue.jobs,
               relationList: this.defaultValue.relaToAppntCode,
               relationCode: this.changChengBaseInfo.insured.relaToAppntCode
           }
        }
    },
    methods: {
        theSame (data) {
            if (data === true) {
                this.$refs.name.setSame()
                // this.$refs.sex.setSame()
                this.$refs.birthday.setSame()
                this.$refs.position.setSame()
            } else {
                this.$refs.name.clearSame()
                // this.$refs.sex.clearSame()
                this.$refs.birthday.clearSame()
                this.$refs.position.clearSame()
            }
        }
    },
    components: {
        Name,
        Sex,
        Birthday,
        Position,
        Relationship
    }
}
</script>

<style lang='stylus' scoped>
@import '~components/insurance/chang-cheng/base-info/child/stylus/common.styl'
.insured
    margin-bottom: (100/$scale)
</style>