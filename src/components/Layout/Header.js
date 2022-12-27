import { useContext } from "react";
import mealsImg from "../../assets/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import CartContext from "../../store/cart-context";
import Cart from "../Cart/Cart";
import CheckoutContext from "../../store/Checkout/checkoutContext";
import Checkout from "../Checkout";
const Header = (props) => {
    const cartContext = useContext(CartContext);
    const checkoutContext = useContext(CheckoutContext);
    return (
        <>
            {cartContext.show && (
                <Cart
                    onClose={cartContext.hideCart}
                    onOrder={checkoutContext.showCheckout}
                />
            )}
            {checkoutContext.show && (
                <Checkout onClose={checkoutContext.hideCheckout} />
            )}
            <header className={classes.header}>
                <h1>ReactMeals</h1>
                <HeaderCartButton onClick={cartContext.showCart} />
            </header>
            <div className={classes["main-image"]}>
                <img src={mealsImg} alt="Table full of meals" />
            </div>
        </>
    );
};

export default Header;
