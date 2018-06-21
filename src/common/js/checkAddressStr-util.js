export function checkAddressStr (addressStr) {
    let count = 0
    let keysList = ['区', '县', '路', '街', '巷', '号', '村', '乡', '组', '镇', '道', '弄', '楼', '排']
    for (let i = 0; i < keysList.length; i++) {
        if (addressStr.indexOf(keysList[i]) > 0) {
            count++
        }
        if (count >= 2) {
            break
        }
    }
    if (count < 2) {
        return '应含区县路街巷号村乡组镇道室弄楼排中的2字!'
    }
    return true
}