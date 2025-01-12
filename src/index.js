import _ from 'lodash';
import path from 'node:path';
import getFormatter from './formatters/index.js';
import parseFile from './parsers.js';

const equalsCustomizer = (val, oth) => {
  if (_.isPlainObject(val) && _.isPlainObject(oth)) {
    return true;
  }
  return undefined;
};

const calculateDiffType = (key, obj1, obj2) => {
  if (key in obj1 && key in obj2) {
    return 'update';
  }
  if (key in obj1) {
    return 'remove';
  }
  return 'add';
};

const genDiffRecursively = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const unionKeys = _.sortBy(_.union(keys1, keys2));
  const diff = unionKeys.map((key) => {
    if (_.isEqualWith(obj1[key], obj2[key], equalsCustomizer)) {
      return {
        type: 'equals',
        key,
        oldValue: obj1[key],
        newValue: obj2[key],
        innerDiff: (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key]))
          ? genDiffRecursively(obj1[key], obj2[key])
          : undefined,
      };
    }
    return {
      type: calculateDiffType(key, obj1, obj2),
      key,
      oldValue: obj1[key],
      newValue: obj2[key],
    };
  });
  return diff;
};

const genDiff = (filePath1, filePath2, formatterType = 'stylish') => {
  const obj1 = parseFile(path.resolve(filePath1));
  const obj2 = parseFile(path.resolve(filePath2));
  const diff = genDiffRecursively(obj1, obj2);
  const format = getFormatter(formatterType);
  return format(diff);
};

export default genDiff;
