const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended:true }));

const studentRoutes = require('./routes/student.routes.js');
app.use('/api', studentRoutes);

module.exports = app;