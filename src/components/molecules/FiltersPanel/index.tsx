// components/FiltersPanel.tsx
import React from "react";
import FilterOption from "@/components/atoms/FilterOption";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import { SearchIcon } from "@/assets/icons";
import { categories, types, stocks, displayOptions, expirations } from "@/consts";
import { Filters } from "@/interfaces";

interface FiltersPanelProps {
    filters: Filters;
    setFilters: (filters: Filters) => void;
    handleTextSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FiltersPanel: React.FC<FiltersPanelProps> = ({
    filters,
    setFilters,
    handleTextSearch
}) => {
    const handleFilterChange = (field: keyof Filters, value: string) => {
        setFilters({
            ...filters,
            [field]: Array.isArray(filters[field])
                ? (filters[field] as string[]).includes(value)
                    ? (filters[field] as string[]).filter(
                        (item) => item !== value
                    )
                    : [...(filters[field] as string[]), value]
                : value
        });
    };

    return (
        <div className="col-span-1">
            <h2 className="h-20 flex items-center text-2xl font-bold text-text">
                Hàng Hóa
            </h2>
            <div className="flex flex-col gap-3">
                <FilterOption
                    title="Loại Hàng"
                    className="p-3">
                    <div className="mt-2 flex flex-col gap-3">
                        {types.map(({ id, label }) => (
                            <label
                                key={id}
                                className="flex items-center gap-2 text-text">
                                <input
                                    type="checkbox"
                                    checked={filters.typeProduct.includes(id)}
                                    onChange={() =>
                                        handleFilterChange("typeProduct", id)
                                    }
                                />
                                <span className="text-sm">{label}</span>
                            </label>
                        ))}
                    </div>
                </FilterOption>
                <FilterOption
                    title="Nhóm hàng"
                    className="p-3">
                    <div className="mt-2 flex flex-col gap-3">
                        <Input
                            resInput={""}
                            leadingIcon={<SearchIcon />}
                            placeholder="Tìm kiếm nhóm hàng"
                        />
                        {categories.map(({ id, label }) => (
                            <label
                                key={id}
                                className="flex items-center gap-2 text-text">
                                <input
                                    type="checkbox"
                                    checked={filters.categories.includes(id)}
                                    onChange={() =>
                                        handleFilterChange("categories", id)
                                    }
                                />
                                <span className="text-sm">{label}</span>
                            </label>
                        ))}
                    </div>
                </FilterOption>
                <FilterOption
                    title="Tồn kho"
                    className="p-3">
                    <div className="mt-2 flex flex-col gap-3">
                        {stocks.map(({ id, label }) => (
                            <label
                                key={id}
                                className="flex items-center gap-2 text-text">
                                <input
                                    type="radio"
                                    name="stock"
                                    checked={filters.stock === id}
                                    onChange={() =>
                                        handleFilterChange("stock", id)
                                    }
                                />
                                <span className="text-sm">{label}</span>
                            </label>
                        ))}
                    </div>
                </FilterOption>
                <FilterOption
                    title="Lựa chọn hiển thị"
                    className="p-3">
                    <div className="mt-2 flex flex-col gap-3">
                        {displayOptions.map(({ id, label }) => (
                            <label
                                key={id}
                                className="flex items-center gap-2 text-text">
                                <input
                                    type="radio"
                                    name="businessStatus"
                                    checked={filters.businessStatus === id}
                                    onChange={() =>
                                        handleFilterChange("businessStatus", id)
                                    }
                                />
                                <span className="text-sm">{label}</span>
                            </label>
                        ))}
                    </div>
                </FilterOption>
                {/* <FilterOption
                    title="Hạn sử dụng"
                    className="p-3">
                    <div className="mt-2 flex flex-col gap-3">
                        {expirations.map(({ id, label }, index) => (
                            <label
                                key={index}
                                className="flex items-center gap-2 text-text">
                                <input
                                    type="radio"
                                    name="expiration"
                                    checked={filters.expiration === id}
                                    onChange={() =>
                                        handleFilterChange("expiration", id)
                                    }
                                />
                                <span className="text-sm">{label}</span>
                            </label>
                        ))}
                    </div>
                </FilterOption> */}
                <FilterOption
                    title="Thương hiệu"
                    className="p-3">
                    <Select placeholder="Chọn thương hiệu" />
                </FilterOption>
            </div>
        </div>
    );
};

export default FiltersPanel;
