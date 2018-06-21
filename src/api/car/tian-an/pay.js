export function tianAn (carPolicyId) {
    let host = window.location.host
    if (host === 'jimuwang.com.cn') {
        location.href = 'https://www.jimuwang.com.cn/PF_JMW_PAY/99bill/fs_tianan-pay-all.pay?carPolicyId=' + carPolicyId
    } else if (host === 'test.kakabx.com') {
        location.href = 'http://test.kakabx.com/PF_JMW_PAY/99bill/fs_tianan-pay-all.pay?carPolicyId=' + carPolicyId
    } else {
        location.href = 'http://localhost:8037/PF_JMW_PAY/99bill/fs_tianan-pay-all.pay?carPolicyId=' + carPolicyId
    }
}