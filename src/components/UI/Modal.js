import classes from "./Modal.module.css";
import ReactDOM from "react-dom";
const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onClose}></div>;
};

const ModalOverlay = (props) => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    );
};
const portalElement = document.getElementById("overlays");
const Modal = (props) => {
    return (
        <>
            {/* Without React Portal */}
            {/* <Backdrop/>
        <ModalOverlay>{props.children}</ModalOverlay> */}

            {ReactDOM.createPortal(
                <Backdrop onClose={props.onClose} />,
                portalElement
            )}
            {ReactDOM.createPortal(
                <ModalOverlay>{props.children}</ModalOverlay>,
                portalElement
            )}
        </>
    );
};

export default Modal;
