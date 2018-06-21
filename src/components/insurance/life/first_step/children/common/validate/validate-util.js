import {methods} from 'components/insurance/life/first_step/children/common/validate/validate-method.js'
export function validate (filedInfo, param, flag) {
    let validateRule = filedInfo.validateRule
    if (validateRule === undefined) return true
    // 如果可为空
    if (filedInfo.fieldLevel === 0) return true
    if (filedInfo.fieldLevel === 1 && param.trim() === '') return true
    if (filedInfo.fieldLevel === 2 && param.trim() === '') return '该项为必填项'
    if (validateRule.type === 'RegExp') {
        let re = new RegExp(validateRule.value)
        return re.test(param) ? true : validateRule.failureInfo
    } else {
        return methods[validateRule.value](param)
    }
}