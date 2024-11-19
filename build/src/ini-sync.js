"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncIniFiles = exports.syncIniContents = void 0;
const ini_1 = require("ini");
const files_1 = require("./files");
const log_1 = require("./log");
const syncIniContents = (newContent, oldContent) => {
    const newConfig = (0, ini_1.parse)(newContent);
    const oldConfig = (0, ini_1.parse)(oldContent);
    const commonSections = Object.keys(newConfig).filter(section => oldConfig[section]);
    if (commonSections.length > 0) {
        log_1.default.info(`Following sections will be updated: ${commonSections.join(',')}`);
    }
    const newSections = Object.keys(newConfig).filter(section => !oldConfig[section]);
    if (newSections.length > 0) {
        log_1.default.info(`Following sections will be appended: ${newSections.join(',')}`);
    }
    const mergedConfig = { ...oldConfig, ...newConfig };
    return (0, ini_1.stringify)(mergedConfig, { newline: false });
};
exports.syncIniContents = syncIniContents;
const syncIniFiles = (newConfigPath, oldConfigPath, keepWatchedFile) => {
    const newContent = (0, files_1.readFileSync)(newConfigPath);
    const oldContent = (0, files_1.readFileSync)(oldConfigPath);
    log_1.default.info(`Current credential file(${oldConfigPath}) is backed up to path: ${(0, files_1.backupFile)(oldConfigPath)}.`);
    (0, files_1.createFile)(oldConfigPath, (0, exports.syncIniContents)(newContent, oldContent));
    log_1.default.info(`New credential file at path ${oldConfigPath} is created.`);
    if (!keepWatchedFile) {
        (0, files_1.removeFile)(newConfigPath);
        log_1.default.info(`Watched file at path ${newConfigPath} is removed after processing.`);
    }
};
exports.syncIniFiles = syncIniFiles;
//# sourceMappingURL=ini-sync.js.map