import Util from "../util";

const componentNameAnchor = '<COMPONENT_NAME>';

const template = `
export default class ${componentNameAnchor}Repository {
  constructor() { }

  read(query) {
    return Promise.reject('Method not implemented!');
  }

  create(data) {
    return Promise.reject('Method not implemented!');
  }

  update(id, data) {
    return Promise.reject('Method not implemented!');
  }

  delete(id) {
    return Promise.reject('Method not implemented!');
  }
}`;

export default function repositoryTemplate(componentName) {
  const fileName = Util.lowerCaseFirstLetter(componentName);

  return {
    fileName: `${fileName}Repository`,
    template: template.replaceAll(componentNameAnchor, Util.upperCaseFirstLetter(componentName))
  }
}
