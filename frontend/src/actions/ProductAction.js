import {
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESSS, 
    PRODUCT_LIST_FAIL, 

    PRODUCT_DETAIL_REQUEST, 
    PRODUCT_DETAIL_SUCCESSS, 
    PRODUCT_DETAIL_FAIL

} from '../constants/ProductConstants'
import axios from 'axios'

export const listProducts = () => async (dispatch) => {
    
    try {
        dispatch({type: PRODUCT_LIST_REQUEST})

        const {data} = await axios.get('/api/products/')

        dispatch({type: PRODUCT_LIST_SUCCESSS, payload: data})
    } catch (error){
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.response && error.response.data.detail ? 
                                            error.response.data.detail: error.message})
    }
}


export const listProductDetail = (id) => async (dispatch) => {
    
    try {
        dispatch({type: PRODUCT_DETAIL_REQUEST})

        const {data} = await axios.get(`/api/products/${id}`)

        dispatch({type: PRODUCT_DETAIL_SUCCESSS, payload: data})
    } catch (error){
        dispatch({type: PRODUCT_DETAIL_FAIL, payload: error.response && error.response.data.detail ? 
                                            error.response.data.detail: error.message})
    }
}
