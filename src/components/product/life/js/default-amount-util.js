export function getDefaultAmount (insureRule, mainRiskList) {
    if (mainRiskList.length === 0) return 0
    if (insureRule === undefined) return 0
    return calulateUtils[insureRule.additionalAmountValue](insureRule, mainRiskList)
}
const calulateUtils = {
    halfOfMainRiskAmonut (insureRule, mainRiskList) {
        console.log(Number(mainRiskList[0].amount) / 2)
        return Number(mainRiskList[0].amount) / 2
    },
    equalMainRiskPremuim (insureRule, mainRiskList) {
        return Number(mainRiskList[0].amount.premuim)
    }
}

