import { StoreProvider } from './ui/StoreProvider';
import { createReduxStore, AppDispatch } from './config/store';
import type {
    StateSchema,
    ReduxStoreWithManager,
    StateSchemaKey,
    ThunkConfig,
} from './config/StateSchema';

export { StoreProvider, createReduxStore };

export type {
    AppDispatch,
    StateSchema,
    ThunkConfig,
    ReduxStoreWithManager,
    StateSchemaKey,
};
