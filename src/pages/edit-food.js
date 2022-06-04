import { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import EditFoodApi from "../api/editFood-api";


const EditFood = (props) => {
  const id = window.location.href.split('/')[5];
  let food = {}
  props.food.forEach(e => {
    if(id === e._id) food = e;
    
  });
  
  const [name, setname] = useState(food.name);
  const [description, setdescription] = useState(food.description);
  const [price, setprice] = useState(food.price);
  const [imageurl, setimageurl] = useState(food.image);
  const [type, settype] = useState(food.type);
  const [disabled, setdisabled] = useState(false);
  
  if(food ==={}){
    window.location.replace("http://localhost:3000/menu");
  }
  const sendData = async () => {
    setdisabled(true)
    let sfood = {
      _id: food._id,
      name:name,
      description:description,
      price:price,
      type:type,
      image:imageurl
    }
    const res = await EditFoodApi(props.token, sfood);
    if(!res || res.status !== 200){
      alert("failed to create!")
      setdisabled(false)
      return;
    } else {
      alert('OK');
      setdisabled(true)
      window.location.replace("http://localhost:3000/menu")
    }


  }

  return(
    <div className="edit-food">
      <Link to='/menu'>back to menu</Link>
      <h1>edit some food</h1>
      <h2>ID: {food.id}</h2>
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
      
      <button onClick={sendData} disabled={disabled}>update food</button>
    
    </div>
    
  )
}

const mapStateToProps = (state) => {
  return {
    token : state.user.currentUser.token,
    food : state.restaurant.menu
  }
}

export default connect(mapStateToProps)(EditFood);