import {getAge} from 'components/product/life/js/age-util.js'
// 初始化数据  按联动顺序清空  下级的所有数据  不包括年龄
export function updateSelect (selectedValue, type, value) {
  let flag = type === undefined
  for (let fieldName of selectedValue.fieldSort) {
    if (flag) selectedValue[fieldName] = null
    if (type === fieldName) {
      selectedValue[fieldName] = value
      flag = true
    }
  }
}
// 初始化数据  按联动顺序清空  下级的所有数据  包括年龄
export function updateAge (selectedValue, type, value) {
  /* ----------------- 计算年龄 ------------------------ */
  let effectDate = value.effectDate
  let birthDate = value.birthDate
  let ageArray = value.ageArray
  let insAgeType = value.insAgeType
  let age = getAge(birthDate, insAgeType === '0' ? effectDate : undefined)
  /* ------------------- 设置年龄 ------------------------- */
  for (let ageBean of ageArray) {
    if (age >= ageBean.minAge && age <= ageBean.maxAge) {
      selectedValue.ageId = ageBean.id
      selectedValue.ageObj = {
        maxAge: ageBean.maxAge,
        minAge: ageBean.minAge
      }
    }
  }
}
// ******************************************* 默认配置 *******************************************************
// 初始化 选中的 计划（如果计划没有选中）
function setPlanDefault (rate, selectedValue) {
  if (selectedValue.planId === null) selectedValue.planId = rate.liabilityCoverageId
}
// 设置缺省的 年龄
function setAgeDefault (rate, selectedValue) {
  if (selectedValue.ageId === null) selectedValue.ageId = rate.minAge + ',' + rate.maxAge
  if (selectedValue.ageId !== rate.minAge + ',' + rate.maxAge) return
  let ageObj = {
    minAge: rate.minAge,
    maxAge: rate.maxAge
  }
  selectedValue.ageObj = ageObj
}
// 设置缺省的性别
function setSexDefault (rate, selectedValue) {
  if (selectedValue.sexId === null) selectedValue.sexId = rate.sexId
}
// 设置缺省的保障期间
function setCoverPeriodDefault (rate, selectedValue) {
  if (selectedValue.coverPeriodId === null) selectedValue.coverPeriodId = rate.coverPeriodStr
  if (selectedValue.coverPeriodId !== rate.coverPeriodStr) return
  let coverPeriodObj = {
    coverPeriodType: rate.coverPeriodTypeId,
    coverPeriod: rate.coverPeriod
  }
  selectedValue.coverPeriodObj = coverPeriodObj
}
// 设置缺省的  缴费期间
function setPremiumPeriodDefault (rate, selectedValue) {
  if (selectedValue.premiumPeriodId === null) selectedValue.premiumPeriodId = rate.premiumPeriodStr
  if (selectedValue.premiumPeriodId !== rate.premiumPeriodStr) return
  let premiumPeriodObj = {
    premiumPeriodType: rate.premiumPeriodTypeId,
    premiumPeriod: rate.premiumPeriod,
    rate: rate
  }
  selectedValue.premiumPeriodObj = premiumPeriodObj
}
// 导出所有设置缺省值的 方法
export function setDefaultValue () {
  return {
    setPlanDefault: setPlanDefault,
    setAgeDefault: setAgeDefault,
    setSexDefault: setSexDefault,
    setCoverPeriodDefault: setCoverPeriodDefault,
    setPremiumPeriodDefault: setPremiumPeriodDefault
  }
}
