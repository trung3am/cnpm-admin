const url = require('../svr-url')
const axios = require('axios');

const GetTableApi = async () => {

      
      var config = {
        method: 'get',
        url: url + "/table",
        headers: { 
          'Content-Type': 'application/json'
        },
        
      };
      
      try {
        const res = await axios(config)
        console.log(res)
        return res;
      } catch (e) {
          console.log(e)
          return e
      }

}

export default GetTableApi;