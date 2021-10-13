import _ from 'lodash';
import { DiffType } from '../const';

export default function plain(tree) {
  const valueToString = (value) => {
    if (_.isNull(value)) return null;
    if (_.isUndefined(value)) return undefined;
    if (_.isObject(value)) return '[complex value]';
    if (_.isBoolean(value)) return value.toString();
    if (_.isNumber(value)) return value.toString();

    return `'${value.toString()}'`;
  };

  const iter = (node, path = []) => {
    return node.flatMap(({ key, value, prevValue, type, children }) => {
      const fullPath = [...path, key].join('.');
      if (type === DiffType.ADDED) {
        return `Property '${fullPath}' was added with value: ${valueToString(value)}`;
      }
      if (type === DiffType.REMOVED) {
        return `Property '${fullPath}' was removed`;
      }
      if (type === DiffType.CHANGED) {
        return `Property '${fullPath}' was updated. From ${valueToString(
          prevValue
        )} to ${valueToString(value)}`;
      }
      if (type === DiffType.NESTED) {
        return iter(children, [...path, key]);
      }
      return [];
    });
  };

  return iter(tree).join('\n');
}
