import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import {productListReducer, productDetailReducer } from './reducers/ProductReducer'
import { cartReducer } from './reducers/CartReducer'
import { userLoginReducer, userRegisterReducer, userDetailReducer, userUpdateProfileReducer} from './reducers/UserReducer'

const reducer = combineReducers({
    productList: productListReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister:userRegisterReducer, 
    userDetail: userDetailReducer,
    userUpdateProfile: userUpdateProfileReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? 
                          JSON.parse(localStorage.getItem('cartItems')): []
                          
const userInfoFromStorage = localStorage.getItem('userInfo') ? 
                          JSON.parse(localStorage.getItem('userInfo')): null

const initialState = { cart: { cartItems: cartItemsFromStorage}, 
                       userLogin: {userInfo: userInfoFromStorage}
                     }

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store