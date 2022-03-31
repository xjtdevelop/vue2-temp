import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 加载所有模块。
function loadModules() {
  const context = require.context('./modules', false, /([a-z_]+)\.js$/i)

  const modules = context
    .keys()
    .map(key => ({ key, name: key.match(/([a-z_]+)\.js$/i)[1] }))
    .reduce(
      (modules, { key, name }) => ({
        ...modules,
        [name]: context(key).default,
      }),
      {}
    )

  return { context, modules }
}

const { context, modules } = loadModules()

const store = new Vuex.Store({
  modules,
})

if (module.hot) {
  // 在任何模块发生改变时进行热重载。
  module.hot.accept(context.id, () => {
    const { modules } = loadModules()

    store.hotUpdate({
      modules,
    })
  })
}

export default store
