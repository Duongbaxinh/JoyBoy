import Pagination from "@/components/atoms/Pagination";
import Table from "@/components/atoms/Table";
import {storeCard} from "@/fake";
import {SelectParams} from "@/interfaces";
import React, {useState} from "react";

function StoreCard({data}: any) {
    const [active, setActive] = useState(1);
    return (
        <div className="w-full h-[500px]  p-5 ">
            <Table
                styleTitle="!static !z-0 h-[50px]"
                className="!static"
                defineTitle={storeCard}
                body={data}
                onSelect={function (params: SelectParams): void {
                    throw new Error("Function not implemented.");
                }}
            />
            {data.length > 10 && (
                <div className=" text-text flex gap-2 items-center py-5">
                    <Pagination
                        active={active}
                        setActive={setActive}
                        totalPage={Math.round(5)}
                    />
                    <p>{`Hiển thị 1 - 10 / Tổng số ${data.length} hàng hóa`}</p>
                </div>
            )}
        </div>
    );
}

export default StoreCard;
