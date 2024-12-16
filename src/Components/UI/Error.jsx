import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import styles from "./Error.module.scss";

export default function Error({messages = []}) {
    const [visibleMessages, setVisibleMessages] = useState([]);

    useEffect(() => {
        if (messages.length > 0) {
            setVisibleMessages(messages);
            const timer = setTimeout(() => {
                setVisibleMessages([]);
            }, 1500);

            // Reset timer if new messages come in before the timeout ends
            return () => clearTimeout(timer);
        }
    }, [messages]);

    return (
        <div className={styles.errorContainer}>
            {visibleMessages.map((msg, index) => (
                <div key={index} className={styles[msg.type]}>
                    {msg.text}
                </div>
            ))}
        </div>
    );
}

// PropTypes for validation
Error.propTypes = {
    messages: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.string.isRequired, // Type of message ('error', 'warning', 'info')
            text: PropTypes.string.isRequired, // Message content
        })
    ),
};
