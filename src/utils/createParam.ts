import {FilterProductType} from "@/interfaces";
import {isArray} from "lodash";

export const createParams = (customParams: any) => ({
    limitnumber: 10,
    page: 1,
    ...customParams
});

export function toQueryString(params: any) {
    return Object.entries(params)
        .filter(
            ([_, v]) =>
                v !== "" && v !== null && !(Array.isArray(v) && v.length === 0)
        )
        .map(([key, val]) =>
            Array.isArray(val)
                ? `${key}=${val.join(",")}`
                : typeof val === "string" ||
                  typeof val === "number" ||
                  typeof val === "boolean"
                ? `${key}=${encodeURIComponent(val)}`
                : `${key}=`
        )
        .join("&");
}

export const query = toQueryString({
    limitnumber: 30,
    page: 1,
    brand: [],
    category: "",
    price: [],
    rate: 5,
    order: "asc",
    sortBy: ""
});

export const cleanFilter = (filter: any) => {
    const newFilter: {[key: string]: any} = {};
    for (const filed in filter) {
        if (filed === "price") {
            newFilter["price"] = filter["price"]?.value;
        } else if (isArray(filter[filed as keyof FilterProductType])) {
            newFilter[filed] = filter[filed].map((item: any) => item.value);
        } else {
            newFilter[filed] = filter[filed as keyof FilterProductType];
        }
    }
    return newFilter;
};
