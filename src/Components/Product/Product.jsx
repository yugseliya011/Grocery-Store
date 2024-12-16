import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import styles from "./Product.module.scss";
import {Button, Rating} from "@mui/material";
import {fetchProductById} from "../../Store/api.js";
import Loading from "../UI/Loading.jsx";
import Navbar from "../Navbar/Navbar.jsx";
import {useCart} from "../../Store/CartContext.jsx";
import {useLocation} from "react-router-dom";
import {useStore} from "../../Store/StoreContext"; // Import the context
import {useEffect} from "react";

export default function Product() {
    const location = useLocation();
    const {priceRange, sortOption, searchQuery} = location.state || {}; // Get state from location
    const {setStoreState} = useStore();

    // On mount, set the store state if it exists
    useEffect(() => {
        if (priceRange && sortOption && searchQuery) {
            setStoreState({priceRange, sortOption, searchQuery});
        }
    }, [priceRange, sortOption, searchQuery, setStoreState]);

    const {id} = useParams();

    const {openCart} = useCart();

    const {
        data: product,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["product", id],
        queryFn: () => fetchProductById(id),
    });

    if (isLoading) return <Loading />;
    if (isError) return <div>Error loading product details</div>;

    const addToCart = () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingProductIndex = cart.findIndex((item) => item.id === product.id);

        if (existingProductIndex >= 0) {
            cart[existingProductIndex].quantity += 1;
        } else {
            cart.push({...product, quantity: 1});
        }
        localStorage.setItem("cart", JSON.stringify(cart));

        openCart();
    };

    return (
        <>
            <Navbar />
            <div className={styles.Product}>
                <div className={styles.container}>
                    <div className={styles.container_main}>
                        <div className={styles.container_img}>
                            <img src={product.image} alt={product.title} />
                        </div>
                        <div className={styles.container_details}>
                            <h1 className={styles.container_title}>{product.title}</h1>
                            <section className={styles.description}>{product.description}</section>
                            <label>Price: ${product.price}</label>
                            <div className={styles.container_rating}>
                                Reviews: <Rating name="half-rating-read" defaultValue={product.rating.rate} precision={0.5} readOnly />
                            </div>
                            <div>
                                <Button variant="contained" color="primary" className={styles.addToCart} onClick={addToCart}>
                                    Add to Cart
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
