const Subject = require('../models/SubjectModel');
const SubjectService = require('../services/SubjectService');


class SubjectController {
    // CREATE
    static createSubject = async (req, res) => {
        try {
            const subject = await SubjectService.create(req.body);
            res.status(201).json(subject); 
        } catch (error) {
            console.error("SC", error);
            res.status(400).json({ error: "Wasn't able to create subject" });
        }
    }

    // READ 
    static findAllSubjects= async (req, res) => {
        try {
            const subject = await SubjectService.findAll();
            res.status(200).json(subject);
        } catch (error) {
            console.error("SC", error);
            res.status(500).json({ error: "Wasn't able to list subjects" });
        }
    }

    // READ (id)
    static findSubjectById = async (req, res) => {
        const id = req.params.id;
        try {
            const subject = await SubjectService.findById(id);
            res.status(200).json(subject);
        } catch (error) {
            console.error("SC", error);
            return res.status(404).send({ error: "Subject wasn't found"});
        }
    }

    // UPDATE (id)
    static updateSubjectById = async (req, res) => {
        const id = req.params.id;
        const { name, teacherName, course } = req.body;

        try {
            const subjectExists = await SubjectService.findById(id);
            if (!subjectExists)
                return res.status(404).json({ error: "Subject wasn't found" });

            const rows = await SubjectService.update(id, { name, teacherName, course });

            if (rows === 0)
                return res.status(200).json({ message: "No changes were made" });

            return res.status(200).json({ message: "Subject updated" });
        } catch (error) {
            console.error("SC", error);
            res.status(500).json({ error: error.message });
        }
    }

    // DELETE (id)
    static deleteSubjectById = async (req, res) => {
        const id = req.params.id;

        try {
            const found = await SubjectService.delete(id);

            if (found === 0) 
                return res.status(404).json({ error: "Subject wasn't found"});
            
            res.status(204).json({ message: "Subject deleted"});
        } catch (error) {
            console.error("SC", error);
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = SubjectController;