export function DateAdd (interval, number, date) {
/*
  * 功能:实现VBScript的DateAdd功能
  * 参数:interval,字符串表达式，表示要添加的时间间隔
  * 参数:number,数值表达式，表示要添加的时间间隔的个数
  * 参数:date,时间对象
  * 返回:新的时间对象
  * var now = new Date()
  * var newDate = DateAdd( 'd ',5,now)
  *---------------   DateAdd(interval,number,date)   -----------------
  */
    switch (interval) {
        case 'year': {
            date.setFullYear(date.getFullYear() + number)
            return date
        }
        case 'month': {
            date.setMonth(date.getMonth() + number)
            return date
        }
        case 'day': {
            date.setDate(date.getDate() + number)
            return date
        }
        case 'hours': {
            date.setHours(date.getHours() + number)
            return date
        }
        case 'minutes': {
            date.setMinutes(date.getMinutes() + number)
            return date
        }
        case 'seconds': {
            date.setSeconds(date.getSeconds() + number)
            return date
        }
        default: {
            date.setDate(date.getDate() + number)
            return date
        }
    }
}
/* 格式化日期 */
export function formatDate (date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + ''
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
        }
    }
    return fmt
}
/* 计算出生日期单位为天的日期函数 */
export function getBeforeDate (n) {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth()
    let day = date.getDate()
    if (day < n) {
        if (month > 1) {
            month = month - 1
        } else {
            year = year - 1
            month = 12
        }
    }
    date.setDate(date.getDate() - n)
    year = date.getFullYear()
    month = date.getMonth() + 1
    day = date.getDate()
    let dateStr = year + '-' + (month - 10 ? ('0' + month) : month) + '-' + (day < 10 ? ('0' + day) : day)
    return dateStr
}
function padLeftZero (str) {
    return ('00' + str).substr(str.length)
}

/* 根据出生日期算出年龄 */
export function jsGetAge (strBirthday) {
    var returnAge
    var strBirthdayArr = strBirthday.split('-')
    var birthYear = strBirthdayArr[0]
    var birthMonth = strBirthdayArr[1]
    var birthDay = strBirthdayArr[2]
    let d = new Date()
    var nowYear = d.getFullYear()
    var nowMonth = d.getMonth() + 1
    var nowDay = d.getDate()
    if (nowYear === birthYear) {
        returnAge = 0 // 同年 则为0岁
    } else {
        var ageDiff = nowYear - birthYear // 年之差
        if (ageDiff > 0) {
            if (nowMonth === birthMonth) {
                var dayDiff = nowDay - birthDay // 日之差
                if (dayDiff < 0) {
                    returnAge = ageDiff - 1
                } else {
                    returnAge = ageDiff
                }
            } else {
                var monthDiff = nowMonth - birthMonth // 月之差
                if (monthDiff < 0) {
                    returnAge = ageDiff - 1
                } else {
                    returnAge = ageDiff
                }
            }
        } else {
            returnAge = -1 // 返回-1 表示出生日期输入错误 晚于今天
        }
    }
    return returnAge // 返回周岁年龄
}