import { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CreateTableApi from "../api/createTable-api";


const CreateTable = (props) => {
  const [areaId, setAreaId] = useState("");
  
  const [maxGuest, setmaxGuest] = useState("");
  const [disabled, setdisabled] = useState(false);
  const sendData = async () => {
    setdisabled(true)
    let table = {
      areaId:areaId,
      maxGuest:maxGuest,
    }
    const res = await CreateTableApi(props.token, table);
    if(!res || res.status !== 200){
      alert("failed to create!")
      setdisabled(false)
      return;
    } else {
      alert('OK');
      setdisabled(true)
      
      setAreaId("");
      setmaxGuest("");
    }


  }

  return(
    <div className="create-food">
      
      <h1>Make some table</h1>
      <Link to='/table'>back to table</Link>
      <p>areaId:</p>
      <input type="areaId" 
        placeholder="areaId"
        value={areaId}
        onChange={(e) => setAreaId(e.target.value)}
      ></input>
      
      <p>maxGuest:</p>
      <input
      type='number'
        placeholder="maxGuest"
        value={maxGuest}
        onChange={(e) => setmaxGuest(e.target.value)}
      ></input>
      
      
      <button onClick={sendData} disabled={disabled}>Create table</button>
    
    </div>
    
  )
}

const mapStateToProps = (state) => {
  return {
    token : state.user.currentUser.token
  }
}

export default connect(mapStateToProps)(CreateTable);