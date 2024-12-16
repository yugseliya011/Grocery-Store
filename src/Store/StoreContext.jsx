import { createContext, useContext, useState } from "react";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [storeState, setStoreState] = useState({
        priceRange: [0, 1000],
        sortOption: "",
        searchQuery: "",
    });

    return (
        <StoreContext.Provider value={{ storeState, setStoreState }}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = () => useContext(StoreContext);
