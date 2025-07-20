const { Student, Subject, Grade } = require('../models');
const GradeService = require('../services/GradeService');

class StudentService {
    static async create(data) {
        return await Student.create(data);
    }

    static async findAll() {
        return await Student.findAll();
    }

    static async findById(id) {
        return await Student.findByPk(id);
    }
    static async findGradesById(id) {
        return await GradeService.findByStudentId(id); 
    }

    static async update(id, data) {
        const [ rows ] = await Student.update(data, { where: { id} });
        return rows;
    }

    static async delete(id){
        const found  = await Student.destroy({ where: { id } });
        return found;
    }

    static async showAllById(id) { 
        const studentWithGrades = await Student.findByPk(id, {
            include: {
                model: Grade,
                as: 'grades',
                include: {
                    model: Subject,
                    as: 'subject'
                }
            }
        });
        return studentWithGrades;
    }
}

module.exports = StudentService;