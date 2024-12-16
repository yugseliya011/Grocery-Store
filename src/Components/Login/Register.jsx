import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Button from "../UI/Button";
import Input from "../UI/Input";
import styles from "./Login.module.scss";
import Error from "@/Components/UI/Error.jsx";

export default function Register({setErrorMessages}) {
    const [username, setUsername] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [email, setEmail] = useState(""); // Add email state
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessages([]);

        if (password !== confirmPassword) {
            setErrorMessages([{type: "error", text: "Passwords do not match."}]);
            return;
        }

        const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
        const userExists = existingUsers.some((user) => user.username === username || user.email === email); // Check for existing username or email

        if (userExists) {
            setErrorMessages([{type: "error", text: "Username or email already exists."}]);
            return;
        }

        const newUser = {username, mobileNumber, email, password, pfp: "", name: username}; // Include email in newUser
        existingUsers.push(newUser);
        localStorage.setItem("users", JSON.stringify(existingUsers));
        setErrorMessages([{type: "success", text: "Registration successful!"}]);
        navigate("/login");
    };

    return (
        <div className={styles.login}>
            <div className={styles.Form}>
                <h1>Register</h1>
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
                        label={"Mobile Number"}
                        type="tel"
                        maxLength={10}
                        name="mobileNumber"
                        placeholder="Enter Your Mobile Number"
                        required
                        onChange={(e) => setMobileNumber(e.target.value)}
                    />
                    <Input
                        label={"Email"} // Add email input
                        type="email"
                        name="email"
                        placeholder="Enter Your Email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        label={"Password"}
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Input
                        label={"Confirm Password"}
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Button className={styles.button} type="submit">
                        Register
                    </Button>
                </form>
                <hr className={styles.hr} />
                <Link>
                    <Button className={styles.button2}>Login with Google</Button>
                </Link>
            </div>
        </div>
    );
}
