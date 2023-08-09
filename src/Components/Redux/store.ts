import { configureStore } from "@reduxjs/toolkit";
import wordSlice from "./reducers/wordSlice";

export const store = configureStore({
    reducer: {
        words: wordSlice
    }
})