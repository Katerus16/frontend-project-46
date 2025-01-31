import _ from 'lodash';
import path from 'node:path';
import { readFileSync } from 'node:fs';
import getFormatter from './formatters/index.js';
import parseContent from './parsers.js';

const getFileType = (filePath) => {
  const extName = path.extname(filePath).toLowerCase();
  switch (extName) {
    case '.json': return 'json';
    case '.yml':
    case '.yaml': return 'yaml';
    default: throw new Error(`Unknown file type ${extName}`);
  }
};

const calculateDiffType = (key, obj1, obj2) => {
  if (_.isEqual(obj1[key], obj2[key])) {
    return 'equals';
  }
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
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      return {
        type: 'nested',
        key,
        innerDiff: genDiffRecursively(obj1[key], obj2[key]),
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
  const obj1 = parseContent(readFileSync(path.resolve(filePath1)), getFileType(filePath1));
  const obj2 = parseContent(readFileSync(path.resolve(filePath2)), getFileType(filePath1));
  const diff = genDiffRecursively(obj1, obj2);
  const format = getFormatter(formatterType);
  return format(diff);
};

export default genDiff;
