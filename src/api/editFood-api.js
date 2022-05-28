const url = require('../svr-url')
const axios = require('axios');

const EditFoodApi = async (token, food) => {

    var data = JSON.stringify({
        food: food,
        token: token
      });

      var config = {
        method: 'put',
        url: url + "/food/edit",
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      console.log(data)
      try {
        const res = await axios(config)
        console.log(res)
        return res;
      } catch (e) {
          console.log(e)
          return e
      }

}

export default EditFoodApi;