
let date = new Date()
let year = date.getFullYear()
let month = format(date.getMonth() + 1)
let day = date.getDate()
let hours = date.getHours()
let minutes = date.getMinutes()
let seconds = date.getSeconds()
export const nowDateArr = [year, month, day, hours, minutes]
export const nowDateStr = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
function format (s) {
    return s < 10 ? '0' + s : s
}
