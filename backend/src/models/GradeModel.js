const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../config/database');
const Student = require('./StudentModel'); 
const Subject = require('./SubjectModel'); 

const Grade = sequelize.define('Grade', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    studentId: {
        type: DataTypes.INTEGER,
        references: {
        model: 'students',
        key: 'id'
        },
        allowNull: false,
    },
    subjectId: {
        type: DataTypes.INTEGER,
        references: {
        model: 'subjects',
        key: 'id'
        },
        allowNull: false,
    },
    value: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1, 
            isPositive(value) {
                if (value < 0) {
                    throw new Error('[SS ERROR]: NUMBER MUST BE GREATER THEN 0');
                }
            }
        }
    },
    course: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
  tableName: 'grades',
  timestamps: true
});

module.exports = Grade;
