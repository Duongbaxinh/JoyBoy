"use client";
import { initFilter } from "@/consts/product";
import { BrandTypeResponse, FilterProductType, IProduct, ProductResponse, ProductTypeResponse } from "@/interfaces";
import { useGetBrandsQuery } from "@/redux/apis/brand.api";
import { useGetProductFilterQuery } from "@/redux/apis/product.api";
import { useGetTypeQuery } from "@/redux/apis/typeproduct.api";
import React, { createContext, useContext, ReactNode, useState, SetStateAction } from "react";

interface PopupContextType {
    products: ProductResponse | null,
    params: ParamFilter,
    productTypes: ProductTypeResponse | undefined,
    brands: BrandTypeResponse | undefined,
    setParam: React.Dispatch<SetStateAction<ParamFilter>>,
    filters: FilterProductType,
    setFilters: React.Dispatch<SetStateAction<FilterProductType>>,
    refetch: any
}

export type ParamFilter = {
    brand: { limitnumber: number, page: number }
    type: { limitnumber: number, page: number }
}
const initParam: ParamFilter = {
    brand: { limitnumber: 5, page: 1 },
    type: { limitnumber: 5, page: 1 }
}
const ProductContext = createContext<PopupContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
    children
}) => {
    const [filters, setFilters] = useState<FilterProductType>(initFilter);
    const [params, setParam] = useState<ParamFilter>(initParam)
    const { data: productTypes, isLoading: isLoadingTypes, error: errorTypes } = useGetTypeQuery(params.type)
    const { data: brands, isLoading: loadingBrand, error: errorBrand } = useGetBrandsQuery(params.brand)
    const { data: products, refetch } = useGetProductFilterQuery(filters)
    console.log("check product tye", productTypes, brands)
    return (
        <ProductContext.Provider value={{
            products: products ?? null,
            filters,
            setFilters,
            productTypes,
            brands, params,
            setParam, refetch
        }}>
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
