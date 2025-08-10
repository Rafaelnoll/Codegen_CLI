import {
  describe,
  beforeEach,
  jest,
  test,
  expect
} from '@jest/globals';

import fsPromise from 'fs/promises';
import fs from 'fs';
import createLayers from '../../src/createLayers';

describe('#Layers - Folder Structure', () => {
  const defaultLayers = ["repository", "service", "factory"];

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test("Should create layers if it doesnt exists", async () => {
    jest.spyOn(fsPromise, fsPromise.mkdir.name).mockResolvedValue();
    jest.spyOn(fs, fs.existsSync.name).mockReturnValue(false);

    await createLayers({ mainPath: '', layers: defaultLayers, defaultMainFolder: 'src' });

    expect(fs.existsSync).toHaveBeenCalledTimes(defaultLayers.length)
    expect(fsPromise.mkdir).toHaveBeenCalledTimes(defaultLayers.length)
  })

  test("Should not create layers if it exists", async () => {
    jest.spyOn(fsPromise, fsPromise.mkdir.name).mockResolvedValue();
    jest.spyOn(fs, fs.existsSync.name).mockReturnValue(true);

    await createLayers({ mainPath: '', layers: defaultLayers, defaultMainFolder: 'src' });

    expect(fs.existsSync).toHaveBeenCalledTimes(3);
    expect(fsPromise.mkdir).toHaveBeenCalledTimes(0);
  })
});
