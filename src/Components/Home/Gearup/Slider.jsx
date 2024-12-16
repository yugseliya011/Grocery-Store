import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import {Navigation} from "swiper/modules";
import Item from "../../StorePage/Item";
import styles from "./Slider.module.scss";
import {useRef, useState} from "react";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";
import {NavLink} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {fetchProducts} from "@/Store/api.js";

export default function Slider() {
    const swiperRef = useRef(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    // Fetch product data using react-query
    const {
        data: products = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["products"],
        queryFn: fetchProducts,
    });

    const handleSlideChange = (swiper) => {
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading products</div>;

    return (
        <>
            <div className={styles.sliderContainer}>
                {/* Previous Button */}
                <button
                    className={styles.prevButton}
                    onClick={() => swiperRef.current.swiper.slidePrev()}
                    style={{opacity: isBeginning ? 0.5 : 1}}
                    disabled={isBeginning}
                >
                    <FaArrowLeft size={20} />
                </button>

                {/* Swiper with API Data */}
                <Swiper
                    ref={swiperRef}
                    spaceBetween={30}
                    slidesPerView={4}
                    breakpoints={{
                        0: {
                            slidesPerView: 1, // 1 slide for very small screens
                        },
                        768: {
                            slidesPerView: 2, // 2 slides for screens wider than 768px
                        },
                        1024: {
                            slidesPerView: 4, // 4 slides for screens wider than 1024px
                        },
                    }}
                    navigation={false}
                    modules={[Navigation]}
                    className={styles.swiper}
                    onSlideChange={handleSlideChange}
                >
                    {/* Dynamically render SwiperSlide based on API data */}
                    {products.map((product) => (
                        <SwiperSlide key={product.id}>
                            <NavLink to={`/product/${product.id}`}>
                                <Item name={product.title} price={product.price} image={product.image} />
                            </NavLink>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Next Button */}
                <button
                    className={styles.nextButton}
                    onClick={() => swiperRef.current.swiper.slideNext()}
                    style={{opacity: isEnd ? 0.5 : 1}}
                    disabled={isEnd}
                >
                    <FaArrowRight size={20} />
                </button>
            </div>
        </>
    );
}
