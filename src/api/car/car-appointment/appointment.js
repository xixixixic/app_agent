import {fetch} from 'service/http'
// 查询产品可投区域
const selectArea = () => {
    return fetch({
        url: 'common/pca',
        method: 'get',
        appointFlag: true
    })
}
// 车险预约
const carReserve = (params) => {
    return fetch({
        url: 'privateconsultant/car-reserve',
        method: 'post',
        data: params,
        appointFlag: true
    })
}
export {
    selectArea,
    carReserve
}