// @ts-check

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import useStringify from '../stringify';

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const primitives = {
  string: 'value',
  boolean: true,
  number: 5,
  float: 1.25,
};

const nested = {
  string: 'value',
  boolean: true,
  number: 5,
  float: 1.25,
  object: {
    5: 'number',
    1.25: 'float',
    null: 'null',
    true: 'boolean',
    value: 'string',
    nested: {
      boolean: true,
      float: 1.25,
      string: 'value',
      number: 5,
      null: 'null',
    },
  },
};

const cases = [
  [undefined, undefined, 0],
  [' ', undefined, 1],
  ['|-', 1, 2],
  ['|-', 2, 3],
  [' ', 3, 4],
  ['...', undefined, 5],
];

const expectedDataNested = [];
const expectedDataPlain = [];
const primitiveValues = Object.values(primitives).map((v) => [v]);

beforeAll(() => {
  const plainData = fs.readFileSync(getFixturePath('plain.txt'), 'utf-8');
  const nestedData = fs.readFileSync(getFixturePath('nested.txt'), 'utf-8');
  expectedDataPlain.push(plainData.trim().split('\n\n\n'));
  expectedDataNested.push(nestedData.trim().split('\n\n\n'));
});

describe.each(primitiveValues)('stringify', (value) => {
  const expected = `${value}`;
  const { stringify } = useStringify({});
  test(`${expected}`, () => expect(stringify(value)).toEqual(expected));
});

describe.each(cases)('replacer "%s" repeated %s times', (replacer, spacesCount, caseIndex) => {
  test('plain object', () => {
    const expected = expectedDataPlain[0][caseIndex];
    const { stringify } = useStringify({ replacer, spaceCount: spacesCount });
    const actual = stringify(primitives);

    expect(actual).toEqual(expected);
  });

  test('nested object', () => {
    const expected = expectedDataNested[0][caseIndex];
    const { stringify } = useStringify({ replacer, spaceCount: spacesCount });
    const actual = stringify(nested);

    expect(actual).toEqual(expected);
  });
});
