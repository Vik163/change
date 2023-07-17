import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article } from '../../types/article';

// принимает два или три дженерика: 1 - что возвращает, 2 - принимает, 3 - свойства thunkAPI
// свойства thunkAPI по умолчанию unknow, поэтому перезаписываем rejectValue: string
// export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, { rejectValue: string, extra: ThunkExtraArg }>(
// пропишем типы { rejectValue: string, extra: ThunkExtraArg } - ThunkConfig
export const fetchArticleById = createAsyncThunk<
    Article,
    string | undefined,
    ThunkConfig<string>
    >(
        'articleDetails/fetchArticleById',
        async (articleId, thunkApi) => {
            const { extra, rejectWithValue } = thunkApi;

            try {
                if (!articleId) {
                    throw new Error('');
                }
                const response = await extra.api.get<Article>(`/articles/${articleId}`, {
                    params: {
                        _expand: 'user',
                    },
                });

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
