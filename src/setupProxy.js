// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/toou',
    createProxyMiddleware({
      target: 'http://toou.kro.kr', // 실제 API 서버 URL
      changeOrigin: true,
      pathRewrite: {
        '^/toou': '', // '/api'를 제거하고 실제 엔드포인트로 요청
      },
    })
  );
};
