let host = window.location.host
let indexUrl
if (host === 'www.jimuwang.com.cn') {
    location.href = 'http://www.jimuwang.com.cn/wx_agent/#/index'
} else if (host === 'test.kakabx.com') {
    location.href = 'http://test.kakabx.com/wx_agent/#/index'
} else {
    location.href = 'http://localhost:8077/#/index'
}
export {
    indexUrl
}