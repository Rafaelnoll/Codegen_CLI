#!/usr/bin/env node

import chalk from 'chalk';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { createLayersIfNotExists } from './createLayers.js';
import { createFiles } from './createFiles.js';

const { argv: { componentName, mainFolder }} = yargs(hideBin(process.argv))
  .scriptName(chalk.cyan('codegen'))
  .usage(`${chalk.green('$0 <command> [args]')}`)
  .command('skeleton', chalk.yellow('Create project skeleton'), (builder) => {
    return builder
      .option('component-name', {
        alias: 'c',
        demandOption: true,
        describe: chalk.blue('Component\'s name'),
        type: 'array'
      })
      .example(
        chalk.green('$0 skeleton --component-name product'),
        chalk.gray('Generates a single domain "product" with its repository, service, and factory')
      )
      .example(
        chalk.green('$0 skeleton -c product -c person -c colors'),
        chalk.gray('Generates multiple domains ("product", "person", "colors")')
      )
      .option('main-folder', {
        alias: 'f',
        demandOption: false,
        describe: chalk.magenta('Main folder name (default: "src")'),
        type: 'string',
        default: 'src'
      });
  })
  .demandCommand(1, chalk.red('You need to pass a valid command'))
  .strictCommands()
  .help();

const isDevelopmentMode = process.env.NODE_ENV === 'dev';
const defaultMainFolder = isDevelopmentMode ? 'tmp' : mainFolder;

const layers = ['repository', 'service', 'factory'].sort();
const config = {
  layers,
  defaultMainFolder,
  mainPath: '.',
};

const pendingPromises = [];

console.log(chalk.green('⚡ Generating project skeleton...'));

await createLayersIfNotExists(config);

if (Array.isArray(componentName)) {
  for (const domain of componentName) {
    console.log(chalk.cyan(`👉 Creating files for: ${domain}`));

    const result = createFiles({
      ...config,
      componentName: domain
    });

    pendingPromises.push(result);
  }
}

await Promise.all(pendingPromises);

console.log(chalk.bold.green('\n✅ All files generated successfully!\n'));
