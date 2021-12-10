import {
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESSS, 
    PRODUCT_LIST_FAIL, 

    PRODUCT_DETAIL_REQUEST, 
    PRODUCT_DETAIL_SUCCESSS, 
    PRODUCT_DETAIL_FAIL
} from '../constants/ProductConstants'

export const productListReducer = (state = {products:[]}, action) => {

    switch(action.type){
        case PRODUCT_LIST_REQUEST: 
                return { loading: true, products: []}
        case PRODUCT_LIST_SUCCESSS:
                return {loading: false, products: action.payload}
        case PRODUCT_LIST_FAIL:
                return {loading: false, error: action.payload}
        default: return state;

    }
}


export const productDetailReducer = (state = {product:[]}, action) => {

    switch(action.type){
        case PRODUCT_DETAIL_REQUEST: 
                return { loading: true, product: []}
        case PRODUCT_DETAIL_SUCCESSS:
                return {loading: false, product: action.payload}
        case PRODUCT_DETAIL_FAIL:
                return {loading: false, error: action.payload}
        default: return state;

    }
}



