import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../gendiff';
import { FormatType } from '../const';

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const EOF = '\n';

test('gen diff', () => {
  const beforePath = getFixturePath('before.json');
  const afterPath = getFixturePath('after.json');
  const expected = fs.readFileSync(getFixturePath('stylish.txt'), 'utf-8');
  const result = genDiff(beforePath, afterPath, FormatType.STYLISH);

  expect(result + EOF).toEqual(expected);
});
