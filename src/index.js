#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { createLayersIfNotExists } from './createLayers.js';
import { createFiles } from './createFiles.js';

const { argv: { componentName }} = yargs(hideBin(process.argv))
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
      .example('$0 skeleton --component-name product', 'Creates a project with a single domain')
      .example('$0 skeleton -c product -c person -c colors', 'Creates a project with a list of domains');
  })
  .demandCommand(1, 'You need to pass a valid command')
  .strictCommands()
  .help();

const isDevelopmentMode = process.env.NODE_ENV === 'dev';
const defaultMainFolder = isDevelopmentMode ? 'tmp' : 'src';

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
