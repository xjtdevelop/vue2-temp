let privateProxy = {}
try {
  privateProxy = require('./private_proxy')
} catch (error) {
  console.error(error)
}

const proxyTable = Object.keys(process.env).reduce((table, key) => {
  const res = key.match(/^VUE_APP_(.*)_SERVER$/)
  if (res) {
    const serverName = `/${process.env[key]}`
    const serverAddr = process.env[`VUE_APP_${res[1]}_ADDR`]
    const disableServerName =
      (
        process.env[`VUE_APP_${res[1]}_DISABLE_SERVER_NAME`] || ''
      ).toLowerCase() === 'true'

    if (serverName) {
      const target = serverAddr || process.env.VUE_APP_BASE_URL
      table[serverName] = {
        target,
        changeOrigin: true,
        pathRewrite: function (path, req) {
          const reg = new RegExp(`^${serverName}`)
          const lastPath = path.replace(
            reg,
            disableServerName ? '' : serverName
          )
          // console.log({ disableServerName, target, path, serverName, lastPath, reg })
          return lastPath
        },
      }
    }
  }
  return table
}, {})
console.log('proxy table: ', proxyTable)
console.log('private table: ', privateProxy)

module.exports = {
  proxy: {
    ...proxyTable,
    ...privateProxy,
  },
}
