const initialState = {
  currentUser: {
    username: null,
    token: null,
  }
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER":
      return {
        ...state,
        currentUser: action.user,
      };
      
    case "LOGOUT":
      return {
        ...state,
        currentUser: {
          username: null,
          token: null,
        }
      }
    default:
      return state;
      
  }
}