import {useEffect, useState, useRef} from "react";
import {motion} from "framer-motion";
import styles from "./Parallax.module.scss";
import img from "@/assets/Images/parallax.png";

export default function Parallax({jsx, id}) {
    const [scrollY, setScrollY] = useState(0);
    const parallaxRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!parallaxRef.current) return;

            const rect = parallaxRef.current.getBoundingClientRect();
            const elementHeight = rect.height;
            const viewportHeight = window.innerHeight;

            // Calculate scroll position after the element fully enters the viewport
            if (rect.top >= viewportHeight) {
                setScrollY(0); // Before entering viewport
            } else if (rect.bottom <= 0) {
                setScrollY(1); // Fully out of view
            } else {
                // Calculate scroll percentage after the element fully enters the viewport
                const scrollPos = Math.min(Math.max(viewportHeight - rect.top, 0), viewportHeight + elementHeight);
                const scrollPercent = scrollPos / (viewportHeight + elementHeight); // Normalize

                setScrollY(scrollPercent);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scaleValue = 1 + 2 * scrollY; // Scale increases as scrollY increases
    const opacityValue = 1 - scrollY; // Opacity fades out smoothly

    return (
        <div ref={parallaxRef} id={id} className={styles.Parallax}>
            <div className={styles.parallax}>
                <motion.div
                    className={styles.imageContainer}
                    style={{
                        scale: scaleValue, // Correct scale behavior
                        opacity: opacityValue,
                    }}
                >
                    <img src={img} alt="Parallax" className={styles.parallaxImage} />
                </motion.div>
                <div className={styles.content}>{jsx}</div>
            </div>
        </div>
    );
}
