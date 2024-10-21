import { readFileSync } from 'node:fs';
import path from 'node:path'; 
import _ from 'lodash';

export const parseFile = (absPath) => {
  if (path.extname(absPath).toLowerCase() === '.json') {
    const fileData = readFileSync(absPath);
    const obj = JSON.parse(fileData);
    return obj;
  }
};

export const genDiff = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const unionKeys = _.sortBy(_.union(keys1, keys2));
  const diff = [];
  for (const key of unionKeys) {
    if (obj1[key] === obj2[key]){
      diff.push({action: ' ', key:key, value: obj1[key]});
    } else {
        if (obj1[key] !== undefined){
           diff.push({action: '-', key:key, value: obj1[key]});
          } 
        if (obj2[key] !== undefined){
          diff.push({action: '+', key:key, value: obj2[key]});
        }
    }
  } 
  let result = '';
  for (const obj of diff) {
   result = `${result}\n ${obj.action} ${obj.key}: ${obj.value}`;
  }
   return `{${result}\n}`;
};