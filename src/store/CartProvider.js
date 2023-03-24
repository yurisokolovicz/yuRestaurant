import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
    items: [],
    totalAmount: 0
};

// The reducer function is a function that receives the current state and an action as arguments and returns a new state. The second argument of the useReducer hook is the initial state of the reducer function.
const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        // The findIndex method returns the index of the first element in the array that satisfies the provided testing function. Otherwise, it returns -1, indicating that no element passed the test.
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems;

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            // The concat method returns a new array and does not mutate the original array
            updatedItems = state.items.concat(action.item);
        }

        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    } else return defaultCartState;
};

const CartProvider = props => {
    // The useReducer hook returns an array with two elements. The first element is the current state and the second element is a function that allows us to update the state. The first argument of the useReducer hook is the reducer function and the second argument is the initial state of the reducer function.
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = item => {
        dispatchCartAction({ type: 'ADD', item: item });
    };

    const removeItemFromCartHandler = id => {
        dispatchCartAction({ type: 'REMOVE', id: id });
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    };

    return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>;
};

export default CartProvider;

// Passing props.children in the CartContext.Provider component allows us to wrap the CartProvider component around the App component in the index.js file

// The goal of this component is to provide a context to all the components in the app
