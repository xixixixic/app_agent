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
// 初始化基本信息
const baseInfo = () => {
    return fetch({
        url: 'greatWall/base-info-init',
        method: 'post',
        data: {}
    })
}
// 提交基本信息
const submitBaseInfo = (params) => {
    return fetch({
        url: 'greatWall/sure-base-info',
        method: 'post',
        data: params
    })
}
// 初始化主险算费因子
const initPolicy = (params) => {
    return fetch({
        url: 'greatWall/edit-main-risk-item-init',
        method: 'post',
        data: params
    })
}
// 初始化主险算费因子
const Zhushoujin = (params) => {
    return fetch({
        url: 'greatWall/get-money-year-option',
        method: 'post',
        data: params
    })
}
// 提交主险算费因子
const submitMainPolicy = (params) => {
    return fetch({
        url: 'greatWall/sure-main-risk-item',
        method: 'post',
        data: params
    })
}
// 获取附加险列表
const getFuPolicy = (params) => {
    return fetch({
        url: 'greatWall/get-allow-aux-risks',
        method: 'post',
        data: params
    })
}
// 获取附加险详情信息
const showFuPolicyDetail = (params) => {
    return fetch({
        url: 'greatWall/get-aux-risk-detail',
        method: 'post',
        data: params
    })
}

// 完善基本信息初始化
const initBaseInfoAll = () => {
    return fetch({
        url: 'greatWall/perfect-base-info-init',
        method: 'post',
        data: {}
    })
}
// 完善基本信息
const perFectBaseInfo = (params) => {
    return fetch({
        url: 'greatWall/perfect-base-info',
        method: 'post',
        data: params
    })
}
// 转账信息初始化
const initBankInfo = () => {
    return fetch({
        url: 'greatWall/perfect-bank-info-init',
        method: 'post',
        data: {}
    })
}

// 提交转账信息
const subimitBankInfo = (params) => {
    return fetch({
        url: 'greatWall/perfect-bank-info',
        method: 'post',
        data: params
    })
}

// 获取交易串号
const getTradeNum = (params) => {
    return fetch({
        url: 'greatWall/apply-trand-no',
        method: 'post',
        data: {
            insPolicyNo: params
        }
    })
}

// 证件件上传
const unloadPic = (params) => {
    return fetch({
        url: 'greatWall/upload-image',
        method: 'post',
        data: params
    })
}

// 影像件上传
const unloadYingXiangJian = (params) => {
    return fetch({
        url: 'greatWall/fs-upload-image',
        method: 'post',
        data: params
    })
}

// 回显保单所有信息
const previewPolicyInfo = (params) => {
    return fetch({
        url: 'greatWall/trial-cal',
        method: 'post',
        data: params
    })
}

// 确认保单信息并支付
const confirmPolicyInfo = (params) => {
    return fetch({
        url: 'greatWall/trial-pay',
        method: 'post',
        data: params
    })
}

// 二次支付
const secondPay = () => {
    return fetch({
        url: 'greatWall/second-pay',
        method: 'post',
        data: {}
    })
}

const allArea = () => {
    return fetch({
        url: 'tianAnCarInsure/tianan-getProvinceCityAreaJson',
        method: 'post'
    })
}
// 健康告知
const healthTold = (params) => {
    return fetch({
        url: 'greatWall/save-notice-info',
        method: 'post',
        data: params
    })
}
export {
    insureInfo,
    baseInfo,
    submitBaseInfo,
    initPolicy,
    submitMainPolicy,
    getFuPolicy,
    initBaseInfoAll,
    perFectBaseInfo,
    initBankInfo,
    subimitBankInfo,
    getTradeNum,
    unloadPic,
    unloadYingXiangJian,
    previewPolicyInfo,
    confirmPolicyInfo,
    secondPay,
    allArea,
    showFuPolicyDetail,
    healthTold,
    Zhushoujin
}