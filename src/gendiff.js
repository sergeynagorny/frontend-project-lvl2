import parseData from './parsers';
import calcDiff from './calcdiff';
import formatDiff from './formatters/formatDiff';

export default function genDiff(firstFile, secondFile, formatType) {
  const oldObj = parseData(firstFile);
  const newObj = parseData(secondFile);

  const diff = calcDiff(oldObj, newObj);

  return formatDiff(diff, formatType);
}
