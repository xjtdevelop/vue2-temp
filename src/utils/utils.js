// import Router from "vue-router";
import { Message } from 'element-ui'

//是否为外部链接
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

//防抖
export function debounce(func, delay = 300) {
  let timeout
  return function () {
    clearTimeout(timeout) // 如果持续触发，那么就清除定时器，定时器的回调就不会执行。
    timeout = setTimeout(() => {
      func.apply(this, arguments)
    }, delay)
  }
}

//节流
export function throttle(func, delay = 300) {
  let run = true
  return function () {
    if (!run) {
      return // 如果开关关闭了，那就直接不执行下边的代码
    }
    run = false // 持续触发的话，run一直是false，就会停在上边的判断那里
    setTimeout(() => {
      func.apply(this, arguments)
      run = true // 定时器到时间之后，会把开关打开，我们的函数就会被执行
    }, delay)
  }
}

export function enum2obj(e, filter) {
  return Object.keys(e)
    .filter(filter || (k => Number.isNaN(Number(k))))
    .reduce((obj, k) => {
      obj[k] = e[k]
      return obj
    }, {})
}

export function enum2obj_reverse(e, filter) {
  const obj = Object.keys(e)
    .filter(filter || (k => !Number.isNaN(Number(k))))
    .reduce((obj, k) => {
      obj[k] = e[k]
      return obj
    }, {})
  return obj
}

export function enum2array(e, filter) {
  const array = Object.keys(e).filter(filter || (k => !Number.isNaN(Number(k))))
  let result = [{ value: 'null', label: '全部' }]
  array.forEach(value => {
    const element = { value: Number(value), label: e[value] }
    result.push(element)
  })
  return result
}

export const delay = duration => new Promise(res => setTimeout(res, duration))

export function copyToClip(content) {
  var aux = document.createElement('input')
  aux.setAttribute('value', content)
  document.body.appendChild(aux)
  aux.select()
  document.execCommand('copy')
  document.body.removeChild(aux)
}

//格式化日期
export function getNowDate(d, startType) {
  if (!d) return ''
  const getHandledValue = num => {
    return num < 10 ? '0' + num : num
  }
  const year = d.getFullYear()
  const month = getHandledValue(d.getMonth() + 1)
  const date = getHandledValue(d.getDate())
  const hours = getHandledValue(d.getHours())
  const minutes = getHandledValue(d.getMinutes())
  const second = getHandledValue(d.getSeconds())
  let resStr = ''
  if (startType === 'yyyy-MM-dd') resStr = year + '-' + month + '-' + date
  if (startType === 'yyyy-MM-dd HH:mm') {
    resStr = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes
  }
  if (startType === 'yyyy-MM-dd HH:mm:ss') {
    resStr =
      year +
      '-' +
      month +
      '-' +
      date +
      ' ' +
      hours +
      ':' +
      minutes +
      ':' +
      second
  }
  return resStr
}

export const genFile = (path, filename = '') => ({
  downloadUrl: path,
  expireIn: -1,
  fileInfoId: null,
  fileName: filename,
})
export const strToUrlList = (detail, key) => {
  return detail[key]
    ? [genFile(detail[key], detail[key.substring(0, key.length - 3)])]
    : []
}
// 将urllist转换成str
export const urlListToStr = (form, key) => {
  form[key.substring(0, key.length - 3)] = form[key].length
    ? form[key][0].fileName
    : ''
  form[key] = form[key].length ? form[key][0].downloadUrl : ''
}

// el-table-column中使用，当数据为null、undefined、""时显示"-"
// eslint-disable-next-line no-unused-vars
export const formatter = (row, column, cellValue, index) =>
  cellValue || cellValue === 0 ? cellValue : '-'
// 换行时间
export const formatterDate = date => {
  if (!date) {
    return '-'
  }
  return date.replace(' ', '</br>')
}
// 数据回显时使用，当data或者data[key]数据为null、undefined、""时显示"-"
export const propsFormatter = (data, key, prefix = '') =>
  data && (data[key] || data[key] === 0) ? prefix + data[key] : '-'

// 判断是不是卖方
export function isSeller() {
  return /^#\/seller/g.test(window.location.hash) ? true : false
}
//

// chunk
/**
 * Creates an array of elements split into groups the length of `size`.
 * If `array` can't be split evenly, the final chunk will be the remaining
 * elements.
 *
 * @category Array
 * @param {Array} array The array to process.
 * @param {number} [size=1] The length of each chunk
 * @returns {Array} Returns the new array of chunks.
 * @example
 *
 * chunk(['a', 'b', 'c', 'd'], 2)
 * // => [['a', 'b'], ['c', 'd']]
 *
 * chunk(['a', 'b', 'c', 'd'], 3)
 * // => [['a', 'b', 'c'], ['d']]
 */
export function chunk(array, size = 1) {
  size = Math.max(size, 0)
  const length = array == null ? 0 : array.length
  if (!length || size < 1) {
    return []
  }
  let index = 0
  let resIndex = 0
  const result = new Array(Math.ceil(length / size))

  while (index < length) {
    result[resIndex++] = array.slice(index, (index += size))
  }
  return result
}

export function SelfElMessage(options) {
  Message({ duration: 800, ...options })
}

// 时间调整
export function formatEndDate(date) {
  if (date instanceof Date) {
    date.setHours(23)
    date.setMinutes(59)
    date.setSeconds(59)
    return date
  }
  return date
}
