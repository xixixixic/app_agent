export default {
    applicant: {
        'name': '',
        'sex': '1',
        'birthday': '',
        'cardType': '0',
        'cardNo': '',
        'iDValiDateType': '', // 证件有效期类型
        'iDValiDateTypeName': '',
        'iDValiDate': '', // 证件有效日期
        'showEffectiveDate': false,
        'nation': '',
        'edu': '',
        'marryState': '',
        'mobile': '', // 手机!
        'address': '', // 通讯地址
        'zipCode': '', // 通讯邮编
        'homeAddress': '', // 家庭地址
        'homeZipCode': '', // 家庭地址邮编
        'email': '',
        'jobCode': '',
        'grpName': '', // 工作单位名称
        'postalAddress': '', // 单位地址
        'position': '', // 职务内容
        'plurality': '', // 兼职
        'provinceName': '', // 现住址(省级)
        'cityName': '', // 现住址(市级)
        'countyName': '', // 现住址(县级)
        'streetName': '', // 现住址(街道)
        'provinceId': '',
        'cityId': '',
        'countyId': '',
        'provinceName2': '', // 单位/学校住址(省级)
        'cityName2': '', // 单位/学校住址(市级)
        'countyName2': '', // 单位/学校住址(县级)
        'streetName2': '', // 单位/学校现住址(街道)
        'province2Id': '', // (省级)id
        'city2Id': '', // (市级)id
        'county2Id': '', // (区级)id
        'taxResident': '',
        'taxResidentName': '',
        'sexName': '女',
        'nationName': '中国',
        'marryName': '',
        'jobName': '',
        'cardTypeName': '身份证',
        'taxBaseInfo': {}
    },
    insured: {
        'name': '',
        'sex': '1',
        'birthday': '',
        'cardType': '0',
        'cardNo': '',
        'iDValiDateType': '', // 证件有效期类型
        'iDValiDateTypeName': '',
        'iDValiDate': '', // 证件有效日期
        'showEffectiveDate': false,
        'nation': '',
        'edu': '',
        'marryState': '',
        'homeAddress': '', // 家庭地址
        'homeZipCode': '', // 家庭地址邮编
        'homePhone': '', // 家庭电话
        'mobile': '', // 手机!
        'email': '',
        'jobCode': '',
        'grpName': '', // 工作单位名称
        'postalAddress': '', // 单位地址
        'position': '', // 职务内容
        'plurality': '', // 兼职
        'relaToAppntCode': '', // 与投保人关系
        'provinceName': '', // 现住址(省级) name
        'cityName': '', // 现住址(市级)
        'countyName': '', // 现住址(县级)
        'streetName': '', // 现住址(街道)
        'provinceId': '', // 现住址(省级) id
        'cityId': '', // 现住址(市级) id
        'countyId': '',
        'provinceName2': '', // 单位/学校住址(省级)
        'cityName2': '', // 单位/学校住址(市级)
        'countyName2': '', // 单位/学校住址(县级)
        'streetName2': '', // 单位/学校现住址(街道)
        'province2Id': '', // (省级)id
        'city2Id': '', // (市级)id
        'county2Id': '', // (区级)id
        'taxResident': '',
        'taxResidentName': '',
        'sexName': '女',
        'nationName': '中国',
        'marryName': '',
        'jobName': '',
        'cardTypeName': '身份证',
        'taxBaseInfo': {}
    },
    areaList: [],
    jobList: [],
    relationList: [],
    nationList: [],
    cardTypeList: [],
    init: {},
    relationship: '',
    applicantJob: '',
    insuredJob: '',
    sgbenificiary: [], // 身故受益人列表,
    scbenificiary: [], // 生存受益人列表
    benificiary: {  // 受益人信息
        addBenifitBtn: false,
        addScBenifitBtn: false,
        sgBenifitStatus: false,
        scBenifitStatus: false,
        sgType: '',
        scType: '',
        benifitOrder: [],
        scIndexs: -1,
        sgIndexs: -1,
        sgAddIndexFlag: true,
        sgAddListFlag: true,
        scAddIndexFlag: true,
        scAddListFlag: true
    },
    benifitOrder: [
        {'name': '第一顺序', 'nativeCode': '1'}
    ],
    ApplicantTaxBaseInfo: { // 投保人税收居民信息
        lName: '', // 姓
        tName: '', // 名
        birthDate: '', // 出生日期
        inAddress: '', // 现居地址
        bornAddress: '', // 出生地
        identificationNum: '', // 税收居民国（地区）及纳税人识别号
        reason: '', // 不能提供居民国（地区）纳税人识别号原因
        reasonInfo: '', // reason为2-账户持有人未能取得纳税人识别号时必填
        autograph: '', // 签名人身份
        inAddressProvince: '', // 现居地址省
        inAddressCity: '', // 现居地址(市)
        inAddressCounty: '', // 现居地址(县)
        inAddressStreet: '', // 现居地址街道
        bornAddressProvince: '', // 出生地(省)
        bornAddressCity: '', // 出生地(市)
        bornAddressCounty: '', // 出生地(县)
        bornAddressStreet: '' // 出生地街道
    },
    InsuredTaxBaseInfo: { // 被保人税收居民信息
        lName: '', // 姓
        tName: '', // 名
        birthDate: '', // 出生日期
        inAddress: '', // 现居地址
        bornAddress: '', // 出生地
        identificationNum: '', // 税收居民国（地区）及纳税人识别号
        reason: '', // 不能提供居民国（地区）纳税人识别号原因
        reasonInfo: '', // reason为2-账户持有人未能取得纳税人识别号时必填
        autograph: '', // 签名人身份
        inAddressProvince: '', // 现居地址省
        inAddressCity: '', // 现居地址市
        inAddressCounty: '', // 现居地址县
        inAddressStreet: '', // 现居地址街道
        bornAddressProvince: '', // 出生地省
        bornAddressCity: '', // 出生地市
        bornAddressCounty: '', // 出生地县
        bornAddressStreet: '' // 出生地街道
    },
    ApplicantTaxBaseInfoShow: false,
    InsuredTaxBaseInfoShow: false,
    backStatus: false,
    externalCode: ''
}