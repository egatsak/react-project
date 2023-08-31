import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { getUserDataByIdQuery } from "../../api/userApi";
import { User } from "../types/user";
import {
    LOCAL_STORAGE_LAST_DESIGN_KEY,
    USER_LOCAL_STORAGE_KEY,
} from "@/shared/const/localStorage";

export const initAuthData = createAsyncThunk<User, void, ThunkConfig<string>>(
    "user/initAuthData",
    async (_, thunkApi) => {
        const { rejectWithValue, dispatch } = thunkApi;

        const userId = localStorage.getItem(USER_LOCAL_STORAGE_KEY);

        if (!userId) {
            return rejectWithValue("initAuthData.ts");
        }

        try {
            const response = await dispatch(
                getUserDataByIdQuery(userId),
            ).unwrap();

            window.localStorage.setItem(
                LOCAL_STORAGE_LAST_DESIGN_KEY,
                response.features?.isAppRedesigned ? "new" : "old",
            );

            if (!response.jsonSettings) {
                return rejectWithValue("Error getting user!");
            }

            return response;
        } catch (e) {
            console.log(e);
            return rejectWithValue("Error getting user!");
        }
    },
);
