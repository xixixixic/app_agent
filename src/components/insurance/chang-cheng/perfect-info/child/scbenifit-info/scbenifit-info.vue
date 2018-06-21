<template>
    <div class="sgBenifitInfo">
        <div class="detailTitle">
            <a class="titleLeft">生存受益人信息</a>
        </div>
        <choose-sc-benifit :Info='Info'></choose-sc-benifit>
        <div v-if='listShowStatus' v-for='(item, index) in sgBenifitList'>
            <div class="detailTitle">
                <a class="titleLeft">受益人{{index + 1}}</a>
                <a @click='deleteBenifit(index)' class='deletBtn'>删除</a>
            </div>
            <name :client="clientChoice(index)" :Info='sgInfo'></name>
            <card :client="clientChoice(index)" :Info='sgInfo'></card>
            <sex :client="clientChoice(index)" :Info='sgInfo'></sex>
            <birthday :client="clientChoice(index)" :Info='sgInfo'></birthday>
            <card-effective-day :client="clientChoice(index)" :Info='sgCardDayInfo'></card-effective-day>
            <nation :client="clientChoice(index)" :Info='sgInfo'></nation>
            <position :client="clientChoice(index)" :Info='sgInfo'></position>
            <relationship :client="clientChoice(index)" :Info='sgInfo'></relationship>
            <benifit-percent :client="clientChoice(index)" :Info='sgCardDayInfo'></benifit-percent>
            <benifit-order :client="clientChoice(index)" :Info='sgCardDayInfo' :orderList='orderList'></benifit-order>
            <mobile-phone :client="clientChoice(index)" :Info='sgInfo'></mobile-phone>
        </div>
        <div class="addFupolicy" v-if='btnShowStatus'>
            <button class='addFuBtn' @click='addBenifit'>+ 添加受益人</button>
        </div>
        <confirm  ref="confirm" :text="confirmText"></confirm>
    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import ChooseScBenifit from 'components/insurance/chang-cheng/perfect-info/child/choose-scbenifit-type/choose-scbenifit-type.vue'
import Name from 'components/insurance/chang-cheng/perfect-info/child/benifit-detail-info/name/name.vue'
import Sex from 'components/insurance/chang-cheng/perfect-info/child/benifit-detail-info/sex/sex.vue'
import Card from 'components/insurance/chang-cheng/perfect-info/child/benifit-detail-info/card/card.vue'
import Birthday from 'components/insurance/chang-cheng/perfect-info/child/benifit-detail-info/birthday/birthday.vue'
import Nation from 'components/insurance/chang-cheng/perfect-info/child/benifit-detail-info/nation/nation.vue'
import Position from 'components/insurance/chang-cheng/perfect-info/child/benifit-detail-info/position/position.vue'
import Relationship from 'components/insurance/chang-cheng/perfect-info/child/benifit-detail-info/relationship/relationship.vue'
import CardEffectiveDay from 'components/insurance/chang-cheng/perfect-info/child/benifit-detail-info/card-effective-day/card-effective-day.vue'
import BenifitPercent from 'components/insurance/chang-cheng/perfect-info/child/benifit-detail-info/benifit-percent/benifit-percent.vue'
import BenifitOrder from 'components/insurance/chang-cheng/perfect-info/child/benifit-detail-info/benifit-order/benifit-order.vue'
import MobilePhone from 'components/insurance/chang-cheng/perfect-info/child/benifit-detail-info/mobile-phone/mobile-phone.vue'
import Confirm from 'base/confirm/confirm'
import {confirm} from 'common/js/mixin.js'
export default {
    mixins: [confirm],
    props: {
        list: {
            type: Object,
            default: function () {
                return {}
            }
        }
    },
    computed: {
		Info () {
			return {
				type: 'benificiary',
                defaultSgType: this.changChengBaseInfo.benificiary.scType,
                otherType: 'scbenificiary' // 生存受益人列表
            }
        },
        sgInfo () {
            return {
                type: 'scbenificiary',
                positionList: this.list.jobs
            }
        },
        sgCardDayInfo () {
            return {
                type: 'scbenificiaryCardDay'
            }
        },
        btnShowStatus () {
            return this.changChengBaseInfo.benificiary.addScBenifitBtn
        },
        listShowStatus () {
            return this.changChengBaseInfo.benificiary.scBenifitStatus
        },
        sgBenifitList () {
            return this.changChengBaseInfo.scbenificiary
        },
        orderList () {
            return this.changChengBaseInfo.scbenificiary.oderList
        },
        addIndexFlag () {
            return this.changChengBaseInfo.benificiary.scAddIndexFlag
        },
        addListFlag () {
            return this.changChengBaseInfo.benificiary.scAddListFlag
        },
        ...mapGetters([
			'changChengBaseInfo'
		])
    },
    data () {
        return {
            defaultLot: 0,
            defaultGrade: 0,
            confirmText: '',
            indexs: '',
            maxGrade: ''
        }
    },
    created () {
        this.setDefault()
    },
    methods: {
        setDefault () {
            this.indexs = this.changChengBaseInfo.benificiary.scIndexs
        },
        addBenifit () {
            this.indexs = this.changChengBaseInfo.benificiary.scIndexs
            if (this.addIndexFlag === true) {
                this.indexs++
            }
            this.setChangChengBaseInfo({
                field1: 'benificiary',
                field2: 'scIndexs',
                value: this.indexs
            })
            // this.addScBenifit()
            let Len = this.changChengBaseInfo.scbenificiary.length
            if (Len === 0) {
                this.addScBenifit()
                this.addOrder()
            } else {
                for (let i = 0; i < this.changChengBaseInfo.scbenificiary.length; i++) {
                    let j = i + 1
                        if (this.changChengBaseInfo.scbenificiary[i].name === '') {
                            this.showConfirm('请检查生存受益人' + j + '姓名填写')
                            this.setFalseFlag()
                        } else if (this.changChengBaseInfo.scbenificiary[i].cardNo === '') {
                            this.showConfirm('请检查生存受益人' + j + '证件号码填写')
                            this.setFalseFlag()
                        } else if (this.changChengBaseInfo.scbenificiary[i].birthday === '') {
                            this.showConfirm('请检查生存受益人' + j + '出生日期选择')
                            this.setFalseFlag()
                        } else if (this.changChengBaseInfo.scbenificiary[i].cardValidationType === '') {
                            this.showConfirm('请检查生存受益人' + j + '证件有效期类型选择')
                            this.setFalseFlag()
                        } else if ((this.changChengBaseInfo.scbenificiary[i].cardValidationType === '1' && this.changChengBaseInfo.scbenificiary[i].iDEndDate === '') || (this.changChengBaseInfo.scbenificiary[i].cardValidationType === '1' && this.changChengBaseInfo.scbenificiary[i].iDStartDate === '')) {
                            this.showConfirm('请检查生存受益人' + j + '证件有效起止期是否选择')
                            this.setFalseFlag()
                        } else if (this.changChengBaseInfo.scbenificiary[i].nation === '') {
                            this.showConfirm('请检查生存受益人' + j + '国籍选择')
                            this.setFalseFlag()
                        } else if (this.changChengBaseInfo.scbenificiary[i].jobCode === '') {
                            this.showConfirm('请检查生存受益人' + j + '职业名称选择')
                            this.setFalseFlag()
                        } else if (this.changChengBaseInfo.scbenificiary[i].relaToInsuredCode === '') {
                            this.showConfirm('请检查生存受益人' + j + '与被保人关系选择')
                            this.setFalseFlag()
                        } else if (this.changChengBaseInfo.scbenificiary[i].lot === '') {
                            this.showConfirm('请检查生存受益人' + j + '受益比例填写')
                            this.setFalseFlag()
                        } else if (this.changChengBaseInfo.scbenificiary[i].grade === '') {
                            this.showConfirm('请检查生存受益人' + j + '受益顺序填写')
                            this.setFalseFlag()
                        } else if (this.changChengBaseInfo.scbenificiary[i].phone === '') {
                            this.showConfirm('请检查生存受益人' + j + '手机号码填写')
                            this.setFalseFlag()
                        } else {
                            this.setTrueFlag()
                        }
                    }
                    if (this.addListFlag) {
                        this.addScBenifit()
                        this.addOrder()
                    }
            }
            this.setChangChengBaseInfo({
                field1: this.Info.type,
                field2: 'scBenifitStatus',
                value: true
            })
            
        },
        deleteBenifit (index) {
            this.setChangChengBaseInfo({
                field1: 'benificiary',
                field2: 'scIndexs',
                value: index - 1
            })
            this.indexs = this.changChengBaseInfo.benificiary.scIndexs
            let lastLength = this.changChengBaseInfo.scbenificiary.length - 1
            if (index !== lastLength) {
                this.showConfirm('请按顺序删除受益人信息')
            } else {
                this.deleteScBenifit(index)
                this.defaultList = this.changChengBaseInfo.scbenificiary
            }
        },
        addOrder () {
            // maxGrade要取最大的级别来判断下面的lot
            let arr = []
            for (let i = 0; i < this.changChengBaseInfo.scbenificiary.length; i++) {
                arr.push(this.changChengBaseInfo.scbenificiary[i].oderList[0].nativeCode)
            }
            this.maxGrade = Number(arr[0])
            for (let h = 1; h < arr.length; h++) {
                if (arr[h] > this.maxGrade) {
                    this.maxGrade = Number(arr[h])
                }
            }
            for (let i = 0; i < this.changChengBaseInfo.scbenificiary.length; i++) {
                if (i=== 0) {
                    this.setChangChengBaseInfo({
                        field1: 'scbenificiary#' + i,
                        field2: 'grade',
                        value: '1'
                    })
                }
                this.defaultGrade = Number(this.changChengBaseInfo.scbenificiary[i].oderList[0].nativeCode) // grade
                if (this.defaultGrade === this.maxGrade) {
                    this.defaultLot += Number(this.changChengBaseInfo.scbenificiary[i].lot) // lot
                }
            }
            if (this.defaultLot < 1) { // 同一级别受益顺序
                this.defaultLot = 0
                let addNum = this.maxGrade + ''
                let orderArr = [
                    {'name': '第' + addNum + '顺序' ,'nativeCode': addNum}
                ]
                this.setChangChengBaseInfo({
                    field1: 'scbenificiary#' + this.indexs,
                    field2: 'oderList',
                    value: orderArr
                })
                this.setChangChengBaseInfo({
                    field1: 'scbenificiary#' + this.indexs,
                    field2: 'grade',
                    value: addNum
                })
                this.setChangChengBaseInfo({
                    field1: 'benificiary',
                    field2: 'scAddIndexFlag',
                    value: true
                })
            } else if (this.defaultLot === 1 || this.defaultLot === 1.00) { // 加一级别受益顺序
                this.defaultLot = 0
                let addNum = (this.maxGrade + 1) + ''
                let orderArr = [
                    {'name': '第' + addNum + '顺序' ,'nativeCode': addNum}
                ]
                this.setChangChengBaseInfo({
                    field1: 'scbenificiary#' + this.indexs,
                    field2: 'oderList',
                    value: orderArr
                })
                this.setChangChengBaseInfo({
                    field1: 'scbenificiary#' + this.indexs,
                    field2: 'grade',
                    value: addNum
                })
                this.setChangChengBaseInfo({
                    field1: 'benificiary',
                    field2: 'scAddIndexFlag',
                    value: true
                })
            } else if (this.defaultLot > 1) { // 同级受益人比例之和大于1
                this.defaultLot = 0
                this.showConfirm('同级受益人比例之和不能大于100%')
                this.deleteScBenifit(this.indexs)
                this.setChangChengBaseInfo({
                    field1: 'benificiary',
                    field2: 'scIndexs',
                    value: this.indexs
                })
                this.setChangChengBaseInfo({
                    field1: 'benificiary',
                    field2: 'scAddIndexFlag',
                    value: false
                })
            }
        },
        setTrueFlag () {
            this.setChangChengBaseInfo({
                field1: 'benificiary',
                field2: 'scAddListFlag',
                value: true
            })
            this.setChangChengBaseInfo({
                field1: 'benificiary',
                field2: 'scAddIndexFlag',
                value: true
            })
        },
        setFalseFlag () {
            this.setChangChengBaseInfo({
                field1: 'benificiary',
                field2: 'scAddListFlag',
                value: false
            })
            this.setChangChengBaseInfo({
                field1: 'benificiary',
                field2: 'scAddIndexFlag',
                value: false
            })
        },
        clientChoice (pos) {
            return {
                typeField: 'scbenificiary#' + pos,
                num: pos,
                types: 'scbenificiary',
                orderList: this.changChengBaseInfo.scbenificiary[pos].oderList,
                defaultPhone: this.changChengBaseInfo.scbenificiary[pos].phone,
                defaultIDEndDate: this.changChengBaseInfo.scbenificiary[pos].iDEndDate,
                defaultIDStartDate: this.changChengBaseInfo.scbenificiary[pos].iDStartDate
            }
        },
        ...mapMutations({
            setChangChengBaseInfo: 'SET_LONGLIFE_CHANGCHENG_BASEINFO',
            addScBenifit: 'SET_ADD_CHANGCHENG_SCBENIFIT',
            deleteScBenifit: 'DELETE_CHANGCHENG_SCBENIFIT'
		})
    },
    components: {
		Name,
		Sex,
		Card,
		Birthday,
        Nation,
        ChooseScBenifit,
        Position,
        Relationship,
        CardEffectiveDay,
        BenifitPercent,
        BenifitOrder,
        MobilePhone,
        Confirm
    }
}
</script>

<style lang='stylus' scoped>
@import '~components/insurance/chang-cheng/base-info/child/stylus/common.styl'
.detailTitle
    display: flex;
    padding-right: 0.3rem;
    justify-content: space-between;
    align-items: center
    .deletBtn
        display: inline-block
        border: 1px solid $color-theme
        width: (90/$scale)
        height: (50/$scale)
        vertical-align: middle
        line-height: (50/$scale)
        text-align: center
        border-radius: (8/$scale)
        font-size: (28/$scale)
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