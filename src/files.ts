import * as fs from 'fs';

export const readFileSync = (path: string) =>
  fs.readFileSync(path, 'utf-8').toString();

export const removeFile = (path: string) => {
  fs.rmSync(path);
};

export const backupFile = (path: string): string => {
  const newPath = `${path}.${Date.now()}.bak`;
  fs.renameSync(path, newPath);
  return newPath;
};

export const createFile = (path: string, content: string) => {
  fs.writeFileSync(path, content);
};
