export const DiffType = {
  ADDED: 'ADDED',
  REMOVED: 'REMOVED',
  UNCHANGED: 'UNCHANGED',
  CHANGED: 'CHANGED',
  NESTED: 'NESTED',
};

export const FormatType = {
  STYLISH: 'stylish',
  PLAIN: 'text',
  JSON: 'json',
};

export const PrefixByDiff = {
  [DiffType.ADDED]: '+',
  [DiffType.REMOVED]: '-',
  [DiffType.NESTED]: ' ',
  [DiffType.CHANGED]: ' ',
  [DiffType.UNCHANGED]: ' ',
};

export const ParserType = {
  YAML: 'YAML',
  JSON: 'JSON',
};

export const FileExt = {
  JSON: '.json',
  YAML: '.yaml',
  YML: '.yml',
};

export const ParserTypeByFileExt = {
  [FileExt.YAML]: ParserType.YAML,
  [FileExt.YML]: ParserType.YAML,
  [FileExt.JSON]: ParserType.JSON,
};
