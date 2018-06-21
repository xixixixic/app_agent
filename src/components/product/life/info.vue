<template>
    <div>
        <loading v-if="showLoading"></loading>
        <div class="info" v-else>
            <!-- 产品主要信息显示 -->
            <main-info :main-info="mainInfo" :rate-info="rateInfo" ref="mainInfo"></main-info>
            <!-- 产品报备编号 -->
            <code-info :code-info="codeInfo"></code-info>
            <!-- 产品详情 -->
            <detail-info :detail-info="detailInfo"></detail-info>
            <!-- 产品汇率 -->
            <rate-info :rate-info="rateInfo" @hideRateInfo="hideRateInfo" @itemClick="changeSelect"></rate-info>
            <!--页脚-->
            <info-footer :text="footerText" @next="showRateInfo"></info-footer>
        </div> 
    </div>
</template>

<script>
    import MainInfo from 'components/product/life/main-info'
    import CodeInfo from 'components/product/life/code-info'
    import DetailInfo from 'components/product/life/detail-info'
    import RateInfo from 'components/product/life/rate-info'
    import InfoFooter from 'base/footer/footer'
    import Loading from 'base/loading/loading'
    import {productInfo} from 'api/life/product.js'
    import {insureInfo} from 'api/life/insurance.js'
    import {CODE_OK} from 'service/variable.js'
    import {formatRate} from 'components/product/life/js/rate-transer.js'
    import {updateSelect, updateAge} from 'components/product/life/js/update-select.js'
    // import {LriskDifferenceInfo, dictionary, occupation} from 'api/life/insurance.js'
    import {mapMutations, mapGetters} from 'vuex'
    import md5 from 'js-md5'
    // import store from 'store'
    export default {
        data () {
            return {
                productMap: {}, // 设置初始值
                rateInfoFlag: false,
                rateSelectedValue: { // 选中的值默认全部为空
                    fieldSort: ['planId', 'ageId', 'sexId', 'coverPeriodId', 'premiumPeriodId'], // 联动顺序数组
                    planId: null, // 选中的计划Id
                    ageId: null, // 选择的年龄Id
                    ageObj: {
                        maxAge: null,
                        minAge: null
                    },
                    sexId: null,
                    coverPeriodId: null, // 选中的保障期限的id
                    coverPeriodObj: {
                        coverPeriodType: null,
                        coverPeriod: null
                    },
                    premiumPeriodId: null, // 选中的缴费期间的id
                    premiumPeriodObj: {
                        premiumPeriodType: null,
                        premiumPeriod: null,
                        rate: null
                    }
                },
                insureInfo: {},
                showLoading: true,
                insuranceToken: ''
            }
        },
        created () {
            this.queryToken()
            this._queryProduct()
            this._queryInsureInfo()
            if (this.lifeInsuranceRules.productId !== Number(this.$route.params.productId)) {
                console.log('clearLife')
                this.SET_REMOVE_LIFE()
            }
            if (this.changChengBaseInfo.productId !== this.$route.params.productId) {
                console.log('长城')
                this.SET_REMOVE_CHANGCHENG_BASE_INFO()
            }
        },
        computed: {
            ...mapGetters([
                'lifeInsuranceRules', 'token', 'webStatus', 'changChengBaseInfo'
            ]),
            productId () {
                return this.$route.params.productId
            },
            /* ------------------------------------ 获取productMap里的所有字段 ----------------------------------------- */
            product () {
                return this.productMap.product
            },
            plans () {
                return this.productMap.plans
            },
            productImages () {
                return this.productMap.productImages
            },
            supplierName () {
                return this.productMap.supplierName
            },
            productDetails () {
                return this.productMap.productDetails
            },
            accessorys () {
                return this.productMap.accessorys
            },
            rates () {
                return this.productMap.rates
            },
            productLifeRisks () {
                return this.productMap.productLifeRisks
            },
            vProduct () {
                return this.productMap.vProduct
            },
            productDetailImage () {
                return this.productMap.productDetailImage
            },
            supplierId () {
                return this.productMap.product.supplierId
            },
            /* ------------------------------------ 产品主要信息的数据展示 ----------------------------------------- */
            mainInfo () {
                return {
                    imgurl: this.productImages[0].imgurl,
                    productName: this.product.productName,
                    supplierId: this.product.supplierId,
                    occupationDetails: this.productLifeRisks[0].occupationDetails
                }
            },
            /* ------------------------------------ 产品报备编号的数据展示 ----------------------------------------- */
            codeInfo () {
                return {
                    reportno: this.product.reportno,
                    isInsure: this.product.isInsure
                }
            },
            /* ------------------------------------ 产品详情的数据展示 ----------------------------------------- */
            detailInfo () {
                return {
                    productDetailImage: this.productDetailImage,
                    accessorys: this.accessorys,
                    electronicNotify: ''
                }
            },
            /* ------------------------------------ 费率详情的数据展示 ----------------------------------------- */
            rateInfo () {
                return {
                    rateInfoFlag: this.rateInfoFlag,
                    productName: this.product.productName,
                    productLifeRisks: this.productLifeRisks,
                    rates: this.newRates,
                    selectedValue: this.rateSelectedValue, // 选中的费率
                    product: this.product,
                    premium: this.premium,
                    amount: this.amount, // 传送保额信息
                    coveragePremiumType: this.coveragePremiumType,
                    defaultInsured: this.defaultInsured
                }
            },
            /* --------------------------------- 格式化费率 ---------------------------------------------------- */
            newRates () {
                return formatRate(this.rates, this.plans, this.rateSelectedValue)
            },
            /* ----------------------------- 计算保额保费 ------------------------------------------------------ */
            premium () {
                return this.rateSelectedValue.premiumPeriodObj.rate === null ? 0 : this.rateSelectedValue.premiumPeriodObj.rate.premium
            },
            amount () {
                return this.rateSelectedValue.premiumPeriodObj.rate === null ? 0 : this.rateSelectedValue.premiumPeriodObj.rate.sumInsured
            },
            coveragePremiumType () {
                return this.rateSelectedValue.premiumPeriodObj.rate === null ? 0 : this.rateSelectedValue.premiumPeriodObj.rate.coveragePremiumType
            },
            defaultInsured () {
                return this.rateSelectedValue.premiumPeriodObj.rate === null ? 0 : this.rateSelectedValue.premiumPeriodObj.rate.defaultInsured
            },
            /* ------------------------------- 判断是否是线上还是线下 ------------------------------------------------------- */
            isOnlineInsurance () {
                return this.$route.query.isOnlineInsurance
            },
            footerText () {
                return this.isOnlineInsurance === '1' ? '下一步' : '立即预约'
            }
        },
        methods: {
            queryToken () {
                this.SET_TOKEN(this.$route.params.token)
                var beforeToken = ''
                var testToken = this.token
                var _this = this
                console.log(testToken + '  testToken')
                var db = openDatabase('agentdb', '1.0', 'agent', 2 * 1024)
                    db.transaction(function (tx) {
                        tx.executeSql('SELECT * FROM agentTemp WHERE id=1', [], function (tx, results) {
                        console.log('info页面results.rows.item(0).agent_token  ' + results.rows.item(0).agent_token)
                            beforeToken = results.rows.item(0).agent_token // agent页token md5
                            console.log('info页面agentbeforeToken  ' + beforeToken)
                            let comToken = md5(_this.token + 'agenthaha') // insurance页 token md5
                            console.log('info页面comToken  ' + comToken)
                            console.log('info页面insurancebeforeToken对比  ' + beforeToken)
                            if (comToken === beforeToken) {
                                _this.SET_WEBSTATUS(true) // 代理人
                                console.log('代理人trueaaaa')
                            } else {
                                _this.SET_WEBSTATUS(false) // 客户
                                console.log('客户falseaaaa')
                            }
                        }, null)
                    })
                    console.log('end info页面')
            },
            // 产品详情
            _queryProduct () {
                productInfo(this.productId, 'mobile').then(res => {
                    if (res.data.code === CODE_OK) {
                        this.showLoading = false
                        this.productMap = res.data.result
                        if (res.data.result.productLifeRisks[0].processName === 'GreatWallProcess') {
                            this.setChangChengPolicyInfo({
                                field1: 'mainPolicyName',
                                value: res.data.result.product.productName
                            })
                            this.setChangChengPolicyInfo({
                                field1: 'productId',
                                value: res.data.result.product.id
                            })
                            this.setChangChengPolicyInfo({
                                field1: 'externalCode',
                                value: res.data.result.product.externalCode
                            })
                            this.setChangChengBaseInfo({
                                field1: 'mainPolicyName',
                                value: res.data.result.product.productName
                            })
                            this.setChangChengBaseInfo({
                                field1: 'productId',
                                value: res.data.result.product.id
                            })
                        }
                    }
                })
            },
            // 投保差异信息
            _queryInsureInfo () {
                if (this.isOnlineInsurance === '1') {
                    insureInfo(this.productId).then(res => {
                         console.log('-----------------短险投保差异信息------------------------')
                        if (res.data.code === CODE_OK) {
                            this.insureInfo = res.data.result.insureRule
                            this.SET_LIFE_INSUREINFO(this.insureInfo)
                        }
                    })
                }
            },
            showRateInfo () {
                if (this.productMap.productLifeRisks[0].processType === 1) {
                    if (this.productMap.productLifeRisks[0].processName === 'GreatWallProcess') {
                        this.$router.push({
                            name: 'base-info'
                        })
                    } else if (this.productMap.productLifeRisks[0].processName === 'guangdajiruibao') {
                        this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                            field1: 'productId',
                            value: this.productId
                        })
                        this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                            type: 2,
                            field1: 'productId',
                            value: Number(this.productId)
                        })
                        this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                            field1: 'productName',
                            value: this.product.productName
                        })
                        this.$router.push({
                            path: '/guangdabase-info',
                            query: {
                                productId: this.productId,
                                supplierId: this.supplierId
                            }
                        })
                    }
                } else {
                    if (this.isOnlineInsurance === '1') {
                        this.rateInfoFlag = true
                    }
                }
            },
            hideRateInfo () {
                this.rateInfoFlag = false
            },
            changeSelect (type, value) {
                if (type !== 'date') {
                    updateSelect(this.rateSelectedValue, type, value)
                } else {
                    value.insAgeType = this.insureInfo.insAgeType
                    updateAge(this.rateSelectedValue, type, value)
                }
            },
            ...mapMutations({
                SET_TOKEN: 'SET_TOKEN',
                SET_LIFE_INSUREINFO: 'SET_LIFE_INSUREINFO',
                SET_REMOVE_LIFE: 'SET_REMOVE_LIFE',
                SET_WEBSTATUS: 'SET_WEBSTATUS',
                SET_REMOVE_CHANGCHENG_BASE_INFO: 'SET_REMOVE_CHANGCHENG_BASE_INFO',
                setChangChengBaseInfo: 'SET_LONGLIFE_CHANGCHENG_BASEINFO',
                setChangChengPolicyInfo: 'SET_LONGLIFE_CHANGCHENG_POLICYINFO',
                SET_LONGLIFE_GUANGDA_POLICYINFO: 'SET_LONGLIFE_GUANGDA_POLICYINFO',
                SET_GUANGDA_DIC: 'SET_GUANGDA_DIC'
            })
        },
        components: {
            MainInfo,
            CodeInfo,
            DetailInfo,
            RateInfo,
            InfoFooter,
            Loading
        },
        watch: {
        }
    }
</script>

<style lang="stylus" scoped>
    @import '~common/stylus/variable.styl'
    .info
        padding-bottom: (100/$scale)
</style>
