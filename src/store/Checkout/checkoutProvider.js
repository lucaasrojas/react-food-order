import { useReducer } from "react";
import CheckoutContext from "./checkoutContext";

const defaultCheckoutState = {
    show: false,
};

const checkoutReducer = (state, action) => {
    switch (action.type) {
        case "UPDATE":
            return {
                ...state,
                ...action.form,
            };
        case "SHOW_CHECKOUT":
            return {
                ...state,
                show: true,
            };
        case "HIDE_CHECKOUT":
            return {
                ...state,
                show: false,
            };
        default:
            break;
    }
    return defaultCheckoutState;
};

const CheckoutProvider = (props) => {
    const [state, dispatch] = useReducer(checkoutReducer, defaultCheckoutState);
    const updateCheckout = (form) => {
        dispatch({
            type: "UPDATE",
            form,
        });
    };

    const showCheckout = () => {
        dispatch({ type: "SHOW_CHECKOUT" });
    };
    const hideCheckout = () => {
        dispatch({ type: "HIDE_CHECKOUT" });
    };
    const checkoutContext = {
        showCheckout,
        hideCheckout,
        updateCheckout,
        show: state.show,
    };
    return (
        <CheckoutContext.Provider value={checkoutContext}>
            {props.children}
        </CheckoutContext.Provider>
    );
};

export default CheckoutProvider;
