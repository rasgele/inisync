#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chokidar = require("chokidar");
const log_1 = require("./log");
const config_1 = require("./config");
const ini_sync_1 = require("./ini-sync");
const path = require("path");
const commander_1 = require("commander");
function parseCommandline() {
    const applicationConfig = config_1.defaultConfig;
    const options = commander_1.program
        .option('-w, --watch <pattern>', 'Path pattern to watch for new ini files, such as /Users/user/Downloads/aws_sts*.txt', path.join(applicationConfig.watchPath, applicationConfig.watchPattern))
        .option('-t, --target <path>', 'File path of target ini file.', config_1.defaultConfig.credentialsPath)
        .option('--no-delete-watched-file', 'Keep watched files after processing.')
        .version(require('./version').LIB_VERSION)
        .parse()
        .opts();
    log_1.default.info(`Using the following configuration: ${JSON.stringify(options)}`);
    return {
        credentialsPath: options.target,
        watchPath: path.dirname(options.watch),
        watchPattern: path.basename(options.watch),
        keepWatchedFile: !options.deleteWatchedFile,
    };
}
const applicationConfig = parseCommandline();
log_1.default.info(`Using the following configuration: ${JSON.stringify(applicationConfig)}`);
const patternToWatch = path.join(applicationConfig.watchPath, applicationConfig.watchPattern);
log_1.default.info(`Watching for files matching pattern: ${patternToWatch}`);
const watcher = chokidar.watch(patternToWatch, { ignoreInitial: true });
watcher.on('add', path => {
    log_1.default.info(`A new matching file has been detected at path: ${path}. Syncing...`);
    (0, ini_sync_1.syncIniFiles)(path, applicationConfig.credentialsPath, applicationConfig.keepWatchedFile);
    log_1.default.info('Syncing complete.');
});
//# sourceMappingURL=index.js.map