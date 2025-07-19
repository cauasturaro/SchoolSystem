const Subject = require('../models/SubjectModel')

class SubjectService {
    static async create(data) {
        return await Subject.create(data);
    }

    static async listAll() {
        return await Subject.findAll();
    }

    static async findById(id) {
        return await Subject.findByPk(id);
    }

    static async update(id, data) {
        const [ found ] = await Subject.update(data, { where: { id } });
        return found;
    }

    static async delete(id){
        const [ found ] = await Subject.destroy({ where: { id } });
        return found;
    }
}

module.exports = SubjectService;