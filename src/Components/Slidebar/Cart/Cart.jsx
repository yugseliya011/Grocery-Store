import React, {useEffect, useState} from "react";
import styles from "./Cart.module.scss";
import Cart_Product from "./Cart_Product";
import empty from "../../../assets/empty.mp4";

export default function Cart({onClose}) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setProducts(savedCart);
    }, []);

    const saveCart = (updatedCart) => {
        setProducts(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const updateQuantity = (index, newQuantity) => {
        const updatedProducts = [...products];
        updatedProducts[index].quantity = newQuantity;
        saveCart(updatedProducts);
    };

    const removeProduct = (index) => {
        const updatedProducts = products.filter((_, i) => i !== index);
        saveCart(updatedProducts);
    };

    const totalPrice = products.reduce((sum, product) => sum + product.quantity * product.price, 0);

    return (
        <>
            <div className={styles.overlay} onClick={onClose} />
            <div className={styles.Cart}>
                <div className={styles.upCart}>
                    <div className={styles.nev}>
                        <h2>Cart</h2>
                        <button onClick={onClose}>Close</button>
                    </div>
                    <div className={styles.CartProduct}>
                        {products.length > 0 ? (
                            products.map((product, index) => (
                                <Cart_Product
                                    key={product.id}
                                    index={index}
                                    initialQuantity={product.quantity}
                                    title={product.title}
                                    price={product.price}
                                    image={product.image}
                                    onUpdateQuantity={updateQuantity}
                                    onRemove={removeProduct}
                                />
                            ))
                        ) : (
                            <div className={styles.Cart_video}>
                                <video className={styles.Cart_video_item} src={empty} autoPlay muted loop></video>
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.payment}>
                    <div className={styles.delivery_checkout}>
                        <p>Delivery</p>
                        <p>Calculated at checkout</p>
                    </div>
                    <div className={styles.delivery_date}>
                        <p>
                            Expected delivery date: <b>Tomorrow</b>
                        </p>
                    </div>
                    <div className={styles.delivery_payment}>
                        <p>
                            <b>Total</b>: $ {totalPrice.toFixed(2)}
                        </p>
                    </div>
                    <button className={styles.pay}>Go to Checkout</button>
                </div>
            </div>
        </>
    );
}
