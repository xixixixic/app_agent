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
export function calendar (inputId, containerId, beginTime, endTime, recentTime, callback) {
    beginTime = transToArray(beginTime)
    endTime = transToArray(endTime)
    recentTime = transToArray(recentTime)
    recentTime = recentTime.length === 0 ? beginTime : recentTime
    /* eslint-disable no-new */
    new DateSelector({
        input: inputId,
        container: containerId,
        type: 0,
        param: [1, 1, 1, 0, 0],
        beginTime: [1910, 1, 1],
        endTime: endTime,
        recentTime: recentTime,
        success: callback
    })
}
function transToArray (date) {
    switch (typeof (date)) {
        case 'string': {
            return transStrToArray(date)
        }
        case 'object': {
            return transDateToArray(date)
        }
        default: {
            return []
        }
    }
}
function transStrToArray (date) { // 传入 date : '2017-10-11' 返回 [2017, 10, 11] 如果是其他  则返回 []
    if (typeof (date) !== 'string') return []
    try {
        let dateArr = date.split('-')
        let newList = []
        for (let str of dateArr) {
            let num = parseInt(str)
            if (isNaN(num)) return []
            newList.push(parseInt(num))
        }
        return newList
    } catch (e) {
        return []
    }
}
function transDateToArray (date) { // 传入 date : Date 返回 [2017, 10, 11] 如果是其他  则返回 []
    try {
        return [
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
        ]
    } catch (e) {
        return []
    }
}

export function compareTwoDate (sArr, eArr) {
    console.log(sArr)
    console.log('sArr')
    console.log(eArr)
    console.log('eArr')
    let arr1 = sArr.split('-')
    let arr2 = eArr.split('-')
    let starttimeHaoMiao = (new Date(arr1[0], arr1[1] - 1, arr1[2])).getTime()
    let endttimeHaoMiao = (new Date(arr2[0], arr2[1] - 1, arr2[2])).getTime()
    console.log(starttimeHaoMiao)
    console.log('starttimeHaoMiao')
    console.log(endttimeHaoMiao)
    console.log('endttimeHaoMiao')
    if (starttimeHaoMiao > endttimeHaoMiao) {
        console.log('大于')
        return '大于'
    } else {
        console.log('小于')
        return '小于'
    }
}
