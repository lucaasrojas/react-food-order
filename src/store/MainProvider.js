import CartProvider from "./CartProvider";
import CheckoutProvider from "./Checkout/checkoutProvider";

const MainProvider = (props) => {
    return (
        <CartProvider>
            <CheckoutProvider>{props.children}</CheckoutProvider>
        </CartProvider>
    );
};

export default MainProvider;
