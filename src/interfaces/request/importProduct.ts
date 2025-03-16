import {Product} from "../productTable.interface";
export type TPaymentMethod = "card" | "cash";
export interface ImportData {
    supplier: string | number;
    date: any;
    status: string;
    totalItems: number;
    totalPrice: number;
    totalDiscount: number;
    finalPrice: number;
    discountType: "vnd" | "percent";
    amountDue: number;
    amountPaid: number;
    paymentMethod: TPaymentMethod;
    debtStatus: number;
    notes?: string;
    items: Product[];
}
