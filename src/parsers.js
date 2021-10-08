import { readFileSync } from 'fs';
import { extname, resolve } from 'path';
import { load } from 'js-yaml';

const ParserType = {
  YAML: 'YAML',
  JSON: 'JSON',
};

export const FileExt = {
  JSON: '.json',
  YAML: '.yaml',
  YML: '.yml',
};

const ParserTypeByFileExt = {
  [FileExt.YAML]: ParserType.YAML,
  [FileExt.YML]: ParserType.YAML,
  [FileExt.JSON]: ParserType.JSON,
};

export function readFileData(filePath) {
  return readFileSync(resolve(process.cwd(), filePath));
}

export function readFileExt(filePath) {
  return extname(filePath).toLowerCase();
}

export function parseDataByFileExt(file, fileExt) {
  switch (ParserTypeByFileExt[fileExt]) {
    case ParserType.JSON:
      return JSON.parse(file);
    case ParserType.YAML:
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
