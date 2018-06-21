// 通过某个filed检测数组里面是否包含某个成员
export function isMemberField (memberId, list, fieldName) {
  for (let i in list) {
    if (memberId === list[i][fieldName]) return true
  }
  return false
}
