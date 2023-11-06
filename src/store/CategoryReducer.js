import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name: "category",
    initialState: {
        categories: []
    },
    reducers: {
        addCategories(state, action){
            state.categories.push(action.payload)
        },
    }
})

export const categoryActions = categorySlice.actions;

export default categorySlice.reducer;