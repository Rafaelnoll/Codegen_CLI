import Util from "../util";

const componentNameAnchor = "<COMPONENT_NAME>";

const repositoryNameAnchor = "<REPOSITORY_NAME>";
const repositoryDependencyNameAnchor = "<DEPENDENCY_REPOSITORY_NAME>";

const serviceNameAnchor = "<SERVICE_NAME>";
const serviceDependencyNameAnchor = "<DEPENDENCY_SERVICE_NAME>";

const template = `
import ${repositoryNameAnchor} from '../repository/${repositoryDependencyNameAnchor}.js'
import ${serviceNameAnchor} from '../service/${serviceDependencyNameAnchor}.js'

export default class ${componentNameAnchor}Factory {
  static getInstance(){
    const repository = new ${repositoryNameAnchor}()
    const service = new ${serviceNameAnchor}({ repository })
    return service;
  }
}`

export default function factoryTemplate(componentName, repositoryName, serviceName) {
  const fileName = Util.lowerCaseFirstLetter(componentName);

  const textFile = template
    .replaceAll(componentNameAnchor, Util.upperCaseFirstLetter(componentName))
    .replaceAll(repositoryNameAnchor, Util.upperCaseFirstLetter(repositoryName))
    .replaceAll(repositoryDependencyNameAnchor, Util.lowerCaseFirstLetter(repositoryName))
    .replaceAll(serviceNameAnchor, Util.upperCaseFirstLetter(serviceName))
    .replaceAll(serviceDependencyNameAnchor, Util.lowerCaseFirstLetter(serviceName))

  return {
    fileName: `${fileName}Factory`,
    template: textFile
  }
}
