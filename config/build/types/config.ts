export type BuildMode = 'production' | 'development';

export interface BuildPaths {
    entry: string;
    build: string;
    html: string;
    src: string;
    locales: string; // переводы 9_6
    buildLocales: string;
}

// переменные окружения
export interface BuildEnv {
    mode: BuildMode;
    port: number;
    apiUrl: string;
}

export interface BuildOptions {
    mode: BuildMode;
    paths: BuildPaths;
    isDev: boolean;
    port: number;
    apiUrl: string;
        // для тестов
    project: 'storybook' | 'frontend' | 'jest';
}
