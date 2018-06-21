let aCity = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外'
}
// 身份证验证
export function isCardID (sId) {
    let iSum = 0
    if (!/^\d{17}(\d|x)$/i.test(sId)) {
        return '你输入的身份证长度或格式错误'
    }
    let lasts = sId.substring(sId.length - 1, sId.length)
    if (isNaN(lasts) && lasts !== 'X') {
      return '你输入的身份证号最后一位错误，应该是大写X!'
    }
    sId = sId.replace(/x$/i, 'a')
    if (aCity[parseInt(sId.substr(0, 2))] === null) {
        return '你的身份证地区非法'
    }
    let sBirthday = sId.substr(6, 4) + '-' + Number(sId.substr(10, 2)) + '-' + Number(sId.substr(12, 2))
    let d = new Date(sBirthday.replace(/-/g, '/'))
    if (sBirthday !== (d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate())) {
        return '身份证上的出生日期非法'
    }
    for (let i = 17; i >= 0; i--) {
        iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11)
    }
    if (iSum % 11 !== 1) return '你输入的身份证号非法'
    return true
}

export function getBirth (sId) {
    let iSum = 0
    if (!/^\d{17}(\d|x)$/i.test(sId)) return false
    sId = sId.replace(/x$/i, 'a')
    if (aCity[parseInt(sId.substr(0, 2))] === null) return false
    let sBirthday = sId.substr(6, 4) + '-' + Number(sId.substr(10, 2)) + '-' + Number(sId.substr(12, 2))
    let d = new Date(sBirthday.replace(/-/g, '/'))
    if (sBirthday !== (d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate())) return false
    for (let i = 17; i >= 0; i--) iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11)
    if (iSum % 11 !== 1) return false
    return sId.substr(6, 4) + '-' + sId.substr(10, 2) + '-' + sId.substr(12, 2)
}

export function getSexId (sId) {
    return sId.substr(16, 1) % 2 ? '1' : '2'
}
// 户口本验证
export function isHukou (sId) {
    let iSum = 0
    if (!/^\d{17}(\d|x)$/i.test(sId)) {
        return '你输入的证件号码长度或格式错误'
    }
    let lasts = sId.substring(sId.length - 1, sId.length)
    if (isNaN(lasts) && lasts !== 'X') {
      return '你输入的证件号码最后一位错误，应该是大写X!'
    }
    sId = sId.replace(/x$/i, 'a')
    if (aCity[parseInt(sId.substr(0, 2))] === null) {
        return '你的证件号码区非法'
    }
    let sBirthday = sId.substr(6, 4) + '-' + Number(sId.substr(10, 2)) + '-' + Number(sId.substr(12, 2))
    let d = new Date(sBirthday.replace(/-/g, '/'))
    if (sBirthday !== (d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate())) {
        return '证件号码上的出生日期非法'
    }
    for (let i = 17; i >= 0; i--) {
        iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11)
    }
    if (iSum % 11 !== 1) return '你输入的证件号码非法'
    return true
}

// 长城验证护照
export function RegHuZhao (value) {
    if (!/^[a-zA-Z0-9]{3,21}$/.test(value)) return '护照不小于三个字符串'
    return true
}
// 长城验证军官证
export function RegJunguanZheng (value) {
    if (!/^[a-zA-Z0-9]{10,18}$/.test(value)) return '军官证长度至少为10位最低18位'
    return true
}

// 长城验证外国人永久居留证
export function RegWaiGuoRen (value) {
    if (!/^[a-zA-Z0-9]{15}$/.test(value)) return '外国人永久居留证长度为15位'
    return true
}

// 长城验证警官证
export function RegJingGuan (value) {
    if (!/^[0-9]{6,7}$/.test(value)) return '警官证为6或7位'
    return true
}

// 长城验证姓名
export function RegName (value) {
    if (!/^[\u4e00-\u9fa5]{2,10}$/.test(value) && !/^[a-zA-Z]{4,16}$/.test(value)) return false
}
// 长城验工作单位
export function RegCompanyName (value) {
    if (!/^[\u4e00-\u9fa5a-zA-Z\d]{2,60}$/.test(value)) return false
}
// 长城验证手机号码
export function RegPhone (value) {
    if (!/^1[3456789][0-9]{9}$/.test(value)) return false
}

// 长城验证固定电话
export function RegTelePhone (value) {
    if (!/^0\d{2,3}-?\d{7,8}$/.test(value)) return false
}
// 长城验证邮箱
export function RegEmail (value) {
    if (!/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(value)) return false
}
// 长城验证邮政编码
export function RegZipCode (value) {
    if (!/^\d{6}$/.test(value)) return false
    if (/^(\d)\1+$/.test(value)) return false
}
// 长城验证投保确认书号
export function RegInsPolicyNo (value) {
    if (!/^105003+[0-9]{8}88$/.test(value)) return false
}

// 长城验证地址长度
export function RegAddressLength (value) {
    if (/^[\u4e00-\u9fa5a-zA-Z\d]{4,}$/.test(value) === false) return '至少填入四个字符'
    return true
}
// 长城验证地址长度
export function RegStreetAddressLength (value) {
    if (/^[\u4e00-\u9fa5a-zA-Z\d]{8,}$/.test(value) === false) return '至少填入8个字'
    return true
}
// 家庭地址
export function RegHomeAddressLength (value) {
    if (/^[\u4e00-\u9fa5a-zA-Z\d]{10,}$/.test(value) === false) return '至少填入10个字'
    return true
}

// 外国人姓
export function RegForeignersLastName (value) {
    if (/^[a-zA-Z]{2,}$/.test(value) === false) return '至少填入2位字符'
    return true
}