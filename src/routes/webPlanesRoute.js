const { webBasicPlane, webStandardPlane, webPremiumPlane,
  allWebBasicPlanesData,allWebStandardPlaneData,allWebPremiumPlaneData,
  WebBasicPlanesDataById,WebStandardPlaneDataById,WebPremiumPlaneDataById
 } = require('../controller/webPlanesController');
const upload = require('../utils/uploadConfig');

const webPlaneRoute = async (fastify) => {
  fastify.post('/web-basic-plane', { preHandler: upload.array('Link_to_Graphics', 10) }, webBasicPlane);
  fastify.post('/web-standard-plane', { preHandler: upload.array('Link_to_Graphics', 10) }, webStandardPlane);
  fastify.post('/web-premium-plane', { preHandler: upload.array('Link_to_Graphics', 10) }, webPremiumPlane);


  fastify.get('/all-web-basic-planes-data',allWebBasicPlanesData)
  fastify.get('/all-web-standard-planes-data',allWebStandardPlaneData)
  fastify.get('/all-web-premium-planes-data',allWebPremiumPlaneData)

  fastify.get('/all-web-basic-planes-data/:id',WebBasicPlanesDataById)
  fastify.get('/all-web-standard-planes-data/:id',WebStandardPlaneDataById)
  fastify.get('/all-web-premium-planes-data/:id',WebPremiumPlaneDataById)
};

module.exports = webPlaneRoute;
