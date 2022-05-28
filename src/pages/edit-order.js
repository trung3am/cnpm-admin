import { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import EditOrderApi from "../api/editOrder-api";


const EditOrder = (props) => {
  const id = window.location.href.split('/')[5];
  let order = {}
  props.orders.forEach(e => {
    if(e._id === id) order = e;
  });
  if(!order) window.location.replace('http://localhost:3000/order')

  const [username, setusername] = useState(order.username);
  const [status, setStatus] = useState(order.status);
  const [disabled, setdisabled] = useState(false);
  const sendData = async () => {
    setdisabled(true)
    let sorder = {
      _id: order._id,
      username:username,
      status: status,
    }
    console.log(sorder)
    const res = await EditOrderApi(props.token, sorder);
    if(!res || res.status !== 200){
      alert("failed to create!")
      setdisabled(false)
      return;
    } else {
      alert('OK');
      setdisabled(true)
      window.location.replace('http://localhost:3000/order')
    }


  }

  return(
    <div className="create-food">
      <Link to='/order'>back to order</Link>
      <h1>edit some order</h1>
      <h2>ID: {order.id}</h2>
      <p>username:</p>
      <input type="username" 
        placeholder="username"
        value={username}
        onChange={(e) => setusername(e.target.value)}
      ></input>
      <p>status:</p>
      <input type="status" 
        placeholder="status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      ></input>
      
      <button onClick={sendData} disabled={disabled}>Edit order</button>
    
    </div>
    
  )
}

const mapStateToProps = (state) => {
  return {
    token : state.user.currentUser.token,
    orders : state.restaurant.order
  }
}

export default connect(mapStateToProps)(EditOrder);