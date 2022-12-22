import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
const HeaderCartButton = (props) => {
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
    const { items } = useContext(CartContext);

    const numberOfCartItems = items.reduce(
        (currentNumber, item) => currentNumber + item.amount,
        0
    );

    const btnClasses = `${classes.button} ${
        btnIsHighlighted ? classes.bump : ""
    }`;
    useEffect(() => {
        if (items.length === 0) return;
        setBtnIsHighlighted(true);

        // Siempre limpiar los timeouts/intervals con el return del hook
        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [items]);
    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    );
};

export default HeaderCartButton;
