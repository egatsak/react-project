import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ArticlePageGreetingSchema } from "../types/ArticlePageGreetingSchema";

const initialState: ArticlePageGreetingSchema = {};

export const ArticlePageGreetingSlice = createSlice({
    name: "ArticlePageGreeting",
    initialState,
    reducers: {
        template: (state, action: PayloadAction<string>) => {},
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(, (state) => {
    //             state.error = undefined;
    //             state.isLoading = true;
    //         })
    //         .addCase(, (state) => {
    //             state.isLoading = false;
    //         })
    //         .addCase(, (state, action) => {
    //             state.isLoading = false;
    //             state.error = action.payload;
    //         });
    // },
});

export const { actions: ArticlePageGreetingActions } = ArticlePageGreetingSlice;
export const { reducer: ArticlePageGreetingReducer } = ArticlePageGreetingSlice;
