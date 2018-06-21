import {isMemberField} from 'common/js/array-util.js'
import {setDefaultValue} from 'components/product/life/js/update-select.js'
export function formatRate (rates, plans, selectedValue) {
    let plansList = []
    for (let i in rates) {
        if (!isMemberField(rates[i].liabilityCoverageId, plansList, 'id')) {
            setDefaultValue().setPlanDefault(rates[i], selectedValue) // 先设置缺省的 计划
            let obj = {}
            obj.id = rates[i].liabilityCoverageId
            obj.name = getPlanName(rates[i].liabilityCoverageId, plans)
            if (obj.id === selectedValue.planId) {
                obj.children = getAge(rates, selectedValue)
            }
            plansList.push(obj)
        }
    }
    return plansList
}
// 获取计划名称
function getPlanName (id, plans) {
    for (let i in plans) {
      if (id === plans[i].id) return plans[i].projectName
    }
    return ''
}
// ***********************************  年龄 **********************************************************
// 根据计划筛选年龄
function getAge (rates, selectedValue) {
    let planId = selectedValue.planId
    let ages = []
    for (let i in rates) {
        if (rates[i].liabilityCoverageId !== planId) continue
        if (!isMemberField(rates[i].minAge + ',' + rates[i].maxAge, ages, 'id')) {
            setDefaultValue().setAgeDefault(rates[i], selectedValue)
            let obj = {}
            obj.id = rates[i].minAge + ',' + rates[i].maxAge
            obj.minAge = rates[i].minAge
            obj.maxAge = rates[i].maxAge
            obj.name = getAgeName(rates[i])
            if (obj.id === selectedValue.ageId) {
                obj.children = getSex(rates, selectedValue)
            }
            ages.push(obj)
        }
    }
    return ages
}
// 格式化年龄名称
function getAgeName (rates) {
    if (rates.minAge === rates.maxAge) return rates.minAge + '岁'
    else return rates.minAge + '至' + rates.maxAge + '岁'
}
/* -----------------------------------性别--------------------------------------------- */
function getSex (rates, selectedValue) {
    let planId = selectedValue.planId
    let maxAge = selectedValue.ageObj.maxAge
    let minAge = selectedValue.ageObj.minAge
    let sexs = []
    for (let i in rates) {
        if (rates[i].liabilityCoverageId !== planId || rates[i].maxAge !== maxAge || rates[i].minAge !== minAge) continue
        if (!isMemberField(rates[i].sexId, sexs, 'id')) {
            setDefaultValue().setSexDefault(rates[i], selectedValue)
            let obj = {}
            obj.id = rates[i].sexId
            obj.name = getSexName(rates[i])
            if (obj.id === selectedValue.sexId) {
                obj.children = getCoverPeriod(rates, selectedValue)
            }
            sexs.push(obj)
        }
    }
    return sexs
}
// 格式化性别名称
function getSexName (rates) {
    return rates.sexId === 0 ? '不限' : (rates.sexId === 1 ? '男' : '女')
}
/* ----------------------------------------- 保障期间 ------------------------------------------------ */
function getCoverPeriod (rates, selectedValue) {
    let planId = selectedValue.planId
    let maxAge = selectedValue.ageObj.maxAge
    let minAge = selectedValue.ageObj.minAge
    let sexId = selectedValue.sexId
    let coverPeriods = []
    for (let i in rates) {
        if (rates[i].liabilityCoverageId !== planId || rates[i].maxAge !== maxAge || rates[i].minAge !== minAge || rates[i].sexId !== sexId) continue
        if (!isMemberField(rates[i].coverPeriodStr, coverPeriods, 'id')) {
            setDefaultValue().setCoverPeriodDefault(rates[i], selectedValue)
            let obj = {}
            obj.id = obj.name = rates[i].coverPeriodStr
            obj.coverPeriodTypeId = rates[i].coverPeriodTypeId
            obj.coverPeriod = rates[i].coverPeriod
            if (selectedValue.coverPeriodId === obj.id) {
                obj.children = getPremiumPeriod(rates, selectedValue)
            }
            coverPeriods.push(obj)
        }
    }
    return coverPeriods
}
/* ----------------------------------------- 缴费期间 ------------------------------------------------ */
function getPremiumPeriod (rates, selectedValue) {
    let planId = selectedValue.planId
    let maxAge = selectedValue.ageObj.maxAge
    let minAge = selectedValue.ageObj.minAge
    let sexId = selectedValue.sexId
    let coverPeriodTypeId = selectedValue.coverPeriodObj.coverPeriodType
    let coverPeriod = selectedValue.coverPeriodObj.coverPeriod
    let premiumPeriods = []
    for (let i in rates) {
        if (rates[i].liabilityCoverageId !== planId || rates[i].maxAge !== maxAge || rates[i].minAge !== minAge ||
            rates[i].coverPeriod !== coverPeriod || rates[i].coverPeriodTypeId !== coverPeriodTypeId || rates[i].sexId !== sexId) continue
        if (!isMemberField(rates[i].premiumPeriodStr, premiumPeriods, 'id')) {
            setDefaultValue().setPremiumPeriodDefault(rates[i], selectedValue)
            let obj = {}
            obj.id = obj.name = rates[i].premiumPeriodStr
            obj.premiumPeriodTypeId = rates[i].premiumPeriodTypeId
            obj.premiumPeriod = rates[i].premiumPeriod
            premiumPeriods.push(obj)
        }
    }
    return premiumPeriods
}