/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    '/api/': {
      target: 'https://preview.pro.ant.design',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
    '/userApi/': {
      target: 'http://localhost:8150',
      changeOrigin: true,
      pathRewrite: { '^/userApi': '/' },
    },
    '/msmApi/': {
      target: 'http://localhost:8003',
      changeOrigin: true,
      pathRewrite: { '^/msmApi': '/' },
    },
    '/server/api': {
      target: 'http://localhost:8222',
      changeOrigin: true,
      pathRewrite: { '^/server/api': '/' },
    },
  },
  test: {
    '/api/': {
      target: 'https://preview.pro.ant.design',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
