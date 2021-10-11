import parseData from './parsers';
import calcDiff from './calcdiff';
import stylish from './formatters/stylish';

export default function genDiff(firstFile, secondFile) {
  const oldObj = parseData(firstFile);
  const newObj = parseData(secondFile);

  const diff = calcDiff(oldObj, newObj);

  return stylish(diff);
}
