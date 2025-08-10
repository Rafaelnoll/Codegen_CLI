import {
  describe,
  beforeEach,
  jest,
  test,
  expect
} from '@jest/globals';

import templates from './mocks';
import repositoryTemplate from '../../src/templates/repositoryTemplate';
import serviceTemplate from '../../src/templates/serviceTemplate';
import factoryTemplate from '../../src/templates/factoryTemplate';

const {
  repositoryTemplateMock,
  serviceTemplateMock,
  factoryTemplateMock
} = templates;

describe('#Codegen 3-layers arch', () => {
  const componentName = 'product';
  const repositoryName = `${componentName}Repository`;
  const serviceName = `${componentName}Service`;
  const factoryName = `${componentName}Factory`;

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test("Should generate Repository template", () => {

    const expected = {
      fileName: repositoryName,
      template: repositoryTemplateMock
    }

    expect(repositoryTemplate(componentName)).toStrictEqual(expected);
  });

  test("Should generate Service template", () => {
    const expected = {
      fileName: serviceName,
      template: serviceTemplateMock
    }

    expect(serviceTemplate(componentName, repositoryName)).toStrictEqual(expected);
  })

  test("Should generate Factory template", () => {
    const expected = {
      fileName: factoryName,
      template: factoryTemplateMock
    }

    expect(factoryTemplate(componentName, repositoryName, serviceName)).toStrictEqual(expected);
  })

});
