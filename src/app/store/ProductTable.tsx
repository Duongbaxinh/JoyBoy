import Button from "@/components/atoms/Button";
import IconButton from "@/components/atoms/IconButton";
import Input from "@/components/atoms/Input";
import useClickOutside from "@/hooks/useClickOuside";
import { Product, ProductTableProps } from "@/interfaces/productTable.interface";
import { formatPrice } from "@/utils";
import { useRef, useState } from "react";
import { BiTrash } from "react-icons/bi";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { MdEditLocation } from "react-icons/md";



const titles = [
    { id: "id", name: "STT", show: true },
    { id: "code", name: "Mã hàng", show: true },
    { id: "name", name: "Tên hàng", show: true },
    { id: "quantity", name: "Số lượng", show: true },
    { id: "unitPrice", name: "Đơn giá", show: true },
    { id: "discount", name: "Giảm giá", show: true },
    { id: "totalPrice", name: "Thành tiền", show: true }
];

const ProductTable = ({
    products,
    edit,
    unit,
    setEdit,
    handleNote,
    handleEdit,
    handleDiscountProduct,
    handleQuantity,
    handleAdjustUnitPrice,
    handleVNDUnit,
    handlePercentUnit
}: ProductTableProps) => {
    const refNote = useRef<HTMLDivElement | null>(null);
    const refDiscount = useRef<HTMLDivElement | null>(null);
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    useClickOutside([refDiscount, refNote], () => {
        setEdit((prev) => ({
            ...prev,
            name: { ...prev["name"], status: false },
            discount: { ...prev["discount"], status: false },
            unitPrice: { ...prev["unitPrice"], status: false },
        }));
    });

    const defineColumn = (product: Product, field: string) => {
        switch (field) {
            case "quantity":
                return (
                    <td
                        key={field}
                        className=" py-2 flex items-center justify-between min-w-[100px] max-w-[100px] ">
                        <IconButton
                            onFC={() =>
                                handleQuantity(product.id, product.quantity - 1)
                            }
                            icon={<BsArrowDown className="size-2 text-text" />}
                            className={`${hoveredId === product.id ? "visible" : "hidden"
                                }  !bg-transparent !max-w-[20px] !min-w[20px] !max-h-[20px] !min-h[20px] p-0 border-[1px] border-green`}
                        />
                        <Input
                            variant="underline"
                            value={product.quantity}
                            className="!max-w-[60px]"
                            onChange={(e) =>
                                handleQuantity(
                                    product.id,
                                    Number(e.target.value)
                                )
                            }
                        />
                        <IconButton
                            onFC={() =>
                                handleQuantity(product.id, product.quantity + 1)
                            }
                            icon={<BsArrowUp className="size-2 text-text" />}
                            className={`${hoveredId === product.id ? "visible" : "hidden"
                                }  !bg-transparent !max-w-[20px] !min-w[20px] !max-h-[20px] !min-h[20px] p-0 border-[1px] border-green`}
                        />
                    </td>
                );

            case "unitPrice":
                return (
                    <td
                        key={field}
                        className="pl-4 py-2 text-left">
                        <Input
                            className="!py-[3px]"
                            variant="underline"
                            type="number"
                            value={product.unitPrice}
                            onChange={(e) => {
                                {
                                    console.log("unit price", Number(e.target.value))
                                    handleAdjustUnitPrice(
                                        product.id,
                                        Number(e.target.value)
                                    );
                                }
                            }}
                        />
                    </td>
                );

            case "discount":
                return (
                    <td
                        key={field}
                        onClick={(e) => {
                            return handleEdit(field, product.id);
                        }}
                        className="pl-4 py-2 text-left relative">
                        <p className="border-b-[1px] border-green leading-[20px]">
                            {product.discount}
                        </p>
                        {edit[field].status &&
                            edit[field].id === product.id && (
                                <div
                                    ref={refDiscount}
                                    onClick={(e) => e.stopPropagation()}
                                    className="w-fit absolute z-10 top-auto right-0 p-3 bg-white shadow-md rounded-md flex items-center gap-2 ">
                                    <p className="whitespace-nowrap">
                                        Giam gia
                                    </p>
                                    <Input
                                        refInput={refDiscount}
                                        className="!py-[3px] min-w-[100px]"
                                        variant="underline"
                                        value={product.discount}
                                        type="number"
                                        onChange={(e) => {
                                            {
                                                handleDiscountProduct(
                                                    product.id,
                                                    Math.min(
                                                        product.unitPrice,
                                                        Number(e.target.value)
                                                    )
                                                );
                                            }
                                        }}
                                    />
                                    <Button
                                        className={`px-1 py-1 ${unit.type === "vnd" &&
                                            "!bg-darkGreen"
                                            }`}
                                        label="VND"
                                        onAction={handleVNDUnit}
                                    />
                                    <Button
                                        className={`px-1 py-1 ${unit.type === "percent" &&
                                            "!bg-darkGreen"
                                            }`}
                                        label="%"
                                        onAction={handlePercentUnit}
                                    />
                                </div>
                            )}
                    </td>
                );

            case "totalPrice":
                return (
                    <td
                        key={field}
                        className="pl-4 py-2 text-left">
                        <p className="border-b-[1px] border-green leading-[20px]">
                            {" "}
                            {formatPrice(product.totalPrice)}
                        </p>
                    </td>
                );

            case "name":
                return (
                    <td
                        key={field}
                        className="pl-4 py-2 text-left min-w[150px] relative">
                        <div className="">
                            {product[field as keyof Product]}
                            <div
                                className="flex gap-2"
                                onClick={() => handleEdit(field, product.id)}>
                                <p className="text-[10px] font-light italic max-w-[200px] break-words">
                                    {product.note && product.note?.length > 0
                                        ? product.note
                                        : "Ghi chu..."}{" "}
                                </p>
                                <MdEditLocation />
                            </div>
                        </div>
                        {edit[field].status &&
                            edit[field].id === product.id && (
                                <div
                                    ref={refNote}
                                    onClick={(e) => e.stopPropagation()}
                                    className="w-[250px] absolute z-10 top-auto left-0 bg-white shadow-md rounded-md flex items-center gap-2 ">
                                    <textarea
                                        placeholder="Ghi chu..."
                                        value={product.note}
                                        minLength={5}
                                        className="w-full text-[10px] italic font-thin border-0 outline-none shadow-md p-2 rounded-sm"
                                        onChange={(e) => {
                                            handleNote(e)(product.id);
                                        }}></textarea>
                                </div>
                            )}
                    </td>
                );

            default:
                return (
                    <td
                        key={field}
                        className="pl-4 py-2 text-left ">
                        {product[field as keyof Product]}
                    </td>
                );
        }
    };

    if (products.length <= 0) return <h1>Loading....</h1>;

    return (
        <div className="w-full  overflow-x-auto bg-white h-full md:h-[calc(100vh-180px)] relative ">
            <table className="w-full text-text text-[13px] ">
                <thead className="sticky top-0 z-20 left-0">
                    <tr className="bg-blue-100 ">
                        <th className="px-3 py-3 text-left w-[50px]"></th>
                        {titles.map((col) => (
                            <th
                                key={col.id}
                                className={`px-3 text-left whitespace-nowrap  py-3  ${col.id === "name" && "min-w-[200px] "
                                    } `}>
                                {col.name}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr
                            key={product.id}
                            className="hover:bg-lightGreen border-b-[1px] border-lightGray"
                            onMouseEnter={() => setHoveredId(product.id)}
                            onMouseLeave={() => setHoveredId(null)}>
                            <td className="px-3">
                                <BiTrash />
                            </td>
                            {titles.map((col) => defineColumn(product, col.id))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;
