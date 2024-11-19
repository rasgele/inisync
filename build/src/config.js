"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultConfig = void 0;
const osUtils_1 = require("./osUtils");
exports.defaultConfig = {
    credentialsPath: osUtils_1.osConstants.awsCredentialsPath,
    watchPath: osUtils_1.osConstants.downloadDirectory,
    watchPattern: 'aws_sts*',
    keepWatchedFile: false,
};
//# sourceMappingURL=config.js.map