export default `
export default class ProductRepository {
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
