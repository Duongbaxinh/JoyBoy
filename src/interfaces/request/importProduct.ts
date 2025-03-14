import {Product} from "../productTable.interface";

export interface ImportData {
    supplier: string;
    date: string;
    status: string;
    order_code: string;
    import_code: string;
    total_items: number;
    total_price: number;
    discount_percent: number;
    amount_due: number;
    amount_paid: number;
    debt_status: number;
    notes?: string;
    items: Product[];
}
