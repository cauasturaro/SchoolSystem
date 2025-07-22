const Grade = require('../models/GradeModel');
const GradeService = require('../services/GradeService');


class GradeController {
    // CREATE
    static createGrade = async (req, res) => {
        try {
            const grade = await GradeService.create(req.body);
            res.status(201).json(grade); 
        } catch (error) {
            console.error("[SS backend]", error);
            res.status(400).json({ error: "Wasn't able to create grade" });
        }
    }

    // READ 
    static findAllGrades = async (req, res) => {
        try {
            const grade = await GradeService.findAll();
            res.status(200).json(grade);
        } catch (error) {
            console.error("[SS backend]", error);
            res.status(500).json({ error: "Wasn't able to list grades" });
        }
    }

    // READ (id)
    static findGradeById = async (req, res) => {
        const id = req.params.id;
        try {
            const grade = await GradeService.findById(id);
            res.status(200).json(grade);
        } catch (error) {
            console.error("[SS backend]", error);
            return res.status(404).send({ error: "Grade wasn't found"});
        }
    }

    // UPDATE (id)
    static updateGradeById = async (req, res) => {
        const id = req.params.id;
        const { studentId, subjectId, value, course } = req.body;  

        try {
            const gradeExists = await GradeService.findById(id);
            if (!gradeExists)
                return res.status(404).json({ error: "Grade wasn't found" });

            const rows = await GradeService.update(id, { studentId, subjectId, value, course });

            if (rows === 0)
                return res.status(200).json({ message: "No changes were made" });

            return res.status(200).json({ message: "Grade updated" });
        } catch (error) {
            console.error("[SS backend]", error);
            res.status(500).json({ error: error.message });
        }
    }   

    // DELETE (id)
    static deleteGradeById = async (req, res) => {
        const id = req.params.id;

        try {
            const found = await GradeService.delete(id);

            if (found === 0) 
                return res.status(404).json({ error: "Grade wasn't found"});
            
            res.status(204).json({ message: "Grade deleted"});
        } catch (error) {
            console.error("[SS backend]", error);
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = GradeController;