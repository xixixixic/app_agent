// 跳转投保第一步 逻辑
import {mergeObj} from 'common/js/obj-util.js'
function stepOne (state, params) {
  for (let param of params) {
    state.insuranceRules = params[0].insureRule
    state.occupationOfDb = params[0].occupationArray
    let rate = param.rate
    let productMap = param.productMap
    let obj = {
      productId: rate.productId,
      planId: rate.liabilityCoverageId,
      insuranceRateId: rate.insuranceRateId,
      insuranceRate: rate,
      number: 1,
      productNew: productMap.product,
      premium: Math.round(rate.premium * param.multiple, 2),
      amount: Math.round(rate.sumInsured * param.multiple, 2)
    }
    for (let key in state.policy.policyViceLifeExtList) {
      if (obj.productId === state.policy.policyViceLifeExtList[key].productId) {
        let newObj = mergeObj([obj, state.policy.policyViceLifeExtList[key]])
        state.policy.policyViceLifeExtList[key] = newObj
      }
    }
  }
}
export default {
  'step1': stepOne
}