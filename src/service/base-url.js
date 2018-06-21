let host = window.location.host
let BASE_URL
let PAY_BASE_URL
let APPOINT_BASE_URL
if (host === 'jimuwang.com.cn') {
    BASE_URL = 'http://agent.jimuwang.com.cn/FS_AGENT_INSURANCE/'
    PAY_BASE_URL = 'https://www.jimuwang.com.cn/PF_JMW_PAY/'
    APPOINT_BASE_URL = 'https://www.jimuwang.com.cn/PF_JMW_MOBILE/'
} else if (host === 'test.kakabx.com') {
    // BASE_URL = 'http://test.jimuwang.cc/FS_AGENT_INSURANCE/'
    // PAY_BASE_URL = 'http://test.jimuwang.cc/PF_JMW_PAY/'
    // APPOINT_BASE_URL = 'http://test.jimuwang.cc/PF_JMW_MOBILE/'
    BASE_URL = 'http://test.kakabx.com/FS_AGENT_INSURANCE/'
    PAY_BASE_URL = 'http://test.kakabx.com/PF_JMW_PAY/'
    APPOINT_BASE_URL = 'http://test.kakabx.com/PF_JMW_MOBILE/'
} else {
    BASE_URL = 'http://localhost:8012/FS_AGENT_INSURANCE/'
    PAY_BASE_URL = 'http://localhost:8015/PF_JMW_PAY/'
    APPOINT_BASE_URL = 'http://localhost:8011/FS_AGENT_MOBILE/'
    // BASE_URL = 'http://test.kakabx.com/FS_AGENT_INSURANCE/'
    // PAY_BASE_URL = 'http://test.kakabx.com/PF_JMW_PAY/'
    // APPOINT_BASE_URL = 'http://test.kakabx.com/PF_JMW_MOBILE/'
}
export {
    BASE_URL,
    PAY_BASE_URL,
    APPOINT_BASE_URL
}