import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchCartItemsCount } from "@/api/cartApi";

type CartCountContextType = {
    cartCount: number;
    setCartCount: React.Dispatch<React.SetStateAction<number>>;
};

const CartCountContext = createContext<CartCountContextType | undefined>(undefined);

export const CartCountProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        fetchCartItemsCount().then(setCartCount);
    }, []);

    return (
        <CartCountContext.Provider value={{ cartCount, setCartCount }}>
        {children}
        </CartCountContext.Provider>
    );
};

export const useCartCount = () => {
    const context = useContext(CartCountContext);
    if (!context) throw new Error("useCartCount must be used inside CartCountProvider");
    return context;
};

