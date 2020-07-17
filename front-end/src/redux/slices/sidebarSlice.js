import { createSlice } from "@reduxjs/toolkit";

export const sidebarSlice = createSlice({
    name: "search",
    initialState: {
        activeItem: "Início"
    },
    reducers: {
        setActiveItem: (state, action) => {
            state.activeItem = action.payload.activeItem;
        }
    }
})

export const { setActiveItem } = sidebarSlice.actions;

export default sidebarSlice.reducer;