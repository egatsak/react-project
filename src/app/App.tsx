import { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";

import { AppRouter } from "./providers/router";
import { Navbar } from "@/widgets/Navbar";
import { PageLoader } from "@/widgets/PageLoader";
import { Sidebar } from "@/widgets/Sidebar";
import { getUserInited, initAuthData } from "@/entities/User";
import { MainLayout } from "@/shared/layouts";
import { ToggleFeatures } from "@/shared/lib/features";
import { useTheme } from "@/shared/lib/hooks/useTheme/useTheme";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";

import { classNames } from "../shared/lib/classNames/classNames";
import { AppLoaderLayout } from "@/shared/layouts/AppLoaderLayout/AppLoaderLayout";

const App = () => {
    const { theme } = useTheme();
    const dispatch = useAppDispatch();
    const inited = useSelector(getUserInited);

    useEffect(() => {
        if (!inited) {
            dispatch(initAuthData());
        }
    }, [dispatch, inited]);

    if (!inited) {
        return (
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <div id="app" className={classNames("app", {}, [theme])}>
                        <AppLoaderLayout />
                    </div>
                }
                off={<PageLoader />}
            />
        );
    }

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <div
                    id="app"
                    className={classNames("app_redesigned", {}, [theme])}
                >
                    <Suspense fallback="">
                        <MainLayout
                            header={<Navbar />}
                            content={<AppRouter />}
                            sidebar={<Sidebar />}
                        />
                    </Suspense>
                </div>
            }
            off={
                <div id="app" className={classNames("app", {}, [theme])}>
                    <Suspense fallback="">
                        <Navbar />
                        <div className="content-page">
                            <Sidebar />
                            <AppRouter />
                        </div>
                    </Suspense>
                </div>
            }
        />
    );
};

export default App;
