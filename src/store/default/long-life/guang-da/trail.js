export default {
    'policy': {
        'agentCode': '',
        'cValiDate': '2017-12-07 21:31:02', // 保单生效日期
        'channel': '',
        'custInfo': {
            'appnt': { // 投保人
                'appOccupation': '党政机关、企事业单位负责人和行政管理人员', // 职业
                'appResFlag': '',
                'appntAvoirdupois': '70', // 体重
                'appntBirthday': '1977-04-01', // 出生日期
                'appntCopy': '',
                'appntName': '李萌萌', // 姓名
                'appntSex': '1', // 性别
                'appntSign': '',
                'appntStature': '170', // 身高
                'appntTaxInfo': { // 投保人税收对象
                    'birthCity': '110100', // 出生地市
                    'birthCountry': 'CHN', // 出生地国际
                    'birthProvince': '110000', // 出生地省
                    'taxIdentity': '1', // 税收居民身份
                    'taxInfoList': {
                        'taxInfo': [{
                            'reasonCheck': '',
                            'reasonMessage': '',
                            'taxArea': 'CHN', // 税收居民国(地区)
                            'tin': '1100001' // 居民国(地区) 纳税人编号
                        }]
                    }
                },
                'city': '110100', // 市
                'cityDesc': '市辖区',  // 市描述
                'community': '北京市北京市延庆区花园桥', // 社区
                'companyPhone': '',
                'companyPhoneCode': '',
                'county': '110119', // 区县
                'countyDesc': '延庆区', // 区县描述
                'email': '1234599@qq.com', // 电子邮件
                'familySalay': '1000000.0', // 家庭年收入
                'grpName': '金诚', // 工作单位
                'homePhone': '',
                'homePhoneCode': '',
                'idExpDate': '9999-12-31', // 证件有效期
                'idNo': '110101197704019981', // 证件号码
                'idType': '11', // 证件类型
                'marriage': '20', // 婚姻状况
                'mobile': '17611111111', // 手机
                'nativePlace': 'CHN', // 国籍
                'occupationCode': '0001001', // 职业代码
                'occupationType': '1', // 职业类别
                'postalAddress': '北京市北京市延庆区花园桥', // 联系地址
                'premBudget': '',
                'province': '110000', // 省
                'provinceDesc': '北京市', // 省描述
                'residentType': '1', // 居民类型  1 城镇 2 非城镇
                'salary': '1000000.0', // 年收入
                'street': '北京市北京市延庆区花园桥', // 街道
                'zipCode': '100000' // 邮政编码
            },
            'bnfInfo': { // 受益人信息
                'beneficiaries': {
                    'beneficiary': [{
                        'bfcyLevel': '1', // 受益顺序
                        'bfcyName': '李四', // 姓名
                        'bfcySex': '1', // 性别
                        'bfcyBirthday': '1994-04-01', // 出生日期
                        'bfcyIdType': '11', // 证件类型
                        'bfcyIdCode': '421820199404010001', // 证件号码
                        'bfcyIdExpDate': '9999-01-01', // 证件有效期
                        'relToIns': '38', // 与投保人关系
                        'bfcyRatio': '100', // 受益比例
                        'belongWith': '1' // 隶属第几被保人
                    }],
                    'bfcyRemark': '',
                    'bnfCount': '1' // 受益人个数
                },
                'bnfType': '1' // 受益人类型 0 法定 1 指定
            },
            'insurants': {
                'insCount': '1', // 被保人个数
                'insurant': [{
                    'avoirdupois': '70', // 体重
                    'birthday': '1977-04-01', // 生日
                    'city': '110100', // 市
                    'cityDesc': '市辖区', // 市描述
                    'community': '北京市北京市延庆区花园桥', // 社区
                    'companyPhone': '',
                    'companyPhoneCode': '',
                    'county': '110119', // 区县
                    'countyDesc': '延庆区', // 区县描述
                    'email': '1234599@qq.com', // 邮编
                    'grpName': '金诚', // 工作单位
                    'homePhone': '',
                    'homePhoneCode': '',
                    'idExpDate': '9999-12-31', // 证件有效期
                    'idNo': '110101197704019981', // 证件号码
                    'idType': '11', // 证件类型
                    'insOccupation': '党政机关、企事业单位负责人和行政管理人员', // 职业
                    'insResFlag': '0', // 告知项询问结果 1 是 0 否
                    'insSeq': '1', // 被保人序号
                    'insSign': '',
                    'insurantTaxInfo': { // 被保人税收对象
                        'birthCity': '110100', // 出生地市
                        'birthCountry': 'CHN', // 出生地国家
                        'birthProvince': '110000', // 出生地省
                        'taxIdentity': '1', // 税收居民身份
                        'taxInfoList': { // 税收列表
                            'taxInfo': [{
                                'reasonCheck': '',
                                'reasonMessage': '',
                                'taxArea': 'CHN', // 税收居民国 (地区)
                                'tin': '1100001' // 居民国(地区)纳税人编号
                            }]
                        }
                    },
                    'marriage': '20', // 婚姻状况
                    'mobile': '17611111111', // 手机
                    'name': '李萌萌', // 姓名
                    'nativePlace': 'CHN', // 国籍
                    'occupationCode': '0001001', // 职业代码
                    'occupationType': '1', // 职业等级
                    'postalAddress': '北京市北京市延庆区花园桥', // 联系地址
                    'province': '110000', // 省
                    'provinceDesc': '北京市', // 省描述
                    'relToApp': '00', // 与投保人关系
                    'salary': '1000000.0', // 年收入
                    'sex': '1', // 性别
                    'smokeFlag': '',
                    'stature': '170', // 身高
                    'street': '北京市北京市延庆区花园桥', // 街道
                    'zipCode': '100000' // 邮政编码
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
        'orderCode': 'JC1700007080030811', // 订单号
        'photo': [{
            'pageNum': '1', // 单证页数
            'pages': {
                'page': [{
                    'imageName': '00f77b97cc664c1d96af082bb49c9261.gif', // 影像文件名称
                    'pageCode': '1', // 页吗
                    'path': '/zjdjst/etibApp/insure/2017/12/07/' // 路径
                }]
            },
            'subType': '820' // 单证类型
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
                'approachDes': 'intermediary', // 投保途径详情 当投保途径选择 其他 时需要传入值
                'approachList': [{
                    'approach': '6' // 投保途径 可重复 (1个或多个)
                }],
                'purposeDes': '',
                'purposeList': [{
                    'purpose': '0' // 投保目的, 可重复(1个或多个)
                }]
            },
            'agentSign': '',
            'annualIncome': '1000000.0', // 年收入
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
            'prtNo': 'M140550371548888', // 投保单号
            'sAccountName': '张三', // 生存保证金户名
            'sBankName': '张三', // 生存金的银行名称
            'sBankNo': '623012341234123', // 生存金的账号
            'sPaySlt': '1', // 生存保证金给付勾选项  1 柜面领取 2 自动转账
            'salesCode': '',
            'salesMan': '',
            'servAgentCode': '',
            'servAgentName': '',
            'servAgentRatio': '',
            'sourceOfIncome': '01', // 年收入来源
            'teller': '',
            'tellerCode': '',
            'thirdPtAddr': '',
            'thirdPtContact': '',
            'thirdPtIdentity': '0', // 第三方识别 1 是 0 否 2 无法识别 默认否
            'thirdPtName': '',
            'thirdPtRelToApp': '',
            'thirdPtRemark': '',
            'totalAssets': '10000000.0'  // 总资产
        },
        'productInfo': {
            'autoPayFlag': '0',  // 逾期未付选择权 209
            'bankAccName': '李萌萌', // 银行扣款户名
            'bankAccNo': '6212261502000727944', // 银行账户(投保人)
            'bankCode': '102', // 银行代码
            'bonusGetMode': '',
            'getDutyKind': '',
            'getYear': '99', // 年金领取年龄
            'getYears': '0', // 年金领取方式 0趸领 12 年领 1 月领
            'getYearsMQ': '0', // 满期金领取方式 提供字典
            'invAccRatios': {
                'invAccRatio': [{
                    'insuAccNo': '',
                    'investRate': ''
                }]
            },
            'newPayMode': '',
            'payIntv': '0', // 缴费区间
            'planSumPremL': '',
            'products': {
                'prodCount': '2', // 产品个数
                'product': [{
                    'amnt': '200000.0', // 保额
                    'insureYear': '106', // 保险期间
                    'insureYearFlag': 'A', // 保险期间标识 A岁 Y年
                    'isMaster': '0', // 主副险标识 1 主险 0 附加险
                    'minPlanPrem': '',
                    'payYear': '1000', // 交费期限
                    'payYearFlag': 'Y', // 交费期限标识
                    'prem': '46720.0', // 保费
                    'prodCode': 'LBT028', // 险种代码
                    'prodInsSeq': '',
                    'prodName': '光大永明吉瑞宝两全寿险', // 险种名称
                    'localProductId': '1237', // 险种产品id
                    'localRateId': '18999' // 费率id
                }, {
                    'amnt': '200000.0',
                    'insureYear': '106',
                    'insureYearFlag': 'A',
                    'isMaster': '1',
                    'minPlanPrem': '',
                    'payYear': '1000',
                    'payYearFlag': 'Y',
                    'prem': '62760.0',
                    'prodCode': 'HCT007',
                    'prodInsSeq': '',
                    'prodName': '光大永明-附加吉瑞宝重大疾病保险',
                    'localProductId': '1238',
                    'localRateId': '18998'
                }]
            },
            'rnewFlag': '',
            'sumPremL': '109480.0' // 首期保费合计
        },
        'question': {
            'resQuestion': {
                'fetationDate': '',
                'resRemark': [{
                    'questionNo': '',
                    'questionRemark': '',
                    'resCustCode': ''
                }]
            }
        }
    }
}