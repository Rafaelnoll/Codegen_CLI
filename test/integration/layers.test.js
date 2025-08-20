import {
  describe,
  beforeEach,
  jest,
  test,
  expect,
  beforeAll,
  afterAll
} from '@jest/globals';
import { tmpdir } from 'os';
import fsPromise from 'fs/promises';
import { join } from 'path';
import { createLayersIfNotExists } from '../../src/createLayers';
import { defaultLayers } from '../constants/defaultLayers';

async function getFolders({ mainPath, defaultMainFolder }){
  return fsPromise.readdir(join(mainPath, defaultMainFolder));
}

describe('#Integration - Layers - Folder Structure', () => {
  const config = {
    defaultMainFolder: 'src',
    mainPath: '',
    layers: defaultLayers.sort()
  }

  beforeAll(async () => {
    config.mainPath = await fsPromise.mkdtemp(join(tmpdir(), 'skeleton-'));
  });

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await fsPromise.rm(config.mainPath, { recursive: true });
  })

  test('Should create folders if it doesnt exists', async () => {

    const beforeRun = await fsPromise.readdir(join(config.mainPath));

    await createLayersIfNotExists(config);

    const afterRun = await getFolders(config);

    expect(beforeRun).not.toStrictEqual(afterRun);
    expect(afterRun).toEqual(config.layers);
  })

  test('Should not create folders if it exists', async () => {
    const beforeRun = await getFolders(config);
    await createLayersIfNotExists(config);

    const afterRun = await getFolders(config);

    expect(beforeRun).toEqual(afterRun);
  });
});
