"use client";
import React, {useEffect, useState} from "react";
import SearchBar from "./searchBar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRightLeft, faXmark} from "@fortawesome/free-solid-svg-icons";

function Navbar() {
    const [activeTab, setActiveTab] = useState(0);

    const [tabs, setTabs] = useState(["Hóa đơn 1", "Hóa đơn 2", "Hóa đơn 3"]);

    const removeTab = (index: number) => {
        if (tabs.length === 1) return;

        console.log(index);
        const newTabs = tabs.filter((_, i) => i !== index);
        setTabs(newTabs);

        if (index >= newTabs.length) {
            setActiveTab(newTabs.length - 1);
        } else {
            setActiveTab(index);
        }
    };

    useEffect(() => {
        console.log("Tabs sau khi cập nhật:", tabs);
    }, [tabs]);
    return (
        <header className="bg-primaryColor px-1 flex flex-row">
            <SearchBar />
            <div className="content-end">
                <div className="flex flex-row mx-2">
                    {tabs.map((tab, index) => (
                        <li key={index} className="h-10 list-none">
                            <button
                                className={`text-m h-full flex items-center justify-center px-2 rounded-t-md ${
                                    activeTab === index
                                        ? "bg-grey text-black"
                                        : "bg-transparent text-white"
                                }`}
                                onClick={() => setActiveTab(index)}>
                                <span className="flex items-center">
                                    {/* Nút chuyển đổi */}
                                    <span className="hover:bg-blue-200 py-2 rounded-full">
                                        <FontAwesomeIcon
                                            icon={faRightLeft}
                                            className={`text-primaryColor size-3 mx-2 ${
                                                activeTab === index
                                                    ? "block"
                                                    : "hidden"
                                            }`}
                                        />
                                    </span>

                                    {/* Văn bản tab */}
                                    <p className="mx-2">{tab}</p>

                                    {/* Nút đóng */}
                                    <span
                                        onClick={(e) => {
                                            e.stopPropagation(); // Ngăn không thay đổi activeTab khi xóa
                                            removeTab(index);
                                        }}
                                        className="hover:bg-gray-300 py-1 rounded-full cursor-pointer">
                                        <FontAwesomeIcon
                                            icon={faXmark}
                                            className={`text-black size-4 mx-2 ${
                                                activeTab === index
                                                    ? "text-black"
                                                    : "text-white"
                                            }`}
                                        />
                                    </span>
                                </span>
                            </button>
                        </li>
                    ))}
                </div>
            </div>
        </header>
    );
}

export default Navbar;
