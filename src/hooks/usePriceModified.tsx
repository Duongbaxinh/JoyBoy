;
import { PriceState, StatusType } from "@/interfaces/productTable.interface";
import { useState } from "react";


const usePriceModified = () => {
    const [unit, setUnit] = useState<PriceState>({
        type: "vnd",
        status: "add",
        value: 0
    });

    const handleVNDUnit = () => {
        setUnit((prev) => ({ ...prev, type: "vnd" }));
    };

    const handlePercentUnit = () => {
        setUnit((prev) => ({ ...prev, type: "percent" }));
    };

    const handleStatusChange = (status: StatusType) => {
        setUnit((prev) => ({ ...prev, status }));
    };

    const handleValueChange = (value: number) => {
        setUnit((prev) => ({
            ...prev,
            value: prev.status === "sub" ? -Math.abs(value) : Math.abs(value)
        }));
    };

    return {
        unit,
        setUnit,
        handleVNDUnit,
        handlePercentUnit,
        handleStatusChange,
        handleValueChange
    };
};

export default usePriceModified;