/**
 * 合并对象，将对象数组的 对象 合并成一个
 * 如果两个对象属性相同， 将以数组下标大 的对象属性 为准
 */
export function mergeObj (objList) {
    let objResult = {}
    for (let obj of objList) {
        for (let key in obj) {
            objResult[key] = obj[key]
        }
    }
    return objResult
}