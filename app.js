import express from 'express';
import morgan from 'morgan';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import { ValidationError } from 'express-validation';


config();


// CONFIG Variables
const PORT = process.env.PORT || 3000;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_URI = `mongodb+srv://${DB_USER}:${DB_PASS}@mandir.6mpry.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`


mongoose.connect(DB_URI,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    }
    console.log("Connected to DB succesfully.");
  }
);


// routes
import routes from './routes.js';


const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());


app.get('/', (req, res) => {
  return res.status(200).send('Working');
});


app.use('/api', routes);


app.use((err, req, res, next) => {
  console.log(err);
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }
  return res.status(500).json(err);
})


app.listen(PORT, () => {
  console.log(`app is listening on http://localhost:${PORT}`);
});
