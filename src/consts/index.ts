export const displayOptions = [
    {id: "active", label: "Hàng đang kinh doanh"},
    {id: "inactive", label: "Hàng ngừng kinh doanh"},
    {id: "all", label: "Tất cả"}
];

export const discountOption = [
    {key: true, label: "Hàng đang khuyến mãi"},
    {key: false, label: "Hàng không khuyễn mãi"},
    {key: null, label: "Tất cả"}
];

export const expirations = [
    {id: null, label: "Tất cả"},
    {id: [0], label: "Đã hết hạn"},
    {id: [0, 6], label: "Dưới 6 tháng"},
    {id: [0, 12], label: "Dưới 12 tháng"},
    {id: [12], label: "Còn dài hạn"}
];

export const categories = [
    {id: "perfume", label: "Nuoc Hoa"},
    {id: "skincare", label: "Cham soc da"},
    {id: "haircare", label: "Cham soc toc"}
];

export const priceRanges = [
    {key: "under-500k", label: "Dưới 500.000₫", min: 0, max: 500000},
    {key: "500k-1m", label: "500.000₫ - 1.000.000₫", min: 500000, max: 1000000},
    {
        key: "1m-1,5m",
        label: "1.000.000₫ - 1.500.000₫",
        min: 1000000,
        max: 1500000
    },
    {
        key: "1.5-2m",
        label: "1.500.000₫ - 2.000.000₫",
        min: 1500000,
        max: 2000000
    },
    {key: "over-2m", label: "Trên 2.000.000₫", min: 2000000, max: null}
];

export const stocks = [
    {id: "all", label: "Tất cả"},
    {id: "low stock", label: "Dưới định mức tồn"},
    {id: "above stock", label: "Vượt định mức tồn"},
    {id: "out stock", label: "Hết hàng trong kho"}
];

export const types = [
    {id: "product", label: "Hàng Hóa"},
    {id: "service", label: "Dịch vụ"},
    {id: "combo", label: "Combo - đóng gói"}
];
