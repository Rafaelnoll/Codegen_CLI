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
import { createFiles } from '../../src/createFiles';
import Util from '../../src/util.js';

function generateFilePath({ mainPath, defaultMainFolder, layers, componentName }){
  return layers.map(layer => {
    const fileName = `${Util.lowerCaseFirstLetter(componentName)}${Util.upperCaseFirstLetter(layer)}.js`;
    return join(mainPath, defaultMainFolder, layer, fileName)
  });
}

function getAllMethodsFromInstance(instance){
  const methodsToIgnore = ['constructor'];
  return Reflect.ownKeys(Reflect.getPrototypeOf(instance)).filter(method => !methodsToIgnore.includes(method));
}

describe('#Integration - Files - Files Structure', () => {
  const config = {
    defaultMainFolder: 'src',
    mainPath: '',
    layers: defaultLayers.sort(),
    componentName: 'heroes'
  }

  const packageJSON = 'package.json';
  const packageJSONLocation = join('.', 'test', 'integration','mocks', packageJSON);
  const expectNotImplemented = fn => expect(() => fn.call()).rejects.toEqual('Method not implemented!');

  beforeAll(async () => {
    config.mainPath = await fsPromise.mkdtemp(join(tmpdir(), 'files-'));
    await fsPromise.copyFile(packageJSONLocation, join(config.mainPath, packageJSON));

    await createLayersIfNotExists(config);
  });

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await fsPromise.rm(config.mainPath, { recursive: true });
  })

  test('Repository should have the methods read, create, update and delete', async () => {
    const myConfig = {
      ...config,
      layers: ['repository']
    };

    await createFiles(myConfig);

    const [repositoryFilePath] = generateFilePath(myConfig)
    const { default: Repository } = await import(repositoryFilePath);

    const repositoryInstance = new Repository();

    expectNotImplemented(repositoryInstance.read);
    expectNotImplemented(repositoryInstance.create);
    expectNotImplemented(repositoryInstance.update);
    expectNotImplemented(repositoryInstance.delete);
  });
  test('Service should have the same signature of Repository and call all its methods', async () => {
    const myConfig = {
      ...config,
      layers: ['repository', 'service']
    };

    await createFiles(myConfig);

    const [repositoryFilePath, serviceFilePath] = generateFilePath(myConfig)
    const [{ default: Repository }, { default: Service }] = await Promise.all([
      import(repositoryFilePath),
      import(serviceFilePath)
    ]);

    const repositoryInstance = new Repository();
    const serviceInstance = new Service({ repository: repositoryInstance });

    const repositoryMethods = getAllMethodsFromInstance(repositoryInstance);

    repositoryMethods.forEach(method => jest.spyOn(repositoryInstance, method).mockResolvedValue());
    getAllMethodsFromInstance(serviceInstance).forEach(method => serviceInstance[method].call(serviceInstance, []));
    repositoryMethods.forEach(method => expect(repositoryInstance[method]).toHaveBeenCalled());
  });

  test('Factory instance should match layers', async () => {
     const myConfig = {
      ...config
    };

    await createFiles(myConfig);

    const [factoryFilePath, repositoryFilePath, serviceFilePath] = generateFilePath(myConfig)
    const [{ default: Factory }, { default: Repository }, { default: Service }] = await Promise.all([
      import(factoryFilePath),
      import(repositoryFilePath),
      import(serviceFilePath)
    ]);

    const expectedInstance = new Service({ repository: new Repository() });
    const instance = Factory.getInstance();

    expect(instance).toMatchObject(expectedInstance);
    expect(instance).toBeInstanceOf(Service);
  });
});
