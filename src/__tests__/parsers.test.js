import { join } from 'path';
import { parseDataByFile, readFileExt } from '../parsers';

// const getFixturePath = (filename) => join(process.cwd(), 'src', '__fixtures__', filename);
const getMockPath = (filename) => join(process.cwd(), 'src', '__mocks__', filename);

test('readFileExt', () => {
  expect(readFileExt('index.HTML')).toBe('.html');
});

// test('parseDataByFileExt', async () => {
//   const json = readFile('file1.json');
//   const yaml = readFile('file1.yaml');
//   const yml = readFile('file1.yml');
//
//   const expected = {
//     host: 'hexlet.io',
//     timeout: 50,
//     proxy: '123.234.53.22',
//     follow: false,
//   };
//
//   expect(parseDataByFileExt(jsonFilePath)).toBe(expected);
// });

test('parseDataByFile', async () => {
  const jsonPath = getMockPath('file1.json');
  const yamlPath = getMockPath('file1.yaml');
  const ymlPath = getMockPath('file1.yml');

  const expected = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };

  expect(parseDataByFile(jsonPath)).toStrictEqual(expected);
  expect(parseDataByFile(yamlPath)).toStrictEqual(expected);
  expect(parseDataByFile(ymlPath)).toStrictEqual(expected);
});
