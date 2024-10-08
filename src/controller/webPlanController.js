const { webBasicPlanService, webStandardPlanService, webPremiumPlanService,
  getAllBasicWebPlanesData,getAllStandardWebPlanesData,getAllpremiumWebPlanesData,
  getWebBasicPlanesDataByID,getWebStandardPlanesDataByID,getWebpremiumPlanesDataByID,
  deleteBasicWebPlanesDataByID,deleteStandardWebPlanesDataByID,deletepremiumWebPlanesDataByID,
  updateBasicWebPlanesDataByID,updateStandardWebPlanesDataByID,updatepremiumWebPlanesDataByID

 } = require('../service/webPlainsService');
const { logger } = require('../../logger');

const { getClientId,RandomId } = require("../service/clientService");
const cloudinary = require('cloudinary').v2;
const {ValidateWebBasicPlan,ValidateWebStandardPlan,ValidateWebPremiumPlan}=require('../scheema/webPlanesSchema')


const handlePlain = async (request, reply,schema, serviceFunction) => {
  try {
    const data = request.body;

    const { error } = schema.validate(data);
    console.log("Validate Error ", error);
        if (error) {
            return reply.code(400).send({ error: error.details[0].message });
        }
    
    if (request.files && request.files.length > 0) {
      const uploadPromises = request.files.map(file =>
        cloudinary.uploader.upload(file.path)
      );
      const results = await Promise.all(uploadPromises);
      data.Link_to_Graphics = results.map(result => result.secure_url);
    } else {
      data.Link_to_Graphics = []; // No files provided
    }
    
    if (typeof data.functionalities === 'string') {
      data.functionalities = JSON.parse(data.functionalities);
    }

    if (!data) {
      return reply.code(400).send({ error: 'Invalid input' });
    }

    data.clientId = await getClientId(data.email, data.name);
    data.id = RandomId();

    const result = await serviceFunction(data);
    reply.code(201).send({ success: 'success', data: result });

  } catch (error) {
    console.error('Error occurred during form submission:', error);
    reply.code(500).send({ error: 'Internal Server Error' });
  }
};


const webBasicPlan = async (request, reply) => {
  await handlePlain(request, reply,ValidateWebBasicPlan, webBasicPlanService);
};

const webStandardPlan = async (request, reply) => {
  await handlePlain(request, reply, ValidateWebStandardPlan,webStandardPlanService);
};

const webPremiumPlan = async (request, reply) => {
  await handlePlain(request, reply,ValidateWebPremiumPlan, webPremiumPlanService);
};



const getWebPlanData = async (request, reply, serviceFunction) => {
  try {

    const result = await serviceFunction();
    if(result){
    reply.code(201).send({
       success: 'success', data: result });
    }else{
      reply.send({
        message:`${serviceFunction} Data Not Found`
      })
    }
  } catch (error) {
    console.error('Error occurred in getLogoPlanData Function', error);
    throw error
  }
};

const allWebBasicPlanesData = async (request, reply) => {
  await getWebPlanData(request, reply, getAllBasicWebPlanesData);
};

const allWebStandardPlaneData = async (request, reply) => {
  await getWebPlanData(request, reply, getAllStandardWebPlanesData);
};

const allWebPremiumPlaneData = async (request, reply) => {
  await getWebPlanData(request, reply, getAllpremiumWebPlanesData);
};


const getWebPlanesDataById = async (request, reply, serviceFunction) => {
  try {
    const clientId = request.params.clientId;
    const result = await serviceFunction(clientId);
    if (result) {
      reply.code(201).send({ success: 'success', data: result });
    } else {
      reply.send({ message: `${serviceFunction} Data Not Found` });
    }
  } catch (error) {
    console.error('Error occurred in getWebPlanesDataById Function', error);
    throw error;
  }
};

const WebBasicPlanesDataById = async (request, reply) => {
  await getWebPlanesDataById(request, reply, getWebBasicPlanesDataByID);
};

const WebStandardPlaneDataById = async (request, reply) => {
  await getWebPlanesDataById(request, reply, getWebStandardPlanesDataByID);
};

const WebPremiumPlaneDataById = async (request, reply) => {
  await getWebPlanesDataById(request, reply, getWebpremiumPlanesDataByID);
};



const deletePlanesDataById = async (request, reply, serviceFunction) => {
  try {
    const id=request.params.id
    const cliendId=request.params.clientId
    const result = await serviceFunction(id,cliendId);
    if(result){
    reply.code(201).send({
      data: result
     });
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

const deleteWebBasicPlanesData = async (request, reply) => {
  await deletePlanesDataById(request, reply, deleteBasicWebPlanesDataByID);
};

const deleteWebStandardPlaneData = async (request, reply) => {
  await deletePlanesDataById(request, reply, deleteStandardWebPlanesDataByID);
};

const deleteWebPremiumPlaneData = async (request, reply) => {
  await deletePlanesDataById(request, reply, deletepremiumWebPlanesDataByID);
};

const updatePlanesDataById = async (request, reply, serviceFunction) => {
  try {
    const id = request.params.id;
    const clientId = request.params.clientId;
    const data = request.body;

    
    if (request.files && request.files.length > 0) {
      const uploadPromises = request.files.map(file =>
        cloudinary.uploader.upload(file.path)
      );
      const results = await Promise.all(uploadPromises);
      data.Link_to_Graphics = results.map(result => result.secure_url);
    } else {
      data.Link_to_Graphics = []; // No files provided
    }

    if (!data || Object.keys(data).length === 0) {
      return reply.code(400).send({ error: 'Invalid input: No data provided' });
    }

    const result = await serviceFunction(id, clientId, data);
    if (result) {
      reply.code(201).send({ data: result });
    } else {
      reply.send({ message: `${serviceFunction.name} Data Not Found` });
    }
  } catch (error) {
    console.error('Error occurred in updatePlanesDataById function:', error);
    reply.code(500).send({ error: 'Internal Server Error' });
  }
};

const updateWebBasicPlanesData = async (request, reply) => {
  await updatePlanesDataById(request, reply, updateBasicWebPlanesDataByID);
};

const updateWebStandardPlaneData = async (request, reply) => {
  await updatePlanesDataById(request, reply, updateStandardWebPlanesDataByID);
};

const updateWebPremiumPlaneData = async (request, reply) => {
  await updatePlanesDataById(request, reply, updatepremiumWebPlanesDataByID);
};


module.exports = {
  webBasicPlan,webStandardPlan,webPremiumPlan,
  allWebBasicPlanesData,allWebStandardPlaneData,allWebPremiumPlaneData,
  WebBasicPlanesDataById,WebStandardPlaneDataById,WebPremiumPlaneDataById,
  deleteWebBasicPlanesData,deleteWebStandardPlaneData,deleteWebPremiumPlaneData,
  updateWebBasicPlanesData,updateWebStandardPlaneData,updateWebPremiumPlaneData


};
