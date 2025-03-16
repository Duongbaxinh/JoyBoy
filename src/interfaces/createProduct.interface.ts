export interface CreateProductForm {
    code: string;
    name: string;
    category: string;
    brand: string;
    quantity: number;
    unitPrice: number;
    discount?: number;
    discountType?: "percent" | "vnd";
}

export interface SelectOption {
    id: string;
    value: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}
