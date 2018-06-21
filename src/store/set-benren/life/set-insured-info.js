import {FIELDS, GDFIELDS, GDTRAILFIELDS} from './set-benren-fields.js'
export function setBenren (policy) {
    for (let field of FIELDS) {
        policy.insuredList[0][field.name] = policy.applicantList[0][field.name]
    }
}
export function setOther (policy) {
    for (let field of FIELDS) {
        policy.insuredList[0][field.name] = field.default
    }
}
export function setGdBenren (policy) {
    for (let field of GDFIELDS) {
            policy.insured[field.name] = policy.applicant[field.name]
    }
}

export function setGdOther (policy) {
    for (let field of GDFIELDS) {
        policy.insured[field.name] = field.default
    }
}

export function setTrailBenren (policy) {
    for (let field of GDTRAILFIELDS) {
        let fieldObj = ''
        if (field.name === 'avoirdupois') {
            fieldObj = policy.appnt.appntAvoirdupois
        }
        if (field.name === 'birthday') {
            fieldObj = policy.appnt.appntBirthday
        }
        if (field.name === 'insOccupation') {
            fieldObj = policy.appnt.appOccupation
        }
        if (field.name === 'insurantTaxInfo') {
            fieldObj = policy.appnt.appntTaxInfo
        }
        if (field.name === 'name') {
            fieldObj = policy.appnt.appntName
        }
        if (field.name === 'relToApp') {
            fieldObj = '00'
        }
        if (field.name === 'sex') {
            fieldObj = policy.appnt.appntSex
        }
        if (field.name === 'stature') {
            fieldObj = policy.appnt.appntStature
        }
        if (fieldObj !== '') {
            policy.insurants.insurant[0][field.name] = fieldObj
        } else {
            policy.insurants.insurant[0][field.name] = policy.appnt[field.name]
        }
    }
}
