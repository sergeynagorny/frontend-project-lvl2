import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import parseDataByFile from '../parsers';

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('parseDataByFile', () => {
  const beforePathJson = getFixturePath('before.json');
  const beforePathYaml = getFixturePath('before.yaml');
  const beforePathYml = getFixturePath('before.yml');

  const beforeParsed = fs.readFileSync(getFixturePath('before-parsed.json'), 'utf-8');

  expect(parseDataByFile(beforePathJson)).toStrictEqual(JSON.parse(beforeParsed));
  expect(parseDataByFile(beforePathYaml)).toStrictEqual(JSON.parse(beforeParsed));
  expect(parseDataByFile(beforePathYml)).toStrictEqual(JSON.parse(beforeParsed));
});
