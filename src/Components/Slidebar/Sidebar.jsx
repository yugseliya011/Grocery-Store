import {motion} from "framer-motion";
import {NavLink} from "react-router-dom";
import styles from "./Sidebar.module.scss";
import {FaUserCircle} from "react-icons/fa";
import {IoClose} from "react-icons/io5";
import {useEffect, useState} from "react";
import {FiLogIn, FiLogOut} from "react-icons/fi";
import {IoCartSharp} from "react-icons/io5";
import {CgProfile} from "react-icons/cg";
import {AiOutlineHome} from "react-icons/ai";
import {LiaStoreSolid} from "react-icons/lia";
import {TiInfoLarge} from "react-icons/ti";

const sidebarVariants = {
    open: {
        clipPath: `circle(1500px at calc(100% - 40px) 40px)`,
        transition: {type: "spring", stiffness: 30, restDelta: 2},
    },
    closed: {
        clipPath: "circle(16px at calc(100% - 65px) 40px)",
        transition: {type: "spring", stiffness: 400, damping: 40},
    },
};

const pfpVariants = {
    open: {top: "20px", right: "50%", transform: "translateX(50%)", zoom: 3},
    closed: {top: "25px", right: "50px", transform: "translateX(0)", zoom: 1},
};

const Sidebar = ({isOpen, onClose, onClick, toggleCart, toggleProfile}) => {
    const isAuthenticated = !!localStorage.getItem("auth");
    const [userDetails, setUserDetails] = useState({name: "User", pfp: ""});

    useEffect(() => {
        if (isAuthenticated) {
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const authUser = JSON.parse(localStorage.getItem("authUser"));
            const loggedUser = users.find((user) => user.username === authUser);
            if (loggedUser) {
                setUserDetails({name: loggedUser.name, pfp: loggedUser.avatarUrl});
            }
        }
    }, [isAuthenticated]);

    const handleOverlayClick = () => onClose();
    const handleLogout = () => {
        localStorage.removeItem("auth");
        localStorage.removeItem("authUser");
        setUserDetails({name: "User", pfp: ""});
        onClose();
    };

    return (
        <>
            {isOpen && <div className={styles.overlay} onClick={handleOverlayClick} />}
            <motion.div
                className={styles.sidebar}
                initial={false}
                animate={isOpen ? "open" : "closed"}
                variants={sidebarVariants}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.pfpWrapper}>
                    <motion.div className={styles.pfp} onClick={onClick} variants={pfpVariants} animate={isOpen ? "open" : "closed"}>
                        {userDetails.pfp ? <img src={userDetails.pfp} alt="Profile" className={styles.profileImage} /> : <FaUserCircle size={30} />}
                    </motion.div>
                    <div className={styles.userName}>
                        <h2>{userDetails.name}</h2>
                    </div>
                </div>
                {isOpen && (
                    <button onClick={onClose} className={styles.closeButton}>
                        <IoClose />
                    </button>
                )}
                <ul className={styles.menu_items}>
                    {isAuthenticated ? (
                        <>
                            <MenuItem icon={<CgProfile size={20} />} onClick={toggleProfile}>
                                View Profile
                            </MenuItem>
                            <MenuItem icon={<IoCartSharp size={20} />} onClick={toggleCart}>
                                Cart
                            </MenuItem>
                            <MenuItem className={styles.responsive} icon={<AiOutlineHome size={20} />} link="/" onClick={onClose}>
                                Home
                            </MenuItem>
                            <MenuItem className={styles.responsive} icon={<LiaStoreSolid size={20} />} link="/store" onClick={onClose}>
                                Store
                            </MenuItem>
                            <MenuItem className={styles.responsive} icon={<TiInfoLarge size={20} />} link="/about" onClick={onClose}>
                                About
                            </MenuItem>
                            <MenuItem icon={<FiLogOut size={20} />} onClick={handleLogout}>
                                Logout
                            </MenuItem>
                        </>
                    ) : (
                        <MenuItem icon={<FiLogIn size={20} />} link="/login" onClick={onClose}>
                            Login
                        </MenuItem>
                    )}
                </ul>
            </motion.div>
        </>
    );
};
const MenuItem = ({icon, children, link, onClick, className}) => {
    return (
        <motion.li whileHover={{scale: 1.1}} whileTap={{scale: 0.95}} className={className}>
            {link ? (
                <NavLink to={link} onClick={onClick} className={({isActive}) => `${styles.menuLink} ${isActive ? styles.activeLink : ""}`}>
                    <div className={styles.icons}>{icon}</div>
                    <span className={styles.iconDetail}>{children}</span>
                </NavLink>
            ) : (
                <button onClick={onClick} className={styles.menuButton}>
                    <div className={styles.icons}>{icon}</div>
                    <span className={styles.iconDetail}>{children}</span>
                </button>
            )}
        </motion.li>
    );
};

export default Sidebar;
