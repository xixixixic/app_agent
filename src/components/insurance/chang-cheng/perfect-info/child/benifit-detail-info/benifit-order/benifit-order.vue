<template>
    <div class="detail">
        <div class="info">
            <p class="desTitle" ref='nameTitle'>受益顺序</p>
            <p class="placeholders" @click="showSelectdrop()" :class="{'active': text === '请选择受益顺序'}">
                {{text}}
            </p>
        </div>
        <!-- <select-drop :selectArray="nationArray" :selectTitle="selectTitle"  v-show="showSelectdropWrap" 
        @sureSelectDrop="sureSelectDrop" @hideSelectDrop="hideSelectDrop" :default-value="this.selected"></select-drop> -->
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
            selectTitle: '选择受益顺序',
            showSelectdropWrap: false,
            selected: ''
        }
    },
    computed: {
        text () {
            return this.client.orderList[0].name
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
            if (this.Info.type === 'sgbenificiary') {
                this.selected = this.changChengBaseInfo.sgbenificiary[this.client.num].grade
            } else {
                this.selected = this.changChengBaseInfo.scbenificiary[this.client.num].grade
            }
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