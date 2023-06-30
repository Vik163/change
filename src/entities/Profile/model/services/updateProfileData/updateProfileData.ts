import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Profile, ValidateProfileError } from '../../types/profile';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';
import { validateProfileData } from '../validateProfileData/validateProfileData';

// принимает два или три дженерика: 1 - что возвращает, 2 - принимает, 3 - свойства thunkAPI
// свойства thunkAPI по умолчанию unknow, поэтому перезаписываем rejectValue: string
// export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, { rejectValue: string, extra: ThunkExtraArg }>(
// пропишем типы { rejectValue: string, extra: ThunkExtraArg } - ThunkConfig
export const updateProfileData = createAsyncThunk<
    Profile,
    void,
    ThunkConfig<ValidateProfileError[]>
    >(
        'profile/updateProfileData',
        async (_, thunkApi) => {
            const { extra, rejectWithValue, getState } = thunkApi;

            const formData = getProfileForm(getState());

            const errors = validateProfileData(formData);

            if (errors.length) {
                return rejectWithValue(errors);
            }

            try {
                const response = await extra.api.put<Profile>(
                    `/profile/${formData?.id}`,
                    formData,
                );

                if (!response.data) {
                    throw new Error();
                }

                return response.data;
            } catch (e) {
                console.log(e);
                // thunkAPI 4_7 12 минута
                return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
            }
        },
    );
