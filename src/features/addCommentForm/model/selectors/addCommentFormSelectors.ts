import { StateSchema } from '@/app/providers/StoreProvider';

// - ?? вместо || - если слева null или undefined
export const getAddCommentFormText = (state: StateSchema) => state.addCommentForm?.text ?? '';
export const getAddCommentFormError = (state: StateSchema) => state.addCommentForm?.error;
