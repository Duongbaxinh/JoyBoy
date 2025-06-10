import * as XLSX from "xlsx";
import {saveAs} from "file-saver";

interface ExportData {
    [key: string]: string | number | boolean | null;
}

const exportToExcel = (
    data: ExportData[],
    fileName: string = "data.xlsx"
): void => {
    if (!data || data.length === 0) {
        console.error("Dữ liệu trống hoặc không hợp lệ.");
        return;
    }

    // Chuyển đổi dữ liệu thành worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

    // Tạo workbook và thêm worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Xuất file Excel dưới dạng array buffer
    const excelBuffer: any = XLSX.write(wb, {bookType: "xlsx", type: "array"});
    const dataBlob: Blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    });

    // Lưu file
    saveAs(dataBlob, fileName);
};

export default exportToExcel;
