export const updateUser = (user) => { 
  return{
    type: "USER",
    user
  }
}

export const logOut = () => {
  return{
    type: "LOGOUT"
  }
}

export const updateMenu = (menu) => {
  return{
    type: "UPDATE_MENU",
    menu
  }
}

export const updateTable = (tables) => {
  return{
    type: "UPDATE_TABLE",
    tables
  }
}

export const updateOrder = (order) => {
  return{
    type: "UPDATE_ORDER",
    order
  }
}

export const updateRefresh = (refresh) =>{
  return {
    type: "UPDATE_REFRESH",
    refresh
  }
}