import _ from 'lodash';
import { DiffType } from './const.js';

export function assignKeys(...objs) {
  return _.orderBy(_.union(objs.flatMap(Object.keys)));
}

export default function calcDiff(oldObj, newObj) {
  const keys = assignKeys(oldObj, newObj);

  return keys.map((key) => {
    /*
    if key is missing in old object,
    it's considered added
    */
    if (!_.has(oldObj, [key])) return { key, type: DiffType.ADDED, value: newObj[key] };

    /*
    if key is missing in new object,
    it's considered removed
    */
    if (!_.has(newObj, [key])) return { key, type: DiffType.REMOVED, value: oldObj[key] };

    /*
    if the key value is an object in two objects
    it's considered nested || ? unchanged
    */
    if (_.isObject(oldObj[key]) && _.isObject(newObj[key]))
      return { key, type: DiffType.NESTED, children: calcDiff(oldObj[key], newObj[key]) };

    /*
    if the type of key value doesn't match in two objects
    or data with the same type don't match
    it's considered changed
    */
    if (typeof oldObj[key] !== typeof newObj[key] || oldObj[key] !== newObj[key])
      return { key, type: DiffType.CHANGED, prevValue: oldObj[key], value: newObj[key] };

    /*
    else it's considered unchanged
    */
    return { key, type: DiffType.UNCHANGED, value: oldObj[key] };
  });
}
