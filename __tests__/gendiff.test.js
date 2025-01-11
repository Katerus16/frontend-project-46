import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../index.js';
import parseFile from '../src/parsers.js';
import { file11Fixture, file22Fixture } from '../__fixtures__/objs.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

test.each([
  'stylish',
  'plain',
  'json',
])('genDiff %s', (format) => {
  expect(genDiff(
    getFixturePath('file11.json'),
    getFixturePath('file22.json'),
    format,
  )).toEqual(readFileSync(getFixturePath(`result_${format}.txt`), 'utf-8'));
});

test('parseFile yaml', () => {
  expect(
    parseFile(getFixturePath('file11.yml')),
  ).toEqual(file11Fixture);
  expect(
    parseFile(getFixturePath('file22.yaml')),
  ).toEqual(file22Fixture);
});

test('parseFile json', () => {
  expect(
    parseFile(getFixturePath('file11.json')),
  ).toEqual(file11Fixture);
});
