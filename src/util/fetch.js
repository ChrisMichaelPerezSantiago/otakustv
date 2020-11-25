const axios = require('axios').default;

axios.defaults.baseURL = 'https://www.otakustv.com';

const req = async(url) =>{
  return new Promise(async(resolve, reject) =>{
    try {
      const { data } = await axios.get(url);
      resolve(data);
    } catch (error) {
      const err = new Error(error);
      reject(err);
    }
  });
};

module.exports = {
  req
};