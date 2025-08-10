import {
  describe,
  beforeEach,
  jest,
  test,
  expect
} from '@jest/globals';
import Util from '../../src/util';

describe('#Utils - String', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test("#upperCaseFirstLetter should return a string with first letter in uppercase", () => {
    const value = "productRepository";
    const expected = 'ProductRepository'

    const result = Util.upperCaseFirstLetter(value);

    expect(result).toEqual(expected)
  })

  test("#upperCaseFirstLetter should return the argument same value if its passed a falsy value", () => {
    expect(Util.upperCaseFirstLetter(null)).toBe('');
  });

  test("#lowerCaseFirstLetter should return   a string with first letter in lowercase", () => {
    const value = "ProductRepository";
    const expected = "productRepository";

    const result = Util.lowerCaseFirstLetter(value);

    expect(result).toEqual(expected)
  });

  test("#lowerCaseFirstLetter should return the argument same value if its passed a falsy value", () => {
    expect(Util.lowerCaseFirstLetter(null)).toBe('');
  })
});
