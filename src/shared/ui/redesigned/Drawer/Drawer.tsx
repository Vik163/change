import React, { memo, ReactNode, useCallback, useEffect } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    AnimationProvider,
    useAnimationLibs,
} from '@/shared/lib/components/AnimationProvider';
import { Overlay } from '../Overlay/Overlay';
import cls from './Drawer.module.scss';
import { Portal } from '../Portal/Portal';
import { toggleFeatures } from '@/shared/lib/features';
import { useTheme } from '@/shared/lib/hooks/useTheme';

// 12_2
interface DrawerProps {
    className?: string;
    children: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}

// высота - общий размер окна минус 100px
const height = window.innerHeight - 100;

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const DrawerContent = memo((props: DrawerProps) => {
    const { Spring, Gesture } = useAnimationLibs();
    const [{ y }, api] = Spring.useSpring(() => ({ y: height }));
    const { theme } = useTheme();
    const { className, children, onClose, isOpen, lazy } = props;

    const openDrawer = useCallback(() => {
        // открывая дровер запускаем анимацию
        api.start({ y: 0, immediate: false });
    }, [api]);

    useEffect(() => {
        if (isOpen) {
            openDrawer();
        }
    }, [api, isOpen, openDrawer]);

    const close = (velocity = 0) => {
        // закрывая дровер запускаем анимацию
        api.start({
            y: height,
            immediate: false,
            config: { ...Spring.config.stiff, velocity },
            onResolve: onClose,
        });
    };

    // возвращает хандлеры (onDrag и т.п.), необходимые для drag-and-drop
    const bind = Gesture.useDrag(
        ({
            last,
            velocity: [, vy],
            direction: [, dy],
            movement: [, my],
            cancel,
        }) => {
            if (my < -70) cancel();

            if (last) {
                if (my > height * 0.5 || (vy > 0.5 && dy > 0)) {
                    close();
                } else {
                    openDrawer();
                }
            } else {
                api.start({ y: my, immediate: true });
            }
        },
        {
            from: () => [0, y.get()],
            filterTaps: true,
            bounds: { top: 0 },
            rubberband: true,
        },
    );

    if (!isOpen) {
        return null;
    }

    const display = y.to((py) => (py < height ? 'block' : 'none'));

    return (
        // 16_13 1min Portal
        <Portal element={document.getElementById('app') ?? document.body}>
            <div
                className={classNames(cls.Drawer, {}, [
                    className,
                    theme,
                    'app_drawer',
                    toggleFeatures({
                        name: 'isAppRedesigned',
                        on: () => cls.drawerNew,
                        off: () => cls.drawerOld,
                    }),
                ])}
            >
                <Overlay onClick={close} />
                <Spring.a.div
                    className={cls.sheet}
                    style={{
                        display,
                        bottom: `calc(-100vh + ${height - 100}px)`,
                        y,
                    }}
                    {...bind()}
                >
                    {children}
                </Spring.a.div>
            </div>
        </Portal>
    );
});

// 12_4 17min, 12_6
const DrawerAsync = (props: DrawerProps) => {
    // загружаем библиотеки
    const { isLoaded } = useAnimationLibs();

    if (!isLoaded) {
        return null; // можно скелетоны
    }

    return <DrawerContent {...props} />;
};

export const Drawer = (props: DrawerProps) => {
    return (
        <AnimationProvider>
            <DrawerAsync {...props} />
        </AnimationProvider>
    );
};
