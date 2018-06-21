<template>
    <div>
        <div class="detail">
            <div class="info">
                <p class="desTitle" ref='nameTitle'>投保途径</p>
                <p class="placeholders" @click="showSelectdrop()" :class="{'active': text === '请选择投保途径'}">
                    {{text}}<i class="icon-down_arrow ico"></i>
                </p>
            </div>
            <select-drop :selectArray="nationArray" :selectTitle="selectTitle"  v-show="showSelectdropWrap" 
            @sureSelectDrop="sureSelectDrop" @hideSelectDrop="hideSelectDrop" :default-value="selected"></select-drop>
        </div>
        <div v-if="DesFlag" class="detail">
            <div class="info">
                <p class="desTitle" ref='nameTitle'>投保途径描述</p>
                <p class="placeholders">
                    <input type="text" placeholder="请填写其它投保途径" class="placeholdersInput" v-model="approachDes"  @blur='verApproach'/>
                </p>
            </div>
            <div :class="this.wrongTip !== '' ? 'errTip' : 'hide'">
                <span class="errIco"></span>
                <span class="errText">{{wrongTip}}</span>
            </div>
        </div>
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
            selectTitle: '选择投保途径',
            showSelectdropWrap: false,
            selected: '1',
            selectList: [],
            DesFlag: false,
            approachDes:'',
            wrongTip:''
        }
    },
    computed: {
        nationArray () {
            return this.guangdaPolicy.DicList.approach
        },
        text () {
            if (this.Info.defaultApproachList.length > 0) {
                let str = ''
                for (let obj of this.nationArray) {
                    for(let o of this.selectList) {
                        if (obj.id === o) {
                            str += obj.value + ','
                        }
                    }
                }
                return str.substring(0, str.length - 1)
            } else {
                return '请选择投保途径'
            }
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
            for(let obj of this.Info.defaultApproachList) {
                this.selectList.push(obj.approach)
            }
            this.DesFlag = this.selectList.length === 1 && this.selectList[0] === '6'
            this.approachDes = this.Info.defaultApproachDes
        },
        showSelectdrop () {
            this.showSelectdropWrap = true
		},
		sureSelectDrop (data) {
            if (this.selectList.indexOf(data.id) >= 0) {
                this.showConfirm('已选择该项!')
                return false
            } else {
                this.showSelectdropWrap = false
                this.selectList.push(data.id)
                if (this.selectList.indexOf('6') >= 0) {
                    this.selectList = ['6']
                    this.DesFlag = true
                } 
                if (this.selectList.length === 1 && this.selectList[0] === '6') {
                    this.selectList = []
                    this.selectList.push(data.id)
                    if (data.id === '6') {
                        this.DesFlag = true
                    } else {
                        this.DesFlag = false
                    }
                }
                let approachList = []
                for(let i = 0; i < this.selectList.length; i++) {
                    let obj = {
                        'approach': this.selectList[i]
                    }
                    approachList.push(obj)
                }
                for(let obj of approachList) {
                    if (obj.approach !== '6') {
                        this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                            type: 4,
                            field1: 'policyInfo',
                            field2: 'agentReport',
                            field3: 'approachDes',
                            value: ''
                    })
                    }
                }
                this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                    type: 4,
                    field1: 'policyInfo',
                    field2: 'agentReport',
                    field3: 'approachList',
                    value: approachList
                })
            }
		},
		hideSelectDrop () {
			this.showSelectdropWrap = false
        },
        verApproach() {
           if (this.selectList.length === 1 && this.selectList[0] === '6') {
               this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                    type: 4,
                    field1: 'policyInfo',
                    field2: 'agentReport',
                    field3: 'approachDes',
                    value: this.approachDes
                })
           }
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