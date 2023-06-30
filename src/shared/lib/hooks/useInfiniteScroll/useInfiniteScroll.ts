import { MutableRefObject, useEffect, useRef } from 'react';

export interface UseInfiniteScrollOptions {
    callback?: () => void;
    triggerRef: MutableRefObject<HTMLElement>;
    wrapperRef: MutableRefObject<HTMLElement>;
}
// https://misha.agency/javascript/intersection-observer-api.html
// 8_5 10-12min
export function useInfiniteScroll({ callback, wrapperRef, triggerRef }: UseInfiniteScrollOptions) {
    const observer = useRef<IntersectionObserver | null>(null);
    // useEffect(() => {
    //     const wrapperElement = wrapperRef.current;
    //     const triggerElement = triggerRef.current;

    //     // IntersectionObserver 8_5 11min
    //     let observer: IntersectionObserver | null;

    //     if (callback) {
    //         const options = {
    //             // root: document.querySelector('#scrollArea'),
    //             root: wrapperElement,
    //             rootMargin: '0px',
    //             threshold: 0,
    //         };

    //         observer = new IntersectionObserver(([entry]) => {
    //             // срабатывает один раз 8_5 16:14min
    //             if (entry.isIntersecting) {
    //                 callback();
    //             }
    //         }, options);

    //         observer.observe(triggerElement);
    //     }

    //     // отписать при размонтировании
    //     return () => {
    //         if (observer && triggerElement) {
    //             // 8_5 14:14min
    //             observer.unobserve(triggerElement);
    //         }
    //     };
    // }, [callback, triggerRef, wrapperRef]);

    useEffect(() => {
        const wrapperElement = wrapperRef.current;
        const triggerElement = triggerRef.current;

        if (callback) {
            const options = {
                root: wrapperElement,
                rootMargin: '0px',
                threshold: 1.0,
            };

            observer.current = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    callback();
                }
            }, options);

            observer.current.observe(triggerElement);
        }

        return () => {
            if (observer.current && triggerElement) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.current.unobserve(triggerElement);
            }
        };
    }, [callback, triggerRef, wrapperRef]);
}
