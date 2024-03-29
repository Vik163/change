import { rtkApi } from '@/shared/api/rtkApi';
import { Article } from '@/entities/Article';

// 11_2 5min, 15min
const recommendationsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        // 11_4 1min
        getArticleRecommendationsList: build.query<Article[], number>({
            query: (limit) => ({
                url: '/articles',
                params: {
                    _limit: limit,
                    // 16_11 8min выпадала ошибка: вместо user загружалась userId
                    _expand: 'user',
                },
            }),
        }),
    }),
});

export const useArticleRecommendationsList =
    recommendationsApi.useGetArticleRecommendationsListQuery;
