import {
    PRODUCT_ADDED_TO_BASKET, 
    PRODUCT_UPDATED_TO_BASKET, 
    PRODUCT_BASKET_QUANTITY_UPDATED, 
    PRODUCT_REMOVED_FROM_BASKET, 
    FINALISE_CHECKOUT, 
    CHECKOUT_FAIL, 
    CHECKOUT_SUCCESS, 
    CANCEL_CHECKOUT
} from '../actions/types';

//checkout reducers
const initialState = {
    basket: [],
    isLoading: false,
    checkoutDone: null,
};

export default function (state = initialState, action){
    switch(action.type) {
        case PRODUCT_ADDED_TO_BASKET:
            return {
                ...state,
                basket: [...state.basket, action.payload],
                isLoading: false,
                checkoutDone: false
            };
        
        case PRODUCT_UPDATED_TO_BASKET:
        case PRODUCT_BASKET_QUANTITY_UPDATED:
        case PRODUCT_REMOVED_FROM_BASKET:
            return {
                ...state,
                basket: action.payload,
                isLoading: false,
                checkoutDone: false
            };

        case FINALISE_CHECKOUT:
        case CHECKOUT_FAIL:
            return{
                ...state,
                basket: [...state.basket],
                isLoading: true,
                checkoutDone: false
            };

        case CANCEL_CHECKOUT:
        case CHECKOUT_SUCCESS:
            return{
                ...state,
                basket: [],
                isLoading: false,
                checkoutDone: true
            };     
        default:
            return state;
    }
}