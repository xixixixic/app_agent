<template>
    <div class="detail">
        <div class="mainInfoLi"><span class="spanLeft" v-show='leftWord'>请选择附加险</span><span class="spanRight" @click="showSelectdrop()">{{text}}<i class="icon-down_arrow ico"></i></span></div>
        <select-drop :selectArray="fuPolicyListArray" :selectTitle="selectTitle"  v-show="showSelectdropWrap" 
        @sureSelectDrop="sureSelectDrop" @hideSelectDrop="hideSelectDrop" :default-value="this.selected"></select-drop>
    </div>
</template>

<script>
import SelectDrop from 'base/select-drop/select-drop'
import {mapGetters, mapMutations} from 'vuex'
// import {chooseFuPolicy} from 'api/long-life/chang-cheng/insurance.js'
// import {RET_OK, CODE_OK} from 'service/variable.js'
export default {
    props: {
        fuPolicyList: { // 接收保险期间
            type: Array,
            default: function () {
                return []
            }
        }
    },
    data () {
        return {
            selectTitle: '选择关系',
            showSelectdropWrap: false,
            selected: '0',
            leftWord: true
        }
    },
    computed: {
        fuPolicyListArray () {
            return this.fuPolicyList
        },
        text () {
            for (let obj of this.fuPolicyListArray) {
                console.log(this.fuPolicyListArray)
                if (obj.nativeCode.toString() === this.selected) {
                    return obj.name
                }
            }
            return '请选择'
        },
        ...mapGetters([
			'changChengPolicyInfo'
		])
    },
    created () {
        this.setDefault()
    },
     methods: {
        setDefault () {
            this.nativeCode = this.mainDetaiPayTimeCode
        },
        showSelectdrop () {
            this.showSelectdropWrap = true
		},
		hideSelectDrop () {
			this.showSelectdropWrap = false
        },
        ...mapMutations({
			setChangChengPolicyInfo: 'SET_LONGLIFE_CHANGCHENG_POLICYINFO'
		})
    },
    components: {
        SelectDrop
    }
}
</script>

<style lang='stylus' scoped>
@import '~components/insurance/chang-cheng/choose-policy/child/stylus/common.styl'
</style>