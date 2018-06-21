import {fetch} from 'service/http'
// 5.2.3.1 计算主险保费
const culateMainRisk = (data) => {
    return fetch({
        url: 'GDYMController/culateMainRisk',
        method: 'post',
        data: data
    })
}

// 5.2.3.2 获取附加险参数
const queryAdditionalRiskParam = (data) => {
    return fetch({
        url: 'GDYMController/queryAdditionalRiskParam?mRateId=' + data.mRateId + '&amount=' + data.amount + '&realtionType=' + data.realtionType + '&appSex=' + data.appSex + '&appAge=' + data.appAge + '&insCategories=' + data.insCategories,
        method: 'get'
    })
}

// 5.2.3.3.2 保费试算
const trailPremium = (data) => {
    return fetch({
        url: 'GDYMController/trailPremium',
        method: 'post',
        data: data
    })
}

// 5.2.3.4.1 上传影像件
const uploadImage = (data) => {
    return fetch({
        url: 'GDYMController/uploadImage',
        method: 'post',
        data: data
    })
}

// 5.2.3.4.2 影像回显
const imageReload = (data) => {
    return fetch({
        url: 'GDYMController/imageReload?insPolicyCode=' + data,
        method: 'get'
    })
}

// 5.2.3.5 投保接口
const trail = (data) => {
    return fetch({
        url: 'GDYMController/trail',
        method: 'post',
        data: data
    })
}

// 5.2.3.6 二次支付初始接口
const secondPayInit = (data) => {
    return fetch({
        url: 'GDYMController/secondPayInit',
        method: 'post',
        data: data
    })
}

// 5.2.3.7  二次支付接口
const secondPay = (data) => {
    return fetch({
        url: 'GDYMController/secondPay',
        method: 'post',
        data: data
    })
}

// 5.2.3.8  回执回销接口
const policyReceipt = (data) => {
    return fetch({
        url: 'GDYMController/policyReceipt',
        method: 'post',
        data: data
    })
}

// 5.2.3.9 投保字典初始化接口
const trialDataInit = (data) => {
    return fetch({
        url: 'GDYMController/trialDataInit',
        method: 'post',
        data: data
    })
}

// 计算分项附加险保费
const culatePremiumForOneAddRisk = (data) => {
    return fetch({
        url: 'GDYMController/culatePremiumForOneAddRisk',
        method: 'post',
        data: data
    })
}

export {
    culateMainRisk,
    queryAdditionalRiskParam,
    trailPremium,
    uploadImage,
    imageReload,
    trail,
    secondPayInit,
    secondPay,
    policyReceipt,
    trialDataInit,
    culatePremiumForOneAddRisk
}