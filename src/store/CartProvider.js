import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0,
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
                items: updatedItems,
                totalAmount: updatedTotalAmount,
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
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
    };
    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;
