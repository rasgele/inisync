"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFile = exports.backupFile = exports.removeFile = exports.readFileSync = void 0;
const fs = require("fs");
const readFileSync = (path) => fs.readFileSync(path, 'utf-8').toString();
exports.readFileSync = readFileSync;
const removeFile = (path) => {
    fs.rmSync(path);
};
exports.removeFile = removeFile;
const backupFile = (path) => {
    const newPath = `${path}.${Date.now()}.bak`;
    fs.renameSync(path, newPath);
    return newPath;
};
exports.backupFile = backupFile;
const createFile = (path, content) => {
    fs.writeFileSync(path, content);
};
exports.createFile = createFile;
//# sourceMappingURL=files.js.map