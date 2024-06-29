const { seoBasicPlaneService, seoStandardPlaneService, seoPremiumPlaneService,
    getAllBasicSeoPlanesData,getAllStandardSeoPlanesData,getAllpremiumSeoPlanesData,
    getSeoBasicPlanesDataByID,getSeoStandardPlanesDataByID,getSeopremiumPlanesDataByID

 } = require('../service/seoService');
const { logger } = require('../../logger');
const { getClientId } = require("../service/clientService");


const handlePlain = async (request, reply, serviceFunction) => {
    try {
        const clientData = request.body;
        console.log("Received Data in Controller", clientData);

        if (!clientData) {
            console.log("Client Data Not Found");
            return reply.code(400).send({ error: "Client Data Not Found" });
        }

        clientData.clientId = await getClientId(clientData.email, clientData.name);

        const result = await serviceFunction(clientData);
        if (result) {
            reply.send({
                code: 200,
                success: "success",
                data: result
            });
        } else {
            reply.code(500).send({ error: "Internal Server Error" });
        }
    } catch (error) {
        logger.error(error);
        reply.code(500).send({ error: "Internal Server Error" });
    }
};

const seoBasicPlaneController = async (request, reply) => {
    await handlePlain(request, reply, seoBasicPlaneService);
};

const seoStandardPlaneController = async (request, reply) => {
    await handlePlain(request, reply, seoStandardPlaneService);
};

const seoPremiumPlaneController = async (request, reply) => {
    await handlePlain(request, reply, seoPremiumPlaneService);
};




const getSeoPlanesData = async (request, reply, serviceFunction) => {
    try {
  
      const result = await serviceFunction();
      console.log("Result",result)
      if(result){
      reply.code(201).send({
         success: 'success', data: result });
      }else{
        reply.send({
          message:`${serviceFunction} Data Not Found`
        })
      }
    } catch (error) {
      console.error('Error occurred in getLogoPlanesData Function', error);
      throw error
    }
  };
  
  const allSeoBasicPlanesData = async (request, reply) => {
    await getSeoPlanesData(request, reply, getAllBasicSeoPlanesData);
  };
  
  const allSeoStandardPlaneData = async (request, reply) => {
    await getSeoPlanesData(request, reply, getAllStandardSeoPlanesData);
  };
  
  const allSeoPremiumPlaneData = async (request, reply) => {
    await getSeoPlanesData(request, reply, getAllpremiumSeoPlanesData);
  };
  

  
const getPlanesDataById = async (request, reply, serviceFunction) => {
  try {
    const clientId=request.params.id
    const result = await serviceFunction(clientId);
    console.log("Result",result)
    if(result){
    reply.code(201).send({
       success: 'success', data: result });
    }else{
      reply.send({
        message:`${serviceFunction} Data Not Found`
      })
    }
  } catch (error) {
    console.error('Error occurred in getDataPlanes Function', error);
    throw error
  }
};

const SeoBasicPlanesDataById = async (request, reply) => {
  await getPlanesDataById(request, reply, getSeoBasicPlanesDataByID);
};

const SeoStandardPlaneDataById = async (request, reply) => {
  await getPlanesDataById(request, reply, getSeoStandardPlanesDataByID);
};

const SeoPremiumPlaneDataById = async (request, reply) => {
  await getPlanesDataById(request, reply, getSeopremiumPlanesDataByID);
};
  



module.exports = {
   seoBasicPlaneController, seoStandardPlaneController, seoPremiumPlaneController,
    allSeoBasicPlanesData,allSeoStandardPlaneData,allSeoPremiumPlaneData,
    SeoBasicPlanesDataById,SeoStandardPlaneDataById,SeoPremiumPlaneDataById

 };
