const url = require('../svr-url')
const axios = require('axios');

const EditOrderApi = async (token, order) => {

    var data = JSON.stringify({
        order: order,
        token: token
      });

      var config = {
        method: 'put',
        url: url + "/order/edit",
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

export default EditOrderApi;