import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
//tells redux-persist that we're going to use local storage
//session storage would be sessionStorage
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';

const persistConfig = {
  key: 'root',
  storage,
  //an array containing string names of any reducers that you want to store
  whitelist: ['cart']
}

//set combineReducers to a variable so that we can wrap the reducers in the persist object
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer
});

export default persistReducer(persistConfig, rootReducer);