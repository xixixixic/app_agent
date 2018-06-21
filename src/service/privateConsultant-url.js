export function privateConsultant () {
    let host = window.location.host
    if (host === 'www.jimuwang.com.cn') {
        location.href = 'http://www.jimuwang.com.cn/app_jimuwang/#/privateConsultant'
    } else if (host === 'test.kakabx.com') {
        location.href = 'http://test.kakabx.com/app_jimuwang/#/privateConsultant'
    } else {
        location.href = 'http://localhost:8082/#/privateConsultant'
    }
}