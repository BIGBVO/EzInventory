import { PRODUCT_ADDED, GET_PRODUCT, GET_PRODUCT_LOADED, GET_ALL_PRODUCTS, GET_PRODUCT_FAIL,  GET_ALL_PRODUCTS_LOADED, UPDATE_PRODUCT, PRODUCT_UPDATED,
         DELETE_PRODUCT, PRODUCT_DELETED } from '../actions/types.js';


//products reducer
const initialState = {
  products: [],
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    
    case GET_PRODUCT:
    case GET_ALL_PRODUCTS:
    case UPDATE_PRODUCT:
    case DELETE_PRODUCT:
        return {
          ...state,
          isLoading: true,
        };
        
    case PRODUCT_ADDED:
        return {
          ...state,
          products: [...state.products, action.payload],
          isLoading: false,
        };

    case GET_ALL_PRODUCTS_LOADED:
      return {
        ...state,
        products: action.payload,
        isLoading: false,
      };

    case GET_PRODUCT_LOADED:
    case PRODUCT_UPDATED:
      return {
        ...state,
        products: [action.payload],
        isLoading: false,
      };

    case GET_PRODUCT_FAIL:
      return {
        ...state,
        isLoading: false,
      }

    case PRODUCT_DELETED:
      return {
        ...state,
        products: state.products.filter((product) => product.product_code !== action.payload),
        isLoading: false,
      };
    default:
      return state;
  }
}
