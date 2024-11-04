import _ from 'lodash';
import { printMessageOther, printMessageStylish } from './src/formaters.js';
import { isEqual, isObject } from './src/utils.js';

const genDiffRecursively = (obj1, obj2, depth) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const unionKeys = _.sortBy(_.union(keys1, keys2));
  const diff = unionKeys.flatMap((key) => {
    const innerDiff = [];
    if (isEqual(key, obj1, obj2)) {
      innerDiff.push({
        action: ' ', key, value: obj1[key], depth,
      });
      if (isObject(obj1[key]) && isObject(obj2[key])) {
        innerDiff.push(...genDiffRecursively(obj1[key], obj2[key], depth + 1));
      }
    } else {
      if (obj1[key] !== undefined) {
        innerDiff.push({
          action: '-', key, value: obj1[key], depth,
        });
      }
      if (obj2[key] !== undefined) {
        innerDiff.push({
          action: '+', key, value: obj2[key], depth,
        });
      }
    }
    return innerDiff;
  });
  return diff;
};

const genDiff = (obj1, obj2, formatter) => {
  const diff = genDiffRecursively(obj1, obj2, 0);
  return formatter === 'stylish' ? printMessageStylish(diff) : printMessageOther();
};

export default genDiff;
