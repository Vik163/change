import {
    ReactNode,
} from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';
import { Portal } from '../Portal/Portal';
import cls from './Modal.module.scss';
import { Overlay } from '../Overlay/Overlay';
import { useTheme } from '@/shared/lib/hooks/useTheme';

interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    // чтобы модалка загружалась не сразу
    lazy?: boolean;
}

const ANIMATION_DELAY = 300;

export const Modal = (props: ModalProps) => {
    const {
        className,
        children,
        isOpen,
        onClose,
        lazy,
    } = props;

    const {
        close,
        isClosing,
        isMounted,
    } = useModal({
        animationDelay: ANIMATION_DELAY,
        onClose,
        isOpen,
    });

    const { theme } = useTheme();

    // не закрывает модалку по клику на ней
    // const onContentClick = (e: React.MouseEvent) => {
    //     e.stopPropagation();
    // };

    const mods: Mods = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    };

    // если усть флаг lazy и не монтирована, то возвращается Null и модалка не открывается
    if (lazy && !isMounted) {
        return null;
    }

    return (
        <Portal>
            <div className={classNames(cls.Modal, mods, [className, theme, 'app_modal'])}>
                <Overlay onClick={close} />
                {/* <div className={cls.overlay} onClick={closeHandler}> */}
                <div
                    className={cls.content}
                    // onClick={onContentClick}
                >
                    {children}
                </div>
                {/* </div> */}
            </div>
        </Portal>
    );
};
