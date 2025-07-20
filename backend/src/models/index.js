const { sequelize } = require('../config/database');
const Student = require('./StudentModel');
const Subject = require('./SubjectModel');
const Grade = require('./GradeModel');

Student.hasMany(Grade, { foreignKey: 'studentId', as: 'grades' });
Subject.hasMany(Grade, { foreignKey: 'subjectId', as: 'grades' });

Grade.belongsTo(Student, { foreignKey: 'studentId', as: 'student' });
Grade.belongsTo(Subject, { foreignKey: 'subjectId', as: 'subject' });

module.exports = {
    sequelize,
    Student,
    Subject,
    Grade
};
