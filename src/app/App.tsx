import React, { Suspense, useEffect } from 'react';
// Аналогично библиотеке classNames react --------------
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { getUserInited, initAuthData } from '@/entities/User';
import { AppRouter } from './providers/router';
import { useTheme } from '@/shared/lib/hooks/useTheme';
import { PageLoader } from '@/widgets/PageLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ToggleFeatures } from '@/shared/lib/features';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { AppLoaderLayout } from '@/shared/layouts/AppLoaderLayout';
import { withTheme } from './providers/ThemeProvider/ui/withTheme';
import { useAppToolbar } from './lib/useAppToolbar';

function App() {
    const { theme } = useTheme();
    const dispatch = useAppDispatch();
    const inited = useSelector(getUserInited);
    const toolbar = useAppToolbar();

    // инициализация пользователя
    useEffect(() => {
        dispatch(initAuthData());
    }, [dispatch]);

    if (!inited) {
        return <PageLoader />;
    }

    if (!inited) {
        return (
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <div
                        id="app"
                        className={classNames('app_redesigned', {}, [theme])}
                    >
                        <AppLoaderLayout />{' '}
                    </div>
                }
                off={<PageLoader />}
            />
        );
    }

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            off={
                <div id="app" className={classNames('app', {}, [theme])}>
                    <Suspense fallback="">
                        <Navbar />
                        <div className="content-page">
                            <Sidebar />
                            <AppRouter />
                        </div>
                    </Suspense>
                </div>
            }
            on={
                <div
                    id="app"
                    className={classNames('app_redesigned', {}, [theme])}
                >
                    <Suspense fallback="">
                        <MainLayout
                            header={<Navbar />}
                            content={<AppRouter />}
                            sidebar={<Sidebar />}
                            toolbar={toolbar}
                        />
                    </Suspense>
                </div>
            }
        />
    );

    // return (
    //     <div className={classNames('app', {}, [theme])}>
    //         <Suspense fallback="">
    //             <Navbar />
    //             <div className="content-page">
    //                 <Sidebar />
    //                 {/* Создаем app/provaiders/router/AppRouter */}
    //                 {/* отрисовываем только после запроса на инициализацию пользователя */}
    //                 {inited && <AppRouter />}
    //             </div>
    //         </Suspense>
    //     </div>
    // );
}

export default withTheme(App);

// export default App;
