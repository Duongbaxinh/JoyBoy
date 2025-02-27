export const titles = [
    "image",
    "code",
    "barcode",
    "name",
    "category",
    "type",
    "linkedChannel",
    "sellingPrice",
    "costPrice",
    "brand",
    "stock",
    "location",
    "ordered",
    "createdAt",
    "expectedOutOfStock",
    "minStock",
    "maxStock",
    "status",
    "warranty",
    "maintenance"
];

export const showPropertiesTable = [
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
        id: "category",
        name: "Nhóm hàng",
        show: true,
        width: "120px"
    },
    {
        id: "type",
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
        id: "sellingPrice",
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
        id: "createdAt",
        name: "Thời gian tạo",
        show: true,
        width: "150px"
    },
    {
        id: "expectedOutOfStock",
        name: "Dự kiến hết hàng",
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
        code: "mh001",
        barcode: "1234567890123",
        name: "product 1",
        category: "perfume",
        type: "product",
        linkedChannel: "shopee",
        sellingPrice: 200000,
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
        code: "mh002",
        barcode: "1234567890124",
        name: "product 2",
        category: "skincare",
        type: "service",
        linkedChannel: "lazada",
        sellingPrice: 300000,
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
    ...Array.from({length: 11}, (_, i) => ({
        id: 3 + i,
        image: `image${3 + i}.jpg`,
        code: `mh00${3 + i}`,
        barcode: `12345678901${25 + i}`,
        name: `product ${3 + i}`,
        category: ["perfume", "skincare", "haircare"][i % 3],
        type: ["product", "service", "combo"][i % 3],
        linkedChannel: "shopee",
        sellingPrice: 150000 + i * 10000,
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
        id: "ma_hang",
        name: "Mã hàng",
        show: true,
        width: "120px"
    },
    {
        id: "ten_hang",
        name: "Tên hàng",
        show: true,
        width: "300px"
    },
    {
        id: "gia_von",
        name: "Giá vốn",
        show: true,
        width: "150px"
    },
    {
        id: "gia_nhap_cuoi",
        name: "Giá nhập cuối",
        show: true,
        width: "150px"
    },
    {
        id: "bang_gia_chung",
        name: "Bảng giá chung",
        show: true,
        width: "150px"
    }
];

export const dataPrice = [
    {
        ma_hang: "SP000022",
        ten_hang: "Kem Chong nang chai 35ml",
        gia_von: 1377500,
        gia_nhap_cuoi: 1377500,
        bang_gia_chung: 1450000
    },
    {
        ma_hang: "SP000021",
        ten_hang: "Mineral Kem duong da chai 35ml",
        gia_von: 902500,
        gia_nhap_cuoi: 902500,
        bang_gia_chung: 950000
    },
    {
        ma_hang: "SP000020",
        ten_hang: "Nước hoa nam BVLGari Pour Homme Eau De Toilette",
        gia_von: 817000,
        gia_nhap_cuoi: 817000,
        bang_gia_chung: 860000
    },
    {
        ma_hang: "SP000019",
        ten_hang: "Calvin Klein for her collection",
        gia_von: 949050,
        gia_nhap_cuoi: 949050,
        bang_gia_chung: 999000
    },
    {
        ma_hang: "SP000018",
        ten_hang: "Nước hoa Ange ou demon le secret",
        gia_von: 2042500,
        gia_nhap_cuoi: 2042500,
        bang_gia_chung: 2150000
    },
    {
        ma_hang: "SP000017",
        ten_hang: "Nước hoa Amarige",
        gia_von: 1187500,
        gia_nhap_cuoi: 1187500,
        bang_gia_chung: 1250000
    }
];
