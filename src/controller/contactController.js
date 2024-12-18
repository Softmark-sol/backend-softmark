const {contactUsService,dataInService,contactDataInService,updateContactInService,GetProposalController

} = require('../service/contactService');
const { logger } = require('../../logger');
const { ValidateContact } = require('../scheema/contactUsSchema');
const {GenerateClientId}  = require('../utils/token');
const sendProposalEmail = require('../service/getAProposalEmail')

const contactUs = async (request, reply) => {
    try {
        logger.info("src > controller > contactController > getDataFromUser");
        const clientData = request.body;
        console.log("Data",clientData)
        if (!clientData) {
            logger.error("ClientData is undefined");
            return reply.code(400).send({ error: "Invalid input" });
        }

    const { error } = ValidateContact.validate(clientData);
        if (error) {
            return reply.code(400).send({ error: error.details[0].message });
        }
        clientData.clientId=GenerateClientId();
        console.log("CliendId",clientData.clientId)
console.log("Calling the function")
        const data = await contactUsService(clientData);
        reply.code(200).send({ success: "success", data: data });

    } catch (error) {
        logger.error("Error occurred during contact form submission:", error);
        throw error
    }
};

const allContactUsData=async(request,reply)=>{
try{
    const data=await dataInService();

    if(data){
        reply.code(200).send({
            success:"success",
            data:data   
             })
    }else if(!data){
        reply.code(201).send({
            message:"Contact Data Not Found"
        })
    }

}catch(error){
throw error
}
}

const delContactUsById=async(request,reply)=>{
try{
    const id=request.params.id
    const contactData=await contactDataInService(id)
    if(contactData){
        reply.code(200).send({
          status:"succcess" ,
          data:contactData 
        })
    }else if(!contactData){
        reply.code(200).send({
            message:`Client Data not Found With ID ${id}`
        })
    }

}catch(error){
    throw error
}
}

const updateContactUsById=async(request,reply)=>{
try{
    const id=request.params.id
    const clientData=request.body
    const data=await updateContactInService(id,clientData)
    if(data){
        reply.send({
            massege:`Client Data of ${id} Updated Successfully`,
            data:data
        })
    }else if(!data){
        reply.send({
            message:`Client data Not Found With ID ${id}`
        })
    }

}catch(error){
    throw error
}
}

const GetAProposal = async (req, reply) => {
    try {
      const { email } = req.body;
      console.log("Email",email)
      const data = await GetProposalController(email);
      if (data) {
        await sendProposalEmail(email);
        reply.code(200).send({ message: "Email sent successfully" });
      }
    } catch (error) {
      console.error("Error in GetAProposal:", error);
      reply.code(500).send({ message: "Internal Server Error" });
    }
  };

module.exports = {contactUs,allContactUsData,delContactUsById,GetAProposal,updateContactUsById};
