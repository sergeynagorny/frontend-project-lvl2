import parseData from './parsers.js';
import calcDiff from './calcdiff.js';
import formatDiff from './formatters/formatDiff.js';

export default function genDiff(firstFile, secondFile, formatType) {
  const oldObj = parseData(firstFile);
  const newObj = parseData(secondFile);

  const diff = calcDiff(oldObj, newObj);

  return formatDiff(diff, formatType);
}
