"use client";
import FilterOption from "@/components/atoms/FilterOption";
import IconButton from "@/components/atoms/IconButton";
function DashBoard(props: any) {
    return (
        <div>
            <FilterOption className="w-[200px] p-0" title="Filter Option">
                <IconButton label="Option" className="w-full" />
            </FilterOption>
        </div>
    );
}

export default DashBoard;
