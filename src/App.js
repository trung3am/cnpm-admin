import './App.css';
import LoginPage from './pages/login';
import {connect} from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import { updateUser } from './store/action.reducer';
import MenuPage from './pages/menu';
import CreateFood from './pages/create-food';
import TablePage from './pages/table';
import CreateTable from './pages/create-table';
import Order from './pages/order';
import EditFood from './pages/edit-food';
import EditTable from './pages/edit-table';
import EditOrder from './pages/edit-order';
const App=(props)=> {
  const logOut = () => {
    props.updateUser({username:null,token:null})
  }
  return (
    <Router>
      <div className='App'>
        
        Restaurant management
        {props.user.token ? <button onClick={logOut} >Log Out</button> : <p>Please login</p>}
        {props.user.token ? <div><Link to='/menu'> Menu </Link></div> : <p></p>}
        {props.user.token ? <Link to='/createfood'> createfood </Link> : <p></p>}
        {props.user.token ? <div><Link to='/table'> Table </Link></div> : <p></p>}
        {props.user.token ? <Link to='/createtable'> createtable </Link> : <p></p>}
        <div>{props.user.token ? <Link to='/order'> check order </Link> : <p></p>}</div>
        

        <Routes>
          <Route path ='/' element = {
            !props.user.token ? <Navigate replace to ='/login'/> : <p></p>
          }/>
          <Route path='/login'  element = {
            props.user.token ? <Navigate replace to ='/'/> : 
            <LoginPage/>
          }/>
          <Route path='/menu' element = {
            !props.user.token ? <Navigate replace to ='/login'/> : 
            <MenuPage/>
          }/>
          <Route path='/table' element = {
            !props.user.token ? <Navigate replace to ='/login'/> : 
            <TablePage/>
          }/>
          <Route path='/createfood' element = {
            !props.user.token ? <Navigate replace to ='/login'/> : 
            <CreateFood/>
          }/>
          <Route path='/createtable' element = {
            !props.user.token ? <Navigate replace to ='/login'/> : 
            <CreateTable/>
          }/>
          <Route path='/order' element = {
            !props.user.token ? <Navigate replace to ='/login'/> : 
            <Order/>
          }/>
          <Route path='/food/edit/:id' element = {
            !props.user.token ? <Navigate replace to ='/login'/> : 
            <EditFood/>
          }/>
          <Route path='/table/edit/:id' element = {
            !props.user.token ? <Navigate replace to ='/login'/> : 
            <EditTable/>
          }/>
          <Route path='/order/edit/:id' element = {
            !props.user.token ? <Navigate replace to ='/login'/> : 
            <EditOrder/>
          }/>
        </Routes>
      </div>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => dispatch(updateUser(user))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
