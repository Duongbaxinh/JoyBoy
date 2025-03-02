"use client";
import type {NextPage} from "next";
import {Bar} from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions, // Import ChartOptions for typing
    Tick // Import Tick for typing the callback
} from "chart.js";

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const DashboardPage: NextPage = () => {
    // Data for "DOANH THU THÁNG NÀY" (This Month's Revenue) - Vertical Bar Chart
    const revenueData = {
        labels: ["01", "02", "03", "04"], // Days of the month
        datasets: [
            {
                label: "Doanh thu (₫)",
                data: [5000000, 9000000, 3000000, 7000000], // Sample revenue data
                backgroundColor: "#2563eb", // Blue color to match KiotViet theme
                borderColor: "#2563eb",
                borderWidth: 1
            }
        ]
    };

    // Explicitly type the options as ChartOptions<"bar">
    const revenueOptions: ChartOptions<"bar"> = {
        responsive: true,
        plugins: {
            legend: {
                display: false // Hide legend since we don't need it
            },
            title: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    // Data for "TOP 10 HÀNG HÓA BÁN CHẠY NHẤT" (Top 10 Best-Selling Products) - Horizontal Bar Chart
    const topProductsData = {
        labels: [
            "Phấn trắng đèn Long Pa...",
            "Soothing Protection Spray Du..."
        ],
        datasets: [
            {
                label: "Doanh thu thuần (₫)",
                data: [20000000, 8000000], // Sample net revenue data
                backgroundColor: "#2563eb", // Blue color to match KiotViet theme
                borderColor: "#2563eb",
                borderWidth: 1
            }
        ]
    };

    // Explicitly type the options as ChartOptions<"bar">
    const topProductsOptions: ChartOptions<"bar"> = {
        indexAxis: "y", // Make the bar chart horizontal
        responsive: true,
        plugins: {
            legend: {
                display: false // Hide legend
            },
            title: {
                display: false
            }
        },
        scales: {
            x: {
                beginAtZero: true,
                ticks: {}
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-blue-600 text-white p-4 flex items-center justify-between">
                <div className="flex items-center">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold">
                        K
                    </div>
                    <h1 className="ml-2 text-lg font-bold">KiotViet</h1>
                </div>
                <nav className="flex space-x-4">
                    <a
                        href="#"
                        className="text-sm hover:underline">
                        Tổng quan
                    </a>
                    <a
                        href="#"
                        className="text-sm hover:underline">
                        Hàng hóa
                    </a>
                    <a
                        href="#"
                        className="text-sm hover:underline">
                        Giao dịch
                    </a>
                    <a
                        href="#"
                        className="text-sm hover:underline">
                        Đổi tác
                    </a>
                    <a
                        href="#"
                        className="text-sm hover:underline">
                        Nhân viên
                    </a>
                    <a
                        href="#"
                        className="text-sm hover:underline">
                        Sổ quỹ
                    </a>
                    <a
                        href="#"
                        className="text-sm hover:underline">
                        Báo cáo
                    </a>
                    <a
                        href="#"
                        className="text-sm hover:underline">
                        Bán Online
                    </a>
                </nav>
                <div className="flex items-center space-x-2">
                    <span className="text-sm">Tài khoản ▼</span>
                    <button className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                        Bình luận
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="p-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h3 className="text-lg font-semibold text-gray-700">
                            KẾT QUẢ BÁN HÔM NAY
                        </h3>
                        <div className="flex items-center mt-2">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                0
                            </div>
                            <span className="ml-2 text-xl font-bold">0 ₫</span>
                            <span className="ml-2 text-red-500 text-sm">
                                -30,300%
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                            So với cùng kỳ tháng trước
                        </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h3 className="text-lg font-semibold text-gray-700">
                            DOANH THU THÁNG NÀY
                        </h3>
                        <div className="flex items-center mt-2">
                            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                                ₫
                            </div>
                            <span className="ml-2 text-xl font-bold">
                                24,900,000 ₫
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Thống kê</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h3 className="text-lg font-semibold text-gray-700">
                            Phần mềm KiotViet
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                            Zalo Official Account
                        </p>
                        <div className="mt-2">
                            <img
                                src="https://via.placeholder.com/150"
                                alt="QR Code"
                                className="w-24 h-24 mx-auto"
                            />
                        </div>
                    </div>
                </div>

                {/* Revenue Chart (Vertical Bar Chart) */}
                <div className="bg-white p-4 rounded-lg shadow mb-6">
                    <h3 className="text-lg font-semibold text-gray-700">
                        DOANH THU THÁNG NÀY
                    </h3>
                    <div className="flex justify-between text-sm text-gray-500 mb-2">
                        <span>Thống kê</span>
                        <span>Theo giờ</span>
                        <span>Theo thu</span>
                    </div>
                    <div className="h-64">
                        <Bar
                            data={revenueData}
                            options={revenueOptions}
                        />
                    </div>
                </div>

                {/* Top Products and Updates */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-4 rounded-lg shadow col-span-2">
                        <h3 className="text-lg font-semibold text-gray-700">
                            TOP 10 HÀNG HÓA BÁN CHẠY NHẤT - THEO DOANH THU THUẦN
                        </h3>
                        <div className="mt-4 h-48">
                            <Bar
                                data={topProductsData}
                                options={topProductsOptions}
                            />
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h3 className="text-lg font-semibold text-gray-700">
                            THÔNG BÁO
                        </h3>
                        <ul className="mt-4 space-y-2">
                            <li className="flex items-center">
                                <div className="w-4 h-4 bg-blue-600 rounded-full mr-2"></div>
                                <span className="text-sm">
                                    Cố sự đăng ký thành viên...
                                </span>
                            </li>
                            <li className="flex items-center">
                                <div className="w-4 h-4 bg-blue-600 rounded-full mr-2"></div>
                                <span className="text-sm">
                                    Hoang Van Tien vừa vào đơn hàng...
                                </span>
                            </li>
                            <li className="flex items-center">
                                <div className="w-4 h-4 bg-blue-600 rounded-full mr-2"></div>
                                <span className="text-sm">
                                    Hoang Van Tien vừa vào đơn hàng...
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardPage;
