export interface Config {
    credentialsPath: string;
    watchPath: string;
    watchPattern: string;
    keepWatchedFile: boolean;
}
export declare const defaultConfig: Config;
