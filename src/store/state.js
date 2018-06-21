import defaultPolicy from './default/life/default-policy.js'
import defaultDuCarTouBeiBaoRen from './default/car/du-bang/default-toubeibaoren.js'
import defaultDuCarInfoOwner from './default/car/du-bang/default-carInfo-owner.js'
import defaultDuCarPremium from './default/car/du-bang/default-premium.js'
import defaultDuCarPremiumForm from './default/car/du-bang/default-premium-form.js'
import defaultDuCarOrder from './default/car/du-bang/default-orderpass.js'
import defaultTianCarInfo from './default/car/tian-an/default-carInfo-owner.js' // 天安车辆车主信息
import defaultTianCarInsuranceInfo from './default/car/tian-an/default-insurance-info.js' // 天安投保信息
import defaultTianCarPremiun from './default/car/tian-an/default-premium.js' // 天安保费计算
import defaultTianCarPremiunForm from './default/car/tian-an/default-premium-form.js' // 天安保费计算结果
import defaultTianCarInsuredAndApplicant from './default/car/tian-an/default-toubeibaoren.js' // 天安投保人被保人信息
import defaultTianCarRecipent from './default/car/tian-an/default-recipient.js' // 天安收件人信息
import defaultTianCarOrder from './default/car/tian-an/default-orderpass.js' // 天安订单
import defaultChangChengBaseInfo from './default/long-life/chang-cheng/base-info.js' // 长城基本信息
import defaultChangChengMainPolicyInfo from './default/long-life/chang-cheng/policy-info.js' // 长城基本信息
import defaultChangChengBankDetail from './default/long-life/chang-cheng/bank-detail-info.js' // 长城转账信息
import defaultchangChengCertificePic from './default/long-life/chang-cheng/certificate-pic.js' // 长城签证上传
import defaultChangChengQuestionList from './default/long-life/chang-cheng/questionList.js' // 长城健康告知问题
import defaultHealthPoliy from './default/long-life/chang-cheng/health-told-info.js' // 长城健康告知参数
import defaultHealth from './default/long-life/chang-cheng/defalut-health.js' // 长城健康告知缓存
import defaultmainrisk from './default/long-life/guang-da/default-mainrisk.js' // 光大主线信息
import defaultriskpremium from './default/long-life/guang-da/default-riskpremium.js' // 光大附加险算费
import defaultpolicy from './default/long-life/guang-da/default-policy.js' // 光大返回参数信息
import defaulttrail from './default/long-life/guang-da/default-trail.js' // 光大核保参数
import defaultriskPolicy from './default/long-life/guang-da/default-riskPolicy.js' // 光大保费试算
import defalutquestionList from './default/long-life/guang-da/questionList.js' // 光大健康告知问题
const state = {
    token: null, // token
    webStatus: false, // webStatus
    life: {
        policy: defaultPolicy, // 寿险核保保单数据
        insuranceRules: {}// 寿险差异性投保规则
    },
    car: {
        dubang: {
            duCarTouBeiBaoRen: defaultDuCarTouBeiBaoRen, // 都邦投保人被保人信息
            duCarInfoOwner: defaultDuCarInfoOwner, // 都邦车主和车辆信息
            duCarPremium: defaultDuCarPremium, // 都邦保费计算
            duCarPremiumForm: defaultDuCarPremiumForm, // 都邦保费计算结果
            duCarOrder: defaultDuCarOrder // 都邦订单单号信息
        },
        tianan: {
            tianCarInfo: defaultTianCarInfo, // 天安车辆车主信息
            tianCarInsuranceInfo: defaultTianCarInsuranceInfo, // 天安车辆里程数，行驶区域等保险信息
            tianCarPremium: defaultTianCarPremiun, // 天安保费计算
            tianCarPremiumForm: defaultTianCarPremiunForm, // 天安保费计算结果
            tianCarInsuredAndApplicant: defaultTianCarInsuredAndApplicant, // 天安投保人被保人信息
            tianCarRecipient: defaultTianCarRecipent, // 天安收件人信息
            tianCarOrder: defaultTianCarOrder // 天安订单单号信息
        }
    },
    longLife: {
        changCheng: {
            changChengBaseInfo: defaultChangChengBaseInfo, // 长城基本信息
            changChengPolicyInfo: defaultChangChengMainPolicyInfo, // 长城主附险信息
            changChengBankDetail: defaultChangChengBankDetail, // 长城转账信息
            changChengCertificePic: defaultchangChengCertificePic, // 长城签证上传
            changchengHealthQuestion: defaultChangChengQuestionList, // 长城健康告知问题
            changchengHealthPolicy: defaultHealthPoliy,  // 长城健康告知保存
            changchengHealthDefault: defaultHealth // 长城健康告知
        },
        guangda: {
            guangdaMainRisk: defaultmainrisk, // 光大主险保费
            guangdaPremiumRisk: defaultriskpremium, // 光大附加险保费
            guangdaPolicy: defaultpolicy, // 光大数据
            guangdaTrail: defaulttrail, // 光大核保
            guangdaRiskPolicy: defaultriskPolicy, // 光大保费试算
            guangdaHealthQuestion: defalutquestionList // 光大健康告知问题
        }
    }
}
export default state