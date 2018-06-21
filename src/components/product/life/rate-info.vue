<template>
    <div>
        <transition name="slider">
            <div class="slider-wrap" v-show="rateInfo.rateInfoFlag">
                <div class="inner" ref="inner">
                    <div>
                        <div class="title">
                            <div class="name">{{rateInfo.productName}}</div>
                            <div class="rate-close" @click="hideRateInfo">
                                <i class="icon-close"></i>
                            </div>
                        </div>
                        <div class="list">
                            <div class="item border-1px" v-if="rateInfo.productLifeRisks.isInsure !== 1">
                                <div class="left"><span class="text">可购份数</span></div>
                                <div class="right"><span class="text">每名被保险人最多可购买{{rateInfo.productLifeRisks[0].unitInsured}}份</span></div>
                            </div>
                            <div class="item border-1px" v-else>
                                <div class="left"><span class="text">最高保额</span></div>
                                <div class="right"><span class="text">每名被保险人最高保额为{{rateInfo.productLifeRisks[0].maxInsured}}元</span></div>
                            </div>
                            <div class="item border-1px" v-show="showPlans">
                                <div class="left">
                                    <span class="text">保险计划</span>
                                </div>
                                <div class="right-choiceBox">
                                    <div v-for="plan in plans" class="choice" :class="{active: plan.id === rateInfo.selectedValue.planId}" 
                                    @click="slcItem('planId',plan.id)">
                                        {{plan.name}}
                                    </div>
                                </div>
                            </div>
                            <div class="item border-1px">
                                <div class="left"><span class="text">生效日期</span></div>
                                <div class="right-choiceBox">
                                   <span class="choice" id="effectDate" :class="{'active': defaultEffectDate !== '请选择'}">请选择</span>
                                </div>
                            </div>
                            <div class="item border-1px">
                                <div class="left"><span class="text">出生日期</span></div>
                                <div class="right-choiceBox">
                                    <span class="choice" id="birthdayDate" :class="{'active': defaultBirthday !== '请选择'}">请选择</span>
                                </div>
                            </div>
                            <div class="item border-1px">
                                <div class="left"><span class="text">投保年龄</span></div>
                                <div class="right-choiceBox">
                                    <!-- <div  v-for="age in ages" :class="{active: age.id === rateInfo.selectedValue.ageId}" class="choice" @click="slcItem('ageId',age.id)">
                                        {{age.name}}
                                    </div> -->
                                    <div  v-for="age in ages" :class="{active: age.id === rateInfo.selectedValue.ageId}" class="choice">
                                        {{age.name}}
                                    </div>
                                </div>
                            </div>
                            <div class="item border-1px">
                                <div class="left"><span class="text">性别</span></div>
                                <div class="right-choiceBox">
                                    <span v-for="sx in sexs" :class="{active: sx.id === rateInfo.selectedValue.sexId}" 
                                     @click="slcItem('sexId',sx.id)" class="choice">
                                        {{sx.name}}
                                    </span>
                                </div>
                            </div>  
                            <div class="item border-1px">
                                <div class="left"><span class="text">保障期限</span></div>
                                <div class="right-choiceBox">
                                    <div  v-for="(cp, index) in coverPeriod" :class="{active: cp.id === rateInfo.selectedValue.coverPeriodId}" 
                                    @click="slcItem('coverPeriodId',cp.id)"  class="choice">
                                        {{cp.name}}
                                    </div>             
                                </div>
                            </div>
                            <div class="item">
                                <div class="left"><span class="text">缴费期间</span></div>
                                <div  class="right-choiceBox">
                                    <div v-for="cp in premiumPeriod" :class="{active: cp.id === rateInfo.selectedValue.premiumPeriodId}" @click="slcItem('premiumPeriodId',cp.id)"  class="choice">
                                        {{cp.name}}
                                    </div>
                                </div>
                            </div>
                            <div class="item" v-if="coveragePremiumType === 1">
                                <div class="left"><span class="text">保额</span></div>
                                <div  class="right-choiceBox">
                                    <input type="text" class="input-text" v-model="realAmount"/><span class="text">元</span>
                                </div>
                            </div>
                            <template v-else-if="coveragePremiumType === 2">
                                <div class="item">
                                    <div class="left"><span class="text">保费</span></div>
                                    <div  class="right-choiceBox">
                                        <input type="text" class="input-text" v-model="realPremium"/><span class="text">元</span>
                                    </div>
                                </div>
                                <div class="item">
                                    <div class="left"><span class="text">保额</span></div>
                                    <div  class="right">
                                        <span class="text amount">¥{{(rateInfo.amount * multiple).toFixed(2)}}</span>
                                    </div>
                                </div>
                            </template> 
                            <div class="item" v-else-if="coveragePremiumType === 3">
                                <div class="left"><span class="text">保额</span></div>
                                <div  class="right-choiceBox">
                                    <div v-for="di in defaultInsured" class="choice" @click="setRealAmount(di)" :class="{active: Number(realAmount) === Number(di)}">
                                        {{di}}
                                    </div> 
                                </div>
                            </div>  
                        </div>
                    </div>
                </div>
                <div class="footer">
                    <div class="price"><i class="sign">¥</i>{{realPremiumFinal}}</div>
                    <div class="btn" @click="goInsurance">立即投保</div>
                </div>       
                <div id="effectDateCalendar"></div> 
                <div id="birthdayDateCalendar"></div>
                <confirm ref="confirm" :text="confirmText"></confirm>      
            </div>
        </transition>
        <div class="slide-mask" v-show="rateInfo.rateInfoFlag"></div>
    </div>
</template>

<script>
    import Confirm from 'base/confirm/confirm'
    import {insuredBirthday} from 'api/life/product.js'
    import {calendar} from 'common/js/calendar-util.js'
    import {DateAdd, formatDate} from 'common/js/date-add-util.js'
    import {addClass} from 'common/js/dom-util.js'
    import {isDate} from 'common/js/date-util.js'
    import {CODE_OK} from 'service/variable.js'
    import {mapMutations, mapGetters} from 'vuex'
    export default {
        props: {
            rateInfo: {
                type: Object,
                default: {}
            }
        },
        data () {
            return {
                confirmText: null,
                realAmount: '',
                realPremium: 0,
                startBirthdayDate: '',
                endBirthdayDate: '',
                appBirthdayStart: ''
            }
        },
        created () {
        },
        mounted () {
            this.effectDateCalendar()
            this.initDate()
            if (isDate(document.getElementById('effectDate').innerText)) {
                this._queryBirthday()
            }
        },
        updated () {
        },
        computed: {
            ...mapGetters([
                'lifePolicy',
                'lifeInsuranceRules',
                'lifeInsured'
            ]),
            insuranceRateId () {
                return this.lifePolicy.policyViceExtList[0].insuranceRateId
            },
            // 计划栏
            plans () {
                return this.rateInfo.rates
            },
            // 年龄栏
            ages () { // 年龄栏
                for (let i in this.plans) {
                    if (this.plans[i].children) {
                        return this.plans[i].children
                    }
                }
                return []
            },
            // 性别栏
            sexs () {
                for (let i in this.ages) {
                    if (this.ages[i].children) return this.ages[i].children
                }
                return []
            },
            // 保障期间栏
            coverPeriod () {
                for (let i in this.sexs) {
                    if (this.sexs[i].children) return this.sexs[i].children
                }
                return []
            },
            // 缴费期间栏
            premiumPeriod () {
                for (let i in this.coverPeriod) {
                    if (this.coverPeriod[i].children) return this.coverPeriod[i].children
                }
                return []
            },
            oldPremium () {
                return this.rateInfo.premium
            },
            // 计算保费
            realPremiumFinal () {
                if (this.coveragePremiumType === 0) {
                    return this.rateInfo.premium
                } else if (this.coveragePremiumType === 1 || this.coveragePremiumType === 2 || this.coveragePremiumType === 3) {
                    if (this.lifePolicy.policyViceExtList.length > 1) {
                        let total = 0
                        for (let obj of this.lifePolicy.policyViceExtList) {
                            total += obj.premium
                        }
                        return total
                    } else {
                        return (this.rateInfo.premium * this.multiple).toFixed(2)
                    }
                }
            },
            effectStart () {
                return this.rateInfo.productLifeRisks[0].effectStart
            },
            effectStartType () {
                return this.rateInfo.productLifeRisks[0].effectStartType
            },
            effectEnd () {
                return this.rateInfo.productLifeRisks[0].effectEnd
            },
            effectEndType () {
                return this.rateInfo.productLifeRisks[0].effectEndType
            },
            // 生效日期的开始时间的计算
            startEffectDate () {
                if (this.effectStartType === 1) {
                    this.interval = 'year'
                } else if (this.effectStartType === 2) {
                    this.interval = 'month'
                } else {
                    this.interval = 'day'
                }
                let now = new Date()
                let newDate = DateAdd(this.interval, this.effectStart, now)
                let startEffectDateFormat = formatDate(newDate, 'yyyy-MM-dd')
                return startEffectDateFormat
            },
            // 生效日期的结束时间的计算
            endEffectDate () {
                if (this.effectEndType === 1) {
                    this.interval = 'year'
                } else if (this.effectEndType === 2) {
                    this.interval = 'month'
                } else {
                    this.interval = 'day'
                }
                let now = new Date()
                let newDate = DateAdd(this.interval, this.effectEnd, now)
                let endEffectDateFormat = formatDate(newDate, 'yyyy-MM-dd')
                return endEffectDateFormat
            },
            showPlans () {
                try {
                    return this.plans[0].name.trim() !== ''
                } catch (e) {
                    return true
                }
            },
            /* ---------------------------------------- 设置默认值 -------------------------------------- */
            defaultEffectDate () {
                return isDate(this.lifePolicy.effectDate) ? this.lifePolicy.effectDate : '请选择'
            },
            defaultBirthday () {
                return isDate(this.lifePolicy.insuredList[0].birthday) ? this.lifePolicy.insuredList[0].birthday : '请选择'
            },
            /* ------------------------------------ 获取相关的值 -------------------------------------------- */
            coveragePremiumType () {
                return this.rateInfo.coveragePremiumType
            },
            defaultInsured () {
                return this.rateInfo.defaultInsured.split(',')
            },
            multiple () {
                if (this.coveragePremiumType === 0) {
                    return 1
                } else if (this.coveragePremiumType === 1) {
                    return this.realAmount / this.rateInfo.amount
                } else if (this.coveragePremiumType === 2) {
                    return this.realPremium / this.rateInfo.premium
                } else if (this.coveragePremiumType === 3) {
                    return this.realAmount / this.rateInfo.amount
                }
            }
        },
        methods: {
            // 生效日期选择
            effectDateCalendar () {
                let vm = this
                calendar('effectDate', 'effectDateCalendar', this.startEffectDate, this.endEffectDate, null, function (arr1, arr2) {
                    document.getElementById('effectDate').innerText = arr2.join('-')
                    addClass(document.getElementById('effectDate'), 'active')
                    let value = {
                        effectDate: document.getElementById('effectDate').innerText,
                        birthDate: document.getElementById('birthdayDate').innerText,
                        ageArray: vm.ages
                    }
                    vm.slcItem('date', value)
                    vm.SET_LIFE_POLICYINFO({
                        field1: 'effectDate',
                        value: document.getElementById('effectDate').innerText
                    })
                    vm._queryBirthday()
                })
            },
            _queryBirthday () {
                let params = {
                    productId: this.$route.params.productId,
                    effectDate: document.getElementById('effectDate').innerText
                }
                insuredBirthday(params).then(res => {
                    if (res.data.code === CODE_OK) {
                        this.startBirthdayDate = res.data.birthdayScope.birthdayStart
                        this.endBirthdayDate = res.data.birthdayScope.birthdayEnd
                        this.appBirthdayStart = res.data.birthdayScope.appBirthdayStart
                        this.birthdayDateCalendar()
                    }
                })
            },
            // 出生日期选择
            birthdayDateCalendar () {
                if (!isDate(document.getElementById('effectDate').innerText)) {
                    this.confirmText = '请选择生效日期'
                    this.$refs.confirm.show()
                    return false
                } else {
                    let vm = this
                    calendar('birthdayDate', 'birthdayDateCalendar', this.startBirthdayDate, this.endBirthdayDate, this.endBirthdayDate, function (arr1, arr2) {
                        document.getElementById('birthdayDate').innerText = arr2.join('-')
                        addClass(document.getElementById('birthdayDate'), 'active')
                        let value = {
                            effectDate: document.getElementById('effectDate').innerText,
                            birthDate: document.getElementById('birthdayDate').innerText,
                            ageArray: vm.ages
                        }
                        vm.slcItem('date', value)
                    })
                }
            },
            // 隐藏费率框
            hideRateInfo () {
                this.$emit('hideRateInfo')
            },
            // 恩？看代码懂吧
            slcItem (type, id) {
                this.$emit('itemClick', type, id)
            },
            // 初始化日期值
            initDate () {
                document.getElementById('effectDate').innerText = this.defaultEffectDate
                document.getElementById('birthdayDate').innerText = this.defaultBirthday
            },
            // 立即投保
            goInsurance () {
                if (!isDate(document.getElementById('effectDate').innerText)) {
                    this.confirmText = '请选择生效日期'
                    this.$refs.confirm.show()
                } else if (!isDate(document.getElementById('birthdayDate').innerText)) {
                    this.confirmText = '请选择出生日期'
                    this.$refs.confirm.show()
                } else {
                    let paramObj = {
                        rate: this.rateInfo.selectedValue.premiumPeriodObj.rate,
                        masterStat: 1,
                        productNew: this.rateInfo.product,
                        multiple: this.multiple
                    }
                    this.SET_LIFE_PRODUCTINFO_NEXT([paramObj])
                    let params = {
                        productId: this.$route.params.productId,
                        effectDate: document.getElementById('effectDate').innerText,
                        rateId: this.insuranceRateId
                    }
                    insuredBirthday(params).then(res => {
                        if (res.data.code === CODE_OK) {
                            this.startBirthdayDate = res.data.birthdayScope.birthdayStart
                            this.endBirthdayDate = res.data.birthdayScope.birthdayEnd
                            this.appBirthdayStart = res.data.birthdayScope.appBirthdayStart
                            this.$router.push({
                                path: '/first_step',
                                query: {
                                    appBirthdayStart: this.appBirthdayStart,
                                    insuredBirthdayStart: this.startBirthdayDate,
                                    insuredBirthdayEnd: this.endBirthdayDate
                                }
                            })
                        }
                    })
                }
            },
            setRealAmount (di) {
                this.realAmount = di
            },
            ...mapMutations({
                SET_LIFE_PRODUCTINFO_NEXT: 'SET_LIFE_PRODUCTINFO_NEXT',
                SET_LIFE_POLICYINFO: 'SET_LIFE_POLICYINFO'
            })
        },
        components: {
            Confirm
        }
    }
</script>

<style lang="stylus" scoped>
    @import '~common/stylus/mixin.styl'
    .slider-wrap
        position: fixed
        left: 0
        top: 0
        z-index: 6
        width: 100%
        height: 100%
        .inner
            position: absolute
            left: 0
            bottom: (98/$scale)
            z-index: 3
            width: 100%
            max-height: (698/$scale)
            background: #ffffff
            overflow-y: auto
            .tab
                width 100%
                height (100/$scale)
                border-bottom (2/$scale) solid rgb(240,240,240)
                .tab_ul
                    display: flex
                    .tab_li
                        flex: 1
                        line-height (100/$scale)
                        text-align center
                        font-size (30/$scale)
                        color #666666
                        background-color $color-background
                        &.active
                            color $color-theme
                            background-color $color-background-main
            .title
                display: flex
                padding: (20/$scale) (20/$scale)
                border-1px(#e6e6e6)
                .name
                    flex: 1
                    line-height: (70/$scale)
                    font-size: (32/$scale)
                    color: #222222
                .rate-close
                    width: (70/$scale)
                    height: (100/$scale)
                    margin-top: (-20/$scale)
                    text-align: center
                    .icon-close
                        vertical-align: middle
                        font-size: (50/$scale)       
            .list
                padding: 0 (20/$scale)
                .item
                    display: flex
                    padding: (20/$scale) 0
                    border-1px(#e6e6e6)
                    font-size: 0                   
                    .left
                        flex: 0 0 (144/$scale)
                        width: (144/$scale)
                        line-height: (50/$scale)
                        .text
                            vertical-align: middle                   
                            font-size: (26/$scale)
                            color: rgb(51,51,51)
                    .right
                        flex: 1
                        margin-left: (20/$scale)       
                        line-height: (50/$scale)         
                        .text 
                            word-break:break-all;                   
                            vertical-align: middle
                            font-size: (26/$scale)
                            color: rgb(51,51,51)
                        .amount
                            color: $color-theme
                    .right-choiceBox
                        margin-left: (20/$scale)
                        margin-top: (-15/$scale)
                        .input-text
                            display: inline-block
                            margin-top: (20/$scale)
                            vertical-align: middle
                            margin-right: (20/$scale)
                            padding: 0 (10/$scale)
                            box-sizing: border-box
                            width: (150/$scale)
                            height: (54/$scale)
                            line-height: @height
                            font-size: (26/$scale)
                            text-align: center
                            border: (2/$scale) solid #bbbbbb
                            border-radius: (5/$scale)
                            color: #333333
                        .choice
                            display: inline-block
                            margin-top: (20/$scale)
                            vertical-align: middle
                            margin-right: (20/$scale)
                            padding: 0 (10/$scale)
                            box-sizing: border-box
                            min-width: (150/$scale)
                            height: (54/$scale)
                            line-height: @height
                            font-size: (26/$scale)
                            text-align: center
                            border: (2/$scale) solid #bbbbbb
                            border-radius: (5/$scale)
                            color: #333333
                            &.active
                                color: $color-theme
                                border: (2/$scale) solid $color-theme
                        .age-text
                            display: inline-block
                            vertical-align: middle
                            margin-top: (20/$scale)               
                            font-size: (26/$scale)
                            color: rgb(51,51,51)
                    &:last-child
                        border-none()
            .edit-btn
                padding (50/$scale) 0
                .text
                    display block
                    margin 0 auto
                    width (320/$scale)
                    height (70/$scale)
                    line-height @height
                    text-align center
                    font-size (30/$scale)
                    border-radius (35/$scale)
                    color $color-theme
                    border (2/$scale) solid $color-theme  
        
        .footer
            position: fixed
            left: 0
            bottom: 0
            z-index: 7
            display: flex
            width: 100%
            height: (98/$scale)
            border-top: (2/$scale) solid #e6e6e6
            background: #ffffff
            .price
                flex: 1
                padding-left: (30/$scale)
                line-height: (98/$scale)
                font-size: (40/$scale)
                color: $color-price
                .sign
                    font-style: normal
                    font-size: (34/$scale)
                    color: rgb(240,49,44)
            .btn
                width: (320/$scale)
                height: (98/$scale)
                line-height: (98/$scale)
                text-align : center
                font-size: (34/$scale)
                color : #ffffff
                background: $color-background-btn
            .width-btn
                width: 100%
    .slide-mask
        position: fixed
        top: 0
        left: 0
        width: 100%
        height: 100%
        z-index: 2
        backdrop-filter: blur(5/$scale)
        background: rgba(0,0,0,0.5)
        &.mask-fade-enter-active
            animation: mask-fadein 0.1s
    .slider-enter-active, .slider-leave-active
        transition all 0.7s
    .slider-enter, .slider-leave-to
        transform: translate3d(0, 100%, 0)
</style>
