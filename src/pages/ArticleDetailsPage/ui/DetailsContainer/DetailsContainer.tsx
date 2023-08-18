import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { ArticleDetails } from '@/entities/Article';
import { Card } from '@/shared/ui/redesigned/Card';

// 16_14 2min
interface DetailsContainterProps {
    className?: string;
}

export const DetailsContainer = memo((props: DetailsContainterProps) => {
    const { className } = props;
    const { id } = useParams<{ id: string }>();

    return (
        // eslint-disable-next-line react/jsx-max-props-per-line
        <Card fullWidth border="partial" className={className} padding="24">
            <ArticleDetails id={id} />
        </Card>
    );
});
