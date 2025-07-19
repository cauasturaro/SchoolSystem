const router = require('express').Router();
const StudentController = require('../controllers/StudentController.js');

router.post('/students', StudentController.createStudent);
router.get('/students', StudentController.findAllStudents);
router.get('/students/:id', StudentController.findStudentById);
router.get('/students/:id/grades/', StudentController.listGradesByStudentId);
router.put('/students/:id', StudentController.updateStudentById);
router.delete('/students/:id', StudentController.deleteStudentById);

module.exports = router;

