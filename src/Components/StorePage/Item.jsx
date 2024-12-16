import styles from "./Item.module.scss";

export default function Item({name, price, image}) {
    return (
        <div className={styles.GearItem}>
            <div className={styles.img}>
                <img src={image} alt={name} />
            </div>
            <div className={styles.details}>
                <h3>{name}</h3>
                <h1>{price === undefined ? "Failed to fetch price" : `$ ${price}`}</h1>
            </div>
        </div>
    );
}
