import * as types from './mutation-types.js'
import {saveState, getState, clearState, clearChangChengBaseInfoState} from 'common/js/cache.js'
import {setBenren, setOther, setGdBenren, setGdOther, setTrailBenren} from './set-benren/life/set-insured-info.js'
import defaultBeneficiary from './default/life/default-beneficiary.js'
import defaultFupolicyList from './default/long-life/chang-cheng/fu-policy-info.js'
import defaultChangChengSgBenificiary from './default/long-life/chang-cheng/sg-benifit-list.js'
import defaultChangChengScBenificiary from './default/long-life/chang-cheng/sc-benifit-list.js'
import defaultGDBeneficiary from './default/long-life/guang-da/default-beneficiary'
import {clone} from 'common/js/clone-util.js'
const mutations = {
    [types.SET_TOKEN] (state, value) {
        state.token = value
        saveState(state)
    },
    [types.SET_WEBSTATUS] (state, value) {
        state.webStatus = value
        saveState(state)
    },
    [types.SET_INIT] (state) {
        getState(state)
    },
    [types.SET_REMOVE_LIFE] (state) {
        clearState(state)
    },
    [types.SET_REMOVE_CHANGCHENG_BASE_INFO] (state) {
        clearChangChengBaseInfoState(state)
    },
    [types.SET_LIFE_PRODUCTINFO_NEXT] (state, paramObj) {
        for (let param of paramObj) {
            let obj = {
                productId: param.rate.productId, // 产品id
                planId: param.rate.liabilityCoverageId, // 计划id
                insuranceRateId: param.rate.insuranceRateId, // 费率id
                number: 1, // 份数
                premium: param.rate.premium * param.multiple, // 保费
                amount: param.rate.sumInsured * param.multiple, // 保额
                masterStat: param.masterStat, // 主附险标识
                insuranceRate: param.rate, // 费率
                productNew: param.productNew // 产品
            }
            state.life.policy.policyViceExtList = [obj]
        }
        saveState(state)
    },
    [types.SET_LIFE_INSUREINFO] (state, insureInfo) {
        state.life.insuranceRules = insureInfo
        saveState(state)
    },
    [types.SET_LIFE_POLICYINFO] (state, param) {
        let field1 = param.field1
        let field2 = param.field2
        let value = param.value
        let pos = null
        let field1Arr = field1.split('#')
        if (field1Arr.length === 2) {
            field1 = field1Arr[0]
            pos = Number(field1Arr[1])
        }
        if (field2 !== undefined) {
            if (pos === null) {
                state.life.policy[field1][field2] = value
            } else {
                state.life.policy[field1][pos][field2] = value
            }
        } else {
            state.life.policy[field1] = value
        }
        saveState(state)
    },
    [types.SET_LIFE_INSURED_BENREN] (state) {
        setBenren(state.life.policy)
        saveState(state)
    },
    [types.SET_LIFE_INSURED_OTHER] (state) {
        setOther(state.life.policy)
        saveState(state)
    },
    [types.SET_ADD_LIFE_BENEFITCIARY] (state) {
        if (state.life.policy.beneficiaryList.length > 2) return false
        state.life.policy.beneficiaryList.push(clone(defaultBeneficiary))
        saveState(state)
    },
    [types.SET_DELETE_LIFE_BENEFITCIARY] (state, item) {
        for (let i = 0; i < state.life.policy.beneficiaryList.length; i++) {
            if (state.life.policy.beneficiaryList[i] === item) {
                state.life.policy.beneficiaryList.splice(i, 1)
                saveState(state)
                return
            }
        }
    },
    // 都邦投保人被保人信息
    [types.SET_CAR_DUBANG_TOUBEIBAOREN] (state, param) {
        let field1 = param.field1
        let field2 = param.field2
        let value = param.value
        if (field2 !== undefined) {
            state.car.dubang.duCarTouBeiBaoRen[field1][field2] = value
        } else {
            state.car.dubang.duCarTouBeiBaoRen[field1] = value
        }
        saveState(state)
    },
    // 都邦车辆和车主信息
    [types.SET_CAR_DUBANG_CARINFO_OWNER] (state, param) {
        let field1 = param.field1
        let field2 = param.field2
        let value = param.value
        if (field2 !== undefined) {
                 state.car.dubang.duCarInfoOwner[field1][field2] = value
        } else {
            state.car.dubang.duCarInfoOwner[field1] = value
        }
        saveState(state)
    },
    // 都邦车辆配置
    [types.SET_CAR_DUBANG_CONFIG] (state, data) {
        state.duCarConfig = data
        saveState(state)
    },
    // 都邦税率计算
    [types.SET_CAR_DUBANG_PREMIUM] (state, param) {
        let field1 = param.field1
        let pos = null
        let field1Arr = field1.split('#')
        if (field1Arr.length === 2) {
            field1 = field1Arr[0]
            pos = Number(field1Arr[1])
        }
        let field2 = param.field2
        let value = param.value
        if (field2 !== undefined) {
             if (pos === null) {
                 state.car.dubang.duCarPremium[field1][field2] = value
             } else {
                 if (!state.car.dubang.duCarPremium[field1][pos]) {
                    state.car.dubang.duCarPremium[field1][pos] = {
                        'kindCode': '',
                        'kindName': '',
                        'modeCode': '',
                        'quantity': '',
                        'model': '否',
                        'value': '',
                        'unitAmount': '',
                        'amount': '不投保',
                        'rate': ''
                    }
                 }
                 state.car.dubang.duCarPremium[field1][pos][field2] = value
             }
        } else {
            state.car.dubang.duCarPremium[field1] = value
        }
        saveState(state)
    },
    // 都邦保费计算结果展示
    [types.SET_CAR_DUBANG_PREMIUMFORM] (state, param) {
        let field1 = param.field1
        let pos = null
        let field1Arr = field1.split('#')
        if (field1Arr.length === 2) {
            field1 = field1Arr[0]
            pos = Number(field1Arr[1])
        }
        let field2 = param.field2
        let value = param.value
        if (field2 !== undefined) {
             if (pos === null) {
                 state.car.dubang.duCarPremiumForm[field1][field2] = value
             } else {
                if (!state.car.dubang.duCarPremiumForm[field1][pos]) {
                    state.car.dubang.duCarPremiumForm[field1][pos] = {
                        'amount': '',
                        'benchMarkPremium': '',
                        'kindName': ''
                    }
                 }
                 state.car.dubang.duCarPremiumForm[field1][pos][field2] = value
             }
        } else {
            state.car.dubang.duCarPremiumForm[field1] = value
        }
        saveState(state)
    },
    // 都邦订单单号信息
    [types.SET_CAR_DUBANG_ORDERPASS] (state, param) {
        let field1 = param.field1
        let value = param.value
        state.car.dubang.duCarOrder[field1] = value
        saveState(state)
    },
    // 天安车主车辆信息
    [types.SET_CAR_TIANAN_CARINFO] (state, param) {
        let field1 = param.field1
        let field2 = param.field2
        let value = param.value
        if (field2 !== undefined) {
            state.car.tianan.tianCarInfo[field1][field2] = value
        } else {
            state.car.tianan.tianCarInfo[field1] = value
        }
        saveState(state)
    },
    // 天安车辆配置
    [types.SET_CAR_TIANAN_CONFIG] (state, data) {
        state.tianCarConfig = data
        saveState(state)
    },
    // 天安车辆里程数，行驶区域等保险信息
    [types.SET_CAR_TIANAN_INSURANCEINFO] (state, param) {
        let field1 = param.field1
        let field2 = param.field2
        let value = param.value
        state.car.tianan.tianCarInsuranceInfo[field1][field2] = value
        saveState(state)
    },
    // 天安计算保费
    [types.SET_CAR_TIANAN_PREMIUM] (state, param) {
        let field1 = param.field1
        let pos = null
        let field1Arr = field1.split('#')
        if (field1Arr.length === 2) {
            field1 = field1Arr[0]
            pos = Number(field1Arr[1])
        }
        let field2 = param.field2
        let value = param.value
        if (field2 !== undefined) {
             if (pos === null) {
                state.car.tianan.tianCarPremium[field1][field2] = value
             } else {
                if (field1 === 'ItemKindRequestDto') {
                   if (!state.car.tianan.tianCarPremium[field1][pos]) {
                    state.car.tianan.tianCarPremium[field1][pos] = {
                            'kindCode': '', // 险别代码
                            'kindName': '', // 险别名称
                            'quantity': '', //  数量
                            'unitAmount': '', // 单位保额
                            'amount': '不投保', // 保险金额/赔偿限额
                            'deductableFlag': '0', // 是否投保不计免赔
                            'valueType': '' // 投保单独玻璃险标识
                        }
                    }
                } else if (field1 === 'pageShow') {
                    if (!state.car.tianan.tianCarPremium[field1][pos]) {
                        state.car.tianan.tianCarPremium[field1][pos] = {
                            'toubao': ''
                        }
                    }
                }
                state.car.tianan.tianCarPremium[field1][pos][field2] = value
             }
        } else {
            state.car.tianan.tianCarPremium[field1] = value
        }
        saveState(state)
    },
    // 天安保费计算结果展示
    [types.SET_CAR_TIANAN_PREMIUMFORM] (state, param) {
        let field1 = param.field1
        let value = param.value
        state.car.tianan.tianCarPremiumForm[field1] = value
        saveState(state)
    },
    // 天安投保人被保人信息
    [types.SET_CAR_TIANAN_INSURED_APPLICANT] (state, param) {
        let field1 = param.field1
        let field2 = param.field2
        let value = param.value
        if (field2 !== undefined) {
            state.car.tianan.tianCarInsuredAndApplicant[field1][field2] = value
        } else {
            state.car.tianan.tianCarInsuredAndApplicant[field1] = value
        }
        saveState(state)
    },
    // 天安收件人
    [types.SET_CAR_TIANAN_RECIPIENT] (state, param) {
        let field1 = param.field1
        let field2 = param.field2
        let value = param.value
        if (field2 !== undefined) {
            state.car.tianan.tianCarRecipient[field1][field2] = value
        } else {
            state.car.tianan.tianCarRecipient[field1] = value
        }
        saveState(state)
    },
    // 天安订单单号信息
    [types.SET_CAR_TIANAN_ORDERPASS] (state, param) {
        let field1 = param.field1
        let value = param.value
        state.car.tianan.tianCarOrder[field1] = value
        saveState(state)
    },
    // 长城基本信息
    [types.SET_LONGLIFE_CHANGCHENG_BASEINFO] (state, param) {
        let field1 = param.field1
        let field2 = param.field2
        let value = param.value
        let pos = null
        let field1Arr = field1.split('#')
        if (field1Arr.length === 2) {
            field1 = field1Arr[0]
            pos = Number(field1Arr[1])
        }
        if (field2 !== undefined) {
            if (pos === null) {
                state.longLife.changCheng.changChengBaseInfo[field1][field2] = value
            } else {
                state.longLife.changCheng.changChengBaseInfo[field1][pos][field2] = value
            }
        } else {
            state.longLife.changCheng.changChengBaseInfo[field1] = value
        }
        saveState(state)
    },
    // 长城主险附险信息
    [types.SET_LONGLIFE_CHANGCHENG_POLICYINFO] (state, param) {
        let field1 = param.field1
        let field2 = param.field2
        let value = param.value
        let pos = null
        let field1Arr = field1.split('#')
        if (field1Arr.length === 2) {
            field1 = field1Arr[0]
            pos = Number(field1Arr[1])
        }
        if (field2 !== undefined) {
            if (pos === null) {
                state.longLife.changCheng.changChengPolicyInfo[field1][field2] = value
            } else {
                state.longLife.changCheng.changChengPolicyInfo[field1][pos][field2] = value
            }
        } else {
            state.longLife.changCheng.changChengPolicyInfo[field1] = value
        }
        saveState(state)
    },
    // 添加长城附加险
    [types.SET_ADD_CHANGCHENG_FUPOLICYINFO] (state) {
        // if (state.longLife.changCheng.changChengFuPolicyInfo.length > 2) return false
        state.longLife.changCheng.changChengPolicyInfo.fuPolicy.push(clone(defaultFupolicyList))
        saveState(state)
    },
    // 删除长城附加险
    [types.SET_DELETE_CHANGCHENG_FUPOLICYINFO] (state, item) {
        for (let i = 0; i < state.longLife.changCheng.changChengPolicyInfo.fuPolicy.length; i++) {
            if (state.longLife.changCheng.changChengPolicyInfo.fuPolicy[i] === item) {
                state.longLife.changCheng.changChengPolicyInfo.fuPolicy.splice(i, 1)
                saveState(state)
                return
            }
        }
    },
    // 添加长城身故受益人
    [types.SET_ADD_CHANGCHENG_SGBENIFIT] (state) {
        // if (state.longLife.changCheng.changChengFuPolicyInfo.length > 2) return false
        state.longLife.changCheng.changChengBaseInfo.sgbenificiary.push(clone(defaultChangChengSgBenificiary))
        saveState(state)
    },
    // 删除长城身故受益人
    [types.DELETE_CHANGCHENG_SGBENIFIT] (state, index) {
        for (let i = 0; i < state.longLife.changCheng.changChengBaseInfo.sgbenificiary.length; i++) {
                state.longLife.changCheng.changChengBaseInfo.sgbenificiary.splice(index, 1)
                saveState(state)
                return
            // }
        }
    },
    // 添加长城生存受益人
    [types.SET_ADD_CHANGCHENG_SCBENIFIT] (state) {
        // if (state.longLife.changCheng.changChengFuPolicyInfo.length > 2) return false
        state.longLife.changCheng.changChengBaseInfo.scbenificiary.push(clone(defaultChangChengScBenificiary))
        saveState(state)
    },
    [types.DELETE_CHANGCHENG_SCBENIFIT] (state, index) {
        for (let i = 0; i < state.longLife.changCheng.changChengBaseInfo.scbenificiary.length; i++) {
                state.longLife.changCheng.changChengBaseInfo.scbenificiary.splice(index, 1)
                saveState(state)
                return
        }
    },
    // 长城转账信息
    [types.SET_LONGLIFE_CHANGCHENG_BANKDETAIL] (state, param) {
        let field1 = param.field1
        let field2 = param.field2
        let value = param.value
        if (field2 !== undefined) {
            state.longLife.changCheng.changChengBankDetail[field1][field2] = value
        } else {
            state.longLife.changCheng.changChengBankDetail[field1] = value
        }
        saveState(state)
    },
    // 长城上传证件
    [types.SET_LONGLIFE_CHANGCHENG_CERTIFICATEPIC] (state, param) {
        let field1 = param.field1
        let field2 = param.field2
        let value = param.value
        let pos = null
        let field1Arr = field1.split('#')
        if (field1Arr.length === 2) {
            field1 = field1Arr[0]
            pos = Number(field1Arr[1])
        }
        if (field2 !== undefined) {
            if (pos === null) {
                state.longLife.changCheng.changChengCertificePic[field1][field2] = value
            } else {
                state.longLife.changCheng.changChengCertificePic[field1][pos][field2] = value
            }
        } else {
            state.longLife.changCheng.changChengCertificePic[field1] = value
        }
        saveState(state)
    },
    // 存储告知项信息
    [types.SET_HEALTH_POLICY] (state, param) {
        let type = param.type
        let value = param.value
        if (type === 1) {
            state.longLife.changCheng.changchengHealthPolicy.insuredNoticeInfo.push(value)
        } else if (type === 2) {
            state.longLife.changCheng.changchengHealthPolicy.appntNoticeInfo.push(value)
        } else {
            state.longLife.changCheng.changchengHealthPolicy.insuredNoticeInfo.push(value)
            state.longLife.changCheng.changchengHealthPolicy.appntNoticeInfo.push(value)
        }
        saveState(state)
    },
    // 删除告知项信息
    [types.DELETE_HEALTH_POLICY] (state, param) {
        let type = param.type
        let code = param.value.code
        if (type === 1) {
            let list = state.longLife.changCheng.changchengHealthPolicy.insuredNoticeInfo
            for (let i = 0; i < list.length; i++) {
                if (list[i].code === code) {
                    state.longLife.changCheng.changchengHealthPolicy.insuredNoticeInfo.splice(i, 1)
                }
            }
        } else if (type === 2) {
            let list = state.longLife.changCheng.changchengHealthPolicy.appntNoticeInfo
            for (let i = 0; i < list.length; i++) {
                if (list[i].code === code) {
                    state.longLife.changCheng.changchengHealthPolicy.appntNoticeInfo.splice(i, 1)
                }
            }
        } else {
            let list = state.longLife.changCheng.changchengHealthPolicy.insuredNoticeInfo
            let list1 = state.longLife.changCheng.changchengHealthPolicy.appntNoticeInfo
            for (let i = 0; i < list.length; i++) {
                if (list[i].code === code) {
                    state.longLife.changCheng.changchengHealthPolicy.insuredNoticeInfo.splice(i, 1)
                }
            }
            for (let i = 0; i < list1.length; i++) {
                if (list1[i].code === code) {
                    state.longLife.changCheng.changchengHealthPolicy.appntNoticeInfo.splice(i, 1)
                }
            }
        }
        saveState(state)
    },
    [types.SET_HEALTH_POLICY_SHOW] (state, param) {
        let field1 = param.field1
        let field2 = param.field2
        let value = param.value
        let pos = null
        let field1Arr = field1.split('#')
        if (field1Arr.length === 2) {
            field1 = field1Arr[0]
            pos = Number(field1Arr[1])
        }
        if (field2 !== undefined) {
            if (pos === null) {
                state.longLife.changCheng.changchengHealthPolicy[field1][field2] = value
            } else {
                state.longLife.changCheng.changchengHealthPolicy[field1][pos][field2] = value
            }
        } else {
            state.longLife.changCheng.changchengHealthPolicy[field1] = value
        }
        saveState(state)
    },
    // 存儲告知項code信息
    [types.SET_HEALTH_CODE] (state, param) {
        let type = param.type
        let data = param.data
            if (type === 1) {
                data.iselectcode = data.code
            } else if (type === 2) {
                data.aselectcode = data.code
            } else {
                data.iselectcode = data.num
            }
        saveState(state)
    },
    // 刪除告知項code信息
    [types.DELETE_HEALTH_CODE] (state, param) {
        let type = param.type
        let data = param.data
        if (type === 1) {
            data.iselectcode = ''
        } else if (type === 2) {
            data.aselectcode = ''
        } else {
            data.iselectcode = ''
        }
        saveState(state)
    },
    // 緩存告知項輸入框信息
    [types.SET_HEALTH_INPUT] (state, param) {
        let insured = param.insured
        let applicant = param.applicant
        let baby = param.baby
        let flag = param.flag
        if (flag === 1) {
            state.longLife.changCheng.changchengHealthDefault.insured = insured
            state.longLife.changCheng.changchengHealthDefault.applicant = applicant
            state.longLife.changCheng.changchengHealthDefault.baby = baby
            state.longLife.changCheng.changchengHealthDefault.flag = flag
        }
        saveState(state)
    },
     // 存储光大下拉列表
     [types.SET_GUANGDA_DIC] (state, param) {
        let value = param.value
        state.longLife.guangda.guangdaPolicy.DicList = value
        saveState(state)
    },
    // 存储光大信息
    [types.SET_LONGLIFE_GUANGDA_POLICYINFO] (state, param) {
        console.log('cuncuxiaoxi')
        console.log(param)
        let field1 = param.field1
        let field2 = param.field2
        let field3 = param.field3
        let field4 = param.field4
        let value = param.value
        let type = param.type // type 1 副险算费  2 主险算费  3 保费试算 4 核保信息 else 接口返回
        if (field4 !== undefined) {
            let pos = null
            let field2Arr = field2.split('#')
            if (field2Arr.length === 2) {
                field2 = field2Arr[0]
                pos = Number(field2Arr[1])
            }
            if (type === 4) {
                if (field1 === 'insurants') {
                    state.longLife.guangda.guangdaTrail.policy.custInfo[field1][field2][pos][field3][field4] = value
                }
            }
        } else if (field3 !== undefined) {
            let pos = null
            let field2Arr = field2.split('#')
            if (field2Arr.length === 2) {
                field2 = field2Arr[0]
                pos = Number(field2Arr[1])
            }
            if (type === 4) {
                if (field1 === 'insurants') {
                    state.longLife.guangda.guangdaTrail.policy.custInfo[field1][field2][pos][field3] = value
                } else if (field1 === 'appnt') {
                    state.longLife.guangda.guangdaTrail.policy.custInfo[field1][field2][field3] = value
                } else if (field1 === 'bnfInfo') {
                    state.longLife.guangda.guangdaTrail.policy.custInfo[field1][field2][field3] = value
                } else {
                    state.longLife.guangda.guangdaTrail.policy[field1][field2][field3] = value
                }
            }
        } else if (field2 !== undefined) {
                if (type === 1) {
                    state.longLife.guangda.guangdaPremiumRisk[field1][field2] = value
                } else if (type === 2) {
                    state.longLife.guangda.guangdaMainRisk[field1][field2] = value
                } else if (type === 3) {
                    state.longLife.guangda.guangdaRiskPolicy[field1][field2] = value
                } else if (type === 4) {
                    if (field1 === 'appnt') {
                        state.longLife.guangda.guangdaTrail.policy.custInfo[field1][field2] = value
                    } else if (field1 === 'bnfInfo') {
                        let index = param.index
                            if (index !== undefined) {
                                state.longLife.guangda.guangdaTrail.policy.custInfo.bnfInfo.beneficiaries.beneficiary[index][field2] = value
                            } else {
                                state.longLife.guangda.guangdaTrail.policy.custInfo[field1][field2] = value
                            }
                    } else {
                        state.longLife.guangda.guangdaTrail.policy[field1][field2] = value
                    }
                } else {
                    state.longLife.guangda.guangdaPolicy[field1][field2] = value
                }
        } else {
            if (type === 1) {
                state.longLife.guangda.guangdaPremiumRisk[field1] = value
            } else if (type === 2) {
                state.longLife.guangda.guangdaMainRisk[field1] = value
            } else if (type === 3) {
                state.longLife.guangda.guangdaRiskPolicy[field1] = value
            } else if (type === 4) {
                state.longLife.guangda.guangdaTrail.policy[field1] = value
            } else {
                if (field1 === 'mainPolicy') {
                    if (state.longLife.guangda.guangdaPolicy.selectFuPolicy.length !== 0) {
                        state.longLife.guangda.guangdaPolicy.selectFuPolicy = []
                        state.longLife.guangda.guangdaPolicy.selectFuPolicy.push(value.isBindRisk)
                    } else {
                        state.longLife.guangda.guangdaPolicy.selectFuPolicy.push(value.isBindRisk)
                    }
                }
               state.longLife.guangda.guangdaPolicy[field1] = value
            }
        }
        saveState(state)
        },
        // 光大本人
        [types.SET_LONGLIFE_INSURED_BENREN] (state) {
            setGdBenren(state.longLife.guangda.guangdaPremiumRisk)
            saveState(state)
        },
        // 光大其它人
        [types.SET_LONGLIFE_INSURED_OTHER] (state) {
            setGdOther(state.longLife.guangda.guangdaPremiumRisk)
            saveState(state)
        },
        // 光大trial设置本人
        [types.SET_LONGLIFE_TRAIL_BENREN] (state) {
            setTrailBenren(state.longLife.guangda.guangdaTrail.policy.custInfo, state.longLife.guangda.guangdaPremiumRisk)
            saveState(state)
        },
        // 删除光大附加险
        [types.DELET_GUANGDA_FU] (state, param) {
            state.longLife.guangda.guangdaPolicy.selectFuPolicy.splice(param, 1)
            saveState(state)
        },
         // 增加光大附加险
         [types.ADD_GUANGDA_FU] (state, param) {
            state.longLife.guangda.guangdaPolicy.selectFuPolicy.push(param)
            saveState(state)
        },
        // 增加指定受益人
        [types.ADD_GUANGDA_BENEFIT] (state, param) {
          state.longLife.guangda.guangdaTrail.policy.custInfo.bnfInfo.beneficiaries.beneficiary.push(clone(defaultGDBeneficiary))
          state.longLife.guangda.guangdaTrail.policy.custInfo.bnfInfo.beneficiaries.bnfCount = state.longLife.guangda.guangdaTrail.policy.custInfo.bnfInfo.beneficiaries.beneficiary.length.toString()
            saveState(state)
        },
        // 删除指定受益人
        [types.DELET_GUANGDA_BENEFIT] (state, param) {
            state.longLife.guangda.guangdaTrail.policy.custInfo.bnfInfo.beneficiaries.beneficiary.splice(param, 1)
            state.longLife.guangda.guangdaTrail.policy.custInfo.bnfInfo.beneficiaries.bnfCount = state.longLife.guangda.guangdaTrail.policy.custInfo.bnfInfo.beneficiaries.beneficiary.length.toString()
              saveState(state)
          }
}
export default mutations