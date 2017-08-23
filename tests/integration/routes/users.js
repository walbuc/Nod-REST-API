describe('Testing routes for user resource', () => {
  const Users = app.datasource.models.Users;
  const User = {
    id: 1,
    name: 'defaul user',
    email: 'test@email.com',
    password: 'testpass'
  };

//Clean data
//Preset data
  beforeEach((done) => {
    Users.destroy({ where: {} })
      .then(() => {
        Users.create(User);
      })
      .then(() => {
        done();
      })
      .catch(rej => {
        console.log(rej);
      });
  });

  describe('Route GET/users', () => {
    it('Should return a list of users', (done) => {
      request
        .get('/users')
        .end((err, response) => {
          expect(response.body[0].id).to.be.eql(User.id);
          expect(response.body[0].name).to.be.eql(User.name);
          expect(response.body[0].email).to.be.eql(User.email);
          done(err);
        });
    });
  });

  describe('Route GET/users/{id}', () => {
    it('Should return a user', (done) => {
      request
        .get('/users/1')
        .end((err, response) => {
          expect(response.body.id).to.be.eql(User.id);
          expect(response.body.name).to.be.eql(User.name);
          done(err);
        });
    });
  });

  describe('Route POST /users', () => {
    it('Should create a user', (done) => {
      const NewUser = {
        id: 2,
        name: 'ThisIsANewUser',
        email: "newEmail@test.com",
        password: "thepassword"
      };
      request
        .post('/users')
        .send(NewUser)
        .end((err, response) => {
          expect(response.body.id).to.be.eql(NewUser.id);
          expect(response.body.name).to.be.eql(NewUser.name);
          expect(response.body.email).to.be.eql(NewUser.email);
          done(err);
        });
    });
  });

  describe('Route PUT /users/{id}', () => {
    it('Should update a user', (done) => {
      const UpdateUser = {
        id: 3,
        name: 'updated user',
        email: 'updatedEmail@test.com',
      };
      request
        .put('/users/1')
        .send(UpdateUser)
        .end((err, response) => {
        // console.log('RESPONSE', response.body)
          expect(response.body).to.be.eql([1]);
          done(err);
        });
    });
  });

  describe('Route DELETE /users/{id}', () => {
    it('Should delete a user', (done) => {
      request
        .delete('/users/1')
        .end((err, response) => {
          expect(response.statusCode).to.be.eql(204);
          done(err);
        });
    });
  });
});
