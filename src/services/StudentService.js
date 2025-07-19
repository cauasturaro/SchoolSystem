const Student = require('../models/StudentModel');
const GradeService = require('../services/GradeService');

class StudentService {
    static async create(data) {
        return await Student.create(data);
    }

    static async listAll() {
        return await Student.findAll();
    }

    static async findById(id) {
        return await Student.findByPk(id);
    }
    static async findGradesById(id) {
        return await GradeService.findByStudentId(id); 
    }

    static async update(id, data) {
        const [ found ] = await Student.update(data, { where: { id} });
        return found;
    }

    static async delete(id){
        const [ found ] = await Student.destroy({ where: { id } });
        return found;
    }
}

module.exports = StudentService;