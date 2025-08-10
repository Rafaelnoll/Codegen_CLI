import fs from 'fs';
import fsPromise from 'fs/promises';
import { join } from 'path';

export default async function createLayers({ mainPath, defaultMainFolder, layers }) {
  const defaultPath = join(mainPath, defaultMainFolder);
  const foldersToCreate = layers.filter(layer => !fs.existsSync(join(defaultPath, layer)));

  const results = foldersToCreate.map(layer => fsPromise.mkdir(join(defaultPath, layer), { recursive: true }));
  return Promise.all(results);
}
