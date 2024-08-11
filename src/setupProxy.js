// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/toou',
    createProxyMiddleware({
      target: 'http://toou.kro.kr',
      changeOrigin: true,
      pathRewrite: {
        '^/toou': '', // '/toou'를 빈 문자열로 바꿉니다.
      },
    })
  );
};
