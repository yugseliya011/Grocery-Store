import styles from "./Button.module.scss"

const Button = ({children, onClick, className, type}) => {
    return (
        <button type={type} className=
        {`${className} ${styles.button}`} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
