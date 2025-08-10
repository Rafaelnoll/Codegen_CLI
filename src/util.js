export default class Util {
  static #transform({ string: [first, ...rest], upperCase = true },) {
    const firstLetter = upperCase ? first.toUpperCase() : first.toLowerCase();
    return [firstLetter, ...rest].join('');
  }

  static lowerCaseFirstLetter(string) {
    if (!string) return ''
    return this.#transform({ string, upperCase: false });
  }

  static upperCaseFirstLetter(string) {
    if (!string) return ''
    return this.#transform({ string })
  }
}
