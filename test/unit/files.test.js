import {
  describe,
  beforeEach,
  jest,
  test,
  expect
} from '@jest/globals';
import { defaultLayers } from '../constants/defaultLayers';
import { createFiles } from '../../src/createFiles';

import fsPromise from 'fs/promises';
import fs from 'fs';
import templates from '../../src/templates';

describe('#Files - Files Structure', () => {

  const defaultConfig = {
    mainPath: './',
    defaultMainFolder: 'src',
    layers: defaultLayers,
    componentName: 'heroes'
  }
  const repositoryLayerName = `${defaultConfig.componentName}Repository`;
  const serviceLayerName = `${defaultConfig.componentName}Service`;

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test("Should not create file structure on inexistent templates", async () => {
    const config = {
      ...defaultConfig,
      layers: ['inexistent']
    }

    const result = await createFiles(config);
    const expected = { error: "The chosen layer 'inexistent' does not have a template" };

    expect(result).toStrictEqual(expected);
  });
  test("Repository should not add any additional dependencies", async () => {
    jest.spyOn(fsPromise, fsPromise.writeFile.name).mockResolvedValue();
    jest.spyOn(templates, templates.repositoryTemplate.name).mockReturnValue({ fileName: '', template: '' });

    const config = {
      ...defaultConfig,
      layers: ['repository']
    }

    const result = await createFiles(config);
    const expected = { success: true };

    expect(result).toStrictEqual(expected);
    expect(fsPromise.writeFile).toHaveBeenCalledTimes(config.layers.length);
    expect(templates.repositoryTemplate).toHaveBeenCalledWith(config.componentName);
  });

  test("Service should have repository as dependency", async () => {
    jest.spyOn(fsPromise, fsPromise.writeFile.name).mockResolvedValue();
    jest.spyOn(templates, templates.serviceTemplate.name).mockReturnValue({ fileName: '', template: '' });

    const config = {
      ...defaultConfig,
      layers: ['repository', 'service']
    }

    const result = await createFiles(config);
    const expected = { success: true };

    expect(result).toStrictEqual(expected);
    expect(fsPromise.writeFile).toHaveBeenCalledTimes(config.layers.length);
    expect(templates.serviceTemplate).toHaveBeenCalledWith(config.componentName, repositoryLayerName);
  });

  test("Factory should have repository and service as dependencies", async () => {
    jest.spyOn(fsPromise, fsPromise.writeFile.name).mockResolvedValue();
    jest.spyOn(templates, templates.factoryTemplate.name).mockReturnValue({ fileName: '', template: '' });

    const config = {
      ...defaultConfig,
      layers: ['repository', 'service', 'factory']
    }

    const result = await createFiles(config);
    const expected = { success: true };

    expect(result).toStrictEqual(expected);
    expect(fsPromise.writeFile).toHaveBeenCalledTimes(config.layers.length);
    expect(templates.factoryTemplate).toHaveBeenCalledWith(config.componentName, repositoryLayerName, serviceLayerName);
  });
});
