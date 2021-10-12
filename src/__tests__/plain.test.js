import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import plain from '../formatters/plain';

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const EOF = '\n';

test('plain', () => {
  const diff = fs.readFileSync(getFixturePath('diff.txt'), 'utf-8');
  const expected = fs.readFileSync(getFixturePath('plain-result.txt'), 'utf-8');
  const result = plain(JSON.parse(diff));

  expect(result + EOF).toMatch(expected);
});
