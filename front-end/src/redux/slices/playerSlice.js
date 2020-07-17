import { createSlice } from "@reduxjs/toolkit";

export const playerSlice = createSlice({
    name: "player",
    initialState: {
        photoUrl: "",
        trackUrl: "",
    },
    reducers: {
        setMusic: (state, action) => {
            state.trackUrl = action.payload.trackUrl;
            state.photoUrl = action.payload.photoUrl;
        }
    }
})

export const { setMusic } = playerSlice.actions;

export default playerSlice.reducer;