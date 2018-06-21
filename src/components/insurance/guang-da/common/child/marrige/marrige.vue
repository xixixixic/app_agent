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
import SelectDrop from 'base/select-drops/select-drops'
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
            selectTitle: '选择婚姻状况',
            showSelectdropWrap: false,
            selected: '0'
        }
    },
    computed: {
        nationArray () {
            return this.guangdaPolicy.DicList.marriage
        },
        text () {
            for (let obj of this.nationArray) {
                if (obj.id === this.selected) {
                    return obj.value
                }
            }
            return '请选择婚姻状况'
        },
        ...mapGetters([
            'guangdaPolicy',
            'guangdaPremiumRisk'
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
            if (this.guangdaPremiumRisk.insured.relationId === '33' && data.id === '10') {
                 this.showConfirm('请检查婚姻状况是否选择正确')
                 return false
            } else {
                this.selected = data.id
                this.showSelectdropWrap = false
                if (this.Info.type === 'appnt') {
                    this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                        type: 4,
                        field1: this.Info.type,
                        field2: 'marriage',
                        value: data.id
                    })
                } else if (this.Info.type === 'insurants') {
                    this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                        type: 4,
                        field1: this.Info.type,
                        field2: 'insurant#0',
                        field3: 'marriage',
                        value: data.id
                    })
                }
            }
		},
		hideSelectDrop () {
			this.showSelectdropWrap = false
        },
        ...mapMutations({
			SET_LONGLIFE_GUANGDA_POLICYINFO: 'SET_LONGLIFE_GUANGDA_POLICYINFO'
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