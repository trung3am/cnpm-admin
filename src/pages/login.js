// onClick={sendData}
import React, { useState } from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import LoginApi from "../api/login-api";
import { updateUser } from "../store/action.reducer";
// import { connect } from "react-redux";

const LoginPage = (props) => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [disabled, setdisabled] = useState(false);
  
  const sendData = async () => {
    setdisabled(true)
    if (username !== "" && password !== "" ) {
      
      const res = await LoginApi(username, password);
      if (!res || res.status!== 200) {
          alert("invalid login")
          setdisabled(false)
          return
      }
      props.updateUser({username:username, token:res.data})
      // props.updateToken(res.data.token)
    } else {
      alert("username are must !");
      setdisabled(false)
      window.location.reload();
    }
  };

  // if (props.isReloaded !== false) {
  //   props.setReload()
  //   window.location.reload()
  // }

  return (
    <div className="login-page">
      <h1>Log in with admin</h1>
      <p>username:</p>
      <input type="username" 
        placeholder="username"
        value={username}
        onChange={(e) => setusername(e.target.value)}
      ></input>
      <p>password:</p>
      <input
      type='password'
        placeholder="password"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
      ></input>
      
      <button onClick={sendData} disabled={disabled}>Join</button>
    </div>
  )
}

const mapDispatchToProps = (dispatch)=>{
  return {
    updateUser : (user) => dispatch(updateUser(user))
  }
}


export default connect(null,mapDispatchToProps)(LoginPage);