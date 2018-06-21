<template>
    <div class="detail">
        <div class="info">
            <p class="desTitle" ref='nameTitle'>生存金转让授权</p>
            <p class="placeholders" @click="showSelectdrop()" :class="{'active': text === '请选生存金是否转让授权'}">
                {{text}}<i class="icon-down_arrow ico"></i>
            </p>
        </div>
        <select-drop :selectArray="nationArray" :selectTitle="selectTitle"  v-show="showSelectdropWrap" 
        @sureSelectDrop="sureSelectDrop" @hideSelectDrop="hideSelectDrop" :default-value="this.selected"></select-drop>
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
            selectTitle: '生存金转让授权',
            showSelectdropWrap: false,
            selected: '0'
        }
    },
    computed: {
        nationArray () {
            return [
                {name: '不授权', nativeCode: 'N'},
                {name: '授权', nativeCode: 'Y'}
                ]
        },
        text () {
            for (let obj of this.nationArray) {
                if (obj.nativeCode === this.selected) {
                    return obj.name
                }
            }
            return '请选生存金是否转让授权'
        },
        ...mapGetters([
			'changChengBankDetail'
		])
    },
    created () {
        this.setDefault()
    },
     methods: {
        setDefault () {
            this.selected = this.Info.defaultShengcun
        },
        showSelectdrop () {
            this.showSelectdropWrap = true
		},
		sureSelectDrop (data) {
            this.selected = data.nativeCode
            this.setChangChengBankDetail({
				field1: this.Info.type,
				field2: 'aliveGetMode',
				value: data.nativeCode
            })
			this.showSelectdropWrap = false
		},
		hideSelectDrop () {
			this.showSelectdropWrap = false
        },
        ...mapMutations({
			setChangChengBankDetail: 'SET_LONGLIFE_CHANGCHENG_BANKDETAIL'
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