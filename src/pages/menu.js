// onClick={sendData}
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import GetMenuApi from "../api/getMenu-api";

import { updateMenu, updateRefresh } from "../store/action.reducer";


const MenuPage = (props) => {
  
  async function getMenu() {
    const res = await GetMenuApi();
    props.updateMenu(res.data);
    props.updateRefresh(Date.now());
    window.location.reload()
  }

  if(!props.refresh || props.refresh + 5000 < Date.now()) getMenu();
  
  return (
    <div className="menu-page">
      <table border="2px">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Type</th>
          <th>Description</th>
          <th>Price</th>
          <th>Image</th>
          <th>Edit</th>
        </tr>
        {props.menu.map((i)=>{
          return(
            <tr>
              <td>{i.id}</td>
              <td>{i.name}</td>
              <td>{i.type}</td>
              <td>{i.description}</td>
              <td>{i.price}</td>
              <td><img src={i.image} alt="foodimg" width="200px" height="200px"></img></td>
              <td><Link replace to={`/food/edit/${i._id}`} >Edit food</Link></td>
            </tr>
          )
        })}
      </table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    menu : state.restaurant.menu,
    refresh : state.restaurant.refresh
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    updateMenu : (menu) => dispatch(updateMenu(menu)),
    updateRefresh: (refresh) => dispatch(updateRefresh(refresh))
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(MenuPage);