import Util from "../util";

const componentNameAnchor = "<COMPONENT_NAME>";
const repositoryNameAnchor = "<REPOSITORY_NAME>";
const currentContextAnchor = "<CURRENT_CONTEXT>";

const template = `
export default class <COMPONENT_NAME>Service {
  constructor({ repository: <REPOSITORY_NAME>  }) {
    <CURRENT_CONTEXT> = <REPOSITORY_NAME>;
  }

  read(query) {
    return <CURRENT_CONTEXT>.read(query);
  }

  create(data) {
    return <CURRENT_CONTEXT>.create(data);
  }

  update(id, data) {
    return <CURRENT_CONTEXT>.update(id, data);
  }

  delete(id) {
    return <CURRENT_CONTEXT>.delete(id);
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
