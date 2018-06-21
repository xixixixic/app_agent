<template>
    <div class="detail">
        <div class="info">
            <p class="desTitle">与投保人关系</p>
            <p class='placeholders' @click="showSelectdrop()" :class="this.text === '请选择' ? 'active' : ''">
				{{text}}
				<i class='icon-right_arrow'></i>
			</p>
        </div>
        <!-- 弹框 -->
        <confirm  ref="confirm" :text="confirmText"></confirm>
        <select-drop :selectArray="relationArray" :selectTitle="selectTitle"  v-show="showSelectdropWrap" 
        @sureSelectDrop="sureSelectDrop" @hideSelectDrop="hideSelectDrop" :default-value="selected"></select-drop>
    </div>
</template>

<script>
import event from 'common/js/event.js'
import SelectDrop from 'base/select-drops/select-drops'
import {mapGetters, mapMutations} from 'vuex'
import {setBenRen} from 'common/js/mixin.js'
import {getAge} from 'components/product/life/js/age-util.js'
import Confirm from 'base/confirm/confirm'
import {confirm} from 'common/js/mixin.js'
export default {
    mixins: [setBenRen, confirm],
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
            selected: '00',
            edit: true,
            insuredMax:50
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
            'guangdaPremiumRisk'
		])
    },
    created () {
        this.setDefault()
    },
     methods: {
         setDefault () {
             this.selected = this.Info.defaultRelationId
             if (this.Info.type === 'insurants') {
                 this.edit = false
                this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                   type: 4,
                   field1: this.Info.type,
                   field2: 'insurant#0',
                   field3: 'relToApp',
                   value: this.selected     
                })
             }
             if (this.Info.defaultRelationId === '00') {
                  this.setGDBenRen()
             }
         },
        showSelectdrop () {
            if (this.edit) {
                this.showSelectdropWrap = true
            }
		},
		sureSelectDrop (data) {
            if (data.id === '00') {
                
                let age = getAge(this.guangdaPremiumRisk.applicant.birthday)
                if (age > this.insuredMax) {
                    this.showConfirm('被保人的年龄区间为出生30天到' + this.insuredMax + '岁')
                    return false
                } else{
                    console.log('---------------111--------------------')
                    this.$emit('setGDBenRen',true)
                        this.SET_LONGLIFE_GUANGDA_POLICYINFO({ 
                            type: 2,
                            field1: 'birthday',
                            value: this.guangdaPremiumRisk.applicant.birthday
                        })
                        this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                            type: 1,
                            field1: this.Info.type,
                            field2: 'birthday',
                            value: this.guangdaPremiumRisk.applicant.birthday
                        })
                        this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                            type: 1,
                            field1: this.Info.type,
                            field2: 'idNo',
                            value: this.guangdaPremiumRisk.applicant.idNo
                        })
                        this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                            type: 1,
                            field1: this.Info.type,
                            field2: 'idType',
                            value: this.guangdaPremiumRisk.applicant.idType
                        })
                        this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                            type: 1,
                            field1: this.Info.type,
                            field2: 'name',
                            value: this.guangdaPremiumRisk.applicant.name
                        })
                        this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                            type: 1,
                            field1: this.Info.type,
                            field2: 'occupationCode',
                            value: this.guangdaPremiumRisk.applicant.occupationCode
                        })
                        this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                            type: 1,
                            field1: this.Info.type,
                            field2: 'sex',
                            value: this.guangdaPremiumRisk.applicant.sex
                        })
                        this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                            field1: 'insuredJob',
                            value: this.guangdaPolicy.applicantJob
                        })
                        let input = this.guangdaPolicy.applicantJob
                        let num = input.replace(/[^0-9]/ig,"")
                        this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                            type: 2,
                            field1: 'categories',
                            value: parseInt(num)
                        })
                }
                // this.setGDBenRen()
            } else {
                 console.log('---------------2222--------------------')
                this.$emit('setGDBenRen',false)
                this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                    type: 1,
                    field1: this.Info.type,
                    field2: 'birthday',
                    value: '请选择出生日期'
                })
                this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                    type: 1,
                    field1: this.Info.type,
                    field2: 'idNo',
                    value: ''
                })
                this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                    type: 1,
                    field1: this.Info.type,
                    field2: 'idType',
                    value: '11'
                })
                this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                    type: 1,
                    field1: this.Info.type,
                    field2: 'name',
                    value: ''
                })
                this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                    type: 1,
                    field1: this.Info.type,
                    field2: 'occupationCode',
                    value: ''
                })
                this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                    type: 1,
                    field1: this.Info.type,
                    field2: 'sex',
                    value: 1
                })
                this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                    field1: 'insuredJob',
                    value: ''
                })
                this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                    type: 2,
                    field1: 'categories',
                    value: 0
                })
            }
            this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                type: 1,
				field1: this.Info.type,
				field2: 'relationId',
				value: data.id
			})
			this.showSelectdropWrap = false
            this.selected = data.id
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