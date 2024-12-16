import styles from "./Footer.module.scss";
import WDP from "@/assets/Images/WDP.png";
import Wizard from "@/assets/Images/Wizard.png";
import Danger from "@/assets/Images/Danger.png";
import Power from "@/assets/Images/Power.png";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.upFooter}>
                <div className={styles.logo}>
                    <img src={WDP} alt="WDP Logo" />
                </div>
                <div className={styles.creators}>
                    <div className={styles.lowFooter}>
                        <h2> Contact us </h2>
                        <p>
                            Email: <a href="mailto:the.ts.storm@gmail.com">the.ts.storm@gmail.com</a>
                        </p>
                        <p>
                            Mobile: <a href="tel:+917779993260">+91 7779993260</a>
                        </p>
                    </div>
                    <div className={styles.logos}>
                        <div className={`${styles.Wizard} ${styles.creator}`}>
                            <img src={Wizard} alt="Wizard" />
                        </div>
                        <div className={`${styles.Danger} ${styles.creator}`}>
                            <img src={Danger} alt="Danger" />
                        </div>
                        <div className={`${styles.Power} ${styles.creator}`}>
                            <img src={Power} alt="Power" />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
