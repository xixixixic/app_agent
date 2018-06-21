export default {
    'mainPolicyInfo': { // 主险信息，要的不多，施舍给我吧QAQ
        'payIntv': '0', //  缴费期间  0,5,10,15,20
        'getYear': '',  // 祝寿金领取年龄
        'mainPremium': 0, // 主险保费
        'isBindPremium': 0  // 必选附加险保费
      },
      'insured': { // 被保人信息
        'idNo': '', // 证件号码
        'idType': '11', // 证件类型
        'birthday': '请选择出生日期', // 出生年月
        'sex': 1, // 性别
        'name': '', // 姓名
        'occupationCode': '', // 职业代码
        'relationId': '' // 与投保人关系
      },
      'policy': {
          'amount': 0, // 保额
          'msterState': '2', // 主附险标识 1主  2附
          'rateId': 0, // 费率id
          'productId': 0  // 产品id
        },
      'applicant': { // 投保人信息
        'idNo': '',
        'annualIncome': '', // 年收入
        'idType': '11',
        'birthday': '请选择出生日期',
        'sex': 1,
        'name': '',
        'occupationCode': ''
      }
}