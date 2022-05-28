const url = require('../svr-url')
const axios = require('axios');

const GetMenuApi = async () => {

      
      var config = {
        method: 'get',
        url: url + "/menu",
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

export default GetMenuApi;