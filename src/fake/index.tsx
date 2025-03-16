import { IProduct } from "@/interfaces";
import { Product } from "@/interfaces/productTable.interface";

export interface showFieldInterface {
    id: keyof IProduct;
    name: string;
    show: boolean;
    width: any;
}

export const showPropertiesTable: showFieldInterface[] = [
    {
        id: "image",
        name: "Hình ảnh",
        show: true,
        width: "80px"
    },
    {
        id: "code",
        name: "Mã hàng",
        show: true,
        width: "100px"
    },
    {
        id: "barcode",
        name: "Mã vạch",
        show: true,
        width: "100px"
    },
    {
        id: "name",
        name: "Tên hàng",
        show: true,
        width: "150px"
    },
    {
        id: "category", // ✅ Matches API response
        name: "Nhóm hàng",
        show: true,
        width: "120px"
    },
    {
        id: "type", // ✅ Matches API response
        name: "Loại hàng",
        show: true,
        width: "120px"
    },
    {
        id: "linkedChannel",
        name: "Liên kết kênh bán",
        show: true,
        width: "150px"
    },
    {
        id: "price", // ✅ Matches API response
        name: "Giá bán",
        show: true,
        width: "120px"
    },
    {
        id: "costPrice",
        name: "Giá vốn",
        show: true,
        width: "120px"
    },
    {
        id: "brand",
        name: "Thương hiệu",
        show: true,
        width: "120px"
    },
    {
        id: "stock",
        name: "Tồn kho",
        show: true,
        width: "120px"
    },
    {
        id: "location",
        name: "Vị trí",
        show: true,
        width: "120px"
    },
    {
        id: "ordered",
        name: "Khách đặt",
        show: true,
        width: "120px"
    },
    {
        id: "createdAt", // ✅ Matches API response
        name: "Thời gian tạo",
        show: true,
        width: "150px"
    },
    {
        id: "minStock",
        name: "Định mức tồn ít nhất",
        show: true,
        width: "150px"
    },
    {
        id: "maxStock",
        name: "Định mức tồn nhiều nhất",
        show: true,
        width: "150px"
    },
    {
        id: "status",
        name: "Trạng thái",
        show: true,
        width: "120px"
    },
    {
        id: "warranty",
        name: "Bảo hành",
        show: true,
        width: "120px"
    },
    {
        id: "maintenance",
        name: "Bảo trì",
        show: true,
        width: "120px"
    },
    {
        id: "businessStatus",
        name: "Trạng thái kinh doanh",
        show: true,
        width: "120px"
    },
    {
        id: "id", // ✅ This is what appears in the API response instead of `_id`
        name: "ID",
        show: false, // Hide if not necessary
        width: "150px"
    }
];

export const storeCard = [
    {
        id: "chung_tu",
        name: "Chứng từ",
        show: true,
        width: "120px"
    },
    {
        id: "thoi_gian",
        name: "Thời gian",
        show: true,
        width: "150px"
    },
    {
        id: "loai_giao_dich",
        name: "Loại giao dịch",
        show: true,
        width: "150px"
    },
    {
        id: "doi_tac",
        name: "Đối tác",
        show: true,
        width: "200px"
    },
    {
        id: "gia_gd",
        name: "Giá Giao dịch",
        show: true,
        width: "150px"
    },
    {
        id: "gia_von",
        name: "Giá vốn",
        show: true,
        width: "150px"
    }
];

export const body = [
    {
        id: 1,
        image: "image1.jpg",
        images: [],
        code: "mh001",
        barcode: "1234567890123",
        name: "product 1sooooooo",
        category: "perfume",
        type: "product",
        linkedChannel: "shopee",
        price: 200000,
        costPrice: 150000,
        brand: "brand a",
        stock: 50,
        location: "warehouse 1",
        ordered: 5,
        createdAt: "2025-01-01",
        expectedOutOfStock: "2025-02-15",
        minStock: 10,
        maxStock: 100,
        status: "in stock",
        warranty: "12 months",
        maintenance: "6 months",
        businessStatus: "active",
        manufactureDate: "2023-06-01",
        expiryDate: "2024-02-01" // Đã hết hạn
    },
    {
        id: 2,
        image: "image2.jpg",
        images: [],
        code: "mh002",
        barcode: "1234567890124",
        name: "product 2",
        category: "skincare",
        type: "service",
        linkedChannel: "lazada",
        price: 300000,
        costPrice: 220000,
        brand: "brand b",
        stock: 30,
        location: "warehouse 2",
        ordered: 8,
        createdAt: "2024-12-15",
        expectedOutOfStock: "2025-02-20",
        minStock: 15,
        maxStock: 80,
        status: "in stock",
        warranty: "24 months",
        maintenance: "12 months",
        businessStatus: "active",
        manufactureDate: "2024-07-01",
        expiryDate: "2025-08-01" // Còn hơn 6 tháng sử dụng
    },
    ...Array.from({ length: 11 }, (_, i) => ({
        id: 3 + i,
        image: `image${3 + i}.jpg`,
        images: [],
        code: `mh00${3 + i}`,
        barcode: `12345678901${25 + i}`,
        name: `product ${3 + i}`,
        category: ["perfume", "skincare", "haircare"][i % 3],
        type: ["product", "service", "combo"][i % 3],
        linkedChannel: "shopee",
        price: 150000 + i * 10000,
        costPrice: 120000 + i * 8000,
        brand: "brand e",
        stock: 100 - i * 5,
        location: `warehouse ${3 + i}`,
        ordered: 10 - i,
        createdAt: `2024-12-${20 + i}`,
        expectedOutOfStock: `2025-02-${10 + i}`,
        minStock: 10 + i,
        maxStock: 100 + i * 10,
        status: i % 2 === 0 ? "in stock" : "low stock",
        warranty: `${12 + i} months`,
        maintenance: `${6 + i} months`,
        businessStatus: i % 2 === 0 ? "active" : "inactive",
        manufactureDate: `2024-05-${10 + i}`,
        expiryDate:
            i % 3 === 0
                ? `2025-04-${10 + i}` // Hạn sắp hết (trong vòng 2 tháng)
                : i % 3 === 1
                    ? `2026-05-${10 + i}` // Còn dài hạn
                    : `2024-11-${10 + i}` // Đã hết hạn
    }))
];

export const dataStoreCard = [
    {
        chung_tu: "CT001",
        thoi_gian: "2025-02-25 10:00",
        loai_giao_dich: "Mua",
        doi_tac: "Công ty A",
        gia_gd: 1000000,
        gia_von: 900000
    },
    {
        chung_tu: "CT002",
        thoi_gian: "2025-02-25 11:30",
        loai_giao_dich: "Bán",
        doi_tac: "Công ty B",
        gia_gd: 1500000,
        gia_von: 1200000
    },
    {
        chung_tu: "CT003",
        thoi_gian: "2025-02-25 14:45",
        loai_giao_dich: "Mua",
        doi_tac: "Công ty C",
        gia_gd: 2000000,
        gia_von: 1800000
    },
    {
        chung_tu: "CT004",
        thoi_gian: "2025-02-25 16:20",
        loai_giao_dich: "Bán",
        doi_tac: "Công ty D",
        gia_gd: 2500000,
        gia_von: 2100000
    }
];

export const priceLabels = [
    {
        id: "id",
        name: "Product ID",
        show: true,
        width: "120px"
    },
    {
        id: "name",
        name: "Product Name",
        show: true,
        width: "300px"
    },
    {
        id: "costPrice",
        name: "Cost Price",
        show: true,
        width: "150px"
    },
    {
        id: "lastPurchasePrice",
        name: "Last Purchase Price",
        show: true,
        width: "150px"
    },
    {
        id: "price",
        name: "General Price",
        show: true,
        width: "150px"
    },
    {
        id: "expirationDate",
        name: "Expiration Date",
        show: true,
        width: "150px"
    }
];
export const dataPrice = [
    {
        id: "SP000022",
        code: "mh022",
        name: "Kem Chong nang chai 35ml",
        category: "skincare",
        costPrice: 1377500,
        lastPurchasePrice: 1377500,
        price: 1450000,
        stock: 50,
        expectedOutOfStock: "2025-12-20",
        expiryDate: "2025-12-01",
        status: "in stock"
    },
    {
        id: "SP000021",
        code: "mh021",
        name: "Mineral Kem duong da chai 35ml",
        category: "skincare",
        costPrice: 902500,
        lastPurchasePrice: 902500,
        price: 950000,
        stock: 30,
        expectedOutOfStock: "2025-11-25",
        expiryDate: "2025-11-15",
        status: "in stock"
    },
    {
        id: "SP000020",
        code: "mh020",
        name: "Nước hoa nam BVLGari Pour Homme Eau De Toilette",
        category: "perfume",
        costPrice: 817000,
        lastPurchasePrice: 817000,
        price: 860000,
        stock: 20,
        expectedOutOfStock: "2026-02-05",
        expiryDate: "2026-01-20",
        status: "low stock"
    },
    {
        id: "SP000019",
        code: "mh019",
        name: "Calvin Klein for her collection",
        category: "perfume",
        costPrice: 949050,
        lastPurchasePrice: 949050,
        price: 999000,
        stock: 40,
        expectedOutOfStock: "2025-10-15",
        expiryDate: "2025-09-30",
        status: "expired"
    },
    {
        id: "SP000018",
        code: "mh018",
        name: "Nước hoa Ange ou demon le secret",
        category: "perfume",
        costPrice: 2042500,
        lastPurchasePrice: 2042500,
        price: 2150000,
        stock: 25,
        expectedOutOfStock: "2026-03-25",
        expiryDate: "2026-03-10",
        status: "in stock"
    },
    {
        id: "SP000017",
        code: "mh017",
        name: "Nước hoa Amarige",
        category: "perfume",
        costPrice: 1187500,
        lastPurchasePrice: 1187500,
        price: 1250000,
        stock: 35,
        expectedOutOfStock: "2025-10-20",
        expiryDate: "2025-10-05",
        status: "expired"
    }
];



export interface Supplier {
    id: number;
    code: string;
    name: string;
    phone: string;
    group: string;
    email: string;
    address: string;
    area: string;
    ward: string;
    company: string;
    note: string;
    taxCode: string;
    creator: string;
    createdAt: string;
    debt: number;
    totalPurchase: number;
    totalReturn: number;
    status: string;
}

export const supplierEx: Supplier[] = [
    {
        id: 1,
        code: "NCC001",
        name: "Nhà cung cấp A",
        phone: "0123 456 789",
        group: "Nhóm 1",
        email: "nccA@example.com",
        address: "123 Đường ABC",
        area: "Hồ Chí Minh",
        ward: "Quận 1",
        company: "Công ty A",
        note: "Ghi chú A",
        taxCode: "123456789",
        creator: "Nguyễn Văn B",
        createdAt: "2024-03-12",
        debt: 5000000,
        totalPurchase: 20000000,
        totalReturn: 1000000,
        status: "Hoạt động",
    },
    {
        id: 2,
        code: "NCC002",
        name: "Nhà cung cấp B",
        phone: "0987 654 321",
        group: "Nhóm 2",
        email: "nccB@example.com",
        address: "456 Đường XYZ",
        area: "Hà Nội",
        ward: "Quận Ba Đình",
        company: "Công ty B",
        note: "Ghi chú B",
        taxCode: "987654321",
        creator: "Trần Thị C",
        createdAt: "2024-02-20",
        debt: 1000000,
        totalPurchase: 5000000,
        totalReturn: 500000,
        status: "Ngừng hoạt động",
    },
];


export interface Category {
    id: number | string;
    value: string;
}

export const categoryEx: Category[] = [
    { id: 1, value: "perfume" },
    { id: 2, value: "skincare" },
    { id: 3, value: "haircare" },
    { id: 4, value: "cosmetics" },
    { id: 5, value: "bodycare" }
];

export const options = [
    { id: 1, value: "Sửa rửa mặt" },
    {
        id: 2, value: "kem chống nắng1"
    },
    { id: 3, value: "kem chống nắng2" },
    { id: 4, value: "kem chống nắng3" },
    { id: 5, value: "kem chống nắng4" },
    { id: 6, value: "kem chống nắng5" },
    { id: 7, value: "kem chống nắng6" },
    { id: 8, value: "kem chống nắng7" }
]
export const productsEx: Product[] = [
    {
        id: 1,
        code: "mh001",
        name: "Nước hoa Chanel",
        quantity: 50,
        unitPrice: 2000000,
        discount: 200000,
        discountType: "vnd",
        totalPrice: 1800000,
        categories: "perfume",
        note: "Mùi hương sang trọng"
    },
    {
        id: 2,
        code: "mh002",
        name: "Sữa rửa mặt Cetaphil",
        quantity: 30,
        unitPrice: 250000,
        discount: 10,
        discountType: "percent",
        totalPrice: 225000,
        categories: "skincare",
        note: "Dành cho da nhạy cảm"
    },
    {
        id: 3,
        code: "mh003",
        name: "Dầu gội Tresemme",
        quantity: 40,
        unitPrice: 180000,
        discount: 0,
        discountType: "vnd",
        totalPrice: 180000,
        categories: "haircare",
        note: "Dưỡng tóc mềm mượt"
    },
    {
        id: 4,
        code: "mh004",
        name: "Serum dưỡng da La Roche-Posay",
        quantity: 20,
        unitPrice: 450000,
        discount: 15,
        discountType: "percent",
        totalPrice: 382500,
        categories: "skincare",
        note: "Cấp ẩm và phục hồi da"
    },
    {
        id: 5,
        code: "mh005",
        name: "Kem chống nắng Anessa",
        quantity: 25,
        unitPrice: 500000,
        discount: 50000,
        discountType: "vnd",
        totalPrice: 450000,
        categories: "skincare",
        note: "Chống nắng tốt, không bết dính"
    },
    {
        id: 6,
        code: "mh006",
        name: "Son môi MAC",
        quantity: 60,
        unitPrice: 600000,
        discount: 10,
        discountType: "percent",
        totalPrice: 540000,
        categories: "cosmetics",
        note: "Màu đỏ cam trendy"
    },
    {
        id: 7,
        code: "mh007",
        name: "Sữa tắm Dove",
        quantity: 35,
        unitPrice: 150000,
        discount: 0,
        discountType: "vnd",
        totalPrice: 150000,
        categories: "bodycare",
        note: "Dưỡng ẩm sâu"
    },
    {
        id: 8,
        code: "mh008",
        name: "Xịt khoáng Vichy",
        quantity: 15,
        unitPrice: 320000,
        discount: 20,
        discountType: "percent",
        totalPrice: 256000,
        categories: "skincare",
        note: "Giúp da luôn tươi mát"
    },
    {
        id: 9,
        code: "mh009",
        name: "Kem dưỡng ẩm CeraVe",
        quantity: 45,
        unitPrice: 380000,
        discount: 5,
        discountType: "percent",
        totalPrice: 361000,
        categories: "skincare",
        note: "Dưỡng ẩm tốt, phù hợp mọi loại da"
    },
    {
        id: 10,
        code: "mh010",
        name: "Toner Some By Mi",
        quantity: 20,
        unitPrice: 290000,
        discount: 29000,
        discountType: "vnd",
        totalPrice: 261000,
        categories: "skincare",
        note: "Làm sạch sâu, hỗ trợ trị mụn"
    }
]