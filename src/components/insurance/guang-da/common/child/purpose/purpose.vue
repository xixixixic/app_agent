<template>
    <div>
        <div class="detail">
            <div class="info">
                <p class="desTitle" ref='nameTitle'>投保目的</p>
                <p class="placeholders" @click="showSelectdrop()" :class="{'active': text === '请选择投保目的'}">
                    {{text}}<i class="icon-down_arrow ico"></i>
                </p>
            </div>
            <select-drop :selectArray="nationArray" :selectTitle="selectTitle"  v-show="showSelectdropWrap" 
            @sureSelectDrop="sureSelectDrop" @hideSelectDrop="hideSelectDrop" :default-value="this.selected"></select-drop>
        </div>
        <div v-if="DesFlag" class="detail">
            <div class="info">
                <p class="desTitle" ref='nameTitle'>投保目的描述</p>
                <p class="placeholders">
                    <input type="text" placeholder="请填写其它投保目的" class="placeholdersInput" v-model="purposeDes"  @blur='verPurpose'/>
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
            selectTitle: '选择投保目的',
            showSelectdropWrap: false,
            selected: '1',
            selectList: [],
            DesFlag: false,
            purposeDes:'',
            wrongTip:''
        }
    },
    computed: {
        nationArray () {
            return this.guangdaPolicy.DicList.purpose
        },
        text () {
            if (this.Info.defaultPurposeList.length > 0) {
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
                return '请选择投保目的'
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
              for(let obj of this.Info.defaultPurposeList) {
                this.selectList.push(obj.purpose)
            }
            this.DesFlag = this.selectList.length === 1 && this.selectList[0] === '4'
            this.purposeDes = this.Info.defaultPurposeDes
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
                if (this.selectList.indexOf('4') >= 0) {
                    this.selectList = ['4']
                    this.DesFlag = true
                } 
                if (this.selectList.length === 1 && this.selectList[0] === '4') {
                    this.selectList = []
                    this.selectList.push(data.id)
                    if (data.id === '4') {
                        this.DesFlag = true
                    } else {
                        this.DesFlag = false
                    }
                }
                let purposeList = []
                for(let i = 0; i < this.selectList.length; i++) {
                    let obj = {
                        'purpose': this.selectList[i]
                    }
                    purposeList.push(obj)
                }
                for(let obj of purposeList) {
                    if (obj.purpose !== '4') {
                        this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                            type: 4,
                            field1: 'policyInfo',
                            field2: 'agentReport',
                            field3: 'purposeDes',
                            value: ''
                    })
                    }
                }
                this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                    type: 4,
                    field1: 'policyInfo',
                    field2: 'agentReport',
                    field3: 'purposeList',
                    value: purposeList
                })
            }
		},
		hideSelectDrop () {
			this.showSelectdropWrap = false
        },
        verPurpose() {
          if (this.selectList.length === 1 && this.selectList[0] === '4') {
               this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                    type: 4,
                    field1: 'policyInfo',
                    field2: 'agentReport',
                    field3: 'purposeDes',
                    value: this.purposeDes
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