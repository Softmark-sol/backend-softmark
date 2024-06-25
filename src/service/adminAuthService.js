const bcrypt = require('bcrypt');
const redis = require('../infrastructure/redis');
const authRepository = require('../repository/authRepository');
const { logger } = require('../../logger');

const adminService = {
  login: async (adminData) => {
    try {
      const { userName, password } = adminData;
      const admin = await authRepository.findByUserName(userName);

      if (admin) {
        const match = await bcrypt.compare(password, admin.password);
        if (match) {
          logger.info('Admin Login Success');
          return { userName: admin.userName,password:admin.password };
        }
      }

      logger.warn('Admin Login Failed');
      return null;
    } catch (error) {
      logger.error('Error during admin login', error);
      throw error;
    }
  },

  saveResetCode: async (email, code) => {
    try {
      await redis.set(`${email}:resetCode`, code, 'EX', 3600); // Code expires in 1 hour
    } catch (error) {
      logger.error('Error saving reset code to Redis', error);
      throw error;
    }
  },
  
  storeAdminToken: async (token, userName) => {
    try {
      const storeAdminToken= await redis.set(`admin:${userName}`, token, 'EX', 3600); // Token expires in 1 hour
      console.log("Store Admin Token",storeAdminToken)
    } catch (error) {
      logger.error('Error saving admin token to Redis', error);
      throw error;
    }
  },
  
  validateAdminToken: async (token, userName) => {
    try {
      const storedToken = await redis.get(`admin:${userName}`);
      console.log("Store Token",storedToken)
      return storedToken === token;
    } catch (error) {
      logger.error('Error validating admin token from Redis', error);
      throw error;
    }
  },

  logout: async (userName) => {
    try {
      const result = await redis.del(`admin:${userName}`);
      logger.info('Admin Logout Success');
      return result === 1;
    } catch (error) {
      logger.error('Error during admin logout', error);
      throw error;
    }
  },

  validateResetCode: async (email, code) => {
    try {
      const storedCode = await redis.get(`${email}:resetCode`);
      return storedCode === code;
    } catch (error) {
      logger.error('Error validating reset code from Redis', error);
      throw error;
    }
  },

  updatePassword: async (email, newPassword) => {
    try {
      const admin = await authRepository.findByEmail(email);

      if (admin) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        admin.password = hashedPassword;
        await authRepository.save(admin);
        return true;
      }

      return false;
    } catch (error) {
      logger.error('Error updating password', error);
      throw error;
    }
  }
};

module.exports = adminService;