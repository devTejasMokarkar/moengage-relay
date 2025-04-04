const HttpException = require("../exceptions/HttpException.js");
const { logger } = require("../utils/logger");
const { moengage_create_cache_service } = require('./moengage_create_cache.service.js')
const IORedis = require('../utils/ioredis.js');
const { KEY } = require('../config');

const moengage_get_dlr_service = async (wabaNumber) => {
    try {
        // Check if wabaNumber exists in Redis
        const cachedUrl = await IORedis.hget(KEY, wabaNumber);

        if (cachedUrl) {
            // If URL is found in Redis, return it
            //logger.info(`Cache hit for wabaNumber: ${wabaNumber}`);
            return cachedUrl;
        }


        const data = await moengage_create_cache_service(wabaNumber);

        if (data) {
            const foundDLR = data.data.find(entry => entry.wabaNumber === wabaNumber)?.DLR;
            if (foundDLR) { return foundDLR }
            else {
                return null
            }
        }

        // If not found in either Redis or DB, return null
        logger.warn(`No URL found for wabaNumber: ${wabaNumber}`);
        return null;
    } catch (error) {
        // Log the error and throw it as an HttpException
        logger.error(`Error in fetching DLR URL for wabaNumber: ${wabaNumber}, Error: ${error.message}`);
        throw new HttpException(400, error.message, 'moengage_send_callback_response.service.js  moengage_send_callback_response_service');
    }
};

module.exports = { moengage_get_dlr_service };