<template>
    <div class="detail">
        <div class="info">
            <p class="desTitle" ref='nameTitle'>教育程度</p>
            <p class="placeholders" @click="showSelectdrop()" :class="{'active': text === '请选择教育程度'}">
                {{text}}<i class="icon-down_arrow ico"></i>
            </p>
        </div>
        <select-drop :selectArray="nationArray" :selectTitle="selectTitle"  v-show="showSelectdropWrap" 
        @sureSelectDrop="sureSelectDrop" @hideSelectDrop="hideSelectDrop" :default-value="this.selected"></select-drop>
        <confirm  ref="confirm" :text="confirmText"></confirm>
    </div>
</template>

<script>
import SelectDrop from 'base/select-drop/select-drop'
import {mapGetters, mapMutations} from 'vuex'
import {jsGetAge} from 'common/js/date-add-util.js'
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
            selectTitle: '选择教育程度',
            showSelectdropWrap: false,
            selected: '0',
            confirmText: ''
        }
    },
    computed: {
        nationArray () {
            return this.changChengBaseInfo.init.edus
        },
        text () {
            for (let obj of this.nationArray) {
                if (obj.nativeCode === this.selected) {
                    return obj.name
                }
            }
            return '请选择教育程度'
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
            this.selected = this.Info.defaultEdu
        },
        showSelectdrop () {
            this.showSelectdropWrap = true
		},
		sureSelectDrop (data) {
            if (this.Info.type === 'applicant') {
                let day = this.changChengBaseInfo.applicant.birthday
                let realYear = jsGetAge(day)
                if (realYear <= 10) {
                    if (data.nativeCode === '0' || data.nativeCode === '1' || data.nativeCode === '2' || data.nativeCode === '3' || data.nativeCode === '4') {
                        this.showConfirm('投保人年龄低于10周岁，请注意学历选择')
                    }
                }
            } else {
                let day = this.changChengBaseInfo.insured.birthday
                let realYear = jsGetAge(day)
                if (realYear <= 10) {
                    if (data.nativeCode === '0' || data.nativeCode === '1' || data.nativeCode === '2' || data.nativeCode === '3' || data.nativeCode === '4') {
                        this.showConfirm('被保人年龄低于10周岁，请注意学历选择')
                    }
                }
            }
            this.selected = data.nativeCode
            this.setChangChengBaseInfo({
				field1: this.Info.type,
				field2: 'edu',
				value: data.nativeCode
            })
            this.setChangChengBaseInfo({
				field1: this.Info.type,
				field2: 'eduName',
				value: data.name
            })
			this.showSelectdropWrap = false
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
@import '~components/insurance/chang-cheng/perfect-info/child/stylus/common.styl'
</style>