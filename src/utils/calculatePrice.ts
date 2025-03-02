export const calculatePrice = (
    originPrice: number,
    adjust: number,
    status: "add" | "sub",
    type: "vnd" | "percent"
) => {
    if (type === "vnd") {
        if (status === "sub") {
            return originPrice - adjust;
        }
        return originPrice + adjust;
    }
    if (status === "sub") {
        return originPrice - (originPrice * adjust) / 100;
    }
    return originPrice + (originPrice * adjust) / 100;
};
