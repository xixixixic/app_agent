import {fetch} from 'service/http'
// 查询产品可投区域
const selectArea = () => {
    return fetch({
        url: 'carInsure/cover-area',
        method: 'get',
        params: {
            carProductId: 1
        }
    })
}
const selectAllArea = () => {
    return fetch({
        url: 'common/pca',
        method: 'get',
        appointFlag: true
    })
}
// 查询车型
const queryCarModel = (params) => {
    return fetch({
        url: 'carInsure/car-models',
        method: 'post',
        data: params
    })
}
// 确定车型
const confirmCarModel = (vehicleCode) => {
    return fetch({
        url: 'carInsure/sure-car-model',
        method: 'post',
        data: {
            vehicleCode: vehicleCode
        }
    })
}
// 计算保费
const calculationPremium = (params) => {
    return fetch({
        url: 'carInsure/cal-car-premium',
        method: 'post',
        data: params
    })
}
// 计算保费校验
const checkPremium = (checkCodeBi, checkCodeCi) => {
    return fetch({
        url: 'carInsure/cal-car-premium-check',
        method: 'post',
        data: {
            checkCodeBi: checkCodeBi,
            checkCodeCi: checkCodeCi
        }
    })
}
// 生成订单
const order = (params) => {
    return fetch({
        url: 'carInsure/create-car-order',
        method: 'post',
        data: params
    })
}
export {
    selectArea,
    queryCarModel,
    confirmCarModel,
    calculationPremium,
    checkPremium,
    order,
    selectAllArea
}