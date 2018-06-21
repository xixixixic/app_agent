export default {
    bankInfo: {
        'insPolicyNo': '', // 投保确认书号
        'tradeNo': '', // 	交易串号
        'bank': '', // 开户银行
        'bankAccName': '', // 账户名（默认为投保人）
        'bankAccNo': '', // 账户号
        'beneBank': '', // 受益人开户银行
        'beneBankAccName': '', // 受益人账户名
        'beneBankAccNo': '', // 受益人账户号
        'aliveGetMode': 'N', // 生存金转账授权， 默认为不授权并且不能修改
        'isReInsurance': '', // 一年期内附加险是否自动续保
        'treatmentOfInsurance': '', // 溢交保险费处理方式
        'optionOfInsurance': '', // 保险费逾期未付的选择
        'bankRealName': '',
        'beneBankRealName': '',
        'isReInsuranceRealName': '',
        'yiJiaoRealName': '',
        'unPayRealName': '',
        'liveMoneyRealName': '' // 生存金转账授权
    },
    init: {},
    btnFlag: false  // 申请按钮置灰
}