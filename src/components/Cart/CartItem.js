import Button from "../UI/Button";
import classes from "./CartItem.module.css";

const CartItem = (props) => {
    const price = `$${props.price.toFixed(2)}`;

    return (
        <li className={classes["cart-item"]}>
            <div>
                <h2>{props.name}</h2>
                <div className={classes.summary}>
                    <span className={classes.price}>{price}</span>
                    <span className={classes.amount}>x {props.amount}</span>
                </div>
            </div>
            <div className={classes.actions}>
                <Button onClick={props.onRemove} alt>
                    −
                </Button>
                <Button onClick={props.onAdd} alt>
                    +
                </Button>
            </div>
        </li>
    );
};

export default CartItem;
