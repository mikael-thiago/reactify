import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
    name: "search",
    initialState: {
        query: ""
    },
    reducers: {
        setQuery: (state, action) => {
            state.query = action.payload.query;
        }
    }
})

export const { setQuery } = searchSlice.actions;

export default searchSlice.reducer;