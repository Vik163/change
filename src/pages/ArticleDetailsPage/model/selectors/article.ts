import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from 'entities/User';
import { getArticleDetailsData } from 'entities/Article';

export const getCanEditArticle = createSelector(
    getArticleDetailsData,
    getUserAuthData,
    (article, user) => { // 9_5 3min
        if (!article || !user) {
            return false;
        }

        return article.user.id === user.id;
    },
);
