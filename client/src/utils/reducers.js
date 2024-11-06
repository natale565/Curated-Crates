import {
    UPDATE_PRODUCTS,
    ADD_TO_CART,
    UPDATE_CART_QUANTITY,
    REMOVE_FROM_CART,
    ADD_MULTIPLE_TO_CART,
    CLEAR_CART,
    TOGGLE_CART
} from './actions';

export const reducer = (state, action) => {
    switch(action.type) {
        case UPDATE_PRODUCTS:
            return {
                ...state,
                subscriptionBoxes: [...action.subscriptionBoxes],
            };
        case ADD_TO_CART:
            if (!action.subscriptionBox|| !action.subscriptionBox._id || !action.subscriptionBox.name || action.subscriptionBox.price == null) {
                return state; // Return the current state without updating
            }
           return {
                ...state,
                cartOpen: true,
                cart: [...state.cart, {...action.subscriptionBox }],
            };
        case ADD_MULTIPLE_TO_CART:
            return {
                ...state,
                cart: [...state.cart, ...action.subscriptionBoxes]
            };
        case UPDATE_CART_QUANTITY:
            return {
                ...state,
                cartOpen: true,
                cart: state.cart.map(subscriptionBox => {
                    if (action._id === subscriptionBox.id) {
                        subscriptionBox.purchaseQuantity = action.purchaseQuantity
                    }
                    return subscriptionBox
                })
            };
        case REMOVE_FROM_CART:
            let newState = state.cart.filter(subscriptionBox => {
                return subscriptionBox._id !== action._id;
            });

            return {
                ...state,
                cartOpen: newState.length > 0,
                cart: newState
            };
        case CLEAR_CART:
            return {
                ...state,
                cartOpen: false,
                cart: []
            };
        case TOGGLE_CART:
            return {
                ...state,
                cartOpen: !state.cartOpen
            };
        default:
            return state;
    }
}