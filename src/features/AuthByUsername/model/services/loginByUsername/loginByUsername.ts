import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, userActions } from '@/entities/User';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { ThunkConfig } from '@/app/providers/StoreProvider';

interface LoginByUsernameProps {
    username: string;
    password: string;
}

// принимает два или три дженерика: 1 - что возвращает, 2 - принимает, 3 - свойства thunkAPI
// свойства thunkAPI по умолчанию unknow, поэтому перезаписываем rejectValue: string
// export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, { rejectValue: string, extra: ThunkExtraArg }>(
// пропишем типы { rejectValue: string, extra: ThunkExtraArg } - ThunkConfig
// ThunkConfig 5_6 - 16 min
export const loginByUsername = createAsyncThunk<
    User,
    LoginByUsernameProps,
    ThunkConfig<string>
>('login/loginByUsername', async (authData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.post<User>('/login', authData);

        if (!response.data) {
            throw new Error();
        }

        localStorage.setItem(
            USER_LOCALSTORAGE_KEY,
            JSON.stringify(response.data),
        );
        // thunkAPI 4_7 12 минута
        // thunkAPI.dispatch(userActions.setAuthData(response.data));
        dispatch(userActions.setAuthData(response.data));
        return response.data;
    } catch (e) {
        console.log(e);
        // thunkAPI 4_7 12 минута
        return rejectWithValue('error');
    }
});
