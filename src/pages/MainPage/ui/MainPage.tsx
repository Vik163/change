import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Counter } from '@/entities/Counter';

const MainPage = () => {
    const { t } = useTranslation();
    const [value, setValue] = useState('');

    const onChange = (val: string) => {
        setValue(val);
    };

    return (
        <div>
            <Counter />
            {t('Главная страница')}
        </div>
    );
};

export default MainPage;
