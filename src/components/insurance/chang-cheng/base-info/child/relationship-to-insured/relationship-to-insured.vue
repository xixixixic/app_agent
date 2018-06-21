<template>
    <div class="detail">
        <div class="info lastInfo">
            <p class="desTitle">与被保人关系</p>
            <p class='placeholders' @click="showSelectdrop()" :class="this.text === '请选择' ? 'active' : ''">
				{{text}}
				<i class='icon-right_arrow'></i>
			</p>
        </div>
        <select-drop :selectArray="relationArray" :selectTitle="selectTitle"  v-show="showSelectdropWrap" 
        @sureSelectDrop="sureSelectDrop" @hideSelectDrop="hideSelectDrop" :default-value="this.Info.defaultRelaToInsureCode"></select-drop>
    </div>
</template>

<script>
import SelectDrop from 'base/select-drop/select-drop'
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
            selectTitle: '选择关系',
            showSelectdropWrap: false
        }
    },
    computed: {
        relationArray () {
            return this.Info.relationList
        },
        text () {
            for (let obj of this.relationArray) {
                if (obj.nativeCode === this.Info.defaultRelaToInsureCode) {
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
             this.nativeCode = this.Info.defaultRelaToInsureCode
         },
        showSelectdrop () {
            this.showSelectdropWrap = true
		},
		sureSelectDrop (data) {
            if (data.nativeCode === '00') {
                // this.$emit('goBefore')
                this.setChangChengBaseInfo({
                    field1: 'insured',
                    field2: 'name',
                    value: this.changChengBaseInfo.applicant.name
                })
                this.setChangChengBaseInfo({
                    field1: 'insured',
                    field2: 'birthday',
                    value: this.changChengBaseInfo.applicant.birthday
                })
            }
            this.setChangChengBaseInfo({
				field1: this.Info.type,
				field2: 'relaToInsureCode',
				value: data.nativeCode
			})
			this.showSelectdropWrap = false
            this.selected = data.nativeCode
		},
		hideSelectDrop () {
			this.showSelectdropWrap = false
        },
        ...mapMutations({
			setChangChengBaseInfo: 'SET_LONGLIFE_CHANGCHENG_BASEINFO'
		})
    },
    components: {
        SelectDrop
    }
}
</script>

<style lang='stylus' scoped>
@import '~components/insurance/chang-cheng/base-info/child/stylus/common.styl'
</style>