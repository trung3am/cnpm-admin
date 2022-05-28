import { combineReducers } from "redux";
import { RestaurantReducer } from "./restaurant.reducer";
import { userReducer } from "./user.reducer";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
const combined = combineReducers({
  user: userReducer,
  restaurant: RestaurantReducer
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user','restaurant']
}

export const persistedReducer = persistReducer(persistConfig,combined)