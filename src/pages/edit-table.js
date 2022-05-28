import { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import EditTableApi from "../api/editTable-api";


const EditTable = (props) => {
  const id = window.location.href.split('/')[5];
  let table = {}
  props.tables.forEach(e => {
    if(e._id === id) table = e;
  });
  if(!table) window.location.replace('http://localhost:3000/table')

  const [areaId, setAreaId] = useState(table.areaId);
  const [status, setStatus] = useState(table.status);
  const [maxGuest, setmaxGuest] = useState(table.maxGuest);
  const [disabled, setdisabled] = useState(false);
  const sendData = async () => {
    setdisabled(true)
    let stable = {
      _id: table._id,
      areaId:areaId,
      maxGuest:maxGuest,
      status: status,
    }
    const res = await EditTableApi(props.token, stable);
    if(!res || res.status !== 200){
      alert("failed to create!")
      setdisabled(false)
      return;
    } else {
      alert('OK');
      setdisabled(true)
      window.location.replace('http://localhost:3000/table')
    }


  }

  return(
    <div className="create-food">
      <Link to='/table'>back to table</Link>
      <h1>edit some table</h1>
      <h2>ID: {table.id}</h2>
      <p>areaId:</p>
      <input type="areaId" 
        placeholder="areaId"
        value={areaId}
        onChange={(e) => setAreaId(e.target.value)}
      ></input>
      <p>status:</p>
      <input type="status" 
        placeholder="status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      ></input>
      
      <p>maxGuest:</p>
      <input
      type='number'
        placeholder="maxGuest"
        value={maxGuest}
        onChange={(e) => setmaxGuest(e.target.value)}
      ></input>
      
      
      <button onClick={sendData} disabled={disabled}>Edit table</button>
    
    </div>
    
  )
}

const mapStateToProps = (state) => {
  return {
    token : state.user.currentUser.token,
    tables : state.restaurant.tables
  }
}

export default connect(mapStateToProps)(EditTable);