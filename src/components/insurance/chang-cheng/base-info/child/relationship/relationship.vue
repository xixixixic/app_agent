<template>
    <div class="detail">
        <div class="info">
            <p class="desTitle">与投保人关系</p>
            <p class='placeholders' @click="showSelectdrop()" :class="this.text === '请选择' ? 'active' : ''" v-show='!this.changChengBaseInfo.backStatus'>
				{{text}}
				<i class='icon-right_arrow'></i>
			</p>
            <p class='placeholders active' :class="this.text === '请选择' ? 'active' : ''" v-show='this.changChengBaseInfo.backStatus'>
				{{text}}
				<i class='icon-right_arrow'></i>
			</p>
        </div>
        <select-drop :selectArray="relationArray" :selectTitle="selectTitle"  v-show="showSelectdropWrap" 
        @sureSelectDrop="sureSelectDrop" @hideSelectDrop="hideSelectDrop" :default-value="this.Info.relationCode"></select-drop>
        <confirm  ref="confirm" :text="confirmText"></confirm>
    </div>
</template>

<script>
import SelectDrop from 'base/select-drop/select-drop'
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
        }
    },
    data () {
        return {
            selectTitle: '选择关系',
            showSelectdropWrap: false,
            confirmText: ''
        }
    },
    computed: {
        relationArray () {
            return this.Info.relationList
        },
        text () {
            for (let obj of this.relationArray) {
                if (obj.nativeCode === this.Info.relationCode) {
                    return obj.name
                }
            }
            return '请选择'
        },
        ...mapGetters([
			'changChengBaseInfo'
		])
    },
    created () {
        this.setDefault()
    },
     methods: {
         setDefault () {
             this.nativeCode = this.Info.relationCode
         },
        showSelectdrop () {
            this.showSelectdropWrap = true
		},
		sureSelectDrop (data) {
            if (data.nativeCode === '00') { // 本人
                this.setChangChengBaseInfo({
                    field1: this.Info.type,
                    field2: 'name',
                    value: this.changChengBaseInfo.applicant.name
                })
                this.setChangChengBaseInfo({
                    field1: this.Info.type,
                    field2: 'sex',
                    value: this.changChengBaseInfo.applicant.sex
                })
                this.setChangChengBaseInfo({
                    field1: this.Info.type,
                    field2: 'birthday',
                    value: this.changChengBaseInfo.applicant.birthday
                })
                this.setChangChengBaseInfo({
                    field1: this.Info.type,
                    field2: 'jobCode',
                    value: this.changChengBaseInfo.applicant.jobCode
                })
                this.setChangChengBaseInfo({
                    field1: this.Info.type,
                    field2: 'jobName',
                    value: this.changChengBaseInfo.applicant.jobName
                })
                this.$emit('changeTheSame', true)
                this.setCode(data)
            } else if (data.nativeCode === '01') { // 夫妻
                this.clearSame()
                this.$emit('changeTheSame', false)
                if (this.changChengBaseInfo.applicant.sex === this.changChengBaseInfo.insured.sex) {
                    this.showConfirm('投被保人同性不能选择夫妻关系')
                    this.setChangChengBaseInfo({
                        field1: this.Info.type,
                        field2: 'relaToAppntCode',
                        value: ''
                    })
                    this.showSelectdropWrap = false
                    this.selected = ''
                } else {
                    this.setCode(data)
                }
            } else {
                this.clearSame()
                this.$emit('changeTheSame', false)
                this.setCode(data)
            }
		},
        setCode (data) {
            this.setChangChengBaseInfo({
                field1: this.Info.type,
                field2: 'relaToAppntCode',
                value: data.nativeCode
            })
            this.showSelectdropWrap = false
            this.selected = data.nativeCode
        },
        clearSame () {
            this.setChangChengBaseInfo({
                field1: this.Info.type,
                field2: 'name',
                value: ''
            })
            this.setChangChengBaseInfo({
                field1: this.Info.type,
                field2: 'sex',
                value: ''
            })
            this.setChangChengBaseInfo({
                field1: this.Info.type,
                field2: 'birthday',
                value: ''
            })
            this.setChangChengBaseInfo({
                field1: this.Info.type,
                field2: 'jobCode',
                value: ''
            })
            this.setChangChengBaseInfo({
                field1: this.Info.type,
                field2: 'jobName',
                value: ''
            })
        },
		hideSelectDrop () {
			this.showSelectdropWrap = false
        },
        ...mapMutations({
			setChangChengBaseInfo: 'SET_LONGLIFE_CHANGCHENG_BASEINFO'
        })
    },
    components: {
        SelectDrop,
        Confirm
    }
}
</script>

<style lang='stylus' scoped>
@import '~components/insurance/chang-cheng/base-info/child/stylus/common.styl'
</style>