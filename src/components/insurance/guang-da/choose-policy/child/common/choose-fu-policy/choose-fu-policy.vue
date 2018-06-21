<template>
    <div class="detail">
        <div class="mainInfoLi"><span class="spanLeft" >请选择附加险</span><span class="spanRight" @click="showSelectdrop">{{text}}<i class="icon-down_arrow ico"></i></span></div>
        <!-- 保险期间 -->
        <div class="mainInfoLi"><span class="spanLeft">保障期间</span><span class="spanRight">{{insuredtime}}</span></div>
        <!-- 缴费期间 -->
        <div class="mainInfoLi"><span class="spanLeft">缴费期间</span><span class="spanRight">{{paytime}}</span></div>
        <!-- 保额 -->
        <div class="mainInfoLi">
            <span class="spanLeft">保额</span>
            <span v-if="amountflag" class="spanRight">
                <span  @click="reduceMoney" class="add">-</span>
                <span>{{money}}</span>
                <span  @click="AddMoney" class="add">+</span>
            </span>
             <span v-if="!amountflag" @click="showSelectdrop1" class="spanRight">
                <span>{{money1}}</span><i class="icon-down_arrow ico"></i>
            </span>
        </div>
        <select-drop :selectArray="fuPolicyListArray" :selectTitle="selectTitle"  v-show="showSelectdropWrap" 
        @sureSelectDrop="sureSelectDrop" @hideSelectDrop="hideSelectDrop" :default-value="selected"></select-drop>
        <select-drop :selectArray="MoneyListArray" :selectTitle="selectTitle1"  v-show="showSelectdropWrap1" 
        @sureSelectDrop="sureSelectDrop1" @hideSelectDrop="hideSelectDrop1" :default-value="selected1"></select-drop>
        <confirm  ref="confirm" :text="confirmText"></confirm>
    </div>
</template>
<script>
import SelectDrop from 'base/select-drops/select-drops'
import {mapGetters, mapMutations} from 'vuex'
import {RET_OK, CODE_OK} from 'service/variable.js'
import Confirm from 'base/confirm/confirm'
import {confirm} from 'common/js/mixin.js'
export default {
    mixins: [confirm],
    data () {
        return {
            selectTitle: '选择附加险',
            selectTitle1: '',
            showSelectdropWrap: false,
            showSelectdropWrap1: false,
            selected: '',
            selected1: '',
            money: 5000
        }
    },
    created () {
         if (this.guangdaPolicy.fuPolicy.length > 0) {
            this.selected = this.guangdaPolicy.fuPolicy[0].productId.toString()
             this.guangdaPolicy.fuPolicy.map((item, index, arr) => {
                    if (item.productId === Number(this.selected)) {
                        if (item.type === '2') {
                            this.selected1 = this.MoneyListArray[0].id
                            this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                                type: 1,
                                field1: 'policy',
                                field2: 'amount',
                                value: Number(this.money1)
                            })
                        } else if (item.type === '3') {
                            this.money = item.minAmount
                            this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                                type: 1,
                                field1: 'policy',
                                field2: 'amount',
                                value: Number(this.money)
                            })
                        }
                        this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                                type: 1,
                                field1: 'policy',
                                field2: 'rateId',
                                value:  item.rate.insuranceRateId
                            })
                        this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                                type: 1,
                                field1: 'policy',
                                field2: 'productId',
                                value: item.productId
                            })
                    }
                })
            this.money = this.tempAmount
         }
    },
    computed: {
        insuredtime () {
            let time
             if (this.guangdaPolicy.fuPolicy.length > 0) {
                this.guangdaPolicy.fuPolicy.map((item, index, arr) => {
                    if (item.productId === Number(this.selected)) {
                        time = item.rate.coverPeriodStr
                    }
                })
             }
            return time
        },
        paytime () {
            let time
             if (this.guangdaPolicy.fuPolicy.length > 0) {
                this.guangdaPolicy.fuPolicy.map((item, index, arr) => {
                    if (item.productId === Number(this.selected)) {
                        time = item.rate.premiumPeriodStr
                    }
                })
             }
            return time
        },
        amountflag () {
            let type
             if (this.guangdaPolicy.fuPolicy.length > 0) {
                this.guangdaPolicy.fuPolicy.map((item, index, arr) => {
                    if (item.productId === Number(this.selected)) {
                        type = item.type
                    }
                })
             }
            return type === '2'? false: type === '3'? true : false
        },
        maxAmount () {
              let max
             if (this.guangdaPolicy.fuPolicy.length > 0) {
                this.guangdaPolicy.fuPolicy.map((item, index, arr) => {
                    if (item.productId === Number(this.selected)) {
                        max = item.maxAmount
                    }
                })
             }
             return max
        },
        minAmount () {
              let min
             if (this.guangdaPolicy.fuPolicy.length > 0) {
                this.guangdaPolicy.fuPolicy.map((item, index, arr) => {
                    if (item.productId === Number(this.selected)) {
                        min = item.minAmount
                    }
                })
             }
             return min
        },
        tempAmount () {
              let temp
             if (this.guangdaPolicy.fuPolicy.length > 0) {
                this.guangdaPolicy.fuPolicy.map((item, index, arr) => {
                    if (item.productId === Number(this.selected)) {
                        temp = item.tempAmount
                    }
                })
             }
             return temp
        },
        fuPolicyListArray () {
            let Arr = []
            if (this.guangdaPolicy.fuPolicy.length > 0) {
                this.guangdaPolicy.fuPolicy.map((item, index, arr)=>{
               if (item.is_bind === 0) {
                   let obj = {
                       value: item.product_name,
                       id: item.productId.toString()
                   }
                   Arr.push(obj)
               }
            })
            }
            return Arr
        },
        text () {
            for (let obj of this.fuPolicyListArray) {
                if (obj.id === this.selected) {
                    return obj.value
                }
            }
            return '请选择'
        },
        MoneyListArray() {
            let Arr, tempArr = []
             if (this.guangdaPolicy.fuPolicy.length > 0) {
                this.guangdaPolicy.fuPolicy.map((item, index, arr) => {
                    if (item.productId === Number(this.selected)) {
                        if (item.type ==='2') {
                            Arr = item.amountList
                              for(let i = 0; i < Arr.length; i++) {
                                let obj = {
                                    value : Arr[i],
                                    id: i + '',
                                    productId: item.productId
                                }
                                tempArr.push(obj)
                            }
                        }
                    }
                })
             }
             return tempArr
        },
        money1 () {
             for (let obj of this.MoneyListArray) {
                if (obj.id === this.selected1) {
                    return obj.value
                }
            }
            return '请选择'
        },
        ...mapGetters([
            'guangdaPolicy'
		])
    },
     methods: {
        reduceMoney() {
            if (this.money > this.minAmount) {
                this.money -= this.tempAmount
            } else {
                this.showConfirm('最低保额为' + this.minAmount)
                return false
            }
        },
        AddMoney() {
            if (this.money < this.maxAmount) {
                this.money += this.tempAmount
            } else {
                this.showConfirm('最高保额为' + this.maxAmount)
                return false
            }
        },
        showSelectdrop () {
            this.showSelectdropWrap = true
        },
        showSelectdrop1 () {
            this.showSelectdropWrap1 = true
		},
		sureSelectDrop (data) {
             for(let i = 0; i<this.guangdaPolicy.selectFuPolicy.length; i++) {
                   if (this.guangdaPolicy.selectFuPolicy[i].localProductId === data.id) {
                        this.showConfirm('已选择该附加险,请选择其它附加险')
                        return false
                   }
               }
            this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                type: 1,
                field1: 'policy',
                field2: 'productId',
                value: Number(data.id)
            })
            this.selected = data.id
            this.guangdaPolicy.fuPolicy.map((item, index, arr) => {
                    if (item.productId === Number(this.selected)) {
                        if (item.type === '2') {
                            this.selected1 = this.MoneyListArray[0].id
                            this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                                type: 1,
                                field1: 'policy',
                                field2: 'amount',
                                value: Number(this.money1)
                            })
                        } else if (item.type === '3') {
                            this.money = item.minAmount
                            this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                                type: 1,
                                field1: 'policy',
                                field2: 'amount',
                                value: Number(this.money)
                            })
                        }
                        this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                            type: 1,
                            field1: 'policy',
                            field2: 'rateId',
                            value: item.rate.insuranceRateId
                        })
                    }
                })
            this.showSelectdropWrap = false
        },
        sureSelectDrop1 (data) {
            this.selected1 = data.id
            this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                type: 1,
                field1: 'policy',
                field2: 'amount',
                value: Number(this.money1)
            })
            this.showSelectdropWrap1 = false
        },
		hideSelectDrop () {
			this.showSelectdropWrap = false
        },
        hideSelectDrop1 () {
			this.showSelectdropWrap1 = false
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
@import '~components/insurance/guang-da/choose-policy/child/stylus/common.styl'
</style>