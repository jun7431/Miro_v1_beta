module.exports = function handler(request, response) {
  const naverMapsNcpKeyId = String(
    process.env.VITE_NAVER_MAPS_NCP_KEY_ID || ''
  ).trim();

  response.setHeader('Content-Type', 'application/javascript; charset=utf-8');
  response.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
  response.status(200).send(
    `window.MIRO_NAVER_MAPS_NCP_KEY_ID = ${JSON.stringify(naverMapsNcpKeyId)};`
  );
};
