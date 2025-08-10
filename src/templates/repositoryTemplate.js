import Util from "../util";

const componentNameAnchor = '<TEMPLATE_NAME>';

const template = `
export default class <TEMPLATE_NAME>Repository {
  constructor() { }

  read(query) {
    return Promise.reject('Method "read" not implemented');
  }

  create(data) {
    return Promise.reject('Method "create" not implemented');
  }

  update(id, data) {
    return Promise.reject('Method "update" not implemented');
  }

  delete(id) {
    return Promise.reject('Method "delete" not implemented');
  }
}`;

export default function repositoryTemplate(componentName) {
  const fileName = Util.lowerCaseFirstLetter(componentName);

  return {
    fileName: `${fileName}Repository`,
    template: template.replace(componentNameAnchor, Util.upperCaseFirstLetter(componentName))
  }
}
