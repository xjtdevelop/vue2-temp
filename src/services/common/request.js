import axios from 'axios'
import { NetworkError } from './api'
import { getToken } from './token'

function genRequest(options) {
  const axiosOptions = {
    baseURL: '/',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      Accept: 'application/json;charset=UTF-8',
      Pragma: 'no-cache',
    },
    //超时时间
    timeout: 30000,
    // withCredentials: true,
  }
  const axiosHttp = axios.create(axiosOptions)
  // 请求拦截
  axiosHttp.interceptors.request.use(config => {
    if (options.withToken && getToken()) {
      config.headers.token = getToken()
    }
    return config
  })
  // 返回拦截
  axiosHttp.interceptors.response.use(
    res => {
      if (res.config.responseType && res.config.responseType !== 'json') {
        return Promise.resolve(res.data)
      }
      if (res.data.code !== 200) {
        return Promise.reject(
          new NetworkError(res.data.message || undefined, res.data)
        )
      }

      return Promise.resolve(res.data)
    },
    /*eslint no-unused-vars: ["error", { "args": "none" }]*/
    error => {
      return Promise.reject(new NetworkError())
    }
  )

  return axiosHttp
}

export default genRequest({ withToken: true })

export const requestWithoutToken = genRequest({ withToken: false })
