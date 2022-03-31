const state = {
  userInfo: {},
  user: {
    name: '',
  },
  companyDetail: null,
  isAttestation: false,
}

const actions = {
  setUserName(context, payload) {
    context.commit('SET_USER_NAME', payload)
  },
  getUserInfo(context, payload) {
    context.commit('GET_USER_INFO', payload)
  },
  loginOut(context, payload) {
    context.commit('LOGIN_OUT', payload)
  },
}

const mutations = {
  SET_USER_INFO(state, payload) {
    state.userInfo = payload
  },
  SET_COMPANY_DETAIL(state, payload) {
    state.companyDetail = payload
  },
  SET_ATTESTATION(state, status) {
    state.isAttestation = status
  },
  SET_USER_NAME(state, payload) {
    state.user.name = payload
  },
  GET_USER_INFO(state, payload) {
    state.user.name = payload.userName
    sessionStorage.setItem('userName', payload.userName)
    localStorage.setItem('token', payload.token)
  },
  LOGIN_OUT(state) {
    state.user.name = ''
    localStorage.removeItem('token')
    sessionStorage.removeItem('userName')
  },
}

const getters = {
  getUser(state) {
    return state.user
  },
  getUserId(state) {
    const { id } = state.userInfo
    if (id || id === 0) {
      return id
    } else {
      return null
    }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
