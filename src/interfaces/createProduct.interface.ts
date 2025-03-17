import * as yup from "yup";

export interface SelectOption {
    id: string;
    value: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export interface ProductProperty {
    name: string;
    values: string[];
}

export interface SimilarProduct {
    name: string;
    unit: string;
    code: string;
    barcode: string;
    costPrice: number;
    unitPrice: number;
    quantity: number;
}

export const productSchema = yup.object().shape({
    code: yup
        .string()
        .required("Vui lòng nhập mã hàng")
        .min(3, "Mã hàng phải có ít nhất 3 ký tự")
        .matches(
            /^[a-zA-Z0-9-]+$/,
            "Mã hàng chỉ được chứa chữ cái, số và dấu gạch ngang"
        ),
    barcode: yup.string(),
    name: yup
        .string()
        .required("Vui lòng nhập tên hàng")
        .min(2, "Tên hàng phải có ít nhất 2 ký tự"),
    description: yup.string().max(1000, "Mô tả không được vượt quá 1000 ký tự"),
    category: yup.string().required("Vui lòng chọn nhóm hàng"),
    brand: yup.string().required("Vui lòng chọn thương hiệu"),
    location: yup.string(),
    costPrice: yup
        .number()
        .transform((value: any) =>
            isNaN(value) || value === null || value === undefined ? 0 : value
        )
        .min(0, "Giá vốn không được âm")
        .default(0),
    unitPrice: yup
        .number()
        .transform((value: any) =>
            isNaN(value) || value === null || value === undefined ? 0 : value
        )
        .min(0, "Giá bán không được âm")
        .default(0),
    quantity: yup
        .number()
        .transform((value: any) =>
            isNaN(value) || value === null || value === undefined ? 0 : value
        )
        .integer("Số lượng phải là số nguyên")
        .min(0, "Số lượng không được âm")
        .default(0),
    minQuantity: yup
        .number()
        .transform((value: any) =>
            isNaN(value) || value === null || value === undefined ? 0 : value
        )
        .integer("Số lượng phải là số nguyên")
        .min(0, "Số lượng không được âm")
        .default(0),
    maxQuantity: yup
        .number()
        .transform((value: any) =>
            isNaN(value) || value === null || value === undefined ? 0 : value
        )
        .integer("Số lượng phải là số nguyên")
        .min(0, "Số lượng không được âm")
        .test(
            "max-greater-than-min",
            "Định mức tối đa phải lớn hơn tối thiểu",
            function (value) {
                const {minQuantity} = this.parent;
                if (!value || !minQuantity) return true;
                return value > minQuantity;
            }
        )
        .default(0),
    weight: yup
        .number()
        .transform((value: any) =>
            isNaN(value) || value === null || value === undefined ? 0 : value
        )
        .min(0, "Trọng lượng không được âm")
        .default(0),
    directSale: yup.boolean().default(false),
    unit: yup.string(),
    properties: yup.array().of(
        yup.object().shape({
            name: yup.string().required("Vui lòng nhập tên thuộc tính"),
            values: yup.array().of(yup.string()).min(1, "Vui lòng thêm ít nhất một giá trị")
        })
    ).default([]),
    similarProducts: yup.array().of(
        yup.object().shape({
            name: yup.string().required("Vui lòng nhập tên sản phẩm tương tự"),
            unit: yup.string().required("Vui lòng nhập đơn vị sản phẩm tương tự"),
            code: yup.string().required("Vui lòng nhập mã sản phẩm tương tự"),
            barcode: yup.string().required("Vui lòng nhập mã vạch sản phẩm tương tự"),
            costPrice: yup.number().required("Vui lòng nhập giá vốn sản phẩm tương tự"),
            unitPrice: yup.number().required("Vui lòng nhập giá bán sản phẩm tương tự"),
            quantity: yup.number().required("Vui lòng nhập số lượng sản phẩm tương tự")
        })
    ).default([]),
    images: yup
        .array()
        .of(
            yup.mixed().test("fileType", "File không hợp lệ", (value: any) => {
                if (!value) return true;
                return value instanceof File;
            })
        )
        .default([])
});

export type CreateProductForm = yup.InferType<typeof productSchema>;
