import {mapGetters, mapMutations} from 'vuex'
// 弹框
export const confirm = {
    data () {
        return {
            confirmText: ''
        }
    },
    methods: {
        showConfirm (text) {
            this.confirmText = text
            this.$refs.confirm.show()
        }
    }
}
//  投保差异性
export const lifeModularInsureFields = {
    computed: {
        ...mapGetters([
            'lifePolicy',
            'lifeInsuranceRules'
        ]),
        insureFields () {
            let insureFields = JSON.parse(this.lifeInsuranceRules.insureFields)
            for (let key in insureFields) {
                for (let fieldName in insureFields[key]) {
                    if (insureFields[key][fieldName].fieldLevel === 0) delete insureFields[key][fieldName]
                }
            }
            return insureFields
        },
        applicantInsureFields () {
            return this.insureFields.applicant
        },
        insuredInsureFields () {
            return this.insureFields.insured
        },
        beneficiaryInsureFields () {
            return this.insureFields.beneficiary
        },
        bankInsureFields () {
            return this.insureFields.bankFields
        }
    }
}
// 投保人，被保人, 受益人、银行差异信息
export const lifeInfoInsureFields = {
    computed: {
        ...mapGetters([
            'lifeApplicant',
            'lifePolicy'
        ]),
        /* ---------------------------------------校验规则------------------------------------ */
        insureFieldsName () {
            return this.insureFields.name
        },
        insureFieldsRelationShip () {
            return this.insureFields.relation
        },
        insureFieldsIdInfo () {
            return this.insureFields.idInfo
        },
        insureFieldsSex () {
            return this.insureFields.sex
        },
        insureFieldsBirthday () {
            return this.insureFields.birthday
        },
        insureFieldsMobile () {
            return this.insureFields.mobile
        },
        insureFieldsEmail () {
            return this.insureFields.email
        },
        insureFieldsPostCode () {
            return this.insureFields.postCode
        },
        insureFieldsHeight () {
            return this.insureFields.height
        },
        insureFieldsWeight () {
            return this.insureFields.weight
        },
        insureFieldsAnnualIncome () {
            return this.insureFields.annualIncome
        },
        insureFieldsIdInfoPeriod () {
            return this.insureFields.idInfoPeriod
        },
        insureFieldsOccupation () {
            return this.insureFields.occupation
        },
        insureFieldsPca () {
            return this.insureFields.pca
        },
        insureFieldsStreetInfo () {
            return this.insureFields.streetInfo
        },
        insureFieldsOccupationOfDb () {
            return this.insureFields.occupationOfDb
        },
        insureFieldsBeneOrder () {
            return this.insureFields.beneOrder
        },
        insureFieldsBeneScale () {
            return this.insureFields.beneScale
        },
        insureFieldsBankName () {
            return this.insureFields.bankName
        },
        insureFieldsHolderName () {
            return this.insureFields.holderName
        },
        insureFieldsBankNum () {
            return this.insureFields.bankNum
        },
        insureFieldsBankAddress () {
            return this.insureFields.bankAddress
        },
        /* ------------------------------------------------------  信息下拉渲染 --------------------------------------------- */
        idInfo () {
            return this.dictionary.idInfo
        },
        occupation () {
            return this.dictionary.occupation
        },
        /* ----------------------------------- 设置默认值 ------------------------------------- */
        defaultReBankCode () {
            return this.lifePolicy.reBankCode
        },
        defaultHolderName () {
            return this.lifeApplicant[0].name
        },
        defaultReAccNo () {
            return this.lifePolicy.reAccNo
        },
        defaultReAreaName () {
            return this.lifePolicy.reAreaName
        },
        defaultReBankName () {
            return this.lifePolicy.reBankName
        }
    }
}
export const setBenRen = {
    computed: {
        ...mapGetters([
            'lifeInsured',
            'guangdaPremiumRisk'
        ])
    },
    methods: {
        setBenrenInfo () {
            if (this.client.type_code === 1 && this.lifeInsured[0].relationId === '5') {
                this.SET_LIFE_INSURED_BENREN()
            }
        },
        setGDBenRen () {
            if (this.guangdaPremiumRisk.insured.relationId === '00') {
                this.SET_LONGLIFE_INSURED_BENREN()
            }
        },
        setGDOther () {
            console.log(this.gdInsured)
            if (this.guangdaPremiumRisk.insured.relationId !== '00') {
                this.SET_LONGLIFE_INSURED_OTHER()
            }
        },
        setTrailBenRen () {
            if (this.guangdaPremiumRisk.insured.relationId === '00') {
                this.SET_LONGLIFE_TRAIL_BENREN()
            }
        },
        ...mapMutations({
            SET_LIFE_INSURED_BENREN: 'SET_LIFE_INSURED_BENREN',
            SET_LONGLIFE_INSURED_BENREN: 'SET_LONGLIFE_INSURED_BENREN',
            SET_LONGLIFE_INSURED_OTHER: 'SET_LONGLIFE_INSURED_OTHER',
            SET_LONGLIFE_TRAIL_BENREN: 'SET_LONGLIFE_TRAIL_BENREN'
        })
    }
}