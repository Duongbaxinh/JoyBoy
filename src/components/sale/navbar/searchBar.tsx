import React from "react";

function SearchBar() {
    return (
        <div className="w-1/4 my-1.5">
            <form>
                <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                    Search
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                            className="w-3 h-3 text-gray-700 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20">
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                    <input
                        type="text"
                        className="block w-full py-2 ps-8 text-sm rounded-md focus:outline-none text-black"
                        placeholder="Tìm hàng hóa"
                        required
                    />
                </div>
            </form>
        </div>
    );
}

export default SearchBar;
