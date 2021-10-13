import stylish from './stylish';
import plain from './plain';
import json from './json';
import { FormatType } from '../const';

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
