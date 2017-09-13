import jwt from 'jwt-simple';
describe('Testing routes for books resource', () => {
  const Books = app.datasource.models.Books;
  const Users = app.datasource.models.Users;
  const jwtSecret = app.config.jwtSecret;
  let token;

  const Book = {
    id: 1,
    name: 'ThisIsABook',
    description: 'This is the description',
  };

  beforeEach((done) => {
    Users.destroy({ where: {} })
      .then(() =>
        Users.create({
          name: "test user",
          email: "test@mail.com",
          password: "password"
        }))
      .then(user => {
        Books.destroy({ where: {} })
          .then(() => {
            Books.create(Book);
          })
          .then(() => {
            token = jwt.encode({id: user.id}, jwtSecret )
            done();
          });
      })
  });

  describe('Route GET/books', () => {
    it('Should return a list of books', (done) => {
      //fijarme si request.get retorna una promise cambiarlo
      request
        .get('/books')
        .set('Authorization', `bearer ${token}`)
        .end((err, response) => {
          expect(response.body[0].id).to.be.eql(Book.id);
          expect(response.body[0].name).to.be.eql(Book.name);
          done(err);
        });
    });
  });

  describe('Route GET/books/{id}', () => {
    it('Should return a book', (done) => {
      request
        .get('/books/1')
        .set('Authorization', `bearer ${token}`)
        .end((err, response) => {
          expect(response.body.id).to.be.eql(Book.id);
          expect(response.body.name).to.be.eql(Book.name);
          done(err);
        });
    });
  });

  describe('Route POST /books', () => {
    it('Should create a book', (done) => {
      const NewBook = {
        id: 2,
        name: 'ThisIsANewBook',
      };
      request
        .post('/books')
        .set('Authorization', `bearer ${token}`)
        .send(NewBook)
        .end((err, response) => {
          console.log(err)
          console.log(response)
          expect(response.body.id).to.be.eql(NewBook.id);
          expect(response.body.name).to.be.eql(NewBook.name);
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
      request
        .put('/books/1')
        .set('Authorization', `bearer ${token}`)
        .send(UpdateBook)
        .end((err, response) => {
          expect(response.body).to.be.eql([1]);
          done(err);
        });
    });
  });

  describe('Route DELETE /books/{id}', () => {
    it('Should update a book', (done) => {
      request
        .delete('/books/1')
        .set('Authorization', `bearer ${token}`)
        .end((err, response) => {
          expect(response.statusCode).to.be.eql(204);
          done(err);
        });
    });
  });
});
