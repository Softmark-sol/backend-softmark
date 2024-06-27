const {digitalMarketingService,digitalMarketingdataInService,digitalMDataInService,upDateDigitalInService,digitalMarketingDataInServiceByID} = require('../service/digitalMarketingService');
const { logger } = require('../../logger');
const { getClientId } = require("../service/clientService");
const { err } = require('pino-std-serializers');



const digitalMarketing = async (request, reply) => {
    try {
        logger.info("src > controller > digitalMarketingController > digitalMarketing");
        const clientData = request.body;
        console.log("Client in Controller", clientData);

        if (!clientData) {
            logger.error("ClientData is undefined");
            return reply.code(400).send({ error: "Invalid input" });
        }
        clientData.clientId = await getClientId(clientData.email, clientData.name);

        const data = await digitalMarketingService(clientData);
        reply.code(200).send({ success: "success", data: data });

    } catch (error) {
        logger.error("Error occurred during Digital-Marketing form submission:", error);
        throw error
    }
};

const allDigitalMarketingData=async(request,reply)=>{
    try{
        const data=await digitalMarketingdataInService();
    
        if(data){
            reply.code(200).send({
                success:"success",
                data:data   
                 })
        }else if(!data){
            reply.code(201).send({
                message:"Digital Marketing Data Not Found"
            })
        }
    
    }catch(error){
    throw error
    }
    }
    
    const delDigitalMarketingById=async(request,reply)=>{
    try{
        const clientId=request.params.id
        const digitalMarketingData=await digitalMDataInService(id)
        if(digitalMarketingData){
            reply.code(200).send({
              status:"succcess" ,
              data:digitalMarketingData 
            })
        }else if(!digitalMarketingData){
            reply.code(200).send({
                message:`Client Data not Found With ID ${id}`
            })
        }
    
    }catch(error){
        throw error
    }
    }
    


    const updateDigitalMarketingById=async(request,reply)=>{
        try{
            const id=request.params.id
            const clientData=request.body
            const data=await upDateDigitalInService(id,clientData)
            if(data){
                reply.send({
                    data:data
                })
            }if(!data){
                reply.send({
                    message:`Client data Not Found With ID ${id}`
                })
            }
        
        }catch(error){
            throw error
        }
        }

        const getDigitalMarketingById = async (request, reply) => {
            try {
              const clientId = request.params.id;
              const digitalMarketingData = await digitalMarketingDataInServiceByID(clientId);
          
              if (digitalMarketingData) {
                reply.code(200).send({
                  status: "success",
                  data: digitalMarketingData
                });
              } else {
                reply.code(200).send({
                  message: `Client Data not Found With ID ${clientId}`
                });
              }
            } catch (error) {
             throw error
            }
          };
module.exports = {digitalMarketing,allDigitalMarketingData,delDigitalMarketingById,updateDigitalMarketingById,getDigitalMarketingById};
