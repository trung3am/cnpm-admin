const url = require('../svr-url')
const axios = require('axios');

const EditTableApi = async (token, table) => {

    var data = JSON.stringify({
        table: table,
        token: token
      });

      var config = {
        method: 'put',
        url: url + "/table/edit",
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
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

export default EditTableApi;