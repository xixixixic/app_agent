/*
    日历控件的选项文档说明
    具体网址： https://github.com/AppianZ/multi-picker/tree/master/DateSelector
*/
import DateSelector from 'mob-date-selector'
import 'common/stylus/calendar.styl'
/**
 * @param {*} inputId
 * @param {*} containerId
 * @param {*} beginTime 格式 yyyy-MM-dd 或 Date()对象
 * @param {*} endTime 格式 yyyy-MM-dd 或 Date()对象
 * @param {*} recentTime 格式 yyyy-MM-dd 或 Date()对象
 * @param {*} callback 回调
 */
export function calendar (inputId, containerId, callback) {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    /* eslint-disable no-new */
    new DateSelector({
        input: inputId,
        container: containerId,
        type: 0,
        param: [1, 1, 1, 0, 0],
        beginTime: [parseInt(year), parseInt(month), parseInt(day)],
        endTime: [2527, 5, 7],
        recentTime: [parseInt(year), parseInt(month), parseInt(day)],
        success: callback
    })
}
