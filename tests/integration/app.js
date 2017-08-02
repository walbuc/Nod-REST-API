describe("Testing routes for books resource", () => {
const Books = app.datasource.models.Books,
Book = {
  id:1,
  name:'ThisIsABook'
}

beforeEach(done => {
  Books.destroy({where:{}})
    .then(() => {
      Books.create(Book)
    })
    .then(() => {
      done()
    })
})

describe('Route GET/books', () => {
  it('Should return a list of books', done => {
    request
      .get('/books')
      .end((err, response) => {
        expect(response.body[0].id).to.be.eql(Book.id);
        expect(response.body[0].name).to.be.eql(Book.name);
        done(err);
      });
    });
  });

describe('Route GET/books/{id}', () => {
  it('Should return a book', done => {
    request
      .get('/books/1')
      .end((err, response) => {
        expect(response.body.id).to.be.eql(Book.id);
        expect(response.body.name).to.be.eql(Book.name);
        done(err);
      });
    });
  });

describe('Route POST /books', () => {
  it('Should create a book', done => {
    const NewBook = {
      id:2,
      name:'ThisIsANewBook'
    }
    request
      .post('/books')
      .send(NewBook)
      .end((err, response) => {
        expect(response.body.id).to.be.eql(NewBook.id);
        expect(response.body.name).to.be.eql(NewBook.name);
        done(err);
      });
    });
  });

describe('Route PUT /books/{id}', () => {
  it('Should update a book', done => {
    const UpdateBook = {
      id:3,
      name:'ThisIsTheUpdatedBook'
    }
    request
      .put('/books/1')
      .send(UpdateBook)
      .end((err, response) => {
        //console.log('RESPONSE', response.body)
        expect(response.body).to.be.eql([1]);
        done(err);
      });
    });
  });

describe('Route DELETE /books/{id}', () => {
  it('Should update a book', done => {
    request
      .delete('/books/1')
      .end((err, response) => {
        expect(response.statusCode).to.be.eql(204)
        done(err);
      });
    });
  });
});
