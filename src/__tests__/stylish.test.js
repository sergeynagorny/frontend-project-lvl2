import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import stylish from '../formatters/stylish';

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const EOF = '\n';

test('stylish', () => {
  const diff = fs.readFileSync(getFixturePath('diff.txt'), 'utf-8');
  const expected = fs.readFileSync(getFixturePath('stylish.txt'), 'utf-8');
  const result = stylish(JSON.parse(diff));
  expect(result + EOF).toBe(expected);
});
