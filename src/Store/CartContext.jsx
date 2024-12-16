import {createContext, useState, useContext} from "react";

const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cartIsOpen, setCartIsOpen] = useState(false);

    const toggleCart = () => setCartIsOpen((prev) => !prev);
    const openCart = () => setCartIsOpen(true);

    return <CartContext.Provider value={{cartIsOpen, toggleCart, openCart}}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
