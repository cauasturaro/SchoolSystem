const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Grade = require('./GradeModel');

const Student = sequelize.define('Student', {
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
    age : {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1, 
            isPositive(value) {
                if (value <= 0) {
                    throw new Error('[SS ERROR]: NUMBER MUST BE GREATER THEN 0');
                }
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    course: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
   tableName: 'students',
   timestamps: true 
});

module.exports = Student;
