
export function checkNum (income, num) {
    var regu = /^[0-9]+\.?[0-9]*$/
    if (income !== '') {
      if (!regu.test(income)) {
          return '请输入数字'
      } else {
          return ''
      }
  }
}

export function checkPhone (income, num) {
    var regu = /^1[34578][0-9]{9}$/
    if (income !== '') {
      if (!regu.test(income)) {
          return '请输入正确的电话号码'
      } else {
          return ''
      }
  }
}

export function checkEmail (income, num) {
    var regu = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
    if (income !== '') {
      if (!regu.test(income)) {
          return '请输入正确的邮箱'
      } else {
          return ''
      }
  }
}

export function checkZipCode (income, num) {
    var regu = /^[0-9]{6}$/
    if (income !== '') {
      if (!regu.test(income)) {
          return '请输入正确的邮编'
      } else {
          return ''
      }
  }
}

export function checkCompany (income, num) {
    var regu = /^[\u4e00-\u9fa5]{2,20}$/
    if (income !== '') {
      if (!regu.test(income)) {
          return '请输入正确的公司名称'
      } else {
          return ''
      }
  }
}

export function checkBankNum (income, num) {
    var regu = /^([1-9]{1})(\d{15}|\d{18})$/
    if (income !== '') {
        if (!regu.test(income)) {
            return '请输入正确的银行卡账户'
        } else {
            return ''
        }
    }
}

export function checkStreet (income, num) {
    var regu = /^[\u4e00-\u9fa5]{2,24}$/
    if (income !== '') {
      if (!regu.test(income)) {
          return '请输入正确的街道'
      } else {
          return ''
      }
  }
}

export function checkCommunity (income, num) {
    var regu = /^[\u4e00-\u9fa5]{2,24}$/
    if (income !== '') {
      if (!regu.test(income)) {
          return '请输入正确的社区'
      } else {
          return ''
      }
  }
}