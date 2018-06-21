export function kuaiqianPay (policyId, yePay) {
    let host = window.location.host
    if (host === 'jimuwang.com.cn') {
        console.log('块钱' + policyId)
        location.href = 'https://www.jimuwang.com.cn/PF_JMW_PAY/99bill/agentClientPay.pay?policyId=' + policyId + '&yePay=' + yePay
    } else if (host === 'test.kakabx.com') {
        location.href = 'http://test.kakabx.com/PF_JMW_PAY/99bill/agentClientPay.pay?policyId=' + policyId + '&yePay=' + yePay
    } else {
        location.href = 'http://localhost:8037/PF_JMW_PAY/99bill/agentClientPay.pay?policyId=' + policyId + '&yePay=' + yePay
    }
}
export function weiXinPay (policyId, yePay) {
    let host = window.location.host
    if (host === 'jimuwang.com.cn') {
        console.log('微信' + policyId)
        location.href = 'https://www.jimuwang.com.cn/PF_JMW_PAY/wechat/agentClientPay.pay?policyId=' + policyId + '&yePay=' + yePay
    } else if (host === 'test.kakabx.com') {
        console.log(policyId)
        location.href = 'http://test.kakabx.com/PF_JMW_PAY/wechat/agentClientPay.pay?policyId=' + policyId + '&yePay=' + yePay
    }
}
export function yuePayRequest (policyId, yePay) {
    let host = window.location.host
    if (host === 'jimuwang.com.cn') {
        location.href = 'https://www.jimuwang.com.cn/PF_JMW_PAY/balancePay/doBalancePay.pay?policyId=' + policyId + '&yePay=' + yePay
    } else if (host === 'test.kakabx.com') {
        location.href = 'http://test.kakabx.com/PF_JMW_PAY/balancePay/doBalancePay.pay?policyId=' + policyId + '&yePay=' + yePay
    } else {
        location.href = 'http://localhost:8037/PF_JMW_PAY/balancePay/doBalancePay.pay?policyId=' + policyId + '&yePay=' + yePay
    }
}