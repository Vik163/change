import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Profile } from '../../types/profile';

// принимает два или три дженерика: 1 - что возвращает, 2 - принимает, 3 - свойства thunkAPI
// свойства thunkAPI по умолчанию unknow, поэтому перезаписываем rejectValue: string
// export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, { rejectValue: string, extra: ThunkExtraArg }>(
// пропишем типы { rejectValue: string, extra: ThunkExtraArg } - ThunkConfig
export const fetchProfileData = createAsyncThunk<
    Profile,
    string,
    ThunkConfig<string>
    >(
        'profile/fetchProfileData',
        async (profileId, thunkApi) => {
            const { extra, rejectWithValue } = thunkApi;

            try {
                const response = await extra.api.get<Profile>(`/profile/${profileId}`);

                if (!response.data) {
                    throw new Error();
                }

                return response.data;
            } catch (e) {
                console.log(e);
                // thunkAPI 4_7 12 минута
                return rejectWithValue('error');
            }
        },
    );
