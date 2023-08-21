import { createAsyncThunk } from "@reduxjs/toolkit";
import { User, userActions } from "@/entities/User";
import { ThunkConfig } from "@/app/providers/StoreProvider";

interface LoginByUsernameProps {
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<
    User,
    LoginByUsernameProps,
    ThunkConfig<string>
>("login/loginByUsername", async (authData, thunkApi) => {
    const { dispatch, rejectWithValue, extra } = thunkApi;
    try {
        const response = await extra.api.post<User>("/login", authData);

        if (!response.data) {
            throw new Error("Empty server response!");
        }

        dispatch(userActions.setAuthData(response.data));
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue("Error fetching users!");
    }
});
