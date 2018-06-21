<template>
    <div class="detail">
        <div class="info">
            <p class="desTitle">与被保人关系</p>
            <p class='placeholders' @click="showSelectdrop()" :class="this.text === '请选择' ? 'active' : ''">
				{{text}}
				<i class='icon-right_arrow'></i>
			</p>
        </div>
        <select-drop :selectArray="relationArray" :selectTitle="selectTitle"  v-show="showSelectdropWrap" 
        @sureSelectDrop="sureSelectDrop" @hideSelectDrop="hideSelectDrop" :default-value="selected"></select-drop>
        <confirm ref="confirm" :text="confirmText"></confirm>
    </div>
</template>

<script>
import event from 'common/js/event.js'
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
            selectTitle: '选择关系',
            showSelectdropWrap: false,
            selected: '0'
        }
    },
    computed: {
        relationArray () {
            return this.guangdaPolicy.DicList.relation
        },
        text () {
            for (let obj of this.relationArray) {
                if (obj.id === this.selected) {
                    return obj.value
                }
            }
            return '请选择'
        },
        ...mapGetters([
            'guangdaPolicy',
            'guangdaTrail'
		])
    },
    created () {
        this.setDefault()
    },
     methods: {
         setDefault () {
             this.selected = this.Info.defaultRelationId
         },
        showSelectdrop () {
            this.showSelectdropWrap = true
		},
		sureSelectDrop (data) {
            if (data.id === '00') {
                this.showConfirm('身故受益人无法选择本人')
                return false
            } else {
                this.showSelectdropWrap = false
                this.selected = data.id
                this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                    type: 4,
                    field1: this.Info.type,
                    field2: 'relToIns',
                    index:this.Info.index,
                    value: data.id
                })
            }
		},
		hideSelectDrop () {
			this.showSelectdropWrap = false
        },
        ...mapMutations({
			SET_LONGLIFE_GUANGDA_POLICYINFO:'SET_LONGLIFE_GUANGDA_POLICYINFO'
		})
    },
    components: {
        SelectDrop,
        Confirm
    }
}
</script>

<style lang='stylus' scoped>
@import '~components/insurance/guang-da/common/child/stylus/common.styl'
</style>