const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

// CONFIG Variables
const PORT = process.env.PORT;

// routes
const routes = require('./routes');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

app.use('/', routes);

app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`);
})
