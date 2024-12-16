import styles from "./Home.module.scss";
import introImg1 from "@/assets/Images/introImg1.png";
import introImg2 from "@/assets/Images/introImg2.png";
import introImg3 from "@/assets/Images/introImg3.png";
import GearupSection from "./Gearup/GearupSection";
import {NavLink} from "react-router-dom";
import Parallax from "./Parallax/Parallax";
import FeedBack from "./FeedBack/FeedBack";

export default function Home() {
    return (
        <div className={styles.Home}>
            <div className={styles.introSection}>
                <div className={styles.introImg1}>
                    <img src={introImg1} alt="" />
                </div>
                <div className={styles.introImg2}>
                    <img src={introImg2} alt="" />
                </div>
                <div className={styles.introImg3}>
                    <img src={introImg3} alt="" />
                </div>
                <div className={styles.introSell}>
                    <h3>This Week&apos;s Deals </h3>
                    <h1>10%</h1>
                    <h2>Off In All Games</h2>
                    <NavLink to={"store"}>
                        <button className="button1">Shop Now</button>
                    </NavLink>
                </div>
            </div>
            <GearupSection />
            <Parallax
                id="parallax1"
                jsx={
                    <>
                        <h1>SPEND LESS, PLAY MORE</h1>
                        <h4>Save 20% when you spend more than $125</h4>
                        <NavLink to={"store"}>
                            <button className="button1">Shop Now</button>
                        </NavLink>
                    </>
                }
            />
            <FeedBack />
        </div>
    );
}
