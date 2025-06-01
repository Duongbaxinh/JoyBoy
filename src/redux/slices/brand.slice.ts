import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {BranchType} from "@/interfaces/data.type";

type BrandState = {
    brands: BranchType[] | null;
};

const initialState: BrandState = {
    brands: null
};

export const brandSlice = createSlice({
    name: "brands",
    initialState,
    reducers: {
        setBrands: (state, action: PayloadAction<BranchType[]>) => {
            state.brands = action.payload;
        },
        clearBrands: (state) => {
            state.brands = null;
        }
    }
});

export const {setBrands, clearBrands} = brandSlice.actions;
export default brandSlice.reducer;
