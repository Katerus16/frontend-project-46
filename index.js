import { readFileSync } from 'node:fs';
import path from 'node:path'; 

export const parseFile = (absPath) => {
  if (path.extname(absPath).toLowerCase() === '.json') {
    const fileData = readFileSync(absPath);
    const obj = JSON.parse(fileData);
    return obj;
  }
};