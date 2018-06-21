export function getAge (strBirthday, strNowDate, flag) {
    var returnAge
    var strBirthdayArr = strBirthday.split('-')
    var birthYear = strBirthdayArr[0]
    var birthMonth = strBirthdayArr[1]
    var birthDay = strBirthdayArr[2]
    var nowDay, nowYear, nowMonth
        if (strNowDate === undefined) {
            var d = new Date()
            nowYear = d.getFullYear()
            nowMonth = d.getMonth() + 1
            nowDay = d.getDate()
        } else {
            if (strNowDate !== null) {
                var strNowDateArr = strNowDate.split('-')
                nowYear = strNowDateArr[0]
                nowMonth = strNowDateArr[1]
                nowDay = strNowDateArr[2]
            }
        }
        var ageDiff = nowYear - Number(birthYear)  // 年之差
        var monthDiff = nowMonth - Number(birthMonth) // 月之差
        var dayDiff = nowDay - Number(birthDay) // 日之差
        if (ageDiff === 0) {
            if (monthDiff > 0) {
                returnAge = 0 // 同年 则为0岁
            } else if (monthDiff === 0) {
                if (flag) {
                    if (dayDiff >= 0) { // 出生必选大于0天
                        returnAge = 0 // 为0岁
                    } else {
                        returnAge = -1
                    }
                } else {
                    if (dayDiff >= 30) { // 出生必选大于30天
                        returnAge = 0 // 为0岁
                    } else {
                        returnAge = -1
                    }
                }
            } else {
                returnAge = -1
            }
        } else if (ageDiff > 0) {
                if (monthDiff === 0) {
                    if (dayDiff >= 0) {
                        returnAge = ageDiff
                    } else {
                        returnAge = ageDiff - 1
                    }
                } else if (monthDiff > 0) {
                    returnAge = ageDiff
                } else {
                    returnAge = ageDiff - 1
                }
            } else {
                returnAge = -1 // 返回-1 表示出生日期输入错误 晚于今天
            }
    return returnAge  // 返回周岁年龄
}


/*格式 getBeforeDate('2015,5,20') */
/*
* auth:120975587@qq.com
* time:2015.5.6 9:45
* ******************
*/
export  function getBeforeDate(n){
    var now = new Date();
    var aftertime = new Date(n);
    var year = now.getFullYear();
    var mon= now.getMonth()+1;
    var day= now.getDate();
    var year_after = aftertime.getFullYear();
    var mon_after = aftertime.getMonth()+1;
    var day_after = aftertime.getDate();
    var chs = 0;
    //获取当月的天数
    function DayNumOfMonth(Year,Month)
    {
        return 32 - new Date(Year,Month-1,32).getDate();
    }
    if(aftertime.getTime() - now.getTime() < 0){
        var temp1 = day_after;
        var temp2 = mon_after;
        var temp3 = year_after;
        day_after = day;
        mon_after = mon;
        year_after = year;
        day = temp1;
        mon = temp2;
        year = temp3;
    }
    if(year == year_after){//不跨年
        if(mon == mon_after){//不跨年不跨月
            chs += day_after-day;
        }else{//不跨年跨月
            chs += DayNumOfMonth(year,mon)- day+1;//加上第一个不满的
            for(var i=1;i< mon_after-mon;i++){
                chs += DayNumOfMonth(year,mon+i);
            }
            chs += day_after-1;//加上
        }    
    }else{//存在跨年
        chs += DayNumOfMonth(year,mon)- day+1;//加上开始年份不满的一个月
        for(var m=1;m<12-mon;m++){
            chs += DayNumOfMonth(year,mon+m);
        }
        for(var j=1;j < year_after-year;j++){
            if((year+j)%400 == 0 || (year+j)%4 == 0 && (year+j)%100 != 0){
                chs += 366;
            }else{
                chs += 365;
            }
        }
        for(var n=1;n <= mon_after;n++){
            chs += DayNumOfMonth(year_after,n);
        }
        chs += day_after-1;
    }
    if(aftertime.getTime() - now.getTime() < 0){
        return -chs;
    }else{
         return chs;
    }
}