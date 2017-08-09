// return an object with arrow functions
const defaultResponse = (data, statusCode = 200) => ({
  data,
  statusCode,
});

const errorResponse = (message, statusCode = 400) => {
  defaultResponse({ error: message }, statusCode);
};

class BooksController {
  constructor(Books) { // change name model DI
    this.Books = Books;
  }
  getAll() {
    return this.Books.findAll({})
      .then(result => defaultResponse(result))
      .catch(result => errorResponse(result, 412));
  }

  getById(params) {
    return this.Books.findOne({ where: params })
      .then(result => defaultResponse(result))
      .catch(result => errorResponse(result, 412));
  }

  create(data) {
    return this.Books.create(data)
      .then(result => defaultResponse(result, 201)) // resource created
      .catch(result => errorResponse(result, 422));// can not be processed
  }

  update(data, params) {
    return this.Books.update(data, { where: params })
      .then(result => defaultResponse(result))
      .catch(result => errorResponse(result, 422));
  }

  delete(params) {
    return this.Books.destroy({ where: params })
      .then(result => defaultResponse(result, 204))
      .catch(result => errorResponse(result, 422));
  }
}
export default BooksController;
