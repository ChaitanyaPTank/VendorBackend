import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './appconfig.js';
import { ValidationError } from 'express-validation';


const {
  PORT,
  DB_USER,
  DB_PASS,
  DB_NAME,
} = config;
const DB_URI = `mongodb+srv://${DB_USER}:${DB_PASS}@mandir.6mpry.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;


mongoose.connect(DB_URI,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) {
      console.log(err);
      return;
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
  return res.status(200).send('Jay Swaminarayana');
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
