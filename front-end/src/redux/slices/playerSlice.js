import { createSlice } from "@reduxjs/toolkit";

export const playerSlice = createSlice({
    name: "player",
    initialState: {
        photoUrl: "",
        trackUrl: "",
        trackName: "",
        trackArtists: []
    },
    reducers: {
        setMusic: (state, action) => {
            state.trackUrl = action.payload.trackUrl;
            state.photoUrl = action.payload.photoUrl;
            state.trackName = action.payload.trackName;
            state.trackArtists = action.payload.trackArtists;
        }
    }
})

export const { setMusic } = playerSlice.actions;

export default playerSlice.reducer;