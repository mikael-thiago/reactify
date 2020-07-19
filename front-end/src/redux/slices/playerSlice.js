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
        playing: false
    },
    reducers: {
        setTrack: (state, action) => {
            state.trackUrl = action.payload.trackUrl;
            state.photoUrl = action.payload.photoUrl;
            state.trackName = action.payload.trackName;
            state.trackArtists = action.payload.trackArtists;
            state.playing = state.trackUrl ? true : false;
            state.actualTime = 0;
            state.duration = (action.payload.duration) ? action.payload.duration : 30;
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