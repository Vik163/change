import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { FeatureFlags } from '@/shared/types/featureFlags';
import { updateFeatureFlagsMutation } from '../api/featureFlagsApi';
import { getAllFeatureFlags, setFeatureFlags } from '../lib/setGetFeatures';

interface UpdateFeatureFlagOptions {
    userId: string;
    newFeatures: Partial<FeatureFlags>;
}

// 16_12 8min
export const updateFeatureFlag = createAsyncThunk<
    void,
    UpdateFeatureFlagOptions,
    ThunkConfig<string>
>('features/updateFeatureFlag', async ({ userId, newFeatures }, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    // 16_18 6min
    const allFeatures = {
        ...getAllFeatureFlags(),
        ...newFeatures,
    };

    try {
        await dispatch(
            updateFeatureFlagsMutation({
                userId,
                features: allFeatures,
            }),
        );

        setFeatureFlags(allFeatures);

        // 16_18 (костыль) принудительное обновление интерфейса для изменений по featureFlag
        window.location.reload();
        return undefined;
    } catch (e) {
        console.log(e);
        return rejectWithValue('');
    }
});
