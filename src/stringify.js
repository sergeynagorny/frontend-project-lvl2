import _ from 'lodash';

export default function useStringify({ replacer = ' ', startDepth = 1, spaceCount = 1 }) {
  function getIndents(depth) {
    const indentSize = depth * spaceCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spaceCount);
    return { currentIndent, bracketIndent };
  }

  return {
    stringTemplate(key, value, prefix = '') {
      const { currentIndent } = getIndents(startDepth);
      return `${currentIndent.slice(prefix.length)}${prefix}${key}: ${value}`;
    },

    objectTemplate(values) {
      const { bracketIndent } = getIndents(startDepth);
      return ['{', ...values, `${bracketIndent}}`].join('\n');
    },

    stringify(value, depth = startDepth) {
      if (_.isNull(value)) return 'null';
      if (_.isUndefined(value)) return 'undefined';
      if (!_.isObject(value)) return value.toString();

      const { stringify, stringTemplate, objectTemplate } = useStringify({
        replacer,
        spaceCount,
        startDepth: depth,
      });

      const values = Object.entries(value).map(([key, val]) => stringTemplate(key, stringify(val, depth + 1)));

      return objectTemplate(values);
    },
  };
}
