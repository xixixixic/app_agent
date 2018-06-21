import storage from 'good-storage'
import defaultPolicy from 'store/default/life/default-policy.js'
import defaultDuCarTouBeiBaoRen from 'store/default/car/du-bang/default-toubeibaoren.js'
import defaultDuCarInfoOwner from 'store/default/car/du-bang/default-carInfo-owner.js'
import defaultDuCarPremium from 'store/default/car/du-bang/default-premium.js'
import defaultDucarPremiumForm from 'store/default/car/du-bang/default-premium-form.js'
import defaultDucarOrder from 'store/default/car/du-bang/default-orderpass.js'
import defaultTianCarInfo from 'store/default/car/tian-an/default-carInfo-owner.js' // 天安车辆车主信息
import defaultTianCarInsuranceInfo from 'store/default/car/tian-an/default-insurance-info.js' // 天安车辆里程数，行驶区域等保险信息
import defaultTianCarPremiun from 'store/default/car/tian-an/default-premium.js' // 天安保费计算
import defaultTianCarPremiunForm from 'store/default/car/tian-an/default-premium-form.js' // 天安保费计算结果
import defaultTianCarInsuredAndApplicant from 'store/default/car/tian-an/default-toubeibaoren.js' // 天安投保人被保人信息
import defaultTianCarRecipent from 'store/default/car/tian-an/default-recipient.js' // 天安收件人信息
import defaultTianCarOrder from 'store/default/car/tian-an/default-orderpass.js' // 天安订单单号信息
import defaultChangChengBaseInfo from 'store/default/long-life/chang-cheng/base-info.js' // 长城基本信息
import defaultChangChengMainPolicyInfo from 'store/default/long-life/chang-cheng/policy-info.js' // 长城主附险信息
import defaultChangChengBankDetail from 'store/default/long-life/chang-cheng/bank-detail-info.js' // 长城转账信息
import defaultchangChengCertificePic from 'store/default/long-life/chang-cheng/certificate-pic.js' // 长城签证上传
import defalultChangChengHealthTolfInfo from 'store/default/long-life/chang-cheng/health-told-info.js' // 健康告知信息
import defaultChangChengQuestionList from 'store/default/long-life/chang-cheng/questionList.js' // 长城健康告知问题
import defaultChangchengHealthdefault from 'store/default/long-life/chang-cheng/defalut-health.js' // 健康告知缓存

import mainrisk from 'store/default/long-life/guang-da/default-mainrisk.js' // 光大主险保费
import riskpremium from 'store/default/long-life/guang-da/default-riskpremium.js' // 光大附加险保费
import policy from 'store/default/long-life/guang-da/default-policy.js' // 光大数据
import riskPolicy from 'store/default/long-life/guang-da/default-riskPolicy.js' // 光大保费试算
import trail from 'store/default/long-life/guang-da/default-trail.js' // 光大核保
import questionList from 'store/default/long-life/guang-da/questionList.js' // 光大问题

const STATE_LIFE_POLICY_KEY = '__STATE_LIFE_POLICY_KEY__'
const STATE_LIFE_INSURERULES_KEY = '__STATE_LIFE_INSURERULES_KEY__'
const STATE_TOKEN_KEY = '__STATE_TOKEN_KEY__'
const STATE_WEBSTATUS_KEY = '__STATE_WEBSTATUS_KEY__'
const STATE_CAR_DUBANG_TOUBEIBAOREN_KEY = '__STATE_CAR_DUBANG_TOUBEIBAOREN_KEY__'
const STATE_CAR_DUBANG_CARINFO_OWNER_KEY = '__STATE_CAR_DUBANG_CARINFO_OWNER_KEY__'
const STATE_CAR_DUBANG_CONFIG_KEY = '__STATE_CAR_DUBANG_CONFIG_KEY__'
const STATE_CAR_DUBANG_PREMIUM_KEY = '__STATE_CAR_DUBANG_PREMIUM_KEY__'
const STATE_CAR_DUBANG_PREMIUM_FORM_KEY = '__STATE_CAR_DUBANG_PREMIUM_FORM_KEY__'
const STATE_CAR_DUBANG_ORDER_KEY = '__STATE_CAR_DUBANG_ORDER_KEY__'
const STATE_CAR_TIANAN_CARINFO_KEY = '__STATE_CAR_TIANAN_CARINFO_KEY__'
const STATE_CAR_TIANAN_CONFIG_KEY = 'STATE_CAR_TIANAN_CONFIG_KEY'
const STATE_CAR_TIANAN_INSURANCEINFO_KEY = '__STATE_CAR_TIANAN_INSURANCEINFO_KEY__'
const STATE_CAR_TIANAN_PREMIUM_KEY = 'STATE_CAR_TIANAN_PREMIUM_KEY'
const STATE_CAR_TIANAN_PREMIUMFORM_KEY = '__STATE_CAR_TIANAN_PREMIUMFORM_KEY__'
const STATE_CAR_TIANAN_INSURED_APPLICANT = '__STATE_CAR_TIANAN_INSURED_APPLICANT__'
const STATE_CAR_TIANAN_RECIPIENT = '__STATE_CAR_TIANAN_RECIPIENT__'
const STATE_CAR_TIANAN_ORDER = '__STATE_CAR_TIANAN_ORDER__'
const STATE_LONGLIFE_CHANGCHENG_BASEINFO = '__STATE_LONGLIFE_CHANGCHENG_BASEINFO__' // 长城基本信息
const SET_LONGLIFE_CHANGCHENG_POLICYINFO = '__SET_LONGLIFE_CHANGCHENG_POLICYINFO__' // 长城主险信息
const SET_LONGLIFE_CHANGCHENG_BANKDETAIL = '__SET_LONGLIFE_CHANGCHENG_BANKDETAIL__' // 长城主险信息
const SET_LONGLIFE_CHANGCHENG_CERTIFICATEPIC = '__SET_LONGLIFE_CHANGCHENG_CERTIFICATEPIC__' // 长城签证上传
const SET_LONGLIFE_CHANGCHENG_HEALTHTOLDINFO = '_SET_LONGLIFE_CHANGCHENG_HEALTHTOLDINFO_' // 健康告知信息
const SET_LONGLIFE_CHANGCHENG_HEALTHQUESTION = '_SET_LONGLIFE_CHANGCHENG_HEALTHQUESTION_' // 健康告知問題
const SET_LONGLIFE_CHANGCHENG_HEALTHDAULT = 'SET_LONGLIFE_CHANGCHENG_HEALTHDAULT' // 健康告知输入缓存
const SET_LONGLIFE_GUANGDA_PREMIUM = '_SET_LONGLIFE_GUANGDA_PREMIUM_' // 光大附加险保费
const SET_LONGLIFE_GUANGDA_MAINRISK = '_SET_LONGLIFE_GUANGDA_MAINRISK_' // 光大主险保费
const SET_LONGLIFE_GUANGDA_POLICY = '_SET_LONGLIFE_GUANGDA_POLICY_' // 光大数据
const SET_LONGLIFE_GUANGDA_RISKPOLICY = '_SET_LONGLIFE_GUANGDA_RISKPOLICY_' // 光大保费试算
const SET_LONGLIFE_GUANGDA_TRIAL = '_SET_LONGLIFE_GUANGDA_TRIAL_' // 光大核保
const SET_LONGLIFE_GUANGDA_HEATHQUESTION = '_SET_LONGLIFE_GUANGDA_HEATHQUESTION_' // 光大健康告知问题

export function saveState (state) {
    storage.session.set(STATE_TOKEN_KEY, state.token)
    storage.set(STATE_WEBSTATUS_KEY, state.webStatus)
    storage.session.set(STATE_LIFE_POLICY_KEY, state.life.policy)
    storage.session.set(STATE_LIFE_INSURERULES_KEY, state.life.insuranceRules)
    storage.session.set(STATE_CAR_TIANAN_PREMIUMFORM_KEY, state.car.tianan.tianCarPremiumForm)
    storage.session.set(STATE_CAR_DUBANG_TOUBEIBAOREN_KEY, state.car.dubang.duCarTouBeiBaoRen)
    storage.session.set(STATE_CAR_DUBANG_CARINFO_OWNER_KEY, state.car.dubang.duCarInfoOwner)
    storage.session.set(STATE_CAR_DUBANG_CONFIG_KEY, state.duCarConfig)
    storage.session.set(STATE_CAR_DUBANG_PREMIUM_KEY, state.car.dubang.duCarPremium)
    storage.session.set(STATE_CAR_DUBANG_PREMIUM_FORM_KEY, state.car.dubang.duCarPremiumForm)
    storage.session.set(STATE_CAR_DUBANG_ORDER_KEY, state.car.dubang.duCarOrder)
    storage.session.set(STATE_CAR_TIANAN_CARINFO_KEY, state.car.tianan.tianCarInfo)
    storage.session.set(STATE_CAR_TIANAN_CONFIG_KEY, state.tianCarConfig)
    storage.session.set(STATE_CAR_TIANAN_INSURANCEINFO_KEY, state.car.tianan.tianCarInsuranceInfo)
    storage.session.set(STATE_CAR_TIANAN_PREMIUM_KEY, state.car.tianan.tianCarPremium)
    storage.session.set(STATE_CAR_TIANAN_INSURED_APPLICANT, state.car.tianan.tianCarInsuredAndApplicant)
    storage.session.set(STATE_CAR_TIANAN_RECIPIENT, state.car.tianan.tianCarRecipient)
    storage.session.set(STATE_CAR_TIANAN_ORDER, state.car.tianan.tianCarOrder)
    storage.session.set(STATE_LONGLIFE_CHANGCHENG_BASEINFO, state.longLife.changCheng.changChengBaseInfo)
    storage.session.set(SET_LONGLIFE_CHANGCHENG_POLICYINFO, state.longLife.changCheng.changChengPolicyInfo)
    storage.session.set(SET_LONGLIFE_CHANGCHENG_BANKDETAIL, state.longLife.changCheng.changChengBankDetail)
    storage.session.set(SET_LONGLIFE_CHANGCHENG_CERTIFICATEPIC, state.longLife.changCheng.changChengCertificePic)
    storage.session.set(SET_LONGLIFE_CHANGCHENG_HEALTHTOLDINFO, state.longLife.changCheng.changchengHealthPolicy)
    storage.session.set(SET_LONGLIFE_CHANGCHENG_HEALTHQUESTION, state.longLife.changCheng.changchengHealthQuestion)
    storage.session.set(SET_LONGLIFE_CHANGCHENG_HEALTHDAULT, state.longLife.changCheng.changchengHealthDefault)
    storage.session.set(SET_LONGLIFE_GUANGDA_PREMIUM, state.longLife.guangda.guangdaPremiumRisk)
    storage.session.set(SET_LONGLIFE_GUANGDA_MAINRISK, state.longLife.guangda.guangdaMainRisk)
    storage.session.set(SET_LONGLIFE_GUANGDA_POLICY, state.longLife.guangda.guangdaPolicy)
    storage.session.set(SET_LONGLIFE_GUANGDA_RISKPOLICY, state.longLife.guangda.guangdaRiskPolicy)
    storage.session.set(SET_LONGLIFE_GUANGDA_TRIAL, state.longLife.guangda.guangdaTrail)
    storage.session.set(SET_LONGLIFE_GUANGDA_HEATHQUESTION, state.longLife.guangda.guangdaHealthQuestion)
}

export function getState (state) {
    state.life.policy = storage.session.get(STATE_LIFE_POLICY_KEY)
    state.life.insuranceRules = storage.session.get(STATE_LIFE_INSURERULES_KEY)
    state.token = storage.session.get(STATE_TOKEN_KEY)
    state.webStatus = storage.get(STATE_WEBSTATUS_KEY)
    state.car.tianan.tianCarPremiumForm = storage.session.get(STATE_CAR_TIANAN_PREMIUMFORM_KEY, defaultTianCarPremiunForm) // 天安计算保费结果
    state.car.dubang.duCarTouBeiBaoRen = storage.session.get(STATE_CAR_DUBANG_TOUBEIBAOREN_KEY, defaultDuCarTouBeiBaoRen) // 都邦投被保人
    state.car.dubang.duCarInfoOwner = storage.session.get(STATE_CAR_DUBANG_CARINFO_OWNER_KEY, defaultDuCarInfoOwner) // 都邦车主和车辆信息
    state.duCarConfig = storage.session.get(STATE_CAR_DUBANG_CONFIG_KEY) // 都邦车辆配置信息
    state.car.dubang.duCarPremium = storage.session.get(STATE_CAR_DUBANG_PREMIUM_KEY, defaultDuCarPremium) // 都邦保费计算
    state.car.dubang.duCarPremiumForm = storage.session.get(STATE_CAR_DUBANG_PREMIUM_FORM_KEY, defaultDucarPremiumForm) // 都邦保费计算结果
    state.car.dubang.duCarOrder = storage.session.get(STATE_CAR_DUBANG_ORDER_KEY, defaultDucarOrder) // 都邦订单
    state.car.tianan.tianCarInfo = storage.session.get(STATE_CAR_TIANAN_CARINFO_KEY, defaultTianCarInfo) // 天安车辆车主信息
    state.tianCarConfig = storage.session.get(STATE_CAR_TIANAN_CONFIG_KEY) // 天安车辆配置
    state.car.tianan.tianCarInsuranceInfo = storage.session.get(STATE_CAR_TIANAN_INSURANCEINFO_KEY, defaultTianCarInsuranceInfo) // 天安车辆里程数，行驶区域等保险信息
    state.car.tianan.tianCarPremium = storage.session.get(STATE_CAR_TIANAN_PREMIUM_KEY, defaultTianCarPremiun) // 天安保费
    state.car.tianan.tianCarInsuredAndApplicant = storage.session.get(STATE_CAR_TIANAN_INSURED_APPLICANT, defaultTianCarInsuredAndApplicant) // 天安投保人和被保人
    state.car.tianan.tianCarRecipient = storage.session.get(STATE_CAR_TIANAN_RECIPIENT, defaultTianCarRecipent) // 天安收件人信息
    state.car.tianan.tianCarOrder = storage.session.get(STATE_CAR_TIANAN_ORDER, defaultTianCarOrder) // 天安订单号
    state.longLife.changCheng.changChengBaseInfo = storage.session.get(STATE_LONGLIFE_CHANGCHENG_BASEINFO, defaultChangChengBaseInfo) // 长城基本信息
    state.longLife.changCheng.changChengPolicyInfo = storage.session.get(SET_LONGLIFE_CHANGCHENG_POLICYINFO, defaultChangChengMainPolicyInfo) // 长城主险信息
    state.longLife.changCheng.changChengBankDetail = storage.session.get(SET_LONGLIFE_CHANGCHENG_BANKDETAIL, defaultChangChengBankDetail) // 长城转账信息
    state.longLife.changCheng.changChengCertificePic = storage.session.get(SET_LONGLIFE_CHANGCHENG_CERTIFICATEPIC, defaultchangChengCertificePic) // 长城签证上传
    state.longLife.changCheng.changchengHealthPolicy = storage.session.get(SET_LONGLIFE_CHANGCHENG_HEALTHTOLDINFO, defalultChangChengHealthTolfInfo) // 健康告知信息
    state.longLife.changCheng.changchengHealthQuestion = storage.session.get(SET_LONGLIFE_CHANGCHENG_HEALTHQUESTION, defaultChangChengQuestionList) // 健康告知問題
    state.longLife.changCheng.changchengHealthDefault = storage.session.get(SET_LONGLIFE_CHANGCHENG_HEALTHDAULT, defaultChangchengHealthdefault) // 健康告知缓存
    state.longLife.guangda.guangdaMainRisk = storage.session.get(SET_LONGLIFE_GUANGDA_MAINRISK, mainrisk) // 光大主险算费
    state.longLife.guangda.guangdaPremiumRisk = storage.session.get(SET_LONGLIFE_GUANGDA_PREMIUM, riskpremium) // 光大附加险算费
    state.longLife.guangda.guangdaPolicy = storage.session.get(SET_LONGLIFE_GUANGDA_POLICY, policy) // 光大返回信息
    state.longLife.guangda.guangdaRiskPolicy = storage.session.get(SET_LONGLIFE_GUANGDA_RISKPOLICY, riskPolicy) // 光大保费试算
    state.longLife.guangda.guangdaTrail = storage.session.get(SET_LONGLIFE_GUANGDA_TRIAL, trail) // 光大核保
    state.longLife.guangda.guangdaHealthQuestion = storage.session.get(SET_LONGLIFE_GUANGDA_HEATHQUESTION, questionList) // 光大健康告知问题
}

export function clearState (state) {
    state.life.policy = storage.session.set(STATE_LIFE_POLICY_KEY, defaultPolicy)
    state.life.insuranceRules = storage.session.set(STATE_LIFE_INSURERULES_KEY, {})
}
export function clearChangChengBaseInfoState (state) {
    state.longLife.changCheng.changChengBaseInfo = storage.session.set(STATE_LONGLIFE_CHANGCHENG_BASEINFO, defaultChangChengBaseInfo)
    state.longLife.changCheng.changChengPolicyInfo = storage.session.set(SET_LONGLIFE_CHANGCHENG_POLICYINFO, defaultChangChengMainPolicyInfo)
    state.longLife.changCheng.changChengBankDetail = storage.session.set(SET_LONGLIFE_CHANGCHENG_BANKDETAIL, defaultChangChengBankDetail)
    state.longLife.changCheng.changChengCertificePic = storage.session.set(SET_LONGLIFE_CHANGCHENG_CERTIFICATEPIC, defaultchangChengCertificePic)
    state.longLife.changCheng.changchengHealthPolicy = storage.session.set(SET_LONGLIFE_CHANGCHENG_HEALTHTOLDINFO, defalultChangChengHealthTolfInfo)
    state.longLife.changCheng.changchengHealthDefault = storage.session.set(SET_LONGLIFE_CHANGCHENG_HEALTHDAULT, defaultChangchengHealthdefault)
}