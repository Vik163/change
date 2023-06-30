import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';
import { $api } from 'shared/api/api';
import { CombinedState, Reducer } from 'redux';
import { uiReducer } from 'features/UI';
import { StateSchema, ThunkExtraArg } from './StateSchema';
import { createReducerManager } from './reducerManager';

export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
) {
    // В корневом редьюсере только обязательные
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        counter: counterReducer,
        user: userReducer,
        ui: uiReducer,
    };

    const reducerManager = createReducerManager(rootReducers);

    const extraArg: ThunkExtraArg = {
        api: $api,
    };

    const store = configureStore({
        // as Reducer<CombinedState<StateSchema>> 5_6 - 13 min 18min
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        // axios
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            thunk: {
                extraArgument: extraArg,
            },
        }),
    });
    // добавляем новое поле в store
    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}
// export type AppDispatch = typeof store.dispatch
// снаружи получить dispatch не можем,
// поэтому используем ReturnType<typeof createReduxStore>
// получаем тип самого store и нужно добавить ['dispatch'], чтобы получить его тип
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
