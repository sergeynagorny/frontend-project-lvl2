import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import stylish from '../formatters/stylish';
import plain from '../formatters/plain';
import formatDiff from '../formatters/formatDiff';
import { FormatType } from '../const';

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('format diff', () => {
  const diff = fs.readFileSync(getFixturePath('diff.txt'), 'utf-8');

  const stylishResult = stylish(JSON.parse(diff));
  const plainResult = plain(JSON.parse(diff));

  expect(formatDiff(JSON.parse(diff), FormatType.PLAIN)).toBe(plainResult);
  expect(formatDiff(JSON.parse(diff), FormatType.STYLISH)).toBe(stylishResult);
});
