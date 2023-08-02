import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

// 12_4 7min ленивая подгрузка библиотек
// получаем типы из библиотек
type SpringType = typeof import('@react-spring/web');
type GestureType = typeof import('@use-gesture/react');

interface AnimationContextPayload {
    Gesture?: GestureType;
    Spring?: SpringType;
    isLoaded?: boolean;
}

// создаем классический реактовский провайдер
// не глобальный, поэтому в shared
const AnimationContext = createContext<AnimationContextPayload>({});

// 12_4 11min ленивая подгрузка библиотек
const getAsyncAnimationModules = async () => {
    // Обе либы зависят друг от друга
    return Promise.all([
        import('@react-spring/web'),
        import('@use-gesture/react'),
    ]);
};

// 16min создаем хук, возвращает контекст Spring и Gesture
// кладем библиотеки в рефы после загрузки
export const useAnimationLibs = () => {
    // 18min  as Required<AnimationContextPayload>
    return useContext(AnimationContext) as Required<AnimationContextPayload>;
};

export const AnimationProvider = ({ children }: { children: ReactNode }) => {
    const SpringRef = useRef<SpringType>(); // создаем рефы, чтобы был доступ к значению без перерисовок
    const GestureRef = useRef<GestureType>();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        getAsyncAnimationModules().then(([Spring, Gesture]) => {
            SpringRef.current = Spring; // кладем библиотеки в рефы после загрузки
            GestureRef.current = Gesture;
            setIsLoaded(true);
        });
    }, []);

    // чтобы не было перерисовок
    const value = useMemo(
        () => ({
            Gesture: GestureRef.current,
            Spring: SpringRef.current,
            isLoaded,
        }),
        [isLoaded],
    );

    return (
        <AnimationContext.Provider value={value}>
            {children}
        </AnimationContext.Provider>
    );
};
