<template>
    <div class="detail">
        <div class="info">
            <p class="desTitle" ref='nameTitle'>请选择身故受益人类型</p>
            <p class="placeholders" @click="showSelectdrop(1)" :class="{'active': typetext === '请选择身故受益人类型'}">
                {{typetext}}<i class="icon-down_arrow ico"></i>
            </p>
        </div>
        <div v-if='selected !== "0"' v-for='(item, index) in sgBenifitList' :key="index">
            <div class="detailTitle">
                <a class="titleLeft">受益人{{index + 1}}</a>
                <button class="mainBtn deleteBtn" v-if="index !== 0" @click="deleteBenifit(index)">删除</button>
            </div>
            <div class="info">
                <p class="desTitle" ref='nameTitle'>请选择身故受益人顺序</p>
                <p class="placeholders" @click="showSelectdrop(2)" :class="{'active': ordertext === '请选择身故受益人顺序'}">
                    {{ordertext}}<i class="icon-down_arrow ico"></i>
                </p>
           </div>
            <name :Info="{type:'bnfInfo', defaultName:item.bfcyName, index:index}"></name>
            <card :Info="{type:'bnfInfo', defaultIdType:item.bfcyIdType, defaultIdNo:item.bfcyIdCode, index:index}"></card>
            <sex :Info="{type:'bnfInfo', defaultSex:item.bfcySex, defaultIdType:item.bfcyIdType, defaultIdNo:item.bfcyIdCode, index:index}"></sex>
            <birthday :Info="{type:'bnfInfo', defaultBirthday:item.bfcyBirthday, defaultIdType:item.bfcyIdType, defaultIdNo:item.bfcyIdCode, index:index}"></birthday>
            <IdExpDate :Info="{type:'bnfInfo', defaultIdExpDate:item.bfcyIdExpDate, index:index}"></IdExpDate>
            <relationship :Info="{type:'bnfInfo', defaultRelationId:item.relToIns, index:index}"></relationship>
            <beneficialOrder :Info="{type:'bnfInfo', defaultbenefitOrder:item.bfcyRatio, index:index}"></beneficialOrder>
        </div>
         <div v-if='selected !== "0"' class="addFupolicy">
            <button class='addFuBtn' @click='addBenifit'>+ 添加受益人</button>
        </div>
        <select-drop :selectArray="selectArr" :selectTitle="selectTitle"  v-show="showSelectdropWrap" 
        @sureSelectDrop="sureSelectDrop" @hideSelectDrop="hideSelectDrop" :default-value="selected"></select-drop>
        <confirm  ref="confirm" :text="confirmText"></confirm>
    </div>
</template>

<script>
import Confirm from 'base/confirm/confirm'
import {confirm} from 'common/js/mixin.js'
import SelectDrop from 'base/select-drops/select-drops'
import Name from 'components/insurance/guang-da/common/child/choose-sgbenifit-type/child/name/name.vue'
import Sex from 'components/insurance/guang-da/common/child/choose-sgbenifit-type/child/sex/sex.vue'
import Birthday from 'components/insurance/guang-da/common/child/choose-sgbenifit-type/child/birthday/birthday.vue'
import Card from 'components/insurance/guang-da/common/child/choose-sgbenifit-type/child/card/card.vue'
import IdExpDate from 'components/insurance/guang-da/common/child/choose-sgbenifit-type/child/idExpDate/idExpDate.vue'
import Relationship from 'components/insurance/guang-da/common/child/choose-sgbenifit-type/child/relationship/relationship.vue'
import beneficialOrder from 'components/insurance/guang-da/common/child/choose-sgbenifit-type/child/beneficialOrder/beneficialOrder.vue'
import {mapGetters, mapMutations} from 'vuex'
import {getBirth, getSexId} from 'common/js/iscardID-util.js'
export default {
    mixins: [confirm],
    data () {
        return {
            selectTitle: '',
            showSelectdropWrap: false,
            selected: '0',
            selectArr: []
        }
    },
    computed: {
         ...mapGetters([
            'guangdaPolicy',
            'guangdaTrail'
        ]),
        typeArray () {
            return this.guangdaPolicy.benifitTypeList
        },
        orderArray () {
            return this.guangdaPolicy.benifitOrderList
        },
        typetext () {
            for (let obj of this.typeArray) {
                if (obj.id === this.selected) {
                    return obj.value
                }
            }
            return '请选择身故受益人类型'
        },
        ordertext () {
            for (let obj of this.orderArray) {
                if (obj.id === this.selected) {
                    return obj.value
                }
            }
            return '请选择身故受益人顺序'
        },
        sgBenifitList () {
            return this.guangdaTrail.policy.custInfo.bnfInfo.beneficiaries.beneficiary
        }
    },
    created () {
        this.setDefault()
        // console.log('------获取受益人列表----')
        // console.log(this.sgBenifitList)
    },
     methods: {
        setDefault () {
            this.selected = this.guangdaTrail.policy.custInfo.bnfInfo.bnfType
        },
        showSelectdrop (data) {
            if (data === 1) {
                this.selectArr = this.typeArray
                this.selectTitle = '选择身故受益人类型'
            } else {
                this.selectArr = this.orderArray
                this.selectTitle = '选择身故受益人顺序'
            }
            this.showSelectdropWrap = true
		},
		sureSelectDrop (data) {
           this.selected = data.id
           if (data.id === '0') {
               let beneficiaries = {
                   'beneficiary':[],
                   'bfcyRemark':'',
                   "bnfCount": '0'
               }
                this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                    type: 4,
                    field1: 'bnfInfo',
                    field2: 'beneficiaries',
                    value: beneficiaries
                })
           }
           this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                type: 4,
                field1: 'bnfInfo',
                field2: 'bnfType',
                value: data.id
            })
		   this.showSelectdropWrap = false
		},
		hideSelectDrop () {
			this.showSelectdropWrap = false
        },
        addBenifit () {
            let flag
            if (this.sgBenifitList.length > 0) {
                this.sgBenifitList.map((item, index, arr) =>{
                   if (!this.validate(item)) {
                       this.showConfirm('请检查受益人信息是否填写完整')
                       return false
                   } else {
                        // console.log('获取受益人每一项数据')
                        // console.log(item)
                           let type = item.bfcyIdType
                           if (type === '11') {
                                let birth = getBirth(item.bfcyIdCode)
                                let sex = getSexId(item.bfcyIdCode)
                                if (birth !== item.bfcyBirthday) {
                                    this.showConfirm('受益人生日与身份证生日不一致,请检查输入是否正确')
                                    return false
                                } else if (sex !== getSexId(item.bfcyIdCode)) {
                                    his.showConfirm('受益人性别与身份证性别不一致,请检查输入是否正确')
                                    return false
                                } else {
                                    flag = true
                                }
                           } else {
                               flag = true
                           }
                   }
                })
            } else {
                flag = true
            }
            console.log('验证消息')
            console.log(flag)
            console.log(this.sgBenifitList)
            if (flag) {
                this.ADD_GUANGDA_BENEFIT()
            }
        },
        deleteBenifit (data) {
            this.DELET_GUANGDA_BENEFIT(data)
        },
        validate (obj) {
			let flag = true
			for(let field in obj) {
				if (field === 'bfcyBirthday' && obj[field] === '请选择出生日期') {
					flag = false
				} else if (field === 'belongWith' && obj[field] === '') {
					flag = false
				} else if (field === 'bfcyIdCode' && obj[field] === '') {
					flag = false
				} else if (field === 'bfcyIdExpDate' && obj[field] === '请选择证件有效期') {
					flag = false
				} else if (field === 'bfcyIdType' && obj[field] === '') {
					flag = false
				} else if (field === 'bfcyLevel' && obj[field] === '') {
					flag = false
				} else if (field === 'bfcyName' && obj[field] === '') {
					flag = false
				} else if (field === 'bfcyRatio' && obj[field] === '') {
					flag = false
				} else if (field === 'bfcySex' && obj[field] === '') {
					flag = false
				} else if (field === 'relToIns' && obj[field] === '') {
					flag = false
				}
			}
			return flag
		},
        ...mapMutations({
            SET_LONGLIFE_GUANGDA_POLICYINFO: 'SET_LONGLIFE_GUANGDA_POLICYINFO',
            ADD_GUANGDA_BENEFIT: 'ADD_GUANGDA_BENEFIT',
            DELET_GUANGDA_BENEFIT: 'DELET_GUANGDA_BENEFIT'
		}),
    },
    components: {
        SelectDrop,
        Name,
        Sex,
        Birthday,
        Card,
        IdExpDate,
        Relationship,
        beneficialOrder,
        Confirm
    }
}
</script>

<style lang='stylus' scoped>
@import '~components/insurance/guang-da/common/child/stylus/common.styl'
.mainBtn
    width: (100/$scale)
    height: (50/$scale)
    background: #fff
    border-radius: (10/$scale)
    font-size: (26/$scale)
    margin-left (440/$scale)
    &.editBtn
        border: 1px solid $color-theme-border
        color: $color-theme
    &.deleteBtn
        border: 1px solid #ff4456
        color: #ff4456
    &.fuEditBtn
        margin-right: (20/$scale)                               
.addFupolicy
    width: (710/$scale)
    margin: 0 auto
    .addFuBtn
        width: 100%
        height: (100/$scale)
        border: none
        background: #fff
        font-size: (34/$scale)
        color: $color-theme
        outline: none
        margin-bottom: (20/$scale)
</style>