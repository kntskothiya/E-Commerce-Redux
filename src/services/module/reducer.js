import * as actionTypes from "./actionTypes";

const initialstate = {
  loading: false,
  error: "",
  data: [],
};

export const moduleReducers = (state = initialstate, action) => {
  switch (action.type) {
    case actionTypes.PRODUCTS: {
      return { ...initialstate, loading: true, error: "", data: [] };
    }
    case actionTypes.PRODUCTS_SUCCESS: {
      return { ...initialstate, loading: false, data: action.payload };
    } 
    case actionTypes.PRODUCTS_FAILED: {
      return { ...initialstate, loading: false, error: action.payload };
    }
    case actionTypes.REMOVE_ITEM: {
      return {
        ...state,
        data: state.data.filter((item) => item.id !== action.payload),
      };
    }
    case actionTypes.ADD_TO_CART: {
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    }
    case actionTypes.UPDATE_QUANTITY: {
      return {
        ...state,
        data: state.data.map((item) => {
          if (item.id === action.payload.itemId) {
            return { ...item, quantity: action.payload.newQuantity };
          }
          return item;
        }),
      };
    }
    default: {
      return state;
    }
  }
};
