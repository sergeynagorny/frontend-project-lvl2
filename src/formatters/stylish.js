import { DiffType, PrefixByDiff } from '../const';
import useStringify from '../stringify';

export default (tree) => {
  const SPACE_COUNT = 4;
  const iter = (node, depth) => {
    const { stringTemplate, objectTemplate, stringify } = useStringify({
      startDepth: depth,
      spaceCount: SPACE_COUNT,
    });

    const values = node.map(({ key, value, prevValue, type, children }) => {
      const getString = (stringType = type, stringValue = value) => {
        const prefix = PrefixByDiff[stringType];
        const val = children ? iter(children, depth + 1) : stringify(stringValue, depth + 1);
        return stringTemplate(key, val, `${prefix} `);
      };

      if (type === DiffType.CHANGED) {
        const deleted = getString(DiffType.REMOVED, prevValue);
        const added = getString(DiffType.ADDED, value);
        return [deleted, added].join('\n');
      }

      return getString();
    });

    return objectTemplate(values);
  };

  return iter(tree, 1);
};
