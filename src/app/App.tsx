import React, { Suspense, useEffect } from 'react';
// Аналогично библиотеке classNames react --------------
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useTheme } from '@/app/providers/ThemeProvider';
import { AppRouter } from '@/app/providers/router';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { getUserInited, userActions } from '@/entities/User';

function App() {
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const inited = useSelector(getUserInited);

    // инициализация пользователя
    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

    return (
        <div className={classNames('app', {}, [theme])}>
            <Suspense fallback="">
                <Navbar />
                <div className="content-page">
                    <Sidebar />
                    {/* Создаем app/provaiders/router/AppRouter */}
                    {/* отрисовываем только после запроса на инициализацию пользователя */}
                    {inited && <AppRouter />}
                </div>
            </Suspense>
        </div>
    );
}

export default App;
