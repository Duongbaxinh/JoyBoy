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
        code: "MH001",
        barcode: "1234567890123",
        name: "Sản phẩm 1",
        category: "Nhóm A",
        type: "product",
        linkedChannel: "Shopee",
        sellingPrice: 200000,
        costPrice: 150000,
        brand: "Thương hiệu A",
        stock: 50,
        location: "Kho 1",
        ordered: 5,
        createdAt: "2025-01-01",
        expectedOutOfStock: "2025-02-15",
        minStock: 10,
        maxStock: 100,
        status: "Còn hàng",
        warranty: "12 tháng",
        maintenance: "6 tháng"
    },
    {
        id: 2,
        image: "image2.jpg",
        code: "MH002",
        barcode: "1234567890124",
        name: "Sản phẩm 2",
        category: "Nhóm B",
        type: "service",
        linkedChannel: "Lazada",
        sellingPrice: 300000,
        costPrice: 220000,
        brand: "Thương hiệu B",
        stock: 30,
        location: "Kho 2",
        ordered: 8,
        createdAt: "2024-12-15",
        expectedOutOfStock: "2025-02-20",
        minStock: 15,
        maxStock: 80,
        status: "Còn hàng",
        warranty: "24 tháng",
        maintenance: "12 tháng"
    },
    {
        id: 3,
        image: "image3.jpg",
        code: "MH003",
        barcode: "1234567890125",
        name: "Sản phẩm 3",
        category: "Nhóm C",
        type: "combo",
        linkedChannel: "Tiki",
        sellingPrice: 400000,
        costPrice: 300000,
        brand: "Thương hiệu C",
        stock: 20,
        location: "Kho 3",
        ordered: 2,
        createdAt: "2025-01-02",
        expectedOutOfStock: "2025-03-01",
        minStock: 5,
        maxStock: 50,
        status: "Sắp hết hàng",
        warranty: "6 tháng",
        maintenance: "3 tháng"
    },
    {
        id: 4,
        image: "image4.jpg",
        code: "MH004",
        barcode: "1234567890126",
        name: "Sản phẩm 4",
        category: "Nhóm D",
        type: "product",
        linkedChannel: "Website",
        sellingPrice: 150000,
        costPrice: 120000,
        brand: "Thương hiệu D",
        stock: 100,
        location: "Kho 4",
        ordered: 12,
        createdAt: "2024-12-25",
        expectedOutOfStock: "2025-02-10",
        minStock: 20,
        maxStock: 150,
        status: "Còn hàng",
        warranty: "18 tháng",
        maintenance: "9 tháng"
    },
    ...Array.from({length: 11}, (_, i) => ({
        id: 5 + i,
        image: `image${5 + i}.jpg`,
        code: `MH00${5 + i}`,
        barcode: `12345678901${27 + i}`,
        name: `Sản phẩm ${5 + i}`,
        category: "Nhóm E",
        type: ["product", "service", "combo"][i % 3], // Phân bổ xen kẽ 3 loại
        linkedChannel: "Shopee",
        sellingPrice: 150000 + i * 10000,
        costPrice: 120000 + i * 8000,
        brand: "Thương hiệu E",
        stock: 100 - i * 5,
        location: `Kho ${5 + i}`,
        ordered: 10 - i,
        createdAt: `2024-12-${25 + i}`,
        expectedOutOfStock: `2025-02-${10 + i}`,
        minStock: 10 + i,
        maxStock: 100 + i * 10,
        status: i % 2 === 0 ? "Còn hàng" : "Sắp hết hàng",
        warranty: `${12 + i} tháng`,
        maintenance: `${6 + i} tháng`
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
