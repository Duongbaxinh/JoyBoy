import {ArrowBack, ArrowNext} from "@/assets/icons";
import React from "react";

interface PaginationInterface {
    active: number;
    setActive: (value: number) => void;
    totalPage: number;
}
enum PageType {
    PREV = "PREV",
    NEXT = "NEXT",
    TOP = "TOP",
    END = "END"
}
function Pagination({active, setActive, totalPage}: PaginationInterface) {
    const maxDisplay = 7;

    const getPages = (): (string | number)[] => {
        if (totalPage <= maxDisplay) {
            return Array.from({length: totalPage}, (_, i) => i + 1);
        }

        const pages: (string | number)[] = [];
        const leftRange = 2;
        const rightRange = Math.min(totalPage - 1, active + 1);
        if (active < maxDisplay - 2) {
            console.log("run at here 1");
            pages.push(1); // Always include the first page

            for (let i = leftRange; i <= maxDisplay - 2; i++) {
                pages.push(i);
            }

            if (rightRange < totalPage - 1) pages.push("...");
            pages.push(totalPage); // Always include the last page
            return pages;
        }
        if (active >= maxDisplay - 2 && active < totalPage - 3) {
            console.log("run at here 2");

            pages.push(1); // Always include the first page
            pages.push("...");
            for (let i = active - 1; i < active + 2; i++) {
                pages.push(i);
            }

            if (rightRange < totalPage - 1) pages.push("...");
            pages.push(totalPage); // Always include the last page
            return pages;
        }
        if (active >= totalPage - 3) {
            console.log("run at here 3");
            pages.push(1);
            pages.push("...");
            for (let i = totalPage - (maxDisplay - 3); i <= totalPage; i++) {
                pages.push(i);
            }
            return pages;
        }
        return [];
    };
    const pages: (string | number)[] = getPages();
    const handleMovePage = (type: PageType) => {
        if (type === PageType.PREV) {
            if (active > 1) {
                setActive(active - 1);
            }
        }
        if (type === PageType.NEXT) {
            if (active < totalPage) {
                setActive(active + 1);
            }
        }
        if (type === PageType.TOP) {
            setActive(1);
        }
        if (type === PageType.END) {
            setActive(totalPage);
        }
    };
    return (
        <div className="flex items-center space-x-2 text-text">
            <button
                disabled={1 === active}
                className="w-6 h-6 rounded-1 bg-gray-100 flex items-center justify-center"
                onClick={() => handleMovePage(PageType.TOP)}>
                {" "}
                <ArrowBack
                    className={`text-gray-950 ${
                        active === 1 &&
                        "disabled !text-gray-300 cursor-not-allowed"
                    }`}
                />
            </button>
            <button
                disabled={1 === active}
                className="w-6 h-6 rounded-1 bg-gray-100 flex items-center justify-center"
                onClick={() => handleMovePage(PageType.PREV)}>
                <ArrowBack
                    className={`text-gray-950 ${
                        active === 1 &&
                        "disabled !text-gray-300 cursor-not-allowed"
                    }`}
                />
            </button>
            {pages.map((page, i) => (
                <button
                    key={i}
                    className={`w-6 h-6 rounded-sm ${
                        active === page
                            ? "bg-green text-white"
                            : "transparent text-gray-950"
                    } ${page !== "..." ? "cursor-pointer" : "cursor-default"}`}
                    onClick={() => typeof page === "number" && setActive(page)}>
                    {page}
                </button>
            ))}
            <button
                disabled={totalPage === active}
                className="w-6 h-6 rounded-1 bg-gray-100 flex items-center justify-center"
                onClick={() => handleMovePage(PageType.NEXT)}>
                <ArrowNext
                    className={`text-gray-950 ${
                        active === totalPage &&
                        "disabled !text-gray-300 cursor-not-allowed"
                    }`}
                />
            </button>
            <button
                className="w-6 h-6 rounded-1 bg-gray-100 flex items-center justify-center"
                onClick={() => handleMovePage(PageType.END)}>
                <ArrowNext
                    className={`text-gray-950 ${
                        active === totalPage &&
                        "disabled !text-gray-300 cursor-not-allowed"
                    }`}
                />
            </button>
        </div>
    );
}

export default Pagination;
