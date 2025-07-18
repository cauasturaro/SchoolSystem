const router = require('express').Router();
const studentController = require('../controllers/student.controller.js');

router.post('/students', studentController.createStudent);
router.get('/students', studentController.listStudents);
router.get('/students/:id', studentController.searchStudentById);
router.put('/students/:id', studentController.updateStudentById);
router.delete('/students/:id', studentController.deleteStudentById);

module.exports = router;