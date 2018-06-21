import {fetch} from 'service/http'
// 满足90%寿险投保差异信息
const insureInfo = (id) => {
    return fetch({
        url: 'product/queryInsureInfo',
        method: 'get',
        params: {
            id: id
        }
    })
}
//  长险投保差异信息
const LriskDifferenceInfo = (id) => {
    return fetch({
        url: 'product/queryLriskDifferenceInfo',
        method: 'get',
        params: {
            id: id
        }
    })
}
// 查询字典信息 进入填写信息页面时 访问
const dictionary = (dictionaryGroupId) => {
    return fetch({
        url: 'insureDictionary/queryDictionary',
        method: 'get',
        params: {
            dictionaryGroupId: dictionaryGroupId,
            dictypes: 'idInfo,relation,sex,occupation,bank,education'
        }
    })
}
// 获取供应商提供的职业信息
const occupation = (supplierId) => {
    return fetch({
        url: 'commonController/queryOccupation',
        method: 'get',
        params: {
            supplierId: supplierId
        }
    })
}
// 获取省市县
const pca = (id) => {
    return fetch({
        url: 'commonController/queryProvinceInfo',
        method: 'get',
        params: {
            id: id
        }
    })
}
// 核保是否通过
const trial = (policy) => {
    return fetch({
        url: 'shortPolicy/trial',
        method: 'post',
        data: policy
    })
}
// 前端获取请求参数,向安心请求支付页面‘
const anxinPay = (formData) => {
    return fetch({
        url: 'anxinPay/requestPayPage.pay',
        method: 'post',
        data: formData,
        payBaseUrlFlag: true
    })
}
// 保单承保
const underWrite = (policyId) => {
    return fetch({
        url: 'shortPolicy/underWrite',
        method: 'get',
        params: {
            policyId: policyId
        }
    })
}

// 查询余额
const yue = (policyId) => {
    return fetch({
        url: 'commonController/qureyAgentCommission',
        method: 'get'
    })
}

// 余额支付
const yuePayRequest = (policyId, yePay) => {
    return fetch({
        url: 'balancePay/doBalancePay.pay',
        method: 'get',
        params: {
            policyId: policyId,
            yePay: yePay
        },
        payBaseUrlFlag: true
    })
}
// 微信支付
const weiXinPay = (policyId, yePay) => {
    return fetch({
        url: 'wechat/agentClientPay.pay',
        method: 'get',
        params: {
            policyId: policyId,
            yePay: yePay
        },
        payBaseUrlFlag: true
    })
}
// 块钱支付
const kuaiqianPay = (policyId, yePay) => {
    return fetch({
        url: '99bill/agentClientPay.pay',
        method: 'get',
        params: {
            policyId: policyId,
            yePay: yePay
        },
        payBaseUrlFlag: true
    })
}
export {
    insureInfo,
    dictionary,
    occupation,
    pca,
    trial,
    anxinPay,
    underWrite,
    yue,
    yuePayRequest,
    weiXinPay,
    kuaiqianPay,
    LriskDifferenceInfo
}