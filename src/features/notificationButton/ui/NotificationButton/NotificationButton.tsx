// import React, { memo, useCallback, useState } from 'react';
// import { BrowserView, MobileView } from 'react-device-detect';
// import { classNames } from '@/shared/lib/classNames/classNames';
// import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
// import { Icon } from '@/shared/ui/deprecated/Icon';
// import NotificationIcon from '@/shared/assets/icons/notification-20-20.svg';
// import { NotificationList } from '@/entities/Notification';
// import { Drawer } from '@/shared/ui/redesigned/Drawer';
// import { AnimationProvider } from '@/shared/lib/components/AnimationProvider';
// import cls from './NotificationButton.module.scss';
// import { Popover } from '@/shared/ui/redesigned/Popups';

// // 12_1
// interface NotificationButtonProps {
//     className?: string;
// }

// export const NotificationButton = memo((props: NotificationButtonProps) => {
//     const { className } = props;

//     // 12_2 9min
//     const [isOpen, setIsOpen] = useState(false);

//     const onOpenDrawer = useCallback(() => {
//         setIsOpen(true);
//     }, []);

//     const onCloseDrawer = useCallback(() => {
//         setIsOpen(false);
//     }, []);

//     const trigger = (
//         <Button onClick={onOpenDrawer} theme={ButtonTheme.CLEAR}>
//             <Icon Svg={NotificationIcon} inverted />
//         </Button>
//     );

//     return (
//         <div>
//             <BrowserView>
//                 <Popover
//                     className={classNames(cls.NotificationButton, {}, [
//                         className,
//                     ])}
//                     direction="bottom left"
//                     trigger={trigger}
//                 >
//                     <NotificationList className={cls.notifications} />
//                 </Popover>
//             </BrowserView>
//             <MobileView>
//                 {trigger}
//                 {/* ленивая подгрузка библиотек */}
//                 <AnimationProvider>
//                     <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
//                         <NotificationList />
//                     </Drawer>
//                 </AnimationProvider>
//             </MobileView>
//         </div>
//     );
// });

import React, { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import NotificationIconDeprecated from '@/shared/assets/icons/notification-20-20.svg';
import NotificationIcon from '@/shared/assets/icons/notification.svg';
import { NotificationList } from '@/entities/Notification';
import { Popover as PopoverDeprecated } from '@/shared/ui/deprecated/Popups';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import cls from './NotificationButton.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Popover } from '@/shared/ui/redesigned/Popups';

// 12_1
interface NotificationButtonProps {
    className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
    const { className } = props;
    // 12_2 9min
    const [isOpen, setIsOpen] = useState(false);

    const onOpenDrawer = useCallback(() => {
        setIsOpen(true);
    }, []);

    const onCloseDrawer = useCallback(() => {
        setIsOpen(false);
    }, []);

    const trigger = (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Icon Svg={NotificationIcon} clickable onClick={onOpenDrawer} />
            }
            off={
                <ButtonDeprecated
                    onClick={onOpenDrawer}
                    theme={ButtonTheme.CLEAR}
                >
                    <IconDeprecated Svg={NotificationIconDeprecated} inverted />
                </ButtonDeprecated>
            }
        />
    );

    return (
        <div>
            <BrowserView>
                <ToggleFeatures
                    feature="isAppRedesigned"
                    on={
                        <Popover
                            className={classNames(cls.NotificationButton, {}, [
                                className,
                            ])}
                            direction="bottom left"
                            trigger={trigger}
                        >
                            <NotificationList className={cls.notifications} />
                        </Popover>
                    }
                    off={
                        <PopoverDeprecated
                            className={classNames(cls.NotificationButton, {}, [
                                className,
                            ])}
                            direction="bottom left"
                            trigger={trigger}
                        >
                            <NotificationList className={cls.notifications} />
                        </PopoverDeprecated>
                    }
                />
            </BrowserView>
            <MobileView>
                {trigger}
                <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
                    <NotificationList />
                </Drawer>
            </MobileView>
        </div>
    );
});
