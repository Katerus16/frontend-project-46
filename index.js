import { readFileSync } from 'node:fs';
import path from 'node:path';
import _ from 'lodash';

export const parseFile = (absPath) => {
  if (path.extname(absPath).toLowerCase() === '.json') {
    const fileData = readFileSync(absPath);
    const obj = JSON.parse(fileData);
    return obj;
  }
  return null;
};

export const genDiff = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const unionKeys = _.sortBy(_.union(keys1, keys2));
  const diff = [];
  unionKeys.forEach((key) => {
    if (obj1[key] === obj2[key]) {
      diff.push({ action: ' ', key, value: obj1[key] });
    } else {
      if (obj1[key] !== undefined) {
        diff.push({ action: '-', key, value: obj1[key] });
      }
      if (obj2[key] !== undefined) {
        diff.push({ action: '+', key, value: obj2[key] });
      }
    }
  });
  let result = '';
  diff.forEach((obj) => {
    result = `${result}\n ${obj.action} ${obj.key}: ${obj.value}`;
  });
  return `{${result}\n}`;
};
