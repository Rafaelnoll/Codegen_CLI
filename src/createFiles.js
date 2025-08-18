import fs from 'fs';
import fsPromise from 'fs/promises';
import { join } from 'path';
import templates from './templates/index.js';
import Util from './util.js';

const defaultDependencies = (layer, componentName) => {
  const dependencies = {
    repository: [],
    service: [
      `${componentName}Repository`
    ],
    factory: [
      `${componentName}Repository`,
      `${componentName}Service`,
    ],
  };

  return dependencies[layer].map(dependency => Util.lowerCaseFirstLetter(dependency));
}

async function executeWrites(pendingFilesToWrite) {
  return Promise.all(pendingFilesToWrite
    .map(({ fileNamePath, templateContent }) => fsPromise.writeFile(fileNamePath, templateContent))
  )
}

export async function createFiles({ mainPath, defaultMainFolder, layers, componentName }) {
  const templateKeys = Object.keys(templates);
  const pendingFilesToWrite = [];

  for(const layer of layers){
    const chosenTemplate = templateKeys.find(key => key.includes(layer));

    if(!chosenTemplate){
      return { error: `The chosen layer '${layer}' does not have a template` };
    }

    const template = templates[chosenTemplate];
    const mainFolderPath = join(mainPath, defaultMainFolder, layer);
    const dependencies = defaultDependencies(layer, componentName);

    const { fileName, template: templateContent } = template(componentName, ...dependencies);

    const fileNamePath = `${mainFolderPath}/${Util.lowerCaseFirstLetter(fileName)}.js`;
    pendingFilesToWrite.push({ fileNamePath, templateContent });
  }

  await executeWrites(pendingFilesToWrite);

  return { success: true };
}
