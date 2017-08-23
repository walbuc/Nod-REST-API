// schema validation

describe('Testing routes for books resource', () => {
  const Books = app.datasource.models.Books;
  const Book = {
    id: 1,
    name: 'ThisIsABook',
    description: 'This is a description',
  };

  beforeEach((done) => {
    Books.destroy({ where: {} })
      .then(() => {
        Books.create(Book);
      })
      .then(() => {
        done();
      });
  });

  describe('Route GET/books', () => {
    it('Should return a list of books', (done) => {
      const booksList = Joi.array().items(Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        description: Joi.string(),
        created_at: Joi.date().iso(),
        updated_at: Joi.date().iso(),
      }));

      request
        .get('/books')
        .end((err, response) => {
          joiAssert(response.body, booksList);
          done(err);
        });
    });
  });

  describe('Route GET/books/{id}', () => {
    it('Should return a book', (done) => {
      const book = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        description: Joi.string(),
        created_at: Joi.date().iso(),
        updated_at: Joi.date().iso(),
      });
      request
        .get('/books/1')
        .end((err, response) => {
          joiAssert(response.body, book);
          done(err);
        });
    });
  });

  describe('Route POST /books', () => {
    it('Should create a book', (done) => {
      const NewBook = {
        id: 2,
        name: 'ThisIsANewBook',
        description: "This is a new description"
      };

      const book = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        description: Joi.string(),
        created_at: Joi.date().iso(),
        updated_at: Joi.date().iso(),
      });

      request
        .post('/books')
        .send(NewBook)
        .end((err, response) => {
          joiAssert(response.body, book);
          done(err);
        });
    });
  });

  describe('Route PUT /books/{id}', () => {
    it('Should update a book', (done) => {
      const UpdateBook = {
        id: 3,
        name: 'ThisIsTheUpdatedBook',
      };
      const updatedBook = Joi.array().items(1);
      request
        .put('/books/1')
        .send(UpdateBook)
        .end((err, response) => {
        // console.log('RESPONSE', response.body)
          joiAssert(response.body, updatedBook);
          done(err);
        });
    });
  });

  describe('Route DELETE /books/{id}', () => {
    it('Should delete a book', (done) => {
      request
        .delete('/books/1')
        .end((err, response) => {
          expect(response.statusCode).to.be.eql(204);
          done(err);
        });
    });
  });
});
