export default {
    'policy': {
        'agentCode': '',
        'cValiDate': '', // 保单生效日期
        'channel': '',
        'custInfo': {
            'appnt': { // 投保人
                'appOccupation': '', // 职业
                'appResFlag': '',
                'appntAvoirdupois': '', // 体重
                'appntBirthday': '', // 出生日期
                'appntCopy': '',
                'appntName': '', // 姓名
                'appntSex': '', // 性别
                'appntSign': '',
                'appntStature': '', // 身高
                'appntTaxInfo': { // 投保人税收对象
                    'birthCity': '', // 出生地市
                    'birthCountry': '', // 出生地国际
                    'birthProvince': '', // 出生地省
                    'taxIdentity': '', // 税收居民身份
                    'taxInfoList': {
                        'taxInfo': [{
                            'reasonCheck': '',
                            'reasonMessage': '',
                            'taxArea': '', // 税收居民国(地区)
                            'tin': '' // 居民国(地区) 纳税人编号
                        }]
                    }
                },
                'city': '', // 市
                // 'cityDesc': '',  // 市描述
                'community': '', // 社区
                'companyPhone': '',
                'companyPhoneCode': '',
                'county': '', // 区县
                // 'countyDesc': '', // 区县描述
                'email': '', // 电子邮件
                'familySalay': '', // 家庭年收入
                'grpName': '', // 工作单位
                'homePhone': '',
                'homePhoneCode': '',
                'idExpDate': '请选择证件有效期', // 证件有效期
                'idNo': '', // 证件号码
                'idType': '', // 证件类型
                'marriage': '', // 婚姻状况
                'mobile': '', // 手机
                'nativePlace': '', // 国籍
                'occupationCode': '', // 职业代码
                'occupationType': '', // 职业类别
                'postalAddress': '', // 联系地址
                'premBudget': '',
                'province': '', // 省
                // 'provinceDesc': '', // 省描述
                'residentType': '1', // 居民类型  1 城镇 2 非城镇
                'salary': '', // 年收入
                'street': '', // 街道
                'zipCode': '' // 邮政编码
            },
            'bnfInfo': { // 受益人信息
                'beneficiaries': {
                    'beneficiary': [],
                    'bfcyRemark': '',
                    'bnfCount': '0' // 受益人个数
                },
                'bnfType': '0' // 受益人类型 0 法定 1 指定
            },
            'insurants': {
                'insCount': '1', // 被保人个数
                'insurant': [{
                    'avoirdupois': '', // 体重
                    'birthday': '', // 生日
                    'city': '', // 市
                    // 'cityDesc': '', // 市描述
                    'community': '', // 社区
                    'companyPhone': '',
                    'companyPhoneCode': '',
                    'county': '', // 区县
                    // 'countyDesc': '', // 区县描述
                    'email': '', // 邮箱
                    'grpName': '', // 工作单位
                    'homePhone': '',
                    'homePhoneCode': '',
                    'idExpDate': '请选择证件有效期', // 证件有效期
                    'idNo': '', // 证件号码
                    'idType': '', // 证件类型
                    'insOccupation': '', // 职业
                    'insResFlag': '', // 告知项询问结果 1 是 0 否
                    'insSeq': '1', // 被保人序号
                    'insSign': '',
                    'insurantTaxInfo': { // 被保人税收对象
                        'birthCity': '', // 出生地市
                        'birthCountry': '', // 出生地国家
                        'birthProvince': '', // 出生地省
                        'taxIdentity': '', // 税收居民身份
                        'taxInfoList': { // 税收列表
                            'taxInfo': [{
                                'reasonCheck': '',
                                'reasonMessage': '',
                                'taxArea': '', // 税收居民国 (国家)
                                'tin': '' // 居民国(地区)纳税人编号
                            }]
                        }
                    },
                    'marriage': '', // 婚姻状况
                    'mobile': '', // 手机
                    'name': '', // 姓名
                    'nativePlace': '', // 国籍
                    'occupationCode': '', // 职业代码
                    'occupationType': '', // 职业等级
                    'postalAddress': '', // 联系地址
                    'province': '', // 省
                    // 'provinceDesc': '', // 省描述
                    'relToApp': '', // 与投保人关系
                    'salary': '', // 年收入
                    'sex': '', // 性别
                    'smokeFlag': '',
                    'stature': '', // 身高
                    'street': '', // 街道
                    'zipCode': '' // 邮政编码
                }]
            }
        },
        'deviceNo': '',
        'docByMyself': '',
        'docType': '',
        'docTypeInfo': {},
        'ftpHost': '',
        'ftpPort': '',
        'ftpUserName': '',
        'ftpUserPassword': '',
        'openId': '',
        'orderCode': '', // 订单号
        'photo': [{
            'pageNum': '1', // 单证页数
            'pages': {
                'page': [{
                    'imageName': '', // 影像文件名称
                    'pageCode': '', // 页吗
                    'path': '' // 路径
                }]
            },
            'subType': '' // 单证类型
        }],
        'policyInfo': {
            'acceAgentCode': '',
            'acceAgentName': '',
            'acceAgentRatio': '',
            'agencyCode': '',
            'agencyName': '',
            'agentCom': '',
            'agentComName': '',
            'agentReport': {
                'approachDes': '', // 投保途径详情 当投保途径选择 其他 时需要传入值
                'approachList': [
                    // {'approach': '0'}
                ],
                'purposeDes': '',
                'purposeList': [
                    // {'purpose': '0'} // 投保目的, 可重复(1个或多个)
                ]
            },
            'agentSign': '',
            'annualIncome': '', // 年收入
            'checkDate': '',
            'checkSign': '',
            'dataType': '',
            'empowerType': '',
            'isEmpower': '',
            'isExplain': '',
            'isReadItem': '',
            'letterPostFlag': '',
            'polApplyDate': '',
            'privateBank': '',
            'prtNo': '', // 投保单号
            'sAccountName': '', // 生存保证金户名
            'sBankName': '', // 生存金的银行名称
            'sBankNo': '', // 生存金的账号
            'sPaySlt': '1', // 生存保证金给付勾选项  1 柜面领取 2 自动转账
            'salesCode': '',
            'salesMan': '',
            'servAgentCode': '',
            'servAgentName': '',
            'servAgentRatio': '',
            'sourceOfIncome': '', // 年收入来源
            'teller': '',
            'tellerCode': '',
            'thirdPtAddr': '',
            'thirdPtContact': '',
            'thirdPtIdentity': '',
            'thirdPtName': '',
            'thirdPtRelToApp': '',
            'thirdPtRemark': '',
            'totalAssets': ''  // 总资产
        },
        'productInfo': {
            'autoPayFlag': '',  // 逾期未付选择权 (不用填)
            'bankAccName': '', // 银行扣款户名
            'bankAccNo': '', // 银行账户(投保人)
            'bankCode': '', // 银行代码
            'bonusGetMode': '',
            'getDutyKind': '0',
            'getYear': '', // 年金领取年龄
            'getYears': '0', // 年金领取方式 0趸领 12 年领 1 月领
            'getYearsMQ': '', // 满期金领取方式 提供字典(不填)
            'invAccRatios': {
                'invAccRatio': [{
                    'insuAccNo': '',
                    'investRate': ''
                }]
            },
            'newPayMode': '',
            'payIntv': '', // 缴费区间
            'planSumPremL': '',
            'products': {
                // 'prodCount': '2', // 产品个数
                // 'product': [{
                //     'amnt': '200000.0', // 保额
                //     'insureYear': '106', // 保险期间
                //     'insureYearFlag': 'A', // 保险期间标识 A岁 Y年
                //     'isMaster': '0', // 主副险标识 1 主险 0 附加险
                //     'minPlanPrem': '',
                //     'payYear': '1000', // 交费期限
                //     'payYearFlag': 'Y', // 交费期限标识
                //     'prem': '46720.0', // 保费
                //     'prodCode': 'LBT028', // 险种代码
                //     'prodInsSeq': '',
                //     'prodName': '光大永明吉瑞宝两全寿险', // 险种名称
                //     'localProductId': '1237', // 险种产品id
                //     'localRateId': '18999' // 费率id
                // }, {
                //     'amnt': '200000.0',
                //     'insureYear': '106',
                //     'insureYearFlag': 'A',
                //     'isMaster': '1',
                //     'minPlanPrem': '',
                //     'payYear': '1000',
                //     'payYearFlag': 'Y',
                //     'prem': '62760.0',
                //     'prodCode': 'HCT007',
                //     'prodInsSeq': '',
                //     'prodName': '光大永明-附加吉瑞宝重大疾病保险',
                //     'localProductId': '1238',
                //     'localRateId': '18998'
                // }]
            },
            'rnewFlag': '',
            'sumPremL': '' // 首期保费合计
        },
        'question': {
            'resQuestion': {
                'fetationDate': '',
                'resRemark': [{
                    'questionNo': '1',
                    'questionRemark': '170/70',
                    'resCustCode': '1'
                }]
            }
        }
    }
}