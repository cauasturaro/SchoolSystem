const Student = require('../models/StudentModel');
const StudentService = require('../services/StudentService');


class StudentController {
    // CREATE
    static createStudent = async (req, res) => {
        try {
            const student = await StudentService.create(req.body);
            res.status(201).json(student); 
        } catch (error) {
            console.error("SC", error);
            res.status(400).json({ error: "Wasn't able to create students" });
        }
    }

    // READ 
    static findAllStudents = async (req, res) => {
        try {
            const students = await StudentService.findAll();
            res.status(200).json(students);
        } catch (error) {
            console.error("SC", error);
            res.status(500).json({ error: "Wasn't able to list students" });
        }
    }

    // READ (id)
    static findStudentById = async (req, res) => {
        const id = req.params.id;
        try {
            const student = await StudentService.findById(id);
            res.status(200).json(student);
        } catch (error) {
            console.error("SC", error);
            return res.status(404).send({ error: "Student wasn't found"});
        }
    }

    // LIST GRADES
    static listGradesByStudentId = async (req, res) => {
        const id = req.params.id;

        try {
            const student = await StudentService.findGradesById(id);
            res.status(200).json(student);
        } catch (error) {
            console.error("SC", error);
            return res.status(404).send({ error: "Student's grades weren't found"});
        }
    }

    // UPDATE (id)
    static updateStudentById = async (req, res) => {
        const id = req.params.id;
        const { name, age, email, course } = req.body;

        try {
            const studentExists = await StudentService.findById(id);
            if (!studentExists)
                return res.status(404).json({ error: "Student wasn't found" });

            const rows = await StudentService.update(id, { name, age, email, course });

            if (rows === 0)
                return res.status(200).json({ message: "No changes were made" });

            return res.status(200).json({ message: "Student updated" });
        } catch (error) {
            console.error("SC", error);
            res.status(500).json({ error: error.message });
        }
    }

    // DELETE (id)
    static deleteStudentById = async (req, res) => {
        const id = req.params.id;

        try {
            const found = await StudentService.delete(id);

            if (found === 0) 
                return res.status(404).json({ error: "Student wasn't found"});
            
            res.status(204).json({ message: "Student deleted"});
        } catch (error) {
            console.error("SC", error);
            res.status(500).json({ error: error.message });
        }
    }

    static async showAllById(req, res) {
        const id = req.params.id;

        try {
            const studentWithGrades = await StudentService.showAllById(id);

            if (!studentWithGrades) {
                return res.status(404).json({ message: 'Student wasn\'t found' });
            }

            return res.json(studentWithGrades);
        } catch (error) {
            console.error("SC", error);
            return res.status(500).json({ error: error.message });
        }
    }

}

module.exports = StudentController;