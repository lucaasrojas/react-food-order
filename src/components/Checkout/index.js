import { useContext, useState } from "react";
import { submitOrder } from "../../api";
import CartContext from "../../store/cart-context";
import CheckoutContext from "../../store/Checkout/checkoutContext";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import classes from "./Checkout.module.css";

const Input = (props) => {
    const [isValid, setIsValid] = useState(true);
    const { type, id, label, validation } = props;
    const handleOnChange = (e) => {
        const value = e.target.value;
        setIsValid(validation(value));
    };
    return (
        <div className={classes.input}>
            <label htmlFor={id}>{label}</label>
            <input onChange={handleOnChange} type={type || "text"} id={id} />
            {!isValid && <p>ERROR</p>}
        </div>
    );
};
const Checkout = (props) => {
    const cartContext = useContext(CartContext);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(false);

        const order = {
            name: event.target.name.value,
            lastname: event.target.lastname.value,
            email: event.target.email.value,
            address: event.target.address.value,
            products: cartContext.items,
            totalAmount: cartContext.totalAmount,
        };

        submitOrder(order)
            .then((res) => {
                setIsLoading(false);
                props.onClose();
                cartContext.hideCart();
                cartContext.clearCart();
            })
            .catch((err) => {
                setError(err.message);
            });
    };
    const formInputs = [
        {
            id: "name",
            label: "Name",
            type: "text",
            validation: (value) => value.trim().length !== 0,
        },
        {
            id: "lastname",
            label: "Last Name",
            type: "text",
            validation: (value) => value.trim().length !== 0,
        },
        {
            id: "email",
            label: "Email",
            type: "text",
            validation: (value) => value.includes("@"),
        },
        {
            id: "address",
            label: "Address",
            type: "text",
            validation: (value) => value.trim().length !== 0,
        },
    ];

    return (
        <Modal onClose={props.onClose}>
            <form onSubmit={handleSubmit}>
                <div>
                    {formInputs.map((input) => (
                        <Input key={input.id} {...input} />
                    ))}
                </div>
                <div className={classes.actions}>
                    <Button alt onClick={props.onClose}>
                        Close
                    </Button>
                    <Button type="submit">Submit</Button>
                </div>
            </form>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error</p>}
        </Modal>
    );
};

export default Checkout;
