const express = require('express');
const app = express();
const todoRoutes = require('./routes/todo.routes');
const mongodb = require('./mongodb/mongodb.connect');

mongodb.connect();
app.use(express.json());

app.use('/todos', todoRoutes);

app.use((error, req, res, next) => {
    res.status(500).json({message: error.message})
});

app.set('view engine', 'ejs');

app.get('/', (req, res) =>{
    res.render('pages/index');
});

module.exports = app;
