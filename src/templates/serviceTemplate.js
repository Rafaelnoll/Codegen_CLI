import Util from "../util.js";

const componentNameAnchor = "<COMPONENT_NAME>";
const repositoryNameAnchor = "<REPOSITORY_NAME>";
const currentContextAnchor = "<CURRENT_CONTEXT>";

const template = `
export default class ${componentNameAnchor}Service {
  constructor({ repository: ${repositoryNameAnchor}  }) {
    ${currentContextAnchor} = ${repositoryNameAnchor};
  }

  read(query) {
    return ${currentContextAnchor}.read(query);
  }

  create(data) {
    return ${currentContextAnchor}.create(data);
  }

  update(id, data) {
    return ${currentContextAnchor}.update(id, data);
  }

  delete(id) {
    return ${currentContextAnchor}.delete(id);
  }
}`

export default function serviceTemplate(componentName, repositoryName) {
  const fileName = Util.lowerCaseFirstLetter(componentName);
  const currentContext = `this.${repositoryName}`;

  const textFile = template
    .replaceAll(componentNameAnchor, Util.upperCaseFirstLetter(componentName))
    .replaceAll(repositoryNameAnchor, repositoryName)
    .replaceAll(currentContextAnchor, currentContext);

  return {
    fileName: `${fileName}Service`,
    template: textFile
  }
}
