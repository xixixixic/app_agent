export const token = state => state.token
export const webStatus = state => state.webStatus
export const lifePolicy = state => state.life.policy
export const lifeInsuranceRules = state => state.life.insuranceRules // 投保规则
export const lifeApplicant = state => state.life.policy.applicantList // 投保人
export const lifeInsured = state => state.life.policy.insuredList // 被保人
export const lifeBeneficiaryList = state => state.life.policy.beneficiaryList // 受益人
export const lifeBankFields = state => state.life.policy.bankFields // 代扣银行信息
export const duCarTouBeiBaoRen = state => state.car.dubang.duCarTouBeiBaoRen // 都邦投保人被保人信息
export const duCarInfoOwner = state => state.car.dubang.duCarInfoOwner  // 都邦车主和车辆信息
export const duCarConfig = state => state.duCarConfig // 都邦车辆配置信息
export const duCarPremium = state => state.car.dubang.duCarPremium // 都邦车辆税率计算
export const duCarPremiumForm = state => state.car.dubang.duCarPremiumForm // 都邦计算税率返回展示信息
export const duCarOrder = state => state.car.dubang.duCarOrder // 都邦订单单号信息
export const tianCarInfo = state => state.car.tianan.tianCarInfo  // 天安车辆车主信息
export const tianCarConfig = state => state.tianCarConfig // 天安车辆配置信息
export const tianCarInsuranceInfo = state => state.car.tianan.tianCarInsuranceInfo // 天安车辆里程数，行驶区域等保险信息
export const tianCarPremium = state => state.car.tianan.tianCarPremium // 天安保费计算
export const tianCarPremiumForm = state => state.car.tianan.tianCarPremiumForm // 天安保费计算结果
export const tianCarInsuredAndApplicant = state => state.car.tianan.tianCarInsuredAndApplicant // 天安投保人和被保人
export const tianCarRecipient = state => state.car.tianan.tianCarRecipient // 天安收件人信息
export const tianCarOrder = state => state.car.tianan.tianCarOrder // 天安订单单号信息
export const changChengBaseInfo = state => state.longLife.changCheng.changChengBaseInfo // 长城基本信息
export const changChengPolicyInfo = state => state.longLife.changCheng.changChengPolicyInfo // 长城主险附险信息
export const changChengBankDetail = state => state.longLife.changCheng.changChengBankDetail // 长城转账信息
export const changChengCertificePic = state => state.longLife.changCheng.changChengCertificePic // 长城签证上传
export const changChengHealthQuestion = state => state.longLife.changCheng.changchengHealthQuestion // 长城健康告知问题
export const changchengHealthPolicy = state => state.longLife.changCheng.changchengHealthPolicy // 长城健康告知信息
export const changchengHealthdefault = state => state.longLife.changCheng.changchengHealthDefault // 长城健康告知信息缓存
export const guangda = state => state.longLife.guangda // 光大信息
export const guangdaMainRisk = state => state.longLife.guangda.guangdaMainRisk // 光大主險算費
export const guangdaPolicy = state => state.longLife.guangda.guangdaPolicy // 光大數據
export const guangdaPremiumRisk = state => state.longLife.guangda.guangdaPremiumRisk // 光大附加险
export const guangdaRiskPolicy = state => state.longLife.guangda.guangdaRiskPolicy // 光大保费试算
export const guangdaTrail = state => state.longLife.guangda.guangdaTrail // 光大核保数据
export const guangdaHealthQuestion = state => state.longLife.guangda.guangdaHealthQuestion // 光大健康告知问题