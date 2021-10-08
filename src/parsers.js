import { readFileSync } from 'fs';
import { extname, resolve } from 'path';
import { load } from 'js-yaml';

export const FileExt = {
  JSON: '.json',
  YAML: '.yaml',
  YML: '.yml',
};

export function readFileData(filePath) {
  return readFileSync(resolve(process.cwd(), filePath));
}

export function readFileExt(filePath) {
  return extname(filePath).toLowerCase();
}

export function parseDataByFileExt(file, fileExt) {
  switch (fileExt) {
    case FileExt.JSON:
      return JSON.parse(file);
    case FileExt.YAML:
      return load(file);
    case FileExt.YML:
      return load(file);
    default:
      return {};
  }
}

export function parseDataByFile(filePath) {
  const file = readFileData(filePath);
  const ext = readFileExt(filePath);
  return parseDataByFileExt(file, ext);
}
