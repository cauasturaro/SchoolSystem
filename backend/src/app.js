const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended:true }));

const studentRoutes = require('./routes/student.routes.js');
const gradeRoutes = require('./routes/grade.routes.js');
const subjectRoutes = require('./routes/subject.routes.js');

app.use('/api', studentRoutes);
app.use('/api', gradeRoutes);
app.use('/api', subjectRoutes);

module.exports = app;