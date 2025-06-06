"use client";
import { initFilter } from "@/consts/product";
import { FilterProductType, IProduct, ProductResponse } from "@/interfaces";
import { useGetAllProductsQuery, useGetProductFilterQuery } from "@/redux/apis/product.api";
import React, { createContext, useContext, ReactNode, useState, SetStateAction } from "react";

interface PopupContextType {
    products: ProductResponse | null,
    filters: FilterProductType,
    setFilters: React.Dispatch<SetStateAction<FilterProductType>>,
    refetch: any
}

const ProductContext = createContext<PopupContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
    children
}) => {
    const [filters, setFilters] = useState<FilterProductType>(initFilter);
    const { data: products, refetch } = useGetProductFilterQuery(filters)

    return (
        <ProductContext.Provider value={{ products: products ?? null, filters, setFilters, refetch }}>
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
