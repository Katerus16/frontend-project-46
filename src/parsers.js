import { readFileSync } from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const parseFile = (absPath) => {
  if (path.extname(absPath).toLowerCase() === '.json') {
    const fileData = readFileSync(absPath);
    const obj = JSON.parse(fileData);
    return obj;
  } if (path.extname(absPath).toLowerCase() === '.yml' || path.extname(absPath).toLowerCase() === '.yaml') {
    const fileData = readFileSync(absPath);
    const obj = yaml.load(fileData);
    return obj;
  }
  return null;
};

export default parseFile;
