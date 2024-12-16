import {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import Button from "../UI/Button";
import Input from "../UI/Input";
import styles from "./Login.module.scss";
import Error from "@/Components/UI/Error.jsx"; // Import Error component

export default function Login({setErrorMessages}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedMessages = localStorage.getItem("messages");
        if (storedMessages) {
            setMessages(JSON.parse(storedMessages));
            localStorage.removeItem("messages"); // Clear after displaying
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessages([]);

        const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
        const user = existingUsers.find((user) => user.username === username && user.password === password);

        if (!user) {
            setErrorMessages([{type: "error", text: "Invalid username or password."}]);
            return; // Early exit to prevent navigation
        }

        setErrorMessages([{type: "success", text: "Login successful!"}]);
        localStorage.setItem("auth", true); // Set authentication
        localStorage.setItem("authUser", JSON.stringify(username)); // Store the username
        navigate("/"); // Redirect to home page
    };

    return (
        <div className={styles.login}>
            <div className={styles.Form}>
                <h1>Login</h1>
                <Error messages={messages} />
                <form onSubmit={handleSubmit}>
                    <Input
                        label={"Username"}
                        type="text"
                        name="username"
                        placeholder="Username"
                        required
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Input
                        label={"Password"}
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button className={styles.button} type="submit">
                        Login
                    </Button>
                </form>
                <hr className={styles.hr} />
                <Link to="/register">
                    <Button className={styles.button2}>Create Account</Button>
                </Link>
            </div>
        </div>
    );
}
