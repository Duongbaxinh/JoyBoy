"use client";
import StoreCard from "@/components/molecules/StoreCard";
import {dataStoreCard, showFieldInterface} from "@/fake";
import {IProduct, TableProps} from "@/interfaces";
import {calculatePrice} from "@/utils/calculatePrice";
import {useState} from "react";
import {BiPlus} from "react-icons/bi";
import {CgMinimize} from "react-icons/cg";
import Button from "../Button";
import IconButton from "../IconButton";
import Input from "../Input";
import Popup from "../Popup";
import Select from "../Select";
import DetailItem from "./DetailItem";

const options = [
    {id: "price", value: "Gia hien tai"},
    {id: "costPrice", value: "Gia von"}
];

const Table: React.FC<TableProps> = ({
    className,
    onCleanSearch,
    editField,
    styleTitle,
    checked = false,
    fieldSearch = false,
    fieldSearches = [],
    body,
    openItem,
    onDetailItem,
    onOpenItem,
    detailItem = false,
    titleTable = [],
    onSearch,
    onSelect
}) => {
    const [openEdit, setOpenEdit] = useState(false);
    const [editPrice, setEditPrice] = useState<any>();
    const [price, setPrice] = useState<number>(0);
    const [applyPrice, setApplyPrice] = useState(false);
    const [unit, setUnit] = useState<{
        type: "vnd" | "percent";
        status: "add" | "sub";
        value: number;
    }>({type: "vnd", status: "add", value: 0});
    const [typeEditPrice, setTypeEditPrice] = useState<"direct" | "formula">(
        "direct"
    );
    const [typePrice, setTypePrice] = useState<{
        id: string | number;
        value: string;
    }>(options[0]);
    const [showInfo, setShowInfo] = useState<number | string>(1);

    const displayedColumns: showFieldInterface[] = titleTable?.filter(
        (item: any) => item.show
    );

    const colorDefine = (index: number) =>
        index === openItem?.item && openItem.open
            ? "bg-lightGreen"
            : index % 2 === 0
            ? "bg-fadeGray"
            : "bg-white";

    const toggleDetailItem = (id: number | string) => {
        console.log("run toggle", id, openItem);
        onOpenItem && onOpenItem(id);
    };

    const handleEditPrice = (itemEdit: any) => {
        setEditPrice(itemEdit);
        setPrice(itemEdit.price);
        setOpenEdit(true);
    };

    const handleChangePrice = (e: any) => {
        setPrice(Number(e.target.value));
    };

    const handleChangePriceByUnit = (e: any) => {
        setUnit((pre) => ({...pre, value: Number(e.target.value)}));
    };
    const showPrice =
        typeEditPrice === "formula"
            ? calculatePrice(
                  editPrice[typePrice?.id],
                  unit.value,
                  unit.status,
                  unit.type
              )
            : price;

    const handleApplyPrice = () => {
        if (typeEditPrice === "direct") {
            const itemEdit = body.find(
                (item: IProduct) => item.id === editPrice.id
            );
            if (itemEdit) {
                itemEdit.price = showPrice;
            }
        }
        if (!applyPrice && typeEditPrice === "formula") {
            const itemEdit = body.find(
                (item: IProduct) => item.id === editPrice.id
            );
            if (itemEdit) {
                itemEdit.price = showPrice;
            }
        }
        if (applyPrice && typeEditPrice === "formula") {
            body.forEach((item: any) => {
                item.price = calculatePrice(
                    item[typePrice.id],
                    unit.value,
                    unit.status,
                    unit.type
                );
            });
        }

        setApplyPrice(false);
        setUnit({type: "vnd", status: "add", value: 0});
    };

    const handleSearch = ({e, field}: {e: any; field: any}) => {
        return onSearch && onSearch(e, field);
    };

    const handleCleanSearch = (field: any) => {
        return onCleanSearch && onCleanSearch(field);
    };

    return (
        <div
            className={`relative bg-white text-text text-[13px] leading-[29px] ${className}`}>
            <table>
                <thead
                    className={`bg-blue-100 sticky top-0 px-3 left-0 z-10 ${styleTitle}`}>
                    <tr className="px-3">
                        {checked && (
                            <th className="py-2 px-3 w-full max-w-[80px] ">
                                <input
                                    type="checkbox"
                                    onChange={(e) =>
                                        onSelect({type: "all", id: "", e})
                                    }
                                />
                            </th>
                        )}
                        {displayedColumns.map((col: any) => (
                            <th
                                key={col.id}
                                className="pl-4 text-left whitespace-nowrap w-full">
                                {col.name}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {fieldSearch && (
                        <tr className="sticky top-[50px] left-0 bg-white px-4 py-4">
                            {fieldSearches?.map((item: any, index: number) => (
                                <td
                                    key={index}
                                    className="pl-4">
                                    <div className=" w-[250px] flex items-center gap-2">
                                        <Input
                                            value={item.value}
                                            key={index}
                                            className="border-none"
                                            placeholder={`Tim ma hang ${item.label}`}
                                            onChange={(e) =>
                                                handleSearch({
                                                    e,
                                                    field: item.field
                                                })
                                            }
                                        />
                                        {item.value.length > 0 && (
                                            <IconButton
                                                onFC={() =>
                                                    handleCleanSearch(
                                                        item.field
                                                    )
                                                }
                                                icon={<CgMinimize />}
                                            />
                                        )}
                                    </div>
                                </td>
                            ))}
                        </tr>
                    )}
                    {body.map((row: Record<string, any>, index: number) => (
                        <>
                            <tr
                                key={index}
                                className={`hover:bg-lightGreen ${
                                    openItem?.open &&
                                    openItem.item === index &&
                                    "font-bold"
                                } ${colorDefine(index)}`}
                                onClick={() => toggleDetailItem(index)}>
                                {checked && (
                                    <td className="py-2 px-3">
                                        <input
                                            type="checkbox"
                                            onChange={(e) =>
                                                onSelect({
                                                    type: "item",
                                                    id: row.id,
                                                    e
                                                })
                                            }
                                        />
                                    </td>
                                )}
                                {displayedColumns.map(
                                    (col: showFieldInterface) => (
                                        <td
                                            key={col.id}
                                            className="pl-4 py-[12px] w-full whitespace-nowrap text-left">
                                            {editField === col.id ? (
                                                <p
                                                    className="border-b-[1px] border-green"
                                                    onClick={() =>
                                                        handleEditPrice(row)
                                                    }>
                                                    {row[col.id]} -- {col.id}
                                                </p>
                                            ) : col.id === "image" ? (
                                                <img
                                                    src={row[col.id]}
                                                    alt="image"
                                                />
                                            ) : (
                                                <p>{row[col.id] ?? "-"}</p>
                                            )}
                                        </td>
                                    )
                                )}
                            </tr>
                            {openItem &&
                                openItem.item === index &&
                                openItem.open && (
                                    <tr className="bg-white">
                                        <td
                                            colSpan={
                                                displayedColumns.length + 1
                                            }
                                            className="border border-lightBlue">
                                            <div className="bg-lightGreen pl-10 flex gap-3">
                                                {[
                                                    "Thông tin",
                                                    "Thẻ kho",
                                                    "Tồn kho",
                                                    "Hàng hóa cùng loại"
                                                ].map((text, i) => (
                                                    <div
                                                        key={i}
                                                        className={`min-w-[100px] p-2 font-bold ${
                                                            showInfo === i + 1
                                                                ? "bg-white"
                                                                : ""
                                                        }`}
                                                        onClick={() =>
                                                            setShowInfo(i + 1)
                                                        }>
                                                        {text}
                                                    </div>
                                                ))}
                                            </div>
                                            {showInfo === 1 ? (
                                                <DetailItem dataItem={row} />
                                            ) : (
                                                <StoreCard
                                                    data={dataStoreCard}
                                                />
                                            )}
                                        </td>
                                    </tr>
                                )}
                        </>
                    ))}
                </tbody>

                {/* {body.length <= 0 ? (
                    <div className="flex justify-center items-center h-[100vh] w-max">
                        <p>Không có dữ liệu</p>
                    </div>
                ) : (
                    <tbody>
                        {fieldSearch && (
                            <tr className="sticky top-[50px] left-0 bg-white px-4 py-4">
                                {fieldSearches?.map(
                                    (item: any, index: number) => (
                                        <td
                                            key={index}
                                            className="pl-4">
                                            <div className=" w-[250px] flex items-center gap-2">
                                                <Input
                                                    value={item.value}
                                                    key={index}
                                                    className="border-none"
                                                    placeholder={`Tim ma hang ${item.label}`}
                                                    onChange={(e) =>
                                                        handleSearch({
                                                            e,
                                                            field: item.field
                                                        })
                                                    }
                                                />
                                                {item.value.length > 0 && (
                                                    <IconButton
                                                        onFC={() =>
                                                            handleCleanSearch(
                                                                item.field
                                                            )
                                                        }
                                                        icon={<CgMinimize />}
                                                    />
                                                )}
                                            </div>
                                        </td>
                                    )
                                )}
                            </tr>
                        )}
                        {body.map((row: Record<string, any>, index: number) => (
                            <>
                                <tr
                                    key={index}
                                    className={`hover:bg-lightGreen ${
                                        openItem?.open &&
                                        openItem.item === index &&
                                        "font-bold"
                                    } ${colorDefine(index)}`}
                                    onClick={() => toggleDetailItem(index)}>
                                    {checked && (
                                        <td className="py-2 px-3">
                                            <input
                                                type="checkbox"
                                                onChange={(e) =>
                                                    onSelect({
                                                        type: "item",
                                                        id: row.id,
                                                        e
                                                    })
                                                }
                                            />
                                        </td>
                                    )}
                                    {displayedColumns.map(
                                        (col: showFieldInterface) => (
                                            <td
                                                key={col.id}
                                                className="pl-4 py-[12px] w-full whitespace-nowrap text-left">
                                                {editField === col.id ? (
                                                    <p
                                                        className="border-b-[1px] border-green"
                                                        onClick={() =>
                                                            handleEditPrice(row)
                                                        }>
                                                        {row[col.id]} --{" "}
                                                        {col.id}
                                                    </p>
                                                ) : col.id === "image" ? (
                                                    <img
                                                        src={row[col.id]}
                                                        alt="image"
                                                    />
                                                ) : (
                                                    <p>{row[col.id] ?? "-"}</p>
                                                )}
                                            </td>
                                        )
                                    )}
                                </tr>
                                {openItem &&
                                    openItem.item === index &&
                                    openItem.open && (
                                        <tr className="bg-white">
                                            <td
                                                colSpan={
                                                    displayedColumns.length + 1
                                                }
                                                className="border border-lightBlue">
                                                <div className="bg-lightGreen pl-10 flex gap-3">
                                                    {[
                                                        "Thông tin",
                                                        "Thẻ kho",
                                                        "Tồn kho",
                                                        "Hàng hóa cùng loại"
                                                    ].map((text, i) => (
                                                        <div
                                                            key={i}
                                                            className={`min-w-[100px] p-2 font-bold ${
                                                                showInfo ===
                                                                i + 1
                                                                    ? "bg-white"
                                                                    : ""
                                                            }`}
                                                            onClick={() =>
                                                                setShowInfo(
                                                                    i + 1
                                                                )
                                                            }>
                                                            {text}
                                                        </div>
                                                    ))}
                                                </div>
                                                {showInfo === 1 ? (
                                                    <DetailItem
                                                        dataItem={row}
                                                    />
                                                ) : (
                                                    <StoreCard
                                                        data={dataStoreCard}
                                                    />
                                                )}
                                            </td>
                                        </tr>
                                    )}
                            </>
                        ))}
                    </tbody>
                )} */}
            </table>
            <Popup
                className="p-6 w-[650px]"
                onClose={() => setOpenEdit(false)}
                isOpen={openEdit}>
                <div className="flex items-center gap-2">
                    <input
                        type="radio"
                        checked={typeEditPrice === "direct"}
                        onChange={() => setTypeEditPrice("direct")}
                    />
                    <div
                        className={`flex gap-2 w-full ${
                            typeEditPrice !== "direct" &&
                            "opacity-50 pointer-events-none"
                        }`}>
                        <p className="whitespace-nowrap">Sua truc tiep : </p>
                        <Input
                            variant="underline"
                            type="number"
                            value={price}
                            onChange={handleChangePrice}
                        />
                    </div>
                </div>
                <div className="flex items-center gap-2 mt-4">
                    <input
                        type="radio"
                        checked={typeEditPrice === "formula"}
                        onChange={() => setTypeEditPrice("formula")}
                    />
                    <p>Cap nhat gia bang cong thuc</p>
                </div>
                <div
                    className={`${
                        typeEditPrice !== "formula" &&
                        "opacity-50 pointer-events-none"
                    }`}>
                    <div className="flex items-center gap-2 mt-4">
                        <p className="whitespace-nowrap">
                            Gia moi{" "}
                            <span>
                                [{editPrice && editPrice[typePrice?.id]}] =
                            </span>
                        </p>

                        <Select
                            onChange={setTypePrice}
                            selected={typePrice}
                            options={options}
                        />
                        <IconButton
                            onFC={() =>
                                setUnit((pre) => ({...pre, status: "add"}))
                            }
                            className={`${
                                unit.status === "add" && "!bg-darkGreen"
                            }`}
                            icon={<BiPlus />}
                        />
                        <IconButton
                            onFC={() =>
                                setUnit((pre) => ({...pre, status: "sub"}))
                            }
                            className={`${
                                unit.status === "sub" && "!bg-darkGreen"
                            }`}
                            icon={<CgMinimize />}
                        />
                        <Input
                            value={unit.value}
                            onChange={handleChangePriceByUnit}
                            variant="underline"
                        />
                        <Button
                            className={`w-[50px] ${
                                unit.type === "vnd" && "!bg-darkGreen"
                            }`}
                            label="VND"
                            onAction={() => {
                                setUnit((pre) => ({...pre, type: "vnd"}));
                            }}
                        />
                        <Button
                            className={`w-[50px] ${
                                unit.type === "percent" && "!bg-darkGreen"
                            }`}
                            label="%"
                            onAction={() => {
                                setUnit((pre) => ({
                                    ...pre,
                                    type: "percent"
                                }));
                            }}
                        />
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                        <input
                            onChange={(e) => setApplyPrice(e.target.checked)}
                            type="checkbox"
                            id="applyToAll"
                        />
                        <label htmlFor="applyToAll">
                            Áp dụng công thức cho 25 sản phẩm?{" "}
                            {editPrice && showPrice}
                        </label>
                    </div>
                </div>
                <div className="mt-6 flex justify-end gap-4">
                    <IconButton
                        onFC={handleApplyPrice}
                        icon={<BiPlus />}
                        label="Dong Y"
                        className="w-[100px] !p-0"
                    />
                    <IconButton
                        // icon={<CgMinimize />}
                        label="Bo Qua"
                        className="w-[100px] !p-0 bg-darkGray"
                    />
                </div>
            </Popup>
        </div>
    );
};

export default Table;
