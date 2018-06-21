const VALIDATE_MAP = {
    manType: {
        // 'applicant': 'applicant'
        'insured': 'insuredExt'
    },
    fileName: {
        'idInfo': ['cardType', 'cardNo']
    }
}
export function getPmanType (rmanType) {
    if (VALIDATE_MAP[rmanType] !== undefined) return rmanType
    else return VALIDATE_MAP[rmanType]
}
export function getPfieldName (rmanType, rfieldName) {
    if (VALIDATE_MAP[rmanType][rfieldName] !== undefined) return rfieldName
    else return VALIDATE_MAP[rmanType][rfieldName]
}
