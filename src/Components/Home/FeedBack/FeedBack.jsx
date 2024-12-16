import styles from "./Feedback.module.scss";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function FeedBack() {
    const Name = 'User Name';

    return <div className={styles.FeedBack}>
        <div className={styles.container}>
            <Box className={styles.newsletterContainer}>
                <Typography variant="h4" className={styles.heading}>
                    Feedback
                </Typography>
                <Typography variant="body1" className={styles.subheading}>
                    Sign up to receive updates on new products and special offers
                </Typography>
                <h3 className={styles.nameInput}>
                    {Name}
                </h3>
                <TextField
                    label="Feedback"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    className={styles.textArea}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'white',
                            },
                            '&:hover fieldset': {
                                borderColor: 'white',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'white',
                            },
                            '& input': {
                                color: 'white',
                            },
                            '& textarea': {
                                color: 'white',
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: 'white',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: 'white',
                        },
                    }}
                />
                <button className={styles.submitButton}>
                    Submit
                </button>
            </Box>
        </div>
    </div>;
}
