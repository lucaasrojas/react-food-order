import { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
    const inputRef = useRef();
    const [amountIsValid, setAmountIsValid] = useState(true);
    const submitHandler = (e) => {
        e.preventDefault();
        const enteredAmount = Number(inputRef.current.value);
        if (
            inputRef.current.value.trim().length === 0 ||
            enteredAmount < 1 ||
            enteredAmount > 5
        ) {
            setAmountIsValid(false);
            return;
        }

        props.onAddToCart(enteredAmount);
    };
    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input
                ref={inputRef}
                label="Amount"
                input={{
                    id: "amount_" + props.id,
                    type: "number",
                    min: "1",
                    max: "5",
                    step: "1",
                    defaultValue: "1",
                }}
            />
            {!amountIsValid && <p>Please enter a valid amount</p>}
            <button>+ Add</button>
        </form>
    );
};

export default MealItemForm;
