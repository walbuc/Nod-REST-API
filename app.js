import parser from 'body-parser';
import express from 'express';
import config from './config/config';
import datasource from './config/datasource';
import booksRouter from './routes/books';
import usersRouter from './routes/users';
import authRouter from './routes/auth';
import authorization from './auth';

const app = express();

app.config = config;
app.datasource = datasource(app);
app.set('port', 7000);
app.use(parser.json());
//destructuring?
const auth = authorization(app);
app.use(auth.initialize());
app.auth = auth;
booksRouter(app);
usersRouter(app);
authRouter(app);

export default app;
