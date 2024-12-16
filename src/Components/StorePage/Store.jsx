import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import styles from "./Store.module.scss";
import Item from "./Item";
import {NavLink, useLocation} from "react-router-dom";
import PriceSlider from "./PriceSlider";
import Search from "../UI/Search";
import {fetchProducts} from "../../Store/api.js";
import {useStore} from "../../Store/StoreContext"; // Import the context

export default function Store() {
    const location = useLocation();
    const {storeState, setStoreState} = useStore(); // Use the store context
    const {priceRange, sortOption, searchQuery} = storeState;

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Fetch products using react-query
    const {
        data: products = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["products"],
        queryFn: fetchProducts,
    });

    // Handlers
    const handlePriceChange = (event, newValue) => {
        setStoreState((prev) => ({...prev, priceRange: newValue}));
    };

    const handleSortChange = (event) => {
        setStoreState((prev) => ({...prev, sortOption: event.target.value}));
    };

    const handleSearchChange = (event) => {
        setStoreState((prev) => ({...prev, searchQuery: event.target.value.toLowerCase()}));
    };

    // Loading and error states
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading products</div>;

    // Filter and sort products based on state
    let filteredProducts = products.filter((product) => {
        const inPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
        const matchesSearch = product.title.toLowerCase().includes(searchQuery);
        return inPriceRange && matchesSearch;
    });

    if (sortOption) {
        filteredProducts.sort((a, b) => {
            switch (sortOption) {
                case "newest":
                    return new Date(b.date) - new Date(a.date);
                case "lowToHigh":
                    return a.price - b.price;
                case "highToLow":
                    return b.price - a.price;
                case "aToZ":
                    return a.title.localeCompare(b.title);
                case "zToA":
                    return b.title.localeCompare(a.title);
                default:
                    return 0;
            }
        });
    }

    return (
        <div className={styles.Store}>
            <div className={`${styles.sideBar} ${isSidebarOpen ? styles.open : ""}`}>
                <div className={styles.sortData}>
                    <h2>Sort By</h2>
                    <select value={sortOption} onChange={handleSortChange}>
                        <option value="">Select</option>
                        <option value="newest">Newest</option>
                        <option value="lowToHigh">Price: Low to High</option>
                        <option value="highToLow">Price: High to Low</option>
                        <option value="aToZ">Title: A-Z</option>
                        <option value="zToA">Title: Z-A</option>
                    </select>
                </div>
                <div className={styles.price}>
                    <h2>Filter By</h2>
                    <PriceSlider value={priceRange} handleChange={handlePriceChange} />
                </div>
            </div>

            <div className={styles.products}>
                <div className={styles.search}>
                    <Search onChange={handleSearchChange} />
                    <button className={styles.toggleButton} onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        Filter
                    </button>
                </div>
                <div className={styles.heading}>
                    <h1>All Products</h1>
                    <h2>{filteredProducts.length} products</h2>
                </div>
                <div className={styles.productItems}>
                    {filteredProducts.map((product) => (
                        <div className={styles.item} key={product.id}>
                            <NavLink to={`/product/${product.id}`} state={{priceRange, sortOption, searchQuery}}>
                                <Item name={product.title} price={product.price} image={product.image} />
                            </NavLink>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
