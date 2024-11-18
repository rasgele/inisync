import {describe, expect, test} from '@jest/globals';
import {syncIniContents} from './ini-sync';

const nl = '\n';
describe('syncIniContents', () => {
  test('should overwrite common section', () => {
    const newContent = '[some-section]' + nl + 'theKey=newValue';
    const oldContent = '[some-section]' + nl + 'theKey=oldValue';
    const expected = '[some-section]' + nl + 'theKey=newValue' + nl;

    const result = syncIniContents(newContent, oldContent);
    expect(result).toEqual(expected);
  });
  test('should append non-existing section', () => {
    const newContent = '[some-section-1]' + nl + 'key1=value1';
    const oldContent = '[some-section-2]' + nl + 'key1=value1';
    const expected =
      '[some-section-2]' +
      nl +
      'key1=value1' +
      nl +
      nl +
      '[some-section-1]' +
      nl +
      'key1=value1' +
      nl;

    const result = syncIniContents(newContent, oldContent);
    expect(result).toEqual(expected);
  });

  test('should overwrite corresponding section with all key value pairs', () => {
    const newContent = '[some-section-2]' + nl + 'keyNew=valueNew';

    const oldContent =
      '[some-section-1]' +
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

    const expected =
      '[some-section-1]' +
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

    const result = syncIniContents(newContent, oldContent);
    expect(result).toEqual(expected);
  });
});
