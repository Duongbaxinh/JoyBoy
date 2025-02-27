"use client";
import {dataStoreCard, showPropertiesTable, titles} from "@/fake";
import {useState} from "react";
import DetailItem from "./DetailItem";
import {TableProps} from "@/interfaces";
import StoreCard from "@/components/molecules/StoreCard";

const Table: React.FC<TableProps> = ({
    defineTitle,
    className,
    styleTitle,
    checked = false,
    customTitle,
    body,
    detailItem = false,
    itemChecked,
    onSelect
}) => {
    const [openItem, setOpenItem] = useState<{
        item: number | null | string;
        open: boolean;
    }>({item: null, open: false});

    const [showInfo, setInfo] = useState<string | number>(1);
    // if (!customTitle?.length || !body?.length) return <p>No data available</p>;

    const displayedColumns =
        customTitle &&
        customTitle.filter(
            (item: any) => titles.includes(item.id) && item.show
        );

    const colorDefine = (index: number): string => {
        if (index !== openItem.item && index % 2 !== 0) return "bg-fadeGray";
        if (index === openItem.item && openItem.open) return "bg-lightGreen";
        return "bg-white";
    };

    const showDetailItem = (id: string | number) => {
        const newStatus = id === openItem.item ? !openItem.open : true;
        setOpenItem(() => ({item: id, open: newStatus}));
    };

    const handleShowInfo = (id: string | number) => {
        setInfo(id);
    };

    const titleTable = defineTitle ? defineTitle : displayedColumns;

    console.log("title table ::: ", titleTable);
    return (
        <div className={`relative bg-white text-text text-[13px] ${className}`}>
            <div
                className={`flex gap-5 sticky top-0 z-99 px-4 bg-fadeBlue text-text font-bold text-[13px] h-[50px] items-center w-max ${styleTitle}`}>
                {checked && (
                    <input
                        type="checkbox"
                        className="min-w-[40px]"
                        onChange={(e) => onSelect({type: "all", id: "", e})}
                    />
                )}
                {titleTable.map((item: any) => (
                    <div
                        key={item.id}
                        style={{width: item.width}}
                        className="text-center">
                        {item.name}
                    </div>
                ))}
            </div>

            {/* BODY TABLE  */}
            {body.map((row, index) => (
                <div
                    key={index}
                    className={`w-max h-full  ${colorDefine(
                        index
                    )} hover:bg-lightGreen`}>
                    <div
                        className={`flex gap-5 items-center h-full px-4 py-2  ${
                            openItem.item === index &&
                            openItem.open &&
                            "font-bold"
                        }`}
                        onClick={() => showDetailItem(index)}>
                        {checked && (
                            <input
                                type="checkbox"
                                className="min-w-[40px]"
                                // checked={itemChecked.includes(row.id)}
                                onChange={(e) =>
                                    onSelect({type: "item", id: row.id, e})
                                }
                            />
                        )}
                        {titleTable.map((col: any) => (
                            <div
                                key={col.id}
                                style={{width: col.width}}
                                className="py-3 text-center">
                                {row[col.id] ?? "-"}
                            </div>
                        ))}
                    </div>

                    {/* DETAIL ITEM */}
                    {openItem.item === index && openItem.open && detailItem && (
                        <div className="w-full bg-white text-text border border-lightBlue ">
                            <div className=" w-full bg-lightGreen">
                                <div className=" pl-10  flex gap-3 text-center">
                                    {[
                                        "Thông tin",
                                        "Thẻ kho",
                                        "Tồn kho",
                                        "Hàng hóa cùng loại"
                                    ].map((text, i) => (
                                        <div
                                            key={i}
                                            className={`min-w-[100px] p-2 rounded-t-sm text-[13px] font-bold ${
                                                showInfo === i + 1 && "bg-white"
                                            }`}
                                            onClick={() =>
                                                handleShowInfo(i + 1)
                                            }>
                                            {text}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {showInfo === 1 && <DetailItem />}
                            {showInfo === 2 && (
                                <StoreCard data={dataStoreCard} />
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Table;
