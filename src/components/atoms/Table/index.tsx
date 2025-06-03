"use client";
import { IProduct, TableProps } from "@/interfaces";
import Image from "next/image";
import Price from "../Price";
import DetailItem from "./DetailItem";
import { useState } from "react";


const Table: React.FC<TableProps> = ({
    isDetail,
    setIsDetail,
    className,
    styleTitle,
    checked = false,
    body,
    productLabels,
    openItem,
    onOpenItem,
    onSelect
}) => {
    const [detailItem, setDetailItem] = useState<number | string>('')
    const toggleDetailItem = (id: number | string) => {
        if (id === detailItem) {
            setIsDetail(!isDetail)
        } else {
            setIsDetail(true)
            setDetailItem(id)
        }
    };

    const tBody = (product: IProduct, key: keyof IProduct) => {
        if (key === 'product_thumbnail') {
            return (<Image src={product[key] || "/fallback-image.jpg"} alt="lll" width={80} height={80} className="rounded-md" />)
        }
        if (key === 'product_price') {
            return (<Price product_price={product[key]} />)
        }
        if (key === "product_brand" || key === "product_promotion" || key === "product_type") {
            return (<p>{product[key]?.title ?? "-"}</p>)
        }
        if (key === "product_images") {
            return
        }
        return (<p>{product[key] ?? "-"}</p>)
    }
    const isItemDetailSelected = (productId: number | string) => {
        return productId === detailItem
    }
    return (
        <div
            className={` bg-white text-text text-[13px] leading-[29px]  ${className}`}>
            <table>
                <thead
                    className={`bg-pink-300 ${!isDetail ? " sticky top-0" : ""} px-3 left-0 z-10 ${styleTitle}`}>
                    <tr className="px-3">
                        <th className="py-2 px-3 w-full max-w-[80px] ">
                            <input
                                type="checkbox"
                                onChange={(e) =>
                                    onSelect({ type: "all", id: "", e })
                                }
                            />
                        </th>
                        {productLabels.map((col: any) => (
                            <th
                                key={col.key}
                                className="pl-4 text-left whitespace-nowrap w-full py-4 ">
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {body.map((row: IProduct, index: number) => (
                        <>
                            {row.id !== detailItem &&
                                <tr
                                    key={index}
                                    className={`bg-white hover:bg-pink-100 ${isDetail &&
                                        isItemDetailSelected(row.id ?? "") &&
                                        "font-bold bg-pink-400 hover:bg-pink-400"
                                        } `}
                                    onClick={() => toggleDetailItem(row.id ?? "")}>

                                    <td className="py-2 px-3">
                                        <input
                                            type="checkbox"
                                            onChange={(e) =>
                                                onSelect({
                                                    type: "item",
                                                    id: row.product_brand.slug,
                                                    e
                                                })
                                            }
                                        />
                                    </td>

                                    {productLabels.map(
                                        (col: { key: keyof IProduct, label: any }, index) => (
                                            <td
                                                key={index}
                                                className="pl-4 py-[12px] w-full whitespace-nowrap text-left">
                                                {tBody(row, col.key)}
                                            </td>
                                        )
                                    )}
                                </tr >
                            }

                            {detailItem === row.id && isDetail && (
                                <tr key={row.id} >
                                    <td colSpan={Object.keys(row).length}>
                                        <DetailItem setIsDetail={setIsDetail} product={row} />
                                    </td>
                                </tr>
                            )}
                        </>
                    ))}
                </tbody>
            </table>
        </div >
    );
};

export default Table;
