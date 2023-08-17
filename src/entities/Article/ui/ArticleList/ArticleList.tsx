import { useTranslation } from 'react-i18next';
import { HTMLAttributeAnchorTarget, memo } from 'react';
// import {
//     AutoSizer, List, ListRowProps, WindowScroller,
// } from 'react-virtualized';
import { Text, TextSize } from '@/shared/ui/deprecated/Text';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleView } from '../../model/consts/articleConsts';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import cls from './ArticleList.module.scss';
import { Article } from '../../model/types/article';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import { ToggleFeatures } from '@/shared/lib/features';
import { HStack } from '@/shared/ui/redesigned/Stack';

// 8_3
interface ArticleListProps {
    className?: string;
    articles: Article[];
    isLoading?: boolean;
    target?: HTMLAttributeAnchorTarget;
    view?: ArticleView;
    // virtualized?: boolean; // 11_4 2min
}

const getSkeletons = (view: ArticleView) =>
    new Array(view === ArticleView.SMALL ? 9 : 3)
        .fill(0)
        .map((item, index) => (
            <ArticleListItemSkeleton
                className={cls.card}
                key={index}
                view={view}
            />
        ));

export const ArticleList = memo((props: ArticleListProps) => {
    const {
        className,
        articles,
        view = ArticleView.SMALL,
        isLoading,
        target,
        // virtualized = true,
    } = props;
    const { t } = useTranslation();

    const isBig = view === ArticleView.BIG;

    // const itemsPerRow = isBig ? 1 : 3;
    // const rowCount = isBig
    //     ? articles.length
    //     : Math.ceil(articles.length / itemsPerRow);

    // const rowRender = ({
    //     index, isScrolling, key, style,
    // }: ListRowProps) => {
    //     const items = [];
    //     const fromIndex = index * itemsPerRow;
    //     const toIndex = Math.min(fromIndex + itemsPerRow, articles.length);

    //     for (let i = fromIndex; i < toIndex; i += 1) {
    //         items.push(
    //             <ArticleListItem
    //                 article={articles[i]}
    //                 view={view}
    //                 target={target}
    //                 key={`str${i}`}
    //                 className={cls.card}
    //             />,
    //         );
    //     }

    //     return (
    //         <div
    //             key={key}
    //             style={style}
    //             className={cls.row}
    //         >
    //             {items}
    //         </div>
    //     );
    // };

    if (!isLoading && !articles.length) {
        return (
            <div
                className={classNames(cls.ArticleList, {}, [
                    className,
                    cls[view],
                ])}
            >
                <Text size={TextSize.L} title={t('Статьи не найдены')} />
            </div>
        );
    }

    // 10_1
    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <HStack
                    wrap="wrap"
                    gap="16"
                    className={classNames(cls.ArticleListRedesigned, {}, [])}
                    data-testid="ArticleList"
                >
                    {articles.map((item) => (
                        <ArticleListItem
                            article={item}
                            view={view}
                            target={target}
                            key={item.id}
                            className={cls.card}
                        />
                    ))}
                    {isLoading && getSkeletons(view)}
                </HStack>
            }
            off={
                // <WindowScroller
                //     scrollElement={document.getElementById(PAGE_ID) as Element}
                // >
                //     {({
                //         height,
                //         width,
                //         registerChild,
                //         onChildScroll,
                //         isScrolling,
                //         scrollTop,
                //     }) => (
                <div
                    // // @ts-ignore
                    //     ref={registerChild}
                    className={classNames(cls.ArticleList, {}, [
                        className,
                        cls[view],
                    ])}
                    data-testid="ArticleList"
                >
                    {/* {virtualized
                        ? (
                            // @ts-ignore
                            <List
                                height={height ?? 700}
                                rowCount={rowCount}
                                rowHeight={isBig ? 700 : 330}
                                rowRenderer={rowRender}
                                width={width ? width - 80 : 700}
                                autoHeight
                                onScroll={onChildScroll}
                                isScrolling={isScrolling}
                                scrollTop={scrollTop}
                            />
                        )
                        : ( */}
                    {articles.map((item) => (
                        <ArticleListItem
                            article={item}
                            view={view}
                            target={target}
                            key={item.id}
                            className={cls.card}
                        />
                    ))}
                    {isLoading && getSkeletons(view)}
                </div>
                // </WindowScroller>
            }
        />
    );

    //     <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
    //         {articles.length > 0
    //             ? articles.map(renderArticle)
    //             : null}
    //         {isLoading && getSkeletons(view)}
    //     </div>
});
