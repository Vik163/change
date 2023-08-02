import { memo, useCallback } from 'react';
import { ListBox } from '@/shared/ui/Popups';
import { Currency } from '../../model/types/currency';

interface CurrencySelectProps {
    className?: string;
    value?: Currency;
    onChange?: (value: Currency) => void;
    readonly?: boolean;
}

const options = [
    { value: Currency.RUB, content: Currency.RUB },
    { value: Currency.EUR, content: Currency.EUR },
    { value: Currency.USD, content: Currency.USD },
];

export const CurrencySelect = memo(
    ({ className, value, onChange, readonly }: CurrencySelectProps) => {
        const onChangeHandler = useCallback(
            (value: string) => {
                onChange?.(value as Currency);
            },
            [onChange],
        );

        return (
            <ListBox
                className={className}
                value={value}
                defaultValue="Укажите валюту"
                label="Укажите валюту"
                items={options}
                onChange={onChangeHandler}
                readonly={readonly}
                direction="top right"
            />
            // <Select
            //     className={classNames('', {}, [className])}
            //     label={t('Укажите валюту')}
            //     options={options}
            //     value={value}
            //     onChange={onChangeHandler}
            //     readonly={readonly}
            // />
        );
    },
);
