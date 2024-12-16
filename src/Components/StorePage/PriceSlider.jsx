import * as React from "react";
import Slider from "@mui/material/Slider";
import styles from "./PriceSlider.module.scss";
import {Typography, Box} from "@mui/material";

export default function PriceSlider({value, handleChange}) {
    return (
        <Box className={styles.Box} >
            <Typography gutterBottom>Price</Typography>
            <Slider
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                min={0}
                max={1000}
                step={10} 
            />
            <Typography className={styles.Typography}>
                <div>${value[0]}</div>
                <div>${value[1]}</div>
            </Typography>
        </Box>
    );
}
