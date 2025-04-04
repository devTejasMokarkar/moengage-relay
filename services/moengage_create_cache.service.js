const HttpException = require("../exceptions/HttpException.js");
const axios = require("axios");
const { CACHE_URL } = require('../config');

const moengage_create_cache_service = async () => {
    try {
        let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: CACHE_URL,
        };
        
     return await  axios.request(config)
        .then((response) => {
          return response.data;
        })
       
    } catch (error) {
        throw new HttpException(400, error.message, 'moengage_send_callback_response.service.js  moengage_send_callback_response_service');
    }
}

module.exports = { moengage_create_cache_service }