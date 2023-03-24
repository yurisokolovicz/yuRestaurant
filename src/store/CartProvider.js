// The goal of this component is to provide a context to all the components in the app
import CartContext from './cart-context';

const CartProvider = props => {
    const addItemToCartHandler = item => {};

    const removeItemFromCartHandler = id => {};

    const cartContext = {
        items: [],
        totalAmount: 0,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    };

    return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>;
};

export default CartProvider;

// Passing props.children in the CartContext.Provider component allows us to wrap the CartProvider component around the App component in the index.js file
