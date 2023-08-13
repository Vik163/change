import { lazy, Suspense } from 'react';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import { ArticleRatingProps } from './ArticleRating';

const ArticleRatingLazy = lazy(() => import('./ArticleRating'));

// 12_9 22min
export const ArticleRatingAsync = (props: ArticleRatingProps) => {
    return (
        <Suspense fallback={<Skeleton width="100%" height={140} />}>
            <ArticleRatingLazy {...props} />
        </Suspense>
    );
};
