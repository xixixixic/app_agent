import {fetch} from 'service/http'
// 满足90%产品详情的接口
const productInfo = (id, clientType) => {
    return fetch({
        url: 'product/queryProduct',
        method: 'get',
        params: {
            id: id,
            clientType: clientType
        }
    })
}
// 出生被保人生日区间
const insuredBirthday = (params) => {
    return fetch({
        url: 'commonController/qureyBirthdayScope',
        method: 'get',
        params: params
    })
}
export {
    productInfo,
    insuredBirthday
}