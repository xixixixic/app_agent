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
        },
        client: {
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
            selected: ''
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
        ...mapGetters([
			'changChengBaseInfo'
		])
    },
    created () {
        this.setDefault()
    },
     methods: {
        setDefault () {
            if (this.client.types === 'sgbenificiary') {
                this.selected = this.changChengBaseInfo.sgbenificiary[this.client.num].nation
            } else {
                this.selected = this.changChengBaseInfo.scbenificiary[this.client.num].nation
            }
        },
        showSelectdrop () {
            this.showSelectdropWrap = true
		},
		sureSelectDrop (data) {
            this.selected = data.nativeCode
            this.setChangChengBaseInfo({
				field1: this.client.typeField,
				field2: 'nation',
				value: data.nativeCode
            })
            this.setChangChengBaseInfo({
				field1: this.client.typeField,
				field2: 'country',
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
        SelectDrop
    }
}
</script>

<style lang='stylus' scoped>
@import '~components/insurance/chang-cheng/perfect-info/child/stylus/common.styl'
</style>