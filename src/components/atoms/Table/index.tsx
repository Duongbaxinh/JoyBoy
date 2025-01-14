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
    if (!title || !body || title.length === 0 || body.length === 0) {
        return <p>No data available</p>;
    }
    const handleSelectAll = ({e}: {type: "all"; id: ""; e: any}) => {
        setSelectAll(e.target.checked);
        onSelect({type: "all", id: "", e});
    };

    return (
        <table className=" text-text ">
            <thead className="sticky top-0 bg-lightSkyBlue">
                <tr>
                    <th className={` text-[13px] font-[700] ${customHeader}`}>
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
            <tbody>
                {body.map((row, rowIndex) => (
                    <tr
                        key={rowIndex}
                        className="odd:bg-gray-100 even:bg-white">
                        <td
                            className={`p-2 whitespace-nowrap text-[13px] ${customBody}`}>
                            <input
                                checked={
                                    (selectAll &&
                                        itemChecked.some(
                                            (item) => item === row.id
                                        )) ||
                                    itemChecked.some((item) => item === row.id)
                                }
                                type="checkbox"
                                onChange={(e) =>
                                    onSelect({type: "item", id: row.id, e})
                                }
                            />
                        </td>

                        {Object.keys(row).map((col, colIndex) => (
                            <td
                                key={colIndex}
                                className={`p-2 whitespace-nowrap text-[13px] ${customBody}`}>
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
