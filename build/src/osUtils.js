"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.osConstants = void 0;
const os = require("os");
exports.osConstants = {
    awsCredentialsPath: os.homedir() + '/.aws/credentials',
    downloadDirectory: os.homedir() + '/Downloads',
};
//# sourceMappingURL=osUtils.js.map