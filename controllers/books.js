
import HttpStatus from 'http-status';

// return an object with arrow functions
const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
  data,
  statusCode,
});

const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) =>
  defaultResponse({ error: message }, statusCode);

class BooksController {
  constructor(Books) { // change name model DI
    this.Books = Books;
  }
  getAll() {
    return this.Books.findAll({})
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  getById(params) {
    return this.Books.findOne({ where: params })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  create(data) {
    return this.Books.create(data)
      .then(result => defaultResponse(result, HttpStatus.CREATED)) // resource created
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));//422 can not be processed
  }

  update(data, params) {
    return this.Books.update(data, { where: params })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  delete(params) {
    return this.Books.destroy({ where: params })
      .then(result => defaultResponse(result, HttpStatus.NO_CONTENT))//204 successful response no content
      .catch(error => errorResponse(error, HttpStatus.UNPROCESSABLE_ENTITY));
  }
}

export default BooksController;
