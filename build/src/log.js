"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = require("pino");
const log = (0, pino_1.pino)({
    transport: {
        target: 'pino-pretty',
    },
});
exports.default = log;
//# sourceMappingURL=log.js.map