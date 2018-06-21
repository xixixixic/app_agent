<template>
    <div class="detail">
        <div class="info">
            <p class="desTitle" ref='nameTitle'>签名人身份</p>
            <p class="placeholders" @click="showSelectdrop()" :class="{'active': text === '请选择签名人身份'}">
                {{text}}<i class="icon-down_arrow ico"></i>
            </p>
        </div>
        <select-drop :selectArray="resonArray" :selectTitle="selectTitle"  v-show="showSelectdropWrap" 
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
            selectTitle: '选择签名人身份',
            showSelectdropWrap: false,
            selected: '0',
            resonArray: [
                {name: '本人', nativeCode: '1'},
                {name: '代理人', nativeCode: '2'}
            ]
        }
    },
    computed: {
        text () {
            for (let obj of this.resonArray) {
                if (obj.nativeCode === this.selected) {
                    return obj.name
                }
            }
            return '请选择签名人身份'
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
            this.selected = this.Info.defaultWhyNoTaxNum
        },
        showSelectdrop () {
            this.showSelectdropWrap = true
		},
		sureSelectDrop (data) {
            this.selected = data.nativeCode
            this.setChangChengBaseInfo({
				field1: this.Info.type,
				field2: 'autograph',
				value: data.nativeCode
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
        SelectDrop
    }
}
</script>

<style lang='stylus' scoped>
@import '~components/insurance/chang-cheng/perfect-info/child/stylus/common.styl'
.getNum
    height: (90/$scale)
    line-height: (90/$scale)
    font-size: (28/$scale)
</style>