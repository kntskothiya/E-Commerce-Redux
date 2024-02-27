import * as actionTypes from "./actionTypes"
import axios from "../../utils/axios"
import { cartURL } from "../../config/url"

export const fetchProducts = () => {
    return (dispatch) => {
        dispatch({ type: actionTypes.PRODUCTS });
        axios.get(cartURL)
            .then((response) => {
                dispatch({
                    type: actionTypes.PRODUCTS_SUCCESS,
                    payload: response.data
                })
            })
            .catch((error) => {
                dispatch({
                    type: actionTypes.PRODUCTS_FAILED,
                    payload: error?.response?.data?.error || error.message
                })
            })
    }
}

export const updateQuantity = (itemId, newQuantity) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.UPDATE_QUANTITY,
            payload: { itemId, newQuantity }
        });

        axios.patch(`${cartURL}/${itemId}`, { quantity: newQuantity })
            .then(response => {
                console.log("Quantity updated : ", response.data);
            })
            .catch(error => {
                console.error("Error updated : ", error);
            });
    };
};

export const removeFromCart = (itemId) => ({
    type: actionTypes.REMOVE_ITEM,
    payload: itemId,
});

export const addToCart = (item) => ({
    type: actionTypes.ADD_TO_CART,
    payload: item,
});


