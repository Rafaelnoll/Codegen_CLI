import {
  describe,
  beforeEach,
  jest,
  test,
  expect
} from '@jest/globals';

import templates from './mocks';
import repositoryTemplate from '../../src/templates/repositoryTemplate';

const {
  repositoryTemplateMock
} = templates;

describe('#Codegen 3-layers arch', () => {
  const componentName = 'product';
  const repositoryName = `${componentName}Repository`;

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
  test.todo("Should generate Service template")
  test.todo("Should generate Factory template")

});
