export enum LogLevel {
    DEBUG = 1,
    INFO = 2,
    WARN = 3,
    ERROR = 4
}

let currentLogLevel: LogLevel = LogLevel.WARN;

export const setMinimumLogLevel = (level: keyof typeof LogLevel) => {
    currentLogLevel = LogLevel[level];
};

export const logger = (level: LogLevel, ...msgs: any[]) => {
    if (currentLogLevel <= level) {
        console.log(`[${LogLevel[level]}]`, ...msgs);
    }
};

export const debugLog = (...msgs: any[]) => logger(LogLevel.DEBUG, ...msgs);
export const infoLog = (...msgs: any[]) => logger(LogLevel.INFO, ...msgs);
export const warnLog = (...msgs: any[]) => logger(LogLevel.WARN, ...msgs);
export const errorLog = (...msgs: any[]) => logger(LogLevel.ERROR, ...msgs);
