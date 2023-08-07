import { FC, memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { classNames } from "@/shared/lib/classNames/classNames";
import { ArticleList } from "@/entities/Article";

import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect/useInitialEffect";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Page } from "@/widgets/Page/Page";
import { fetchNextArticlesPage } from "../../model/services/fetchNextArticlesPage/fetchNextArticlesPage";
import { initArticlesPage } from "../../model/services/initArticlesPage/initArticlesPage";
import {
    getArticlesPageError,
    getArticlesPageIsLoading,
    getArticlesPageView,
} from "../../model/selectors/articlesPageSelectors";
import {
    articlesPageReducer,
    getArticles,
} from "../../model/slice/articlesPageSlice";

import styles from "./ArticlesPage.module.scss";
import { ArticlePageFilters } from "../ArticlePageFilters/ArticlePageFilters";
import { ArticleInfiniteList } from "../ArticleInfiniteList/ArticleInfiniteList";

interface ArticlesPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
};

const ArticlesPage: FC<ArticlesPageProps> = (props) => {
    const { className } = props;
    const { t } = useTranslation("article");
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();

    useInitialEffect(() => {
        dispatch(initArticlesPage(searchParams));
    });

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <Page
                onScrollEnd={onLoadNextPart}
                className={classNames(styles.articlesPage, {}, [className])}
            >
                <ArticlePageFilters />
                <ArticleInfiniteList className={styles.list} />
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
