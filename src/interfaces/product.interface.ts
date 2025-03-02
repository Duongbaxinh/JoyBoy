export interface IProduct {
    id: string;
    code: string; // Product code
    image?: string | null;
    images?: string[];
    barcode?: string | null;
    name: string;
    category: string; // ObjectId as string
    type?: string | null; // ObjectId as string
    linkedChannel?: string | null;
    price: number;
    costPrice?: number | null;
    brand?: string | null; // ObjectId as string
    stock?: number | null;
    location?: string | null;
    weight?: number;
    unit?: {value: number; type: "g" | "kg"} | null;
    ordered?: number | null;
    createdAt: string; // Date as string (ISO format)
    expectedOutOfStock?: string | null; // Date as string
    minStock?: number | null;
    maxStock?: number | null;
    status?: "in stock" | "low stock" | "out of stock" | null;
    warranty?: string | null;
    maintenance?: string | null;
    businessStatus?: "active" | "inactive" | null;
    manufactureDate?: string | null; // Date as string
    expiryDate?: string | null; // Date as string
    publish?: boolean;
}
