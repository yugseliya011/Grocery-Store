import styles from "./Loading.module.scss";

const Loading = () => {
    return (
        <div className={styles.loaderWrapper}>
            <div className={styles.loader}>
                <div className={`${styles.one} ${styles.inner}`}></div>
                <div className={`${styles.two} ${styles.inner}`}></div>
                <div className={`${styles.three} ${styles.inner}`}></div>
            </div>
        </div>
    );
};

export default Loading;
