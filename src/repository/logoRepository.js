const dataSource = require("../infrastructure/psql");
const { logger } = require("../../logger");

const logoBasicPlaneRepository = dataSource.getRepository("logo_basic_plan");
const logoStandardPlaneRepository = dataSource.getRepository("logo_standard_plan");
const logoPremiumPlaneRepository = dataSource.getRepository("logo_premium_plan");
const logoBusinessPlaneRepository = dataSource.getRepository("logo_business_plan");

const saveData = async (repository, data, repoName) => {
  try {
    const createdData = repository.create(data);
    logger.info(`src > repository > logoRepository > ${repoName}`, createdData);
    const result = await repository.save(createdData);
    logger.info(`Save ${repoName} Data`, result);
    return result;
  } catch (error) {
    logger.error(`Error saving data in ${repoName}`, error);
    throw error;
  }
};

const logoBasicPlaneRepo = (data) => saveData(logoBasicPlaneRepository, data, "logoBasicPlanRepo");
const logoStandardPlaneRepo = (data) => saveData(logoStandardPlaneRepository, data, "logoStandardPlanRepo");
const logoPremiumPlaneRepo = (data) => saveData(logoPremiumPlaneRepository, data, "logoPremiumPlanRepo");
const logoBusinessPlaneRepo = (data) => saveData(logoBusinessPlaneRepository, data, "logoBusinessPlanRepo");


const getLogoPlanesRepo = async (repository, repoName) => {
  try {
    const getData = repository.find();
    logger.info(`src > repository > getLogoPlanesRepo > ${repoName}`, getData);
    return getData;
  } catch (error) {
    logger.error(`Error Getting data in ${repoName}`, error);
    throw error;
  }
};

const getBasicLogoPlaneDataInRepo = () => getLogoPlanesRepo(logoBasicPlaneRepository, "getLogoBasicPlaneDataInRepo");
const getStandardLogoPlaneDataInRepo = () => getLogoPlanesRepo(logoStandardPlaneRepository, "getLogoStandardPlaneDataInRepo");
const getPremiumLogoPlaneDataInRepo = () => getLogoPlanesRepo(logoPremiumPlaneRepository, "getLogoPremiumPlaneDataInRepo");
const getBusinnessLogoPlaneDataInRepo = () => getLogoPlanesRepo(logoBusinessPlaneRepository, "getLogoBusinessPlaneDataInRepo");


const getLogoPlanesRepoByID = async (repository, repoName,clientId) => {
  try {
    const getData = await repository.find({where:{clientId}});
    logger.info(`src > repository > getPlanesRepoByID > ${repoName}`, getData);
    return getData;
  } catch (error) {
    logger.error(`Error Getting data in ${repoName}`, error);
    throw error;
  }
};

const getBasicLogoPlaneDataByIDInRepo = (clientId) => getLogoPlanesRepoByID(logoBasicPlaneRepository, "getBasicPlaneDataInRepo",clientId);
const getStandardLogoPlaneDataByIDInRepo = (clientId) => getLogoPlanesRepoByID(logoStandardPlaneRepository, "getStandardPlaneDataInRepo",clientId);
const getPremiumLogoPlaneDataInByIDRepo = (clientId) => getLogoPlanesRepoByID(logoPremiumPlaneRepository, "getPremiumPlaneDataInRepo",clientId);
const getBusinessLogoPlaneDataInByIDRepo = (clientId) => getLogoPlanesRepoByID(logoBusinessPlaneRepository, "getBusinessPlaneDataInRepo",clientId);



const DeleteAppPlanesRepoByID = async (repository, repoName, id, clientId) => {
  try {
    const getData = await repository.findOne({ where: { id, clientId } });
    logger.info(`src > repository > DeleteAppPlanesRepoByID > ${repoName}`, getData);

    if (getData) {
      const delRec = await repository.delete({ id, clientId });
      logger.info(`Record deleted successfully in ${repoName}`, delRec);
      return { success: true, message: `Record deleted successfully`, data: delRec };
    } else {
      return { success: false, message: `Data not found with id ${id} and clientId ${clientId}` };
    }
  } catch (error) {
    logger.error(`Error deleting data in ${repoName}`, error);
    throw error;
  }
};

const deleteBasicLogoPlaneDataInRepoByID = (id, clientId) => DeleteAppPlanesRepoByID(logoBasicPlaneRepository, "deleteBasicLogoPlaneDataInRepoByID", id, clientId);
const deleteStandardLogoPlaneDataInRepoByID = (id, clientId) => DeleteAppPlanesRepoByID(logoStandardPlaneRepository, "DeleteLogoStandardPlaneDataInRepoByID", id, clientId);
const deletePremiumLogoPlaneDataInRepoById = (id, clientId) => DeleteAppPlanesRepoByID(logoPremiumPlaneRepository, "DeleteLogoPremiumPlaneDataInRepoByID", id, clientId);
const deleteBusinessLogoPlaneDataInRepoById = (id, clientId) => DeleteAppPlanesRepoByID(logoBusinessPlaneRepository, "DeleteLogoBusinessPlaneDataInRepoByID", id, clientId);



const updateAppPlanesRepoByID = async (repository, repoName, id, clientId,data) => {
  try {
    const getData = await repository.findOne({ where: { id, clientId } });
    logger.info(`src > repository > updateAppPlanesRepoByID > ${repoName}`, getData);

    if (getData) {
      const updatingData=await repository.update({ id, clientId },data);
      console.log("Updating data",updatingData)
      const UpdatedData=await repository.findOne({where:{id,clientId}})
      logger.info(`Record Updated successfully in ${repoName}`,UpdatedData);
      return { success: true, message: `Record Updated successfully`, data: UpdatedData };
    } else {
      return { success: false, message: `Data not found with id ${id} and clientId ${clientId}` };
    }
  } catch (error) {
    logger.error(`Error deleting data in ${repoName}`, error);
    throw error;
  }
};

const updateBasicLogoPlaneDataInRepoByID = (id, clientId,data) => updateAppPlanesRepoByID(logoBasicPlaneRepository, "updateBasicLogoPlaneDataInRepoByID", id, clientId,data);
const updateStandardLogoPlaneDataInRepoByID = (id, clientId,data) => updateAppPlanesRepoByID(logoStandardPlaneRepository, "updateLogoStandardPlaneDataInRepoByID", id, clientId,data);
const updatePremiumLogoPlaneDataInRepoById = (id, clientId,data) => updateAppPlanesRepoByID(logoPremiumPlaneRepository, "updateLogoPremiumPlaneDataInRepoByID", id, clientId,data);
const updateBusinessLogoPlaneDataInRepoById = (id, clientId,data) => updateAppPlanesRepoByID(logoBusinessPlaneRepository, "updateLogoBusinessPlaneDataInRepoByID", id, clientId,data);


module.exports = {
  logoBasicPlaneRepo, logoStandardPlaneRepo,logoPremiumPlaneRepo,logoBusinessPlaneRepo,

  getBasicLogoPlaneDataInRepo,getStandardLogoPlaneDataInRepo,getPremiumLogoPlaneDataInRepo,getBusinnessLogoPlaneDataInRepo,

  getBasicLogoPlaneDataByIDInRepo,getStandardLogoPlaneDataByIDInRepo,getPremiumLogoPlaneDataInByIDRepo,getBusinessLogoPlaneDataInByIDRepo,

  deleteBasicLogoPlaneDataInRepoByID,deleteStandardLogoPlaneDataInRepoByID,deletePremiumLogoPlaneDataInRepoById,deleteBusinessLogoPlaneDataInRepoById,
  updateBasicLogoPlaneDataInRepoByID,updateStandardLogoPlaneDataInRepoByID,updatePremiumLogoPlaneDataInRepoById,updateBusinessLogoPlaneDataInRepoById
};
