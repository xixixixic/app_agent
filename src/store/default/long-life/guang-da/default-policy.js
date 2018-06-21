export default {
    'productName': '', // 產品名
    'productId': '', // 產品id
    'DicList': [], // 字典列表
    'insuredJob': '', // 被保人職業
    'mainPolicy': { // 主險計算保費返回信息
        'premium': 0, // 保费
        'rateId': 0, // 费率id 获取附加险参数用的到
        'code': '1' // 1正确  2错误  3异常
    },
    'fuPolicy': {},  // 返回附加險列表
    'premiumPeriodList': [
        {
            'id': '0',
            'value': '趸交'
        },
        {
            'id': '5',
            'value': '5年'
        },
        {
            'id': '10',
            'value': '10年'
        },
        {
            'id': '15',
            'value': '15年'
        },
        {
            'id': '20',
            'value': '20年'
        }
    ],
    'zhushouList': [
        {
            'id': '65',
            'value': '65岁'
        },
        {
            'id': '79',
            'value': '79岁'
        },
        {
            'id': '88',
            'value': '88岁'
        },
        {
            'id': '99',
            'value': '99岁'
        }
    ],
    'getZsList': [ // 祝寿金领取方式
        {
            'id': '0',
            'value': '趸领'
        },
        {
            'id': '12',
            'value': '年领'
        },
        {
            'id': '1',
            'value': '月领'
        }
    ],
    'selectFuPolicy': [], // 选中的附件险
    'tempAmount': 50000,  // 临时保费
    'temPay': '', // 临时缴费期间
    'tempYear': '', // 临时祝寿金领取
    'tempGetZsType': '', // 临时祝寿金领取
    'GetZsType': '', // 祝寿金领取方式
    'benifitTypeList': [ // 受益人类型
        {
            'id': '0',
            'value': '法定'
        },
        {
            'id': '1',
            'value': '指定'
        }
    ],
    'benifitOrderList': [ // 受益人顺序
        {
            'id': '1',
            'value': '第一受益人'
        }
    ],
    'scbenifitList': [ // 生存保证金给付方式
        {
            'id': '1',
            'value': '柜面领取'
        },
        {
            'id': '2',
            'value': '自动转账'
        }
    ],
    'apptTempBirth': '', // 投保人临时出生日期
    'apptTempSex': 0, // 投保人临时性别
    'apptTempCategories': 0, // 投保人临时职业类别
    'insuredTempBirth': '', // 被保人临时生日
    'insuredTempSex': 0, // 被保人临时性别
    'insuredTempCategories': 0, // 被保人临时职业类别
    'apptAge': 0, // 投保人年龄
    'pregDate': '', // 怀孕日期
    'appntAlladress': '', // 投保人地址
    'appntStree': '', // 投保人街道
    'appntCommunity': '', // 投保人社区
    'insuredAlladress': '', // 被保人完整地址
    'insuredStree': '', // 被保人街道
    'insuredCommunity': '' // 被保人社区

}