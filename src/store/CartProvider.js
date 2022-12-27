import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0,
    show: false,
};

const cartReducer = (state, action) => {
    let updatedItems;

    switch (action.type) {
        case "ADD_ITEM":
            const existingCartItemIndex = state.items.findIndex(
                (item) => item.id === action.item.id
            );

            const existingCartItem = state.items[existingCartItemIndex];

            if (existingCartItem) {
                updatedItems = [...state.items];
                updatedItems[existingCartItemIndex] = {
                    ...existingCartItem,
                    amount: existingCartItem.amount + action.item.amount,
                };
            } else {
                updatedItems = state.items.concat(action.item);
            }

            const newTotalAmount =
                state.totalAmount + action.item.price * action.item.amount;
            return {
                ...state,
                items: updatedItems,
                totalAmount: newTotalAmount,
            };
        case "REMOVE_ITEM":
            const cartItemIndex = state.items.findIndex(
                (item) => item.id === action.id
            );
            const cartItem = state.items[cartItemIndex];
            const updatedTotalAmount = state.totalAmount - cartItem.price;
            if (cartItem.amount === 1) {
                updatedItems = state.items.filter(
                    (item) => item.id !== action.id
                );
            } else {
                updatedItems = [...state.items];
                updatedItems[cartItemIndex] = {
                    ...cartItem,
                    amount: cartItem.amount - 1,
                };
            }
            return {
                ...state,
                items: updatedItems,
                totalAmount: updatedTotalAmount,
            };
        case "SHOW_CART":
            return {
                ...state,
                show: true,
            };
        case "HIDE_CART":
            return {
                ...state,
                show: false,
            };
        case "CLEAR_CART":
            return {
                ...state,
                items: [],
                totalAmount: 0,
            };
        default:
            break;
    }
    return defaultCartState;
};

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(
        cartReducer,
        defaultCartState
    );
    const addItemToCartHandler = (item) => {
        dispatchCartAction({
            type: "ADD_ITEM",
            item,
        });
    };

    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({
            type: "REMOVE_ITEM",
            id,
        });
    };

    const showCartHandler = () => {
        dispatchCartAction({ type: "SHOW_CART" });
    };
    const hideCartHandler = () => {
        dispatchCartAction({ type: "HIDE_CART" });
    };
    const clearCartHandler = () => {
        dispatchCartAction({ type: "CLEAR_CART" });
    };
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        showCart: showCartHandler,
        hideCart: hideCartHandler,
        clearCart: clearCartHandler,
        show: cartState.show,
    };
    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;
