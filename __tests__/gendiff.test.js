import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import { genDiff, parseFile } from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

test('genDiff', () => {
  expect(genDiff(
    parseFile(getFixturePath('file1.json')),
    parseFile(getFixturePath('file2.json')),
  )).toEqual(readFileSync(getFixturePath('result.txt'), 'utf-8'));
});
