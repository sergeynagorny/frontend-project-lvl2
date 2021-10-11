import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import calcDiff from '../calcdiff';

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('calc diff', () => {
  const before = fs.readFileSync(getFixturePath('before.json'), 'utf-8');
  const after = fs.readFileSync(getFixturePath('after.json'), 'utf-8');
  const diff = fs.readFileSync(getFixturePath('diff.txt'), 'utf-8');

  expect(calcDiff(JSON.parse(before), JSON.parse(after))).toStrictEqual(JSON.parse(diff));
});
