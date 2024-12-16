import styles from "./Input.module.scss";

const Input = ({label, id, type, placeholder, maxLength, value, onChange, required, name, className = ""}) => {
    return (
        <div className={`${styles.inputContainer} ${className}`}>
            {label && <label htmlFor={id}>{label}</label>}
            <input
                name={name}
                id={id}
                type={type}
                placeholder={placeholder}
                maxLength={maxLength}
                value={value}
                onChange={onChange}
                required={required}
                className={styles.input}
            />
        </div>
    );
};

export default Input;
