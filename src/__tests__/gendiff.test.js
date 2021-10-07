import { commonKeys, convertToJsonString, genDiff, getItem, hasKey, Type } from '../gendiff';

test('hasKey', () => {
  const obj = { a: 'string' };
  expect(hasKey(obj, 'a')).toBe(true);
  expect(hasKey(obj, 'someKey')).toBe(false);
});

test('commonKeys', () => {
  const obj1 = { a: '' };
  const obj2 = { b: '' };
  const obj3 = { c: '' };

  expect(commonKeys(obj1, obj2, obj3)).toStrictEqual(['a', 'b', 'c']);
});

test('getItem', () => {
  expect(getItem({ a: 'string' }, 'a', Type.ADDED)).toStrictEqual(['  + a: string']);
});

test('convertToJsonString', () => {
  const arr = ['  + timeout: 20', '  + verbose: true'];
  const expected = '{\n  + timeout: 20\n  + verbose: true\n}';

  expect(convertToJsonString(arr)).toBe(expected);
});

test('genDiff', () => {
  const expected =
    '{\n' +
    '  - follow: false\n' +
    '    host: hexlet.io\n' +
    '  - proxy: 123.234.53.22\n' +
    '  - timeout: 50\n' +
    '  + timeout: 20\n' +
    '  + verbose: true\n' +
    '}';

  expect(genDiff('src/__mocks__/file1.json', 'src/__mocks__/file2.json')).toBe(expected);
});
