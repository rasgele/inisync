import {stringify, parse} from 'ini';
import {
  backupFile,
  createFile,
  readFileSync,
  removeFile,
  createIfNotExists,
} from './files';
import log from './log';

export const syncIniContents = (
  newContent: string,
  oldContent: string,
): string => {
  const newConfig = parse(newContent);
  const oldConfig = parse(oldContent);

  const commonSections = Object.keys(newConfig).filter(
    section => oldConfig[section],
  );
  if (commonSections.length > 0) {
    log.info(`Following sections will be updated: ${commonSections.join(',')}`);
  }

  const newSections = Object.keys(newConfig).filter(
    section => !oldConfig[section],
  );
  if (newSections.length > 0) {
    log.info(`Following sections will be appended: ${newSections.join(',')}`);
  }

  const mergedConfig = {...oldConfig, ...newConfig};
  return stringify(mergedConfig, {newline: false});
};

export const syncIniFiles = (
  newConfigPath: string,
  oldConfigPath: string,
  keepWatchedFile: boolean,
) => {
  createIfNotExists(oldConfigPath);
  const newContent = readFileSync(newConfigPath);
  const oldContent = readFileSync(oldConfigPath);

  log.info(
    `Current credential file(${oldConfigPath}) is backed up to path: ${backupFile(oldConfigPath)}.`,
  );
  createFile(oldConfigPath, syncIniContents(newContent, oldContent));
  log.info(`New credential file at path ${oldConfigPath} is created.`);

  if (!keepWatchedFile) {
    removeFile(newConfigPath);
    log.info(
      `Watched file at path ${newConfigPath} is removed after processing.`,
    );
  }
};
