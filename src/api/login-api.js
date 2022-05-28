const url = require('../svr-url')
const axios = require('axios');

const LoginApi = async (username, password) => {

    var data = JSON.stringify({
        username: username,
        
        password: password
      });
      
      var config = {
        method: 'post',
        url: url + "/login",
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

export default LoginApi;