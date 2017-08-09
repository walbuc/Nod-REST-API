import BooksController from '../../../controllers/books';

// using testdouble for mocks
describe('controllers: books', () => {
  describe('Get All Books: getAll()', () => {
    it(' should return a list of books', () => {
      // mocking model
      const Books = {
        findAll: td.function(),
      };
      const expectedResponse = [{
        id: 1,
        name: 'Test Book ',
        created_at: '2017-8-6T23:55:23.692z',
        updated_at: '2017-8-6T23:55:23.692z',
      }];
      td.when(Books.findAll({})).thenResolve(expectedResponse);
      const booksController = new BooksController(Books);
      return booksController.getAll()
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Get a book: getById()', () => {
    it(' should return a book', () => {
      // mocking model
      const Books = {
        findOne: td.function(),
      };
      const expectedResponse = {
        id: 1,
        name: 'Test Book ',
        created_at: '2017-8-6T23:55:23.692z',
        updated_at: '2017-8-6T23:55:23.692z',
      };
      td.when(Books.findOne({ where: { id: 1 } })).thenResolve(expectedResponse);
      const booksController = new BooksController(Books);
      return booksController.getById({ id: 1 })
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Create a book: create()', () => {
    it(' should create a book', () => {
      // mocking model
      const Books = {
        create: td.function(),
      };
      const requestBody = {
        name: 'Test create Book',
      };
      const expectedResponse = {
        id: 1,
        name: 'Test create Book ',
        created_at: '2017-8-6T23:55:23.692z',
        updated_at: '2017-8-6T23:55:23.692z',
      };
      td.when(Books.create(requestBody)).thenResolve(expectedResponse);
      const booksController = new BooksController(Books);
      return booksController.create(requestBody)
        .then((response) => {
          expect(response.statusCode).to.be.eql(201);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });
  });

  describe('Update a book: update()', () => {
    it(' should create a book', () => {
      // mocking model
      const Books = {
        update: td.function(),
      };
      const requestBody = {
        id: 1,
        name: 'Test Book Update',
      };
      const expectedResponse = {
        id: 1,
        name: 'Test Book Update',
        created_at: '2017-8-6T23:55:23.692z',
        updated_at: '2017-8-6T23:55:23.692z',
      };
      td.when(Books.update(requestBody, { where: { id: 1 } })).thenResolve(expectedResponse);
      const booksController = new BooksController(Books);
      return booksController.update({ id: 1, name: 'Test Book Update' }, { id: 1 })
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Delete a book: delete()', () => {
    it(' should delete a book', () => {
      // mocking model
      const Books = {
        destroy: td.function(),
      };
      td.when(Books.destroy({ where: { id: 1 } })).thenResolve({});
      const booksController = new BooksController(Books);
      return booksController.delete({ id: 1 })
        .then(response => expect(response.statusCode).to.be.eql(204));
    });
  });
});
