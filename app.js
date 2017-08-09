import parser from 'body-parser';
import express from 'express';
import config from './config/config';
import datasource from './config/datasource';
import booksRouter from './routes/books';

const app = express();

app.config = config;
app.datasource = datasource(app);
const Books = app.datasource.models.Books; // otra forma de acceder al array
app.set('port', 7000);
app.use(parser.json());

booksRouter(app, Books);

export default app;
