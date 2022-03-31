module.exports = {
  '^/pricing-server': {
    target: 'http://192.168.1.203:8090',
    // target: 'http://172.18.214.31:3000/mock/33',
    changOrigin: true,
    pathRewrite: {
      '^/pricing-server': '/',
    },
  },
}
