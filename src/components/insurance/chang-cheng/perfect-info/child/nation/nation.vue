<template>
    <div class="detail">
        <div class="info">
            <p class="desTitle" ref='nameTitle'>国籍</p>
            <p class="placeholders" @click="showSelectdrop()" :class="{'active': text === '请选择国籍'}">
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
        },
        InitInfoList: {
            type: Object,
            default: function () {
                return {}
            }
        }
    },
    data () {
        return {
            selectTitle: '选择国籍',
            showSelectdropWrap: false,
            confirmText: '',
            cardTypes: ''
        }
    },
    computed: {
        nationArray () {
            return this.changChengBaseInfo.init.nations
        },
        text () {
            for (let obj of this.nationArray) {
                if (obj.nativeCode === this.selected) {
                    return obj.name
                }
            }
            return '请选择国籍'
        },
        selected () {
            return this.Info.defaultNation
        },
        ...mapGetters([
			'changChengBaseInfo'
		])
    },
    created () {
        // this.setDefault()
    },
     methods: {
        setDefault () {
            this.selected = this.Info.defaultNation
        },
        showSelectdrop () {
            this.showSelectdropWrap = true
		},
		sureSelectDrop (data) {
            this.Info.defaultNation = data.nativeCode
            if (this.Info.type === 'applicant') {
                this.cardTypes = this.changChengBaseInfo.applicant.cardType
            } else {
                this.cardTypes = this.changChengBaseInfo.insured.cardType
            }
            if (this.cardTypes === '1') { // 国籍为中国 选的护照
                if (data.nativeCode === 'CHN') {
                    this.showConfirm('国籍与证件类型冲突，请重选')
                    this.setChangChengBaseInfo({
                        field1: this.Info.type,
                        field2: 'nation',
                        value: ''
                    })
                    this.setChangChengBaseInfo({
                        field1: this.Info.type,
                        field2: 'nationName',
                        value: ''
                    })
                    this.selected = this.Info.defaultNation
                } else {
                    console.log('oooo')
                    this.setChangChengBaseInfo({
                        field1: this.Info.type,
                        field2: 'nation',
                        value: data.nativeCode
                    })
                    this.setChangChengBaseInfo({
                        field1: this.Info.type,
                        field2: 'nationName',
                        value: data.name
                    })
                    this.selected = this.Info.defaultNation
                }
            } else {
                console.log('ppoosss')
                this.setChangChengBaseInfo({
                    field1: this.Info.type,
                    field2: 'nation',
                    value: data.nativeCode
                })
                this.setChangChengBaseInfo({
                    field1: this.Info.type,
                    field2: 'nationName',
                    value: data.name
                })
            }
            console.log('this')
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