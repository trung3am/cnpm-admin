import { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CreateFoodApi from "../api/createFood-api";


const CreateFood = (props) => {
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [imageurl, setimageurl] = useState("");
  const [type, settype] = useState("");
  const [disabled, setdisabled] = useState(false);
  const sendData = async () => {
    setdisabled(true)
    let food = {
      name:name,
      description:description,
      price:price,
      type:[type],
      image:imageurl
    }
    const res = await CreateFoodApi(props.token, food);
    if(!res || res.status !== 200){
      alert("failed to create!")
      setdisabled(false)
      return;
    } else {
      alert('OK');
      setdisabled(true)
      setdescription("");
      setname("");
      setprice("");
      settype("");
      setimageurl("");
    }


  }

  return(
    <div className="create-food">
      
      <h1>Make some foooooooooooooooood</h1>
      <Link to='/menu'>back to menu</Link>
      <p>name:</p>
      <input type="name" 
        placeholder="name"
        value={name}
        onChange={(e) => setname(e.target.value)}
      ></input>
      <p>description:</p>
      <input
      type='description'
        placeholder="description"
        value={description}
        onChange={(e) => setdescription(e.target.value)}
      ></input>
      <p>price:</p>
      <input
      type='number'
        placeholder="price"
        value={price}
        onChange={(e) => setprice(e.target.value)}
      ></input>
      <p>imageurl:</p>
      <input
      type='url'
        placeholder="imageurl"
        value={imageurl}
        onChange={(e) => setimageurl(e.target.value)}
      ></input>
      <p>type:</p>
      <input
      type='text'
        placeholder="type"
        value={type}
        onChange={(e) => settype(e.target.value)}
      ></input>
      
      <button onClick={sendData} disabled={disabled}>Create food</button>
    
    </div>
    
  )
}

const mapStateToProps = (state) => {
  return {
    token : state.user.currentUser.token
  }
}

export default connect(mapStateToProps)(CreateFood);