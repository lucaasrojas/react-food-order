import React from "react";

const CheckoutContext = React.createContext({
    show: false,
    name: "",
    lastname: "",
    email: "",
    address: "",
    showCheckout: () => {},
    hideCheckout: () => {},
});

export default CheckoutContext;
