import { createSlice } from "@reduxjs/toolkit";

export const playerSlice = createSlice({
    name: "player",
    initialState: {
        photoUrl: "",
        trackUrl: null,
        trackName: "",
        trackArtists: [],
        actualTime: 0,
        duration: 0,
        playing: true
    },
    reducers: {
        setTrack: (state, action) => {
            state.trackUrl = action.payload.trackUrl;
            state.photoUrl = action.payload.photoUrl;
            state.trackName = action.payload.trackName;
            state.trackArtists = action.payload.trackArtists;
            state.playing = true;
        },
        setTime: (state, action) => {
            state.actualTime = action.payload.actualTime;
        },
        setDuration: (state, action) => {
            state.duration = action.payload.duration;
        },
        setPlaying: (state, action) => {
            state.playing = action.payload.playing;
        }
    }
})

export const { setTrack, setTime, setDuration, setPlaying } = playerSlice.actions;

export default playerSlice.reducer;