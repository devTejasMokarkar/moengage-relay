const HttpException = require("../exceptions/HttpException.js");
const axios = require("axios");
const { logger } = require("../utils/logger");

const moengage_send_callback_response_service = async (url, wamid, wabaNumber,payload) => {
    try {
        let data = payload;
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: url,
          data : data
        };
        
     return await  axios.request(config)
        .then((response) => {
          logger.info(`${wabaNumber}:moengage_send_callback_response_service ::: url: ${url} ::: wamid: ${wamid} ::: payload: ${JSON.stringify(payload)} ::: response: ${JSON.stringify(response.data)}`);
          return response.data;
        })
       
    } catch (error) {
          logger.info(`${wabaNumber}:moengage_send_callback_response_service ::: url: ${url} ::: wamid: ${wamid} ::: payload: ${JSON.stringify(payload)} ::: Error Status Code: ${JSON.stringify(error.response.status)} ::: Error Response: ${error.response.statusText}`);
      return error;
    }
}

module.exports = { moengage_send_callback_response_service }
