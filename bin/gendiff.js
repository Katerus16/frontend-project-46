#!/usr/bin/env node
import path from 'node:path';
import { Command } from 'commander';
import genDiff from '../index.js';
import parseFile from '../src/parsers.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action(
    (filepath1, filepath2, options) => console.log(genDiff(
      parseFile(path.resolve(filepath1)),
      parseFile(path.resolve(filepath2)),
      options.format,
    )),
  );

program.parse();
