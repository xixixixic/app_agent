import {fetch} from 'service/http'
// 查询产品可投区域
const selectArea = (id) => {
    return fetch({
        url: 'tianAnCarInsure/tianan-cover-area',
        method: 'get',
        params: {
            carProductId: 2
        }
    })
}
// 查询车型
const queryCarModel = (params) => {
    return fetch({
        url: 'tianAnCarInsure/tianan-car-models',
        method: 'post',
        data: params
    })
}
// 确定车型
const confirmCarModel = (vehicleCode) => {
    return fetch({
        url: 'tianAnCarInsure/tianan-sure-car-model',
        method: 'post',
        data: {
            vehicleCode: vehicleCode
        }
    })
}
// 天安车辆里程数，行驶区域等保险信息
const insuranceInfo = (params) => {
    return fetch({
        url: 'tianAnCarInsure/tianan-begin-quote',
        method: 'post',
        data: params
    })
}
// 计算保费
const calculationPremium = (params) => {
    return fetch({
        url: 'tianAnCarInsure/tianan-cal-car-premium',
        method: 'post',
        data: params
    })
}
// 投保人被保人信息
const insuredAndApplicant = (params) => {
    return fetch({
        url: 'tianAnCarInsure/tianan-input-applicant-insured',
        method: 'post',
        data: params
    })
}
// 收件人信息
const recipient = (params) => {
    return fetch({
        url: 'tianAnCarInsure/tianan-save-postinfo-create-order',
        method: 'post',
        data: params
    })
}
// 全国区域 寄送地址
const allArea = () => {
    return fetch({
        url: 'tianAnCarInsure/tianan-getProvinceCityAreaJson',
        method: 'post'
    })
}
// 生成订单
const order = () => {
    return fetch({
        url: 'tianAnCarInsure/tianan-create-policy-order',
        method: 'post'
    })
}
// 天安支付成功回调
const successPay = (orderNo) => {
    return fetch({
        url: 'tianAnCarInsure/tianan-queryCarPolicyInfo',
        method: 'post',
        data: {
            orderNo: orderNo
        }
    })
}

// const baseInfo = () => {
//     return fetch({
//         url: 'greatWall/base-info-init',
//         method: 'post'
//     })
// }
export {
    selectArea,
    queryCarModel,
    confirmCarModel,
    insuranceInfo,
    calculationPremium,
    insuredAndApplicant,
    recipient,
    allArea,
    order,
    successPay
    // baseInfo
}