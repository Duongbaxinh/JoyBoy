"use client";

import ContainerLayout from "@/components/layouts/ContainerLayout/page";
import { useState, useEffect } from "react";
import { IoCloseCircle } from "react-icons/io5";

// Define interfaces for data structure
interface Product {
    id: string;
    brand: string;
    name: string;
    originalPrice: number;
    type: string;
}

interface DiscountProgram {
    id: string;
    name: string;
    discountPercentage: number;
    startDate: string;
    endDate: string;
    products: Product[];
}

// Mock API data (replace with actual API hook, e.g., useGetProgramsQuery)
const mockPrograms: DiscountProgram[] = [
    {
        id: "1",
        name: "Summer Sale 2025",
        discountPercentage: 20,
        startDate: "2025-06-01",
        endDate: "2025-06-30",
        products: [
            { id: "p1", brand: "BrandA", name: "Product 1", originalPrice: 100, type: "Electronics" },
            { id: "p2", brand: "BrandB", name: "Product 2", originalPrice: 200, type: "Clothing" },
        ],
    },
    {
        id: "2",
        name: "Black Friday",
        discountPercentage: 30,
        startDate: "2025-11-01",
        endDate: "2025-11-30",
        products: [
            { id: "p3", brand: "BrandC", name: "Product 3", originalPrice: 150, type: "Home" },
        ],
    },
];

// Modal component for displaying product details
interface ProductDetailModalProps {
    program: DiscountProgram;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ program }) => {
    return (
        <div className="p-4 bg-gray-50 border-t border-purple-300">
            <h2 className="text-lg font-semibold text-purple-800 mb-2">Sản phẩm trong chương trình: {program.name}</h2>
            <table className="w-full divide-y divide-gray-200 table-auto">
                <thead className="bg-purple-100">
                    <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">Thương hiệu</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">Tên sản phẩm</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">Giá gốc</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">Loại sản phẩm</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {program.products.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="px-4 py-2 text-center text-gray-500">
                                Không có sản phẩm nào.
                            </td>
                        </tr>
                    ) : (
                        program.products.map((product) => (
                            <tr key={product.id}>
                                <td className="px-4 py-2">{product.brand}</td>
                                <td className="px-4 py-2">{product.name}</td>
                                <td className="px-4 py-2">{product.originalPrice.toLocaleString()} VND</td>
                                <td className="px-4 py-2">{product.type}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default function PromotionPage() {
    const [programs, setPrograms] = useState<DiscountProgram[]>([]);
    const [selectedProgram, setSelectedProgram] = useState<string | null>(null);

    // Simulate fetching data (replace with useGetProgramsQuery)
    useEffect(() => {
        setPrograms([...mockPrograms]);
    }, []);

    const handleViewProgram = (programId: string) => {
        setSelectedProgram(programId);
    };

    const handleCloseDetail = () => {
        setSelectedProgram(null);
    };

    const currentProgram = programs.find((program) => program.id === selectedProgram);

    return (
        <ContainerLayout>
            <div className="w-full p-4">
                <h1 className="text-2xl font-bold mb-4 text-purple-800">Quản lý chương trình ưu đãi</h1>

                {/* Program List Table */}
                <div className="w-full bg-white border border-purple-300 rounded">
                    <table className="w-full divide-y divide-gray-200 table-auto">
                        <thead className="bg-purple-100">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">Mã chương trình</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">Tên chương trình</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">Giảm giá (%)</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">Thời gian bắt đầu</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">Thời gian kết thúc</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">Số sản phẩm</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {programs.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-4 py-2 text-center text-gray-500">
                                        Không có chương trình nào.
                                    </td>
                                </tr>
                            ) : (
                                programs.map((program) => (
                                    <>
                                        <tr key={program.id}>
                                            <td className="px-4 py-2">{program.id}</td>
                                            <td className="px-4 py-2">{program.name}</td>
                                            <td className="px-4 py-2">{program.discountPercentage}%</td>
                                            <td className="px-4 py-2">{new Date(program.startDate).toLocaleDateString("vi-VN")}</td>
                                            <td className="px-4 py-2">{new Date(program.endDate).toLocaleDateString("vi-VN")}</td>
                                            <td className="px-4 py-2">{program.products.length}</td>
                                            <td className="px-4 py-2 flex items-center gap-3">
                                                {currentProgram && selectedProgram === program.id ? (
                                                    <button onClick={handleCloseDetail}>
                                                        <IoCloseCircle size={20} />
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleViewProgram(program.id)}
                                                        className="bg-purple-600 text-white py-1 px-2 rounded hover:bg-purple-700"
                                                    >
                                                        Detail
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                        {currentProgram && selectedProgram === program.id && (
                                            <tr>
                                                <td colSpan={7}>
                                                    <ProductDetailModal program={currentProgram} />
                                                </td>
                                            </tr>
                                        )}
                                    </>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </ContainerLayout>
    );
}