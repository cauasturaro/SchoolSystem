const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../config/database');
const Grade = require('./GradeModel');

const Subject = sequelize.define('Subject', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    teacherName : {
        type: DataTypes.STRING,
        allowNull: false
    },
    course: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
   tableName: 'subjects',
   timestamps: true
});

module.exports = Subject;