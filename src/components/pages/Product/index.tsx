import ContainerShadow from "@/components/atoms/ContainerShadow";
import FilterOption from "@/components/atoms/FilterOption";
import React from "react";

function Product(props: any) {
    return (
        <div className="flex ">
            <div className="w-[234px]">
                <h1>Hàng Hóa</h1>
                <ContainerShadow>
                    <FilterOption title="Loai hang">
                        <div>
                            <input type="checkbox" />
                            <p>Hang Hoa</p>
                        </div>
                    </FilterOption>
                </ContainerShadow>
            </div>
            <div className="flex-1"></div>
        </div>
    );
}

export default Product;
