<template>
    <div class="sgBenifitInfo">
        <div class="detailTitle">
            <a class="titleLeft">身故受益人信息</a>
        </div>
        <choose-sg-benifit :Info='Info'></choose-sg-benifit>
        <div v-if='listShowStatus' v-for='(item, index) in sgBenifitList'>
            <div class="detailTitle">
                <a class="titleLeft">受益人{{index + 1}}</a>
                <a @click='deleteBenifit(index)' class='deletBtn'>删除</a>
            </div>
            <name :client="clientChoice(index)" :Info='sgInfo'></name>
            <card :client="clientChoice(index)" :Info='sgInfo'></card>
            <sex :client="clientChoice(index)" :Info='sgInfo'></sex>
            <birthday :client="clientChoice(index)" :Info='sgInfo'></birthday>
            <card-effective-day :client="clientChoice(index)" :Info='sgInfo'></card-effective-day>
            <nation :client="clientChoice(index)" :Info='sgInfo'></nation>
            <position :client="clientChoice(index)" :Info='sgInfo'></position>
            <relationship :client="clientChoice(index)" :Info='sgInfo'></relationship>
            <benifit-percent :client="clientChoice(index)" :Info='sgInfo'></benifit-percent>
            <benifit-order :client="clientChoice(index)" :Info='sgInfo'></benifit-order>
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
import ChooseSgBenifit from 'components/insurance/chang-cheng/perfect-info/child/choose-sgbenifit-type/choose-sgbenifit-type.vue'
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
                defaultSgType: this.changChengBaseInfo.benificiary.sgType,
                otherType: 'sgbenificiary' // 身故受益人列表
            }
        },
        sgInfo () {
            return {
                type: 'sgbenificiary',
                positionList: this.list.jobs
            }
        },
        sgCardDayInfo () {
            return {
                type: 'sgbenificiaryCardDay'
            }
        },
        btnShowStatus () {
            return this.changChengBaseInfo.benificiary.addBenifitBtn
        },
        listShowStatus () {
            return this.changChengBaseInfo.benificiary.sgBenifitStatus
        },
        sgBenifitList () {
            return this.changChengBaseInfo.sgbenificiary
        },
        addIndexFlag () {
            return this.changChengBaseInfo.benificiary.sgAddIndexFlag
        },
        addListFlag () {
            return this.changChengBaseInfo.benificiary.sgAddListFlag
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
            this.indexs = this.changChengBaseInfo.benificiary.sgIndexs
        },
        addBenifit () {
            this.indexs = this.changChengBaseInfo.benificiary.sgIndexs
            if (this.addIndexFlag === true) {
                this.indexs++
            }
            this.setChangChengBaseInfo({
                field1: 'benificiary',
                field2: 'sgIndexs',
                value: this.indexs
            })
            let Len = this.changChengBaseInfo.sgbenificiary.length
            if (Len === 0) {
                this.addSgBenifit()
                this.addOrder()
            } else {
                for (let i = 0; i <= Len - 1; i++) {
                    let j = i + 1
                    if (this.changChengBaseInfo.sgbenificiary[i].name === '') {
                        this.showConfirm('请检查身故受益人' + j + '人姓名填写')
                        this.setFalseFlag()
                    } else if (this.changChengBaseInfo.sgbenificiary[i].cardNo === '') {
						this.showConfirm('请检查身故受益人' + j + '证件号码填写')
						this.setFalseFlag()
					} else if (this.changChengBaseInfo.sgbenificiary[i].birthday === '') {
						this.showConfirm('请检查身故受益人' + j + '出生日期选择')
						this.setFalseFlag()
					} else if (this.changChengBaseInfo.sgbenificiary[i].cardValidationType === '') {
						this.showConfirm('请检查身故受益人' + j + '证件有效期类型选择')
						this.setFalseFlag()
					} else if ((this.changChengBaseInfo.sgbenificiary[i].cardValidationType === '1' && this.changChengBaseInfo.sgbenificiary[i].iDEndDate === '') || (this.changChengBaseInfo.sgbenificiary[i].cardValidationType === '1' && this.changChengBaseInfo.sgbenificiary[i].iDStartDate === '')) {
						this.showConfirm('请检查身故受益人' + j + '证件有效起止期是否选择')
						this.setFalseFlag()
					} else if (this.changChengBaseInfo.sgbenificiary[i].nation === '') {
						this.showConfirm('请检查身故受益人' + j + '国籍选择')
						this.setFalseFlag()
					} else if (this.changChengBaseInfo.sgbenificiary[i].jobCode === '') {
						this.showConfirm('请检查身故受益人' + j + '职业名称选择')
						this.setFalseFlag()
					} else if (this.changChengBaseInfo.sgbenificiary[i].relaToInsuredCode === '') {
						this.showConfirm('请检查身故受益人' + j + '与被保人关系选择')
						this.setFalseFlag()
					} else if (this.changChengBaseInfo.sgbenificiary[i].lot === '') {
						this.showConfirm('请检查身故受益人' + j + '受益比例填写')
						this.setFalseFlag()
					} else if (this.changChengBaseInfo.sgbenificiary[i].grade === '') {
						this.showConfirm('请检查身故受益人' + j + '受益顺序填写')
						this.setFalseFlag()
					} else if (this.changChengBaseInfo.sgbenificiary[i].phone === '') {
						this.showConfirm('请检查身故受益人' + j + '手机号码填写')
						this.setFalseFlag()
					} else {
                        this.setTrueFlag()
                    }
                }
                if (this.addListFlag) {
                    this.addSgBenifit()
                    this.addOrder()
                }
            }
            this.setChangChengBaseInfo({
                field1: this.Info.type,
                field2: 'sgBenifitStatus',
                value: true
            })
        },
        addOrder () {
            // maxGrade要取最大的级别来判断下面的lot
            let arr = []
            for (let i = 0; i < this.changChengBaseInfo.sgbenificiary.length; i++) {
                arr.push(this.changChengBaseInfo.sgbenificiary[i].oderList[0].nativeCode)
            }
            this.maxGrade = Number(arr[0])
            for (let h = 1; h < arr.length; h++) {
                if (arr[h] > this.maxGrade) {
                    this.maxGrade = Number(arr[h])
                }
            }
            // 循环相加lot
            this.defaultLot = 0
            for (let i = 0; i < this.changChengBaseInfo.sgbenificiary.length; i++) {
                if (i=== 0) {
                    this.setChangChengBaseInfo({
                        field1: 'sgbenificiary#' + i,
                        field2: 'grade',
                        value: '1'
                    })
                }
                console.log(Number(this.changChengBaseInfo.sgbenificiary[i].lot))
                this.defaultGrade = Number(this.changChengBaseInfo.sgbenificiary[i].oderList[0].nativeCode) // grade
                if (this.defaultGrade === this.maxGrade) {
                    this.defaultLot += Number(this.changChengBaseInfo.sgbenificiary[i].lot * 100) // lot
                }
            }
            // 设置下一级受益顺序
            if (this.defaultLot < 100) { // 同一级别受益顺序
                this.defaultLot = 0
                let addNum = this.maxGrade + ''
                console.log(addNum + 'addNum')
                console.log('同一级别受益顺序')
                let orderArr = [
                    {'name': '第' + addNum + '顺序' ,'nativeCode': addNum}
                ]
                this.setChangChengBaseInfo({
                    field1: 'sgbenificiary#' + this.indexs,
                    field2: 'oderList',
                    value: orderArr
                })
                this.setChangChengBaseInfo({
                    field1: 'sgbenificiary#' + this.indexs,
                    field2: 'grade',
                    value: addNum
                })
                this.setChangChengBaseInfo({
                    field1: 'benificiary',
                    field2: 'sgAddIndexFlag',
                    value: true
                })
            } else if (this.defaultLot === 100) { // 加一级别受益顺序
                this.defaultLot = 0
                let addNum = (this.maxGrade + 1) + ''
                console.log('加一级别受益顺序')
                let orderArr = [
                    {'name': '第' + addNum + '顺序' ,'nativeCode': addNum}
                ]
                console.log(this.indexs)
                console.log('this.indexs')
                this.setChangChengBaseInfo({
                    field1: 'sgbenificiary#' + this.indexs,
                    field2: 'oderList',
                    value: orderArr
                })
                this.setChangChengBaseInfo({
                    field1: 'sgbenificiary#' + this.indexs,
                    field2: 'grade',
                    value: addNum
                })
                this.setChangChengBaseInfo({
                    field1: 'benificiary',
                    field2: 'sgAddIndexFlag',
                    value: true
                })
            } else if (this.defaultLot > 100) { // 同级受益人比例之和大于1
                this.defaultLot = 0
                this.showConfirm('同级受益人比例之和不能大于100%')
                this.deleteSgBenifit(this.indexs)
                this.setChangChengBaseInfo({
                    field1: 'benificiary',
                    field2: 'sgIndexs',
                    value: this.indexs
                })
                this.setChangChengBaseInfo({
                    field1: 'benificiary',
                    field2: 'sgAddIndexFlag',
                    value: false
                })
            }
        },
        deleteBenifit (index) {
            this.setChangChengBaseInfo({
                field1: 'benificiary',
                field2: 'sgIndexs',
                value: index - 1
            })
            this.indexs = this.changChengBaseInfo.benificiary.sgIndexs
            let lastLength = this.changChengBaseInfo.sgbenificiary.length - 1
            if (index !== lastLength) {
                this.showConfirm('请按顺序删除受益人信息')
            } else {
                this.deleteSgBenifit(index)
                this.defaultList = this.changChengBaseInfo.sgbenificiary
            }
        },
        setTrueFlag () {
            this.setChangChengBaseInfo({
                field1: 'benificiary',
                field2: 'sgAddListFlag',
                value: true
            })
            this.setChangChengBaseInfo({
                field1: 'benificiary',
                field2: 'sgAddIndexFlag',
                value: true
            })
        },
        setFalseFlag () {
            this.setChangChengBaseInfo({
                field1: 'benificiary',
                field2: 'sgAddListFlag',
                value: false
            })
            this.setChangChengBaseInfo({
                field1: 'benificiary',
                field2: 'sgAddIndexFlag',
                value: false
            })
        },
        fomatNum (f, digit) {
            let m = Math.pow(10, digit)
            return parseInt(f * m, 10) / m 
        },
        clientChoice (pos) {
            return {
                typeField: 'sgbenificiary#' + pos,
                num: pos,
                types: 'sgbenificiary',
                orderList: this.changChengBaseInfo.sgbenificiary[pos].oderList,
                defaultPhone: this.changChengBaseInfo.sgbenificiary[pos].phone,
                defaultIDEndDate: this.changChengBaseInfo.sgbenificiary[pos].iDEndDate,
                defaultIDStartDate: this.changChengBaseInfo.sgbenificiary[pos].iDStartDate
            }
        },
        ...mapMutations({
            setChangChengBaseInfo: 'SET_LONGLIFE_CHANGCHENG_BASEINFO',
            addSgBenifit: 'SET_ADD_CHANGCHENG_SGBENIFIT',
            deleteSgBenifit: 'DELETE_CHANGCHENG_SGBENIFIT'
		})
    },
    components: {
		Name,
		Sex,
		Card,
		Birthday,
        Nation,
        ChooseSgBenifit,
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