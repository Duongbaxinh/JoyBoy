"use client";
import React, { createContext, useContext, ReactNode, useState, SetStateAction } from "react";

interface PopupContextType {
    showFormProductCreate: boolean;
    setShowFormProductCreate: React.Dispatch<SetStateAction<boolean>>;
}

const ProductContext = createContext<PopupContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
    children
}) => {
    const [showFormProductCreate, setShowFormProductCreate] = useState(false);
    const handleCreateProduct = () => {

    }
    return (
        <ProductContext.Provider value={{ showFormProductCreate, setShowFormProductCreate }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProduct = () => {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error("useProduct must be used within a PopupProvider");
    }
    return context;
};
