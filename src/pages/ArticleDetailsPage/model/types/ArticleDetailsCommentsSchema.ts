import { EntityState } from '@reduxjs/toolkit';
import { Comment } from '@/entities/Comment';

// EntityState 7_5 32min
export interface ArticleDetailsCommentsSchema extends EntityState<Comment> {
    isLoading?: boolean;
    error?: string;
}
