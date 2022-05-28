const initialState = {
  menu: [],
  tables: [],
  order: [],
  refresh: 123
}

export const RestaurantReducer = (state =initialState, action) => {
  switch (action.type) {
    case "UPDATE_MENU":
      return{
        ...state,
        menu: action.menu
      }
    
    case "UPDATE_TABLE":
      return{
        ...state,
        tables: action.tables
      }
      
    case "UPDATE_REFRESH":
      return{
        ...state,
        refresh: action.refresh
      }
    
    case "UPDATE_ORDER":
      return{
        ...state,
        order: action.order
      }
    default:
      return state;
  }
}