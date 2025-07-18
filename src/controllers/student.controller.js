const pool = require('../config/database');

exports.createStudent = async (req, res) => {
    const { name, age, email, course } = req.body;
    try {
        const { rows } = await pool.query(
            "INSERT INTO students (name, age, email, course) VALUES ($1, $2, $3, $4) RETURNING *",
            [name, age, email, course]
        );
        res.status(201).send({
            message: "SC: Student created!",
            student: rows[0]
        });
    } catch (error) {
        console.error("SC", error);
        res.status(500).send({
            message: "An error ocurred."
        });
    }
}

exports.listStudents = async (req, res) => {
    try {
        const { rows } = await pool.query(
            "SELECT * FROM students"
        );
        res.status(200).send(rows);
    } catch (error) {
        console.error("SC", error);
        res.status(500).send({
            message: "An error ocurred."
        });
    }
}

exports.searchStudentById = async (req, res) => {
    const id = req.params.id;
    try {
        const { rows } = await pool.query(
            "SELECT * FROM students WHERE id = $1",
            [id]
        );

        if (rows.length === 0) 
            return res.status(404).send({ message: "Student wasn't found"});

        res.status(200).send(rows);
    } catch (error) {
        console.error("SC", error);
        res.status(500).send({
            message: "An error ocurred."
        });
    }
}

exports.updateStudentById = async (req, res) => {
    const id = req.params.id;
    const { name, age, email, course } = req.body;

    try {
        const { rows } = await pool.query(
            "UPDATE students SET name = $1, age = $2, email = $3, course = $4 WHERE id = $5 RETURNING *",
            [name, age, email, course, id]
        );

        if (rows.length === 0) 
            return res.status(404).send({ message: "Student wasn't found"});

        res.status(200).send(rows);
    } catch (error) {
        console.error("SC", error);
        res.status(500).send({
            message: "An error ocurred."
        });
    }
}

exports.deleteStudentById = async (req, res) => {
    const id = req.params.id;
    try {
        const { rowCount } = await pool.query(
            "DELETE FROM students WHERE id = $1",
            [id]
        );

        if (rowCount === 0) 
            return res.status(404).send({ message: "Student wasn't found"});

        res.status(204).send({ message: "Student was deleted successfuly"});
    } catch (error) {
        console.error("SC", error);
        res.status(500).send({
            message: "An error ocurred."
        });
    }
}
