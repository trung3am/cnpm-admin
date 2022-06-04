import { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import EditOrderApi from "../api/editOrder-api";
import GetOrderApi from "../api/getOrder-api";

import { updateOrder, updateRefresh } from "../store/action.reducer";


const OrderPage = (props) => {
  const [disabled, setdisabled] = useState(false);

  const confirmOrder = async (order) =>{
    order.status = "CONFIRMED";
    const res = await EditOrderApi(props.token, order);
    if(!res || res.status !== 200){
      alert("fail to confirmed");
      setdisabled(false);
      return;
    } else{
      alert("OK");
      await getOrder();
      // window.location.reload();
    }


  }
  
  async function getOrder() {
    const res = await GetOrderApi();
    props.updateOrder(res.data);
    props.updateRefresh(Date.now());
    window.location.reload()
  }
  if(!props.refresh || props.refresh + 5000 < Date.now()) getOrder();
  
  return (
    <div className="menu-page">
      <Link to='/createfood'>Create new food</Link>
      <table border="2px">
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Status</th>
          <th>Total</th>
          <th>Food</th>
          <th>Edit</th>
          <th>Confirmation</th>
          <th>Created At</th>
        </tr>
        {props.order.map((i)=>{
          return(
            <tr>
              <td>{i.id}</td>
              <td>{i.username}</td>
              <td>{i.status}</td> 
              <td>{i.total}</td>
              <td>
                <table border="2px">
                {i.food.map((e)=>{
                  return(
                    <tr>
                    <td>{e.name}</td>
                    <td>{e.price}</td>
                    <td>{e.quantity}</td>
                    </tr>
                  )
                })}
                </table>
              </td>
              <td><Link to={`/order/edit/${i._id}`}>Edit order</Link></td>
              <td>{i.status === "PENDING" ? <button onClick={()=> confirmOrder(i)} disabled={disabled}>confirm order</button> : "confirmed"}</td>
              <td>{i.createdAt}</td>
            </tr>
          )
        })}
      </table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    order : state.restaurant.order,
    refresh : state.restaurant.refresh,
    token : state.user.currentUser.token
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    updateOrder : (order) => dispatch(updateOrder(order)),
    updateRefresh: (refresh) => dispatch(updateRefresh(refresh))
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(OrderPage);