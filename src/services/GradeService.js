const Grade = require('../models/GradeModel');
const Student = require('../models/StudentModel');
const Subject = require('../models/SubjectModel');

class GradeService {

    static async create(data) {
        const { studentId, subjectId, value, course } = data;

        const student = await Student.findByPk(studentId);
        const subject = await Subject.findByPk(subjectId);
        
        if (!student) 
            throw new Error(`Student with id ${studentId} does not exist.`);
    
        if (!subject) 
            throw new Error(`Subject with id ${subjectId} does not exist.`);

        const grade = await Grade.create(data);
        return grade;
    }

    static async findAll() {
        return await Grade.findAll();
    }

    static async findById(id) {
        return await Grade.findByPk(id);
    }

    static async findByStudentId(studentId) {
        return await Grade.findAll({ where: { studentId } });
    }

    static async update(id, data) {
        const [ rows ] = await Grade.update(data, { where: { id } });
        return rows;
    }

    static async delete(id){
        const found  = await Grade.destroy({ where: { id } });
        return found;
    }
}

module.exports = GradeService;