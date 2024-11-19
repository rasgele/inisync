"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const ini_sync_1 = require("./ini-sync");
const nl = '\n';
(0, globals_1.describe)('syncIniContents', () => {
    (0, globals_1.test)('should overwrite common section', () => {
        const newContent = '[some-section]' + nl + 'theKey=newValue';
        const oldContent = '[some-section]' + nl + 'theKey=oldValue';
        const expected = '[some-section]' + nl + 'theKey=newValue' + nl;
        const result = (0, ini_sync_1.syncIniContents)(newContent, oldContent);
        (0, globals_1.expect)(result).toEqual(expected);
    });
    (0, globals_1.test)('should append non-existing section', () => {
        const newContent = '[some-section-1]' + nl + 'key1=value1';
        const oldContent = '[some-section-2]' + nl + 'key1=value1';
        const expected = '[some-section-2]' +
            nl +
            'key1=value1' +
            nl +
            nl +
            '[some-section-1]' +
            nl +
            'key1=value1' +
            nl;
        const result = (0, ini_sync_1.syncIniContents)(newContent, oldContent);
        (0, globals_1.expect)(result).toEqual(expected);
    });
    (0, globals_1.test)('should overwrite corresponding section with all key value pairs', () => {
        const newContent = '[some-section-2]' + nl + 'keyNew=valueNew';
        const oldContent = '[some-section-1]' +
            nl +
            'key1=value1' +
            nl +
            '[some-section-2]' +
            nl +
            'key1=value1' +
            nl +
            'key2=value2' +
            nl +
            '[some-section-3]' +
            nl +
            'key1=value1' +
            nl;
        const expected = '[some-section-1]' +
            nl +
            'key1=value1' +
            nl +
            nl +
            '[some-section-2]' +
            nl +
            'keyNew=valueNew' +
            nl +
            nl +
            '[some-section-3]' +
            nl +
            'key1=value1' +
            nl;
        const result = (0, ini_sync_1.syncIniContents)(newContent, oldContent);
        (0, globals_1.expect)(result).toEqual(expected);
    });
});
//# sourceMappingURL=ini-sync.test.js.map