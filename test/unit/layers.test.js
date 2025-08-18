import {
  describe,
  beforeEach,
  jest,
  test,
  expect
} from '@jest/globals';

import fsPromise from 'fs/promises';
import fs from 'fs';
import { createLayersIfNotExists } from '../../src/createLayers';
import { defaultLayers } from '../constants/defaultLayers';

describe('#Layers - Folder Structure', () => {

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test("Should create layers if it doesnt exists", async () => {
    jest.spyOn(fsPromise, fsPromise.mkdir.name).mockResolvedValue();
    jest.spyOn(fs, fs.existsSync.name).mockReturnValue(false);

    await createLayersIfNotExists({ mainPath: '', layers: defaultLayers, defaultMainFolder: 'src' });

    expect(fs.existsSync).toHaveBeenCalledTimes(defaultLayers.length)
    expect(fsPromise.mkdir).toHaveBeenCalledTimes(defaultLayers.length)
  })

  test("Should not create layers if it exists", async () => {
    jest.spyOn(fsPromise, fsPromise.mkdir.name).mockResolvedValue();
    jest.spyOn(fs, fs.existsSync.name).mockReturnValue(true);

    await createLayersIfNotExists({ mainPath: '', layers: defaultLayers, defaultMainFolder: 'src' });

    expect(fs.existsSync).toHaveBeenCalledTimes(3);
    expect(fsPromise.mkdir).toHaveBeenCalledTimes(0);
  })
});
