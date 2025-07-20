const Subject = require('../models/SubjectModel')

class SubjectService {
    static async create(data) {
        return await Subject.create(data);
    }

    static async findAll() {
        return await Subject.findAll();
    }

    static async findById(id) {
        return await Subject.findByPk(id);
    }

    static async update(data, options) {
        const [rows] = await Subject.update(data, options);
        return rows;
    }

    static async delete(id){
        const found  = await Subject.destroy({ where: { id } });
        return found;
    }
}

module.exports = SubjectService;