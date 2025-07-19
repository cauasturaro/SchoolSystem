const Grade = require('../models/GradeModel')

class GradeService {
    static async create(data) {
        return await Grade.create(data);
    }

    static async listAll() {
        return await Grade.findAll();
    }

    static async findById(id) {
        return await Grade.findByPk(id);
    }

    static async findByStudentId(studentId) {
        return await Grade.findAll({ where: { studentId } });
    }

    static async update(id, data) {
        const [ found ] = await Grade.update(data, { where: { id } });
        return found;
    }

    static async delete(id){
        const [ found ] = await Grade.destroy({ where: { id } });
        return found;
    }
}

module.exports = GradeService;