#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { createLayersIfNotExists } from './createLayers.js';
import { createFiles } from './createFiles.js';

const { argv: { componentName, mainFolder }} = yargs(hideBin(process.argv))
  .scriptName('codegen')
  .usage('$0 <command> [args]')
  .command('skeleton', 'Create project skeleton', (builder) => {
    return builder
      .option('component-name', {
        alias: 'c',
        demandOption: true,
        describe: 'Component\'s name',
        type: 'array'
      })
      .example('$0 skeleton --component-name product', 'Generates a single domain "product" with its repository, service, and factory')
      .example('$0 skeleton -c product -c person -c colors', 'Generates multiple domains ("product", "person", "colors"), each with its own repository, service, and factory')
      .option('main-folder', {
        alias: 'f',
        demandOption: false,
        describe: 'Main folder name (default: "src")',
        type: 'string',
        default: 'src'
      })
      .example('$0 skeleton -c product --main-folder main', 'Generates a single domain "product" inside the "main" folder')
      .example('$0 skeleton -c product -c person -f main', 'Generates multiple domains ("product" and "person") inside the "main" folder')
  })
  .demandCommand(1, 'You need to pass a valid command')
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

await createLayersIfNotExists(config);

if(Array.isArray(componentName)){
  for(const domain of componentName){
      const result = createFiles({
        ...config,
        componentName: domain
      });

      pendingPromises.push(result);
}
}


await Promise.all(pendingPromises);
