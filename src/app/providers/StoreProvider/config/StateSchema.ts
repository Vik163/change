import { CounterSchema } from 'entities/Counter';
import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/AuthByUsername';
import {
    AnyAction, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { CombinedState } from 'redux';
import { AxiosInstance } from 'axios';
import { To } from 'history';
import { NavigateOptions } from 'react-router';
import { ArticleDetailsSchema } from 'entities/Article';
import {
    ArticleDetailsCommentsSchema,
    ArticleDetailsPageSchema,
    ArticleDetailsRecommendationsSchema,
} from 'pages/ArticleDetailsPage';
import { AddCommentFormSchema } from 'features/addCommentForm';
import { ArticlesPageSchema } from 'pages/ArticlesPage';
import { UISchema } from 'features/UI';
import { rtkApi } from 'shared/api/rtkApi';
import { ProfileSchema } from 'features/editableProfileCard';

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema;
    ui: UISchema;
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer> // 11_2 9min

    // Асинхронные редюсеры
    loginForm?: LoginSchema;
    profile?: ProfileSchema;
    articleDetails?: ArticleDetailsSchema;
    addCommentForm?: AddCommentFormSchema;
    // articleDetailsComments?: ArticleDetailsCommentsShema; 9_4 12min
    // articleDetailsRecommendations?: ArticleDetailsRecommendationsSchema;
    articlesPage?: ArticlesPageSchema;
    articleDetailsPage?: ArticleDetailsPageSchema; // 9_4 12min
}

export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
    // true -  вмонтирован редьюсер, false - нет 9_1 9мин
    getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

// thunkAPI - { rejectValue: string, extra: ThunkExtraArg }
// преобразуем
// дженерик Т - тип ошибки
export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
