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

    static async update(id, data) {
        delete data.id; // in casa id is already in data...

        const [rows] = await Subject.update(data, { where: { id } });
        return rows;
    }

    static async delete(id){
        const found  = await Subject.destroy({ where: { id } });
        return found;
    }
}

module.exports = SubjectService;