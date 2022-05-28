// onClick={sendData}
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import GetTableApi from "../api/getTable-api";


import { updateTable, updateRefresh } from "../store/action.reducer";


const TablePage = (props) => {
  
  async function getTable() {
    const res = await GetTableApi();
    props.updateTable(res.data);
    props.updateRefresh(Date.now());
    window.location.reload()
  }
  

  if(!props.refresh || props.refresh + 5000 < Date.now()) getTable();
  
  return (
    <div className="table-page">
      <table border="2px">
        <tr>
          <th>ID</th>
          <th>AreaId</th>
          <th>Max Guest</th>
          <th>Available</th>
          <th>Edit</th>
        </tr>
        {props.table.map((i)=>{
          return(
            <tr>
              <td>{i.id}</td>
              <td>{i.areaId}</td>
              <td>{i.maxGuest}</td>
              <td>{i.status ? "true" : "false"}</td>
              <td><Link to={`/table/edit/${i._id}`}>Edit table</Link></td>
            </tr>
          )
        })}
      </table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    table : state.restaurant.tables,
    refresh : state.restaurant.refresh
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    updateTable : (table) => dispatch(updateTable(table)),
    updateRefresh: (refresh) => dispatch(updateRefresh(refresh))
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(TablePage);