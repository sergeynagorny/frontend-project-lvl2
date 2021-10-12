import stylish from './stylish';
import plain from './plain';
import { FormatType } from '../const';

export default function formatDiff(diff, formatType) {
  switch (formatType) {
    case FormatType.STYLISH:
      return stylish(diff);
    case FormatType.PLAIN:
      return plain(diff);
    default:
      return stylish(diff);
  }
}
