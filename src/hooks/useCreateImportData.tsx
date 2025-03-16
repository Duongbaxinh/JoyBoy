import { useState } from "react";
import axios from "axios";

// Định nghĩa kiểu dữ liệu cho sản phẩm
interface Product {
    id: number;
    productCode: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    discount: number;
    discountType: "amount" | "percent";
    total: number;
    note?: string;
}

// Định nghĩa kiểu dữ liệu cho phiếu nhập hàng
interface ImportData {
    supplier: string;
    date: string;
    status: string;
    orderCode: string;
    importCode: string;
    totalItems: number;
    totalPrice: number;
    discountPercent: number;
    amountDue: number;
    amountPaid: number;
    debtStatus: number;
    notes?: string;
    items: Product[];
}

// Custom hook để quản lý và gửi dữ liệu nhập hàng
const useImportData = () => {
    const [importData, setImportData] = useState<ImportData>({
        supplier: "",
        date: "",
        status: "Phiếu tạm",
        orderCode: "",
        importCode: "",
        totalItems: 0,
        totalPrice: 0,
        discountPercent: 0,
        amountDue: 0,
        amountPaid: 0,
        debtStatus: 0,
        notes: "",
        items: []
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateImportData = (field: keyof ImportData, value: any) => {
        setImportData((prev) => ({ ...prev, [field]: value }));
    };

    const updateProduct = (index: number, field: keyof Product, value: any) => {
        setImportData((prev) => {
            const updatedItems = [...prev.items];
            updatedItems[index] = { ...updatedItems[index], [field]: value };
            return { ...prev, items: updatedItems };
        });
    };

    const addProduct = (product: Product) => {
        setImportData((prev) => ({ ...prev, items: [...prev.items, product] }));
    };

    const removeProduct = (index: number) => {
        setImportData((prev) => {
            const updatedItems = prev.items.filter((_, i) => i !== index);
            return { ...prev, items: updatedItems };
        });
    };

    const sendImportData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post("https://api.example.com/import", importData);
            console.log("Response:", response.data);

        } catch (err) {
            console.error("Lỗi khi gửi dữ liệu:", err);
            setError("Gửi dữ liệu thất bại!");

        } finally {
            setLoading(false);
        }
    };

    return {
        importData,
        updateImportData,
        updateProduct,
        addProduct,
        removeProduct,
        sendImportData,
        loading,
        error
    };
};