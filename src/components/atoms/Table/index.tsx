"use client";
import React, {useState} from "react";

const Table = ({
    title,
    body,
    itemChecked,
    customHeader = "",
    customBody = "",
    onSelect
}: {
    title: string[];
    body: any[];
    customHeader?: string;
    customBody?: string;
    itemChecked: (string | number)[];
    onSelect: ({
        type,
        id,
        e
    }: {
        type: "all" | "item";
        id: number | string;
        e: any;
    }) => void;
}) => {
    const [selectAll, setSelectAll] = useState();
    console.log("table run" + itemChecked);
    if (!title || !body || title.length === 0 || body.length === 0) {
        return <p>No data available</p>;
    }
    const handleSelectAll = ({e}: {type: "all"; id: ""; e: any}) => {
        setSelectAll(e.target.checked);
        onSelect({type: "all", id: "", e});
    };

    return (
        <table className=" text-text w-full ">
            <thead className="sticky z-10 top-0 w-full bg-lightSkyBlue">
                <tr className="bg-lightBlue w-full">
                    <th
                        className={` text-[13px] font-[700] p-0 ${customHeader}`}>
                        <input
                            type="checkbox"
                            onChange={(e) =>
                                handleSelectAll({type: "all", id: "", e})
                            }
                        />
                    </th>
                    {title.map((col, index) => (
                        <th
                            className={`px-[15px] py-[8px] text-[13px] font-[700] ${customHeader}`}
                            key={index}>
                            {col}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="w-full">
                {body.map((row, rowIndex) => (
                    <tr
                        key={rowIndex}
                        className="odd:bg-gray-100 even:bg-white">
                        <td
                            className={`px-[15px] py-[8px] whitespace-nowrap text-[13px] ${customBody}`}>
                            <input
                                checked={itemChecked.includes(row.id)}
                                type="checkbox"
                                onChange={(e) =>
                                    onSelect({type: "item", id: row.id, e})
                                }
                            />
                        </td>

                        {Object.keys(row).map((col, colIndex) => (
                            <td
                                key={colIndex}
                                className={`px-[15px] py-[8px]  whitespace-nowrap text-[13px] ${customBody}`}>
                                {row[col] || "-"}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
