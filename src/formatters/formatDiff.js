import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';
import { FormatType } from '../const.js';

export default function formatDiff(diff, formatType) {
  switch (formatType) {
    case FormatType.STYLISH:
      return stylish(diff);
    case FormatType.PLAIN:
      return plain(diff);
    case FormatType.JSON:
      return json(diff);
    default:
      return stylish(diff);
  }
}
