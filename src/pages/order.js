import { connect } from "react-redux";
import { Link } from "react-router-dom";
import GetOrderApi from "../api/getOrder-api";

import { updateOrder, updateRefresh } from "../store/action.reducer";


const OrderPage = (props) => {
  
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
    refresh : state.restaurant.refresh
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    updateOrder : (order) => dispatch(updateOrder(order)),
    updateRefresh: (refresh) => dispatch(updateRefresh(refresh))
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(OrderPage);