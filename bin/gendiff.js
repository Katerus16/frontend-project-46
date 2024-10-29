#!/usr/bin/env node
import path from 'node:path';
import { Command } from 'commander';
import { genDiff, parseFile } from '../index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format [type]', 'output format')
  .action(
    (filepath1, filepath2) => console.log(genDiff(
      parseFile(path.resolve(filepath1)),
      parseFile(path.resolve(filepath2)),
    )),
  );

program.parse();
