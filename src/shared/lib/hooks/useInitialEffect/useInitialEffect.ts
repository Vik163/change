import { useEffect } from 'react';

// 7_5 43min
export function useInitialEffect(callback: () => void) {
    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            callback();
        }
        // eslint-disable-next-line
    }, []);
}
