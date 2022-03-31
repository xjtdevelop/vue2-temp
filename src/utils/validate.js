// 验证-身份证
export const validateIDCard = (rule, value, callback) => {
  let regex =
    /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/
  if (!value) {
    return callback(new Error('请输入身份证号码'))
  }
  if (!regex.test(value)) {
    return callback(new Error('请输入正确的身份证号码'))
  } else {
    return callback()
  }
}

// 验证-手机号
export const validateTelephone = (rule, value, callback) => {
  let regex = /^[1][3456789]\d{9}$/
  if (!value) {
    return callback(new Error('请输入手机号'))
  }
  if (!regex.test(value)) {
    callback(new Error('请输入正确的手机号'))
  } else {
    callback()
  }
}
// 验证-统一社会信用代码
export const validateSocialCreditCode = (rule, value, callback) => {
  let regex = /^[0-9a-zA-Z]{16,18}$/
  if (!value) {
    return callback(new Error('请输入统一社会信用代码'))
  }
  if (!regex.test(value)) {
    callback(new Error(' '))
  } else {
    callback()
  }
}
