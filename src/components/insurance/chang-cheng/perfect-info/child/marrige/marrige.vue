<template>
    <div class="detail">
        <div class="info">
            <p class="desTitle" ref='nameTitle'>婚姻状况</p>
            <p class="placeholders" @click="showSelectdrop()" :class="{'active': text === '请选择婚姻状况'}">
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
            selectTitle: '选择婚姻状况',
            showSelectdropWrap: false,
            selected: '0',
            confirmText: ''
        }
    },
    computed: {
        nationArray () {
            return this.changChengBaseInfo.init.marries
        },
        text () {
            for (let obj of this.nationArray) {
                if (obj.nativeCode === this.selected) {
                    return obj.name
                }
            }
            return '请选择婚姻状况'
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
            this.selected = this.Info.defaultMarrige
        },
        showSelectdrop () {
            this.showSelectdropWrap = true
		},
		sureSelectDrop (data) {
            if (this.Info.type === 'applicant') {
                let day = this.changChengBaseInfo.applicant.birthday
                let realYear = jsGetAge(day)
                if (realYear <= 18) {
                    if (data.nativeCode === '5') {
                        this.showConfirm('未成年，请确认婚姻状况！')
                    }
                }
            } else {
                let day = this.changChengBaseInfo.insured.birthday
                let realYear = jsGetAge(day)
                if (realYear <= 18) {
                    if (data.nativeCode === '5') {
                        this.showConfirm('未成年，请确认婚姻状况！')
                    }
                }
            }
            this.selected = data.nativeCode
            this.setChangChengBaseInfo({
				field1: this.Info.type,
				field2: 'marryState',
				value: data.nativeCode
            })
            this.setChangChengBaseInfo({
				field1: this.Info.type,
				field2: 'marryName',
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