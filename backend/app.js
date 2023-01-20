require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const router = require('./routes/Router.js');

const port = process.env.PORT;

const app = express();

app.use(express.json());
// config form data
app.use(express.urlencoded({extended: false}));

// Solve CORS
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

// Upload directory
app.use('./uploads', express.static(path.join(__dirname, '/uploads')));

// DB connection
require('./config/db.js');

app.use(router);

app.listen(port, () => console.log(`Rodando em http://localhost:${port}`));

