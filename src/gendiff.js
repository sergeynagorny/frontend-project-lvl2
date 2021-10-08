import { parseDataByFile } from './parsers';

// import { fileURLToPath } from "url";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const filePath1 = path.resolve(`${__dirname}/${firstFile}`)
// const filePath2 = path.resolve(`${__dirname}/${secondFile}`)

export const TAB = '  ';

export const Type = {
  EQUAL: 'EQUAL',
  REMOVED: 'REMOVED',
  ADDED: 'ADDED',
};

export const PrefixByType = {
  [Type.EQUAL]: ' ',
  [Type.REMOVED]: '-',
  [Type.ADDED]: '+',
};

export const hasKey = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);
export const getItem = (obj, key, type) => [`${TAB + PrefixByType[type]} ${key}: ${obj[key]}`];
export const convertToJsonString = (array) => `{\n${array.join('\n')}\n}`;
export const commonKeys = (...objects) => [...new Set([...objects.flatMap(Object.keys)])].sort();

export const genDiff = (firstFile, secondFile) => {
  const oldObj = parseDataByFile(firstFile);
  const newObj = parseDataByFile(secondFile);
  const keys = commonKeys(oldObj, newObj);

  const diffs = keys.reduce((acc, key) => {
    if (hasKey(oldObj, key) && hasKey(newObj, key)) {
      if (oldObj[key] === newObj[key]) {
        acc.push(getItem(newObj, key, Type.EQUAL));
      } else {
        acc.push(getItem(oldObj, key, Type.REMOVED));
        acc.push(getItem(newObj, key, Type.ADDED));
      }
    }

    if (hasKey(oldObj, key) && !hasKey(newObj, key)) {
      acc.push(getItem(oldObj, key, Type.REMOVED));
    }

    if (hasKey(newObj, key) && !hasKey(oldObj, key)) {
      acc.push(getItem(newObj, key, Type.ADDED));
    }

    return acc;
  }, []);

  return convertToJsonString(diffs);
};
