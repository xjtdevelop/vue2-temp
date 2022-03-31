let _storage = localStorage

const TOKEN = 'token'

import store from '@/store'

export const setStorage = storage => {
  _storage = storage
}

export const setToken = token => {
  _storage.setItem(TOKEN, token)
}

export const getToken = () => {
  return _storage.getItem(TOKEN)
}

export const clearToken = () => {
  _storage.removeItem(TOKEN)
}
/*
{
  accountStatus?: string
  address?: string | null
  nickName?: string
  phone?: string
  userId?: string | number
  userName: string
  userType?: string
}
*/
export const setUserInfo = userInfo => {
  store.commit('login/SET_USER_INFO', userInfo || {})
}

export const getUserInfo = () => {
  return store.state.login.userInfo || {}
}

export const getUserId = () => {
  const { userId, id } = getUserInfo()
  if (userId || userId === 0) {
    return userId
  } else if (id || id === 0) {
    return id
  }
  return ''
}
