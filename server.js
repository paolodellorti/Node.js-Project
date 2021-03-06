const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv').config();
const reportsRoutes = require('./routes/reportsRoutes');
const { sequelize } = require('./models');

// ----- SETTINGS -----
const server = express();
const port = process.env.PORT || 8080;
server.set('view engine', 'ejs');

// ----- MIDDLEWARES -----
server.use(express.static('public'));
server.use(express.urlencoded({ extended: true }));
server.use(morgan('dev'));

// ----- ROUTES -----
server.get('/', (req, res) => {
    res.render('index', { title: "Welcome", error: "" })
});

server.use('/reports', reportsRoutes);

server.use((req, res) => {
    res.status(404).render('404', { title: '404 - Not Found' });
});

// ----- CONNECTING SERVER AND DB -----
server.listen(port, async () => { 
    console.log(`Server listening on http://localhost:${port}`);
    await sequelize.authenticate();
    console.log("Db authenticated");
});
  