export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export const calculateMonthsLeft = (expiryDate: string): number => {
    const now = new Date();
    const expiry = new Date(expiryDate);

    const diffTime = expiry.getTime() - now.getTime();
    const diffMonths = diffTime / (1000 * 60 * 60 * 24 * 30.44); // Chuyển từ milliseconds sang tháng

    return parseFloat(diffMonths.toFixed(2)); // Làm tròn đến 2 chữ số thập phân
};
