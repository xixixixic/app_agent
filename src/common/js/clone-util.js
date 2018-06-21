export function clone (obj) {
    let newObj = {}
    for (let field in obj) {
        if (typeof (obj[field]) === 'object') {
            newObj[field] = clone(obj[field])
        } else {
            newObj[field] = obj[field]
        }
    }
    return newObj
}