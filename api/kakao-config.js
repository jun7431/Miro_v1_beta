module.exports = function handler(request, response) {
  const kakaoJavaScriptKey = String(
    process.env.VITE_KAKAO_JAVASCRIPT_KEY || ''
  ).trim();

  response.setHeader('Content-Type', 'application/javascript; charset=utf-8');
  response.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
  response.status(200).send(
    `window.MIRO_KAKAO_APP_KEY = ${JSON.stringify(kakaoJavaScriptKey)};`
  );
};
