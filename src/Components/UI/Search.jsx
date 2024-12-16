import TextField from "@mui/material/TextField";
import styles from "./Search.module.scss";
import {FiSearch} from "react-icons/fi";

export default function Search({onChange}) {
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            onChange(event); 
        }
    };

    const handleIconClick = () => {
        
        onChange({target: {value: ""}}); 
    };

    return (
        <div className={styles.searchContainer}>
            <label htmlFor="search" className={styles.label}>
                <TextField
                    className={styles.TextField}
                    label="Search Products"
                    id="search"
                    variant="standard"
                    onKeyPress={handleKeyPress}
                    onChange={onChange}
                />
                <div className={styles.iconContainer} onClick={handleIconClick}>
                    <FiSearch className={styles.icon} />
                </div>
            </label>
        </div>
    );
}
