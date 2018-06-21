export function dubang (policyId) {
    let host = window.location.host
    if (host === 'jimuwang.com.cn') {
        location.href = 'https://www.jimuwang.com.cn/PF_JMW_PAY/allinDbPay/order-pay.pay?carPolicyId=' + policyId
    } else if (host === 'test.kakabx.com') {
        location.href = 'http://test.kakabx.com/PF_JMW_PAY/allinDbPay/order-pay.pay?carPolicyId=' + policyId
    } else {
        location.href = 'http://localhost:8090/PF_JMW_PAY/allinDbPay/order-pay.pay?carPolicyId=' + policyId
    }
}