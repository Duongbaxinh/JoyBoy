export function convertText(str: string) {
    return str
        .normalize("NFD") // Chuẩn hóa chuỗi Unicode
        .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu
        .replace(/đ/g, "d") // Thay "đ" bằng "d"
        .replace(/Đ/g, "D") // Thay "Đ" bằng "D"
        .replace(/[^a-zA-Z0-9\s]/g, "") // Loại bỏ ký tự đặc biệt
        .replace(/\s+/g, " ") // Thay thế nhiều khoảng trắng bằng 1 khoảng trắng
        .trim(); // Loại bỏ khoảng trắng đầu và cuối
}
