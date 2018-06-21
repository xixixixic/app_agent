<template>
    <div class="detail">
        <div class="info">
            <p class="desTitle" ref='nameTitle'>年收入来源</p>
            <p class="placeholders" @click="showSelectdrop()" :class="{'active': text === '请选择收入来源'}">
                {{text}}<i class="icon-down_arrow ico"></i>
            </p>
        </div>
        <select-drop :selectArray="nationArray" :selectTitle="selectTitle"  v-show="showSelectdropWrap" 
        @sureSelectDrop="sureSelectDrop" @hideSelectDrop="hideSelectDrop" :default-value="this.selected"></select-drop>
    </div>
</template>

<script>
import SelectDrop from 'base/select-drops/select-drops'
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
    data () {
        return {
            selectTitle: '选择收入来源',
            showSelectdropWrap: false,
            selected: '0'
        }
    },
    computed: {
        nationArray () {
            return this.guangdaPolicy.DicList.sourceOfIncome
        },
        text () {
            for (let obj of this.nationArray) {
                if (obj.id === this.selected) {
                    return obj.value
                }
            }
            return '请选择收入来源'
        },
        ...mapGetters([
			'guangdaPolicy'
		])
    },
    created () {
        this.setDefault()
    },
     methods: {
        setDefault () {
            this.selected = this.Info.defaultSourceOfIncome
        },
        showSelectdrop () {
            this.showSelectdropWrap = true
		},
		sureSelectDrop (data) {
            this.selected = data.id
            this.showSelectdropWrap = false
            this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                type: 4,
                field1: 'policyInfo',
                field2: 'sourceOfIncome',
                value: data.id
            })
		},
		hideSelectDrop () {
			this.showSelectdropWrap = false
        },
        ...mapMutations({
			 SET_LONGLIFE_GUANGDA_POLICYINFO: 'SET_LONGLIFE_GUANGDA_POLICYINFO'
		})
    },
    components: {
        SelectDrop
    }
}
</script>

<style lang='stylus' scoped>
@import '~components/insurance/chang-cheng/perfect-info/child/stylus/common.styl'
</style>