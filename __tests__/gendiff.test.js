import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../index.js';
import parseFile from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

test('genDiff JSON', () => {
  expect(genDiff(
    parseFile(getFixturePath('file1.json')),
    parseFile(getFixturePath('file2.json')),
  )).toEqual(readFileSync(getFixturePath('result.txt'), 'utf-8'));
});

test('parseFile yaml', () => {
  expect(
    parseFile(getFixturePath('file1.yml')),
  ).toEqual({
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  });
  expect(
    parseFile(getFixturePath('file2.yaml')),
  ).toEqual({
    timeout: 20,
    verbose: true,
    host: 'hexlet.io',
  });
});
