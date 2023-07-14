import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { ArticleDetails } from 'entities/Article';
import { useParams } from 'react-router-dom';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from 'widgets/Page/Page';
import { VStack } from 'shared/ui/Stack';
import { ArticleRecommendationsList } from 'features/articleRecommendationsList';
import cls from './ArticleDetailsPage.module.scss';
import { articleDetailsPageReducer } from '../../model/slices';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';

interface ArticleDetailsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    // articleDetailsComments: articleDetailsCommentsReducer, 9_4 15min
    // articleDetailsRecommendations: articleDetailsPageRecommendationsReducer,
    articleDetailsPage: articleDetailsPageReducer,
};

// подключить страницу app/providers/router/routeConfig
// export default, чтобы работали чанки
const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const { className } = props;
    const { t } = useTranslation('article-details');
    const { id } = useParams<{ id: string }>();

    // 7_5 37min
    // 11_2 const comments = useSelector(getArticleComments.selectAll);
    // const recommendations = useSelector(getArticleRecommendations.selectAll);
    // const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
    // const recommendationsIsLoading = useSelector(getArticleRecommendationsIsLoading);

    // const onSendComment = useCallback((text: string) => {
    //     dispatch(addCommentForArticle(text));
    // }, [dispatch]);

    // пользовательский хук (проверка storybook) 7_5 42-43min
    // useInitialEffect(() => { 11_2
    //     dispatch(fetchCommentsByArticleId(id));
    // dispatch(fetchArticleRecommendations());
    // });

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                <VStack gap="16" max>
                    <ArticleDetailsPageHeader />
                    <ArticleDetails id={id} />
                    <ArticleRecommendationsList />
                    <ArticleDetailsComments id={id} />
                    {/* 11_2
                    <Text
                        size={TextSize.L}
                        className={cls.commentTitle}
                        title={t('Рекомендуем')}
                    />
                    <ArticleList
                        articles={recommendations}
                        isLoading={recommendationsIsLoading}
                        className={cls.recommendations}
                        target="_blank"
                    /> */}
                    {/* <Text
                        size={TextSize.L}
                        className={cls.commentTitle}
                        title={t('Комментарии')}
                    />
                    <AddCommentForm onSendComment={onSendComment} />
                    <CommentList
                        isLoading={commentsIsLoading}
                        comments={comments}
                    /> */}
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
};
// export default, чтобы работали чанки
export default memo(ArticleDetailsPage);
