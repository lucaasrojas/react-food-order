import classes from "./Button.module.css";

const Button = (props) => {
    const { children, onClick, alt } = props;
    return (
        <button
            onClick={onClick}
            className={alt ? classes.alt : classes.button}
        >
            {children}
        </button>
    );
};

export default Button;
