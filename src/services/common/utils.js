export const BASE_URL = process.env.VUE_APP_BASE_URL

export const DISABLE_SERVER_NAME =
  (process.env.VUE_APP_DISABLE_SERVER_NAME || '').toString().toLowerCase() ===
  'true'

export class NetworkError extends Error {
  constructor(msg = '网络请求异常，请稍后重试!', response) {
    super()
    this.message = msg
    this.response = response
  }

  name = 'NetworkError'
}

export const withServer = Object.keys(process.env).reduce((obj, k) => {
  const res = k.match(/^VUE_APP_(.*)_SERVER$/)
  if (res) {
    const servername = process.env[k]
    const key = res[1].toLowerCase()
    obj[key] = s => (DISABLE_SERVER_NAME ? s : `${servername}${s}`)
  }

  return obj
}, {})
