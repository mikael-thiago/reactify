import { configureStore } from "@reduxjs/toolkit";

import playerReducer from "../slices/playerSlice.js";

export default configureStore({
    reducer: {
        player: playerReducer,
    }
})