let host = window.location.host
let loginUrl
if (host === 'jimuwang.com.cn') {
    loginUrl = 'http://agent.jimuwang.com.cn/wx_agent/#/login/1'
} else if (host === 'test.kakabx.com') {
    loginUrl = 'http://test.kakabx.com/wx_agent/#/login/1'
} else {
    loginUrl = 'http://localhost:8077/#/login/1'
}

let clientloginUrl
if (host === 'jimuwang.com.cn') {
    clientloginUrl = 'http://agent.jimuwang.com.cn/agent_insurance/#/client'
} else if (host === 'test.kakabx.com') {
    clientloginUrl = 'http://test.kakabx.com/agent_insurance/#/client'
} else {
    clientloginUrl = 'http://localhost:8019/#/client'
}

export {
    loginUrl,
    clientloginUrl
}