import { configureStore } from "@reduxjs/toolkit";

import playerReducer from "../slices/playerSlice.js";
import searchReducer from "../slices/searchSlice.js";
import routeReducer from "../slices/routeSlice.js";
import sidebarReducer from "../slices/sidebarSlice.js";

export default configureStore({
    reducer: {
        player: playerReducer,
        search: searchReducer,
        route: routeReducer,
        sidebar: sidebarReducer
    }
})