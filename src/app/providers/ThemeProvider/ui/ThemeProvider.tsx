import React, {
    FC, ReactNode, useMemo, useState,
} from 'react';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from '../lib/ThemeContext'; // внутри модуля пути относительные

const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.LIGHT;

interface ThemeProviderProps {
    initialTheme?: Theme;
    children: ReactNode // 11_7 3min
}

// создаем провайдер
const ThemeProvider = (props: ThemeProviderProps) => {
    const {
        initialTheme,
        children,
    } = props;

    // получаем тему из хранилища или light
    const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme);

    // используем useMemo, чтобы при рендере не создавать новый а возвращать старый объект
    // если из массива зависимостей ничего не изменилось
    const defaultProps = useMemo(() => ({
        theme,
        setTheme,
    }), [theme]);

    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
