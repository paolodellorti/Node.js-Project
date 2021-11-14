const express = require('express');
const morgan = require('morgan');
const reportsRoutes = require('./routes/reportsRoutes');

const server = express();

// ----- SETTINGS -----
server.set('view engine', 'ejs');
server.set('port', process.env.PORT || 8080);

// ----- CONNECTING TO SERVER -----
server.listen(server.get('port'), () => {
    console.log("Server is listening on port", server.get('port'));
})

// ----- MIDDLEWARES -----
server.use(express.static('public'));
server.use(express.urlencoded({ extended: true }));
server.use(morgan('dev'));

server.get('/', (req, res) => {
    res.render('index', { title: "Welcome" })
});

server.use('/reports', reportsRoutes);

server.use((req, res) => {
    res.status(404).render('404', { title: '404' });
  });
  