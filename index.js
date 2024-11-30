import _ from 'lodash';
import { isEqual, isObject } from './src/utils.js';
import getFormatter from './formatters/index.js';

const genDiffRecursively = (obj1, obj2, depth, fullPath) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const unionKeys = _.sortBy(_.union(keys1, keys2));
  const diff = unionKeys.flatMap((key) => {
    const innerDiff = [];
    if (isEqual(key, obj1, obj2)) {
      innerDiff.push({
        action: ' ', key, value: obj1[key], depth, fullPath: `${fullPath}${key}`,
      });
      if (isObject(obj1[key]) && isObject(obj2[key])) {
        innerDiff.push(...genDiffRecursively(obj1[key], obj2[key], depth + 1, `${fullPath}${key}.`));
      }
    } else {
      if (obj1[key] !== undefined) {
        innerDiff.push({
          action: '-', key, value: obj1[key], depth, fullPath: `${fullPath}${key}`,
        });
      }
      if (obj2[key] !== undefined) {
        innerDiff.push({
          action: '+', key, value: obj2[key], depth, fullPath: `${fullPath}${key}`,
        });
      }
    }
    return innerDiff;
  });
  return diff;
};

const genDiff = (obj1, obj2, formatterType) => {
  const diff = genDiffRecursively(obj1, obj2, 0, '');
  const format = getFormatter(formatterType);
  return format(diff);
};

export default genDiff;
