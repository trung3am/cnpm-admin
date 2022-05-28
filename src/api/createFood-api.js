const url = require('../svr-url')
const axios = require('axios');

const CreateFoodApi = async (token, food) => {

    var data = JSON.stringify({
        food: food,
        token: token
      });

      var config = {
        method: 'post',
        url: url + "/createfood",
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

export default CreateFoodApi;